'use client'
import { Flex } from "@chakra-ui/react";
import {useState, useEffect} from "react"
import { readContract } from '@wagmi/core'
import Nav from "./Nav";
import VoteProgressIndicator from "./VoteProgressIndicator";
import ContractManager from "./ContractManager";
import { useAccount } from 'wagmi';
import ContractInfoDisplay from "./ContractInfoDisplay";
import { abi, contractAddress } from '../constants/constant';


export default function Main() {

    const [workflowStatus, setWorkflowStatus] = useState(5); // state pour le workflowStatus
    const [isOwner, setIsOwner] = useState(false); // state pour check si l'utilisateur est le propriétaire du contrat
    const { address, isConnected } = useAccount();
    
    const fetchWorkflowStatus = async () => {
        try {
            const status = await readContract({
                address: contractAddress,
                abi: abi,
                functionName: 'workflowStatus',
        });
        setWorkflowStatus(status);
    } catch (err) {
        console.error("Error in fetchWorkflowStatus:", err.message);
    }
};

    const checkIfOwner = async () => {
  try {
          const data = await readContract({
          address: contractAddress,
          abi: abi,
          functionName: 'owner',
          
      });
      setIsOwner(data === address);
  } catch (err) {
      console.error("Error in checkIfOwner:", err.message);
  }
};

    useEffect(() => {
  checkIfOwner();
}, [address, isConnected]);

    useEffect(() => {
    fetchWorkflowStatus();
}, [address, isConnected, workflowStatus]);




  return (
    <Flex direction="column" h="100vh">
      <Nav />
      <VoteProgressIndicator workflowStatus = {workflowStatus} />
      <Flex flex="1">
        <ContractManager isOwner={isOwner} isConnected={isConnected} flex="2" />
        <ContractInfoDisplay flex="1" />
      </Flex>
    </Flex>
  )
}
