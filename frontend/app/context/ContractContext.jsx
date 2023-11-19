// ContractContext.js
import { createContext } from "react";

const ContractContext = createContext({
  workflowStatus: 5,
  isOwner: false,
  isRegistered: false,
  hasVoted: false,
  checkIfRegistered: async () => {},
  startProposalsRegistering: async () => {},
  endProposalsRegistering: async () => {},
  startVotingSession: async () => {},
  endVotingSession: async () => {},
  tallyVotes: async () => {},
  addVoter: async () => {},
  getOneProposal: async () => {},
  addProposal: async () => {},
  setVote: async () => {},
});

export default ContractContext;
