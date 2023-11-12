'use client'
import { Flex } from "@chakra-ui/react";
import Nav from "./Nav";
import VoteProgressIndicator from "./VoteProgressIndicator";
import ContractManager from "./ContractManager";
import { useAccount } from 'wagmi';
import ContractInfoDisplay from "./ContractInfoDisplay";
import useContractState from "../hooks/useContractState";


export default function Main() {
    const { address, isConnected } = useAccount();
    const {
      workflowStatus,
      isOwner,
      startProposalsRegistering,
      endProposalsRegistering,
      startVotingSession,
      endVotingSession,
      tallyVotes,
  } = useContractState();



  return (
    <Flex direction="column" h="100vh">
      <Nav />
      <VoteProgressIndicator 
      workflowStatus = {workflowStatus} 
      onStartRegistering={startProposalsRegistering} 
      onEndRegistering={endProposalsRegistering}
      onStartVoting={startVotingSession}
      onEndVoting={endVotingSession}
      ontallyVotes={tallyVotes}
      />
      <Flex flex="1">
        <ContractManager isOwner={isOwner} isConnected={isConnected} flex="2" />
        <ContractInfoDisplay flex="1" />
      </Flex>
    </Flex>
  )
}
