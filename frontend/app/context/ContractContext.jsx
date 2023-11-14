// ContractContext.js
import { createContext } from 'react';

const ContractContext = createContext({
    workflowStatus: 5,
    isOwner: false,
    isRegistered: false,
    checkIfRegistered: () => {},
    startProposalsRegistering: () => {},
    endProposalsRegistering: () => {},
    startVotingSession: () => {},
    endVotingSession: () => {},
    tallyVotes: () => {},
    addVoter: () => {},
    getOneProposal: () => {},
    addProposal: () => {},
    
});

export default ContractContext;
