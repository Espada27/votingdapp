'use client'
import { Flex } from "@chakra-ui/react";
import Nav from "./Nav";
import VoteProgressIndicator from "./VoteProgressIndicator";
import ContractManager from "./ContractManager";
import { useAccount } from 'wagmi';
import ContractInfoDisplay from "./ContractInfoDisplay";
import useContractState from "../hooks/useContractState";
import ContractContext from "../context/ContractContext";


export default function Main() {
    const { address, isConnected } = useAccount();
    const {
      workflowStatus,
      isOwner,
      isRegistered,
      checkIfRegistered,
      startProposalsRegistering,
      endProposalsRegistering,
      startVotingSession,
      endVotingSession,
      tallyVotes,
      addVoter,
      getOneProposal
  } = useContractState();

  

  const contextValue = {
      workflowStatus,
      isOwner,
      isRegistered,
      checkIfRegistered,
      addVoter,
      startProposalsRegistering,
      endProposalsRegistering,
      startVotingSession,
      endVotingSession,
      tallyVotes,
      getOneProposal,
  }

  return (
    <ContractContext.Provider value={contextValue}>
    <Flex direction="column" h="100vh">
      <Nav />
      <VoteProgressIndicator />
      <Flex flex="1">
        <ContractManager isConnected={isConnected} flex="2" />
        <ContractInfoDisplay flex="1" />
      </Flex>
    </Flex>
    </ContractContext.Provider>
  )
}
