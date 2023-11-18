// ContractContext.js
import { createContext } from "react";

const ContractContext = createContext({
  workflowStatus: 5,
  isOwner: false,
  isRegistered: false,
  hasVoted: false,
  checkIfRegistered: () => {},
  startProposalsRegistering: () => {},
  endProposalsRegistering: () => {},
  startVotingSession: () => {},
  endVotingSession: () => {},
  tallyVotes: () => {},
  addVoter: () => {},
  getOneProposal: () => {},
  addProposal: () => {},
  setVote: () => {},
});

export default ContractContext;
