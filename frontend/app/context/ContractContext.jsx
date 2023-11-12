// ContractContext.js
import { createContext } from 'react';

const ContractContext = createContext({
    workflowStatus: 5,
    isOwner: false,
    startProposalsRegistering: () => {},
    endProposalsRegistering: () => {},
    startVotingSession: () => {},
    endVotingSession: () => {},
    tallyVotes: () => {},
    
});

export default ContractContext;
