// SPDX-License-Identifier: MIT

pragma solidity 0.8.23;
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Voting
 * @author Maxime GOGNIES & Jonathan Dugard
 * @notice Ce contrat permet d'organiser un processus de vote en plusieurs étapes.
 * Il permet d'abord d'enregistrer les électeurs, puis de soumettre des propositions,
 * de voter pour les propositions, et enfin de comptabiliser les votes pour déterminer
 * la proposition gagnante.
 * @dev Le contrat hérite de `Ownable` d'OpenZeppelin pour gérer les permissions d'administration.
 */

contract Voting is Ownable {
    uint public winningProposalID;


    /// @notice Représente un électeur dans le système de vote.
    /// @dev Contient des informations sur l'état de vote d'un électeur.
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }


    /// @notice Représente une proposition dans le système de vote.
    /// @dev Contient la description de la proposition et le nombre de votes qu'elle a reçus.
    struct Proposal {
        string description;
        uint voteCount;
    }

    /// @notice Représente l'état actuel du processus de vote.
    /// @dev Utilisé pour contrôler les étapes du processus de vote et restreindre les actions aux étapes appropriées.
    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    WorkflowStatus public workflowStatus;
    Proposal[] proposalsArray;
    mapping(address => Voter) voters;

    // ::::::::::::: EVENTS ::::::::::::: //

    event VoterRegistered(address voterAddress);
    event WorkflowStatusChange(
        WorkflowStatus previousStatus,
        WorkflowStatus newStatus
    );
    event ProposalRegistered(uint proposalId);
    event Voted(address voter, uint proposalId);

    

    constructor() Ownable(msg.sender) {}


    /// @notice Vérifie que l'appelant est un électeur enregistré.
    /// @dev Utilisé pour restreindre certaines fonctions aux seuls électeurs enregistrés.
    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }

    // ::::::::::::: GETTERS ::::::::::::: //

    function getVoter(
        address _addr
    ) external view onlyVoters returns (Voter memory) {
        return voters[_addr];
    }

    function getOneProposal(
        uint _id
    ) external view onlyVoters returns (Proposal memory) {
        return proposalsArray[_id];
    }

    // ::::::::::::: REGISTRATION ::::::::::::: //


    /**
    * @notice Enregistre un nouvel électeur.
    * @dev Ajoute l'adresse `_addr` à la liste des électeurs autorisés. Ne peut être appelée que par le propriétaire et seulement si l'état est `RegisteringVoters`.
    * @param _addr L'adresse Ethereum de l'électeur à enregistrer.
    */
    function addVoter(address _addr) external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Voters registration is not open yet"
        );
        require(voters[_addr].isRegistered != true, "Already registered");

        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }

    // ::::::::::::: PROPOSAL ::::::::::::: //
    
    /** 
    * @notice Enregistre une proposition, par un électeur.
    * @param _desc La description de la proposition.
    */
    function addProposal(string calldata _desc) external onlyVoters {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Proposals are not allowed yet"
        );
        require(
            keccak256(abi.encode(_desc)) != keccak256(abi.encode("")),
            "Vous ne pouvez pas ne rien proposer"
        );
        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        emit ProposalRegistered(proposalsArray.length - 1);
    }

    // ::::::::::::: VOTE ::::::::::::: //


    /**
    * @notice Enregistre le vote d'un électeur pour une proposition spécifique.
    * @dev Enregistre le vote pour la proposition avec l'identifiant `_id`. L'électeur ne peut voter qu'une fois et seulement quand la session de vote est active.
    * @param _id L'identifiant de la proposition pour laquelle voter.
    */
    function setVote(uint _id) external onlyVoters {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session havent started yet"
        );
        require(voters[msg.sender].hasVoted != true, "You have already voted");
        require(_id < proposalsArray.length, "Proposal not found"); // pas obligé, et pas besoin du >0 car uint

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;

        if (
            proposalsArray[_id].voteCount >
            proposalsArray[winningProposalID].voteCount
        ) {
            winningProposalID = _id;
        }

        emit Voted(msg.sender, _id);
    }

    // ::::::::::::: STATE ::::::::::::: //


    /**
     * @notice Démarre la période d'enregistrement des propositions.
     * @dev Change le statut du workflow pour permettre l'enregistrement des propositions. Ne peut être appelée que par le propriétaire.
     */
    function startProposalsRegistering() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Registering proposals cant be started now"
        );
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;

        Proposal memory proposal;
        proposal.description = "GENESIS";
        proposalsArray.push(proposal);

        emit WorkflowStatusChange(
            WorkflowStatus.RegisteringVoters,
            WorkflowStatus.ProposalsRegistrationStarted
        );
    }


    /**
     * @notice Termine la période d'enregistrement des propositions.
     * @dev Change le statut du workflow pour clôturer l'enregistrement des propositions. Ne peut être appelée que par le propriétaire.
     */
    function endProposalsRegistering() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Registering proposals havent started yet"
        );
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationStarted,
            WorkflowStatus.ProposalsRegistrationEnded
        );
    }

    /**
     * @notice Démarre la session de vote.
     * @dev Change le statut du workflow pour permettre le début de la session de vote. Ne peut être appelée que par le propriétaire.
     */
    function startVotingSession() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationEnded,
            "Registering proposals phase is not finished"
        );
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationEnded,
            WorkflowStatus.VotingSessionStarted
        );
    }

    /**
     * @notice Termine la session de vote.
     * @dev Change le statut du workflow pour clôturer la session de vote. Ne peut être appelée que par le propriétaire.
     */
    function endVotingSession() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session havent started yet"
        );
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionStarted,
            WorkflowStatus.VotingSessionEnded
        );
    }

    /**
     * @notice Comptabilise les votes et détermine la proposition gagnante.
     * @dev Change le statut du workflow pour finaliser le processus de vote. Ne peut être appelée que par le propriétaire. Met à jour l'ID de la proposition gagnante.
     */
    function tallyVotes() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.VotingSessionEnded,
            "Current status is not voting session ended"
        );

        workflowStatus = WorkflowStatus.VotesTallied;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionEnded,
            WorkflowStatus.VotesTallied
        );
    }
}
