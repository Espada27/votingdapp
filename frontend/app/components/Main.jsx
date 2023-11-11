'use client'
import { Flex } from "@chakra-ui/react";
import {useState, useEffect} from "react"
import { readContract, prepareWriteContract, writeContract } from '@wagmi/core'
import Nav from "./Nav";
import VoteProgressIndicator from "./VoteProgressIndicator";
import ContractManager from "./ContractManager";
import { useAccount } from 'wagmi';
import ContractInfoDisplay from "./ContractInfoDisplay";
import { abi, contractAddress } from '../constants/constant';
import { useToast } from '@chakra-ui/react'
import {getToastMessage, notOwnerToast} from "./utils/helper";


export default function Main() {
    const toast = useToast()
    const [workflowStatus, setWorkflowStatus] = useState(5); // state pour le workflowStatus
    const [isOwner, setIsOwner] = useState(false); // state pour check si l'utilisateur est le propriétaire du contrat
    const { address, isConnected } = useAccount();



  const startProposalsRegistering = async () => {
    if (!isOwner) {
      toast({
          title: 'Erreur',
          description: "VOUS N'ETES PAS PROPRIETAIRE DU CONTRAT ! Vous ne pouvez accéder à ces fonctionnalités",
          status: 'error',
          duration: 9000,
          isClosable: true,
      });
      return;
  }


      try {
        const { request } = await prepareWriteContract({
          address: contractAddress,
          abi: abi,
          functionName: 'startProposalsRegistering',
        })
        const { hash } = await writeContract(request)
        await fetchWorkflowStatus()
        const updatedMessage = getToastMessage(workflowStatus + 1);
        toast({
          title: 'Congrats !',
          description: updatedMessage,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });

      } catch (error) {
          console.error("Erreur lors du démarrage de l'enregistrement des propositions", error)
          toast({
            title: 'Error.',
            description: "Une erreur est survenue",
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
      }
  };

  const endProposalsRegistering = async () => {
    if (!isOwner) {
      toast({
          title: 'Erreur',
          description: "VOUS N'ETES PAS PROPRIETAIRE DU CONTRAT ! Vous ne pouvez accéder à ces fonctionnalités",
          status: 'error',
          duration: 9000,
          isClosable: true,
      });
      return;
  }
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: 'endProposalsRegistering',
      })
      const { hash } = await writeContract(request)
      await fetchWorkflowStatus()
      const updatedMessage = getToastMessage(workflowStatus + 1);
      toast({
        title: 'Congrats !',
        description: updatedMessage,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

    } catch (error) {
        console.error("Erreur lors du démarrage de l'enregistrement des propositions", error)
        toast({
          title: 'Error.',
          description: "Une erreur est survenue",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
    }
}

  const startVotingSession = async () => {
    if (!isOwner) {
      toast({
          title: 'Erreur',
          description: "VOUS N'ETES PAS PROPRIETAIRE DU CONTRAT ! Vous ne pouvez accéder à ces fonctionnalités",
          status: 'error',
          duration: 9000,
          isClosable: true,
      });
      return;
  }
  try {
    const { request } = await prepareWriteContract({
      address: contractAddress,
      abi: abi,
      functionName: 'startVotingSession',
    })
    const { hash } = await writeContract(request)
    await fetchWorkflowStatus()
    const updatedMessage = getToastMessage(workflowStatus + 1);
    toast({
      title: 'Congrats !',
      description: updatedMessage,
      status: 'success',
      duration: 9000,
      isClosable: true,
    });

  } catch (error) {
      console.error("Erreur lors du démarrage de l'enregistrement des propositions", error)
      toast({
        title: 'Error.',
        description: "Une erreur est survenue",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
  }
}

  const endVotingSession = async () => {
    if (!isOwner) {
      toast({
          title: 'Erreur',
          description: "VOUS N'ETES PAS PROPRIETAIRE DU CONTRAT ! Vous ne pouvez accéder à ces fonctionnalités",
          status: 'error',
          duration: 9000,
          isClosable: true,
      });
      return;
  }
  try {
    const { request } = await prepareWriteContract({
      address: contractAddress,
      abi: abi,
      functionName: 'endVotingSession',
    })
    const { hash } = await writeContract(request)
    await fetchWorkflowStatus()
    const updatedMessage = getToastMessage(workflowStatus + 1);
    toast({
      title: 'Congrats !',
      description: updatedMessage,
      status: 'success',
      duration: 9000,
      isClosable: true,
    });

  } catch (error) {
      console.error("Erreur lors du démarrage de l'enregistrement des propositions", error)
      toast({
        title: 'Error.',
        description: "Une erreur est survenue",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
  }
}

const tallyVotes = async () => {
  if (!isOwner) {
    toast({
        title: 'Erreur',
        description: "VOUS N'ETES PAS PROPRIETAIRE DU CONTRAT ! Vous ne pouvez accéder à ces fonctionnalités",
        status: 'error',
        duration: 9000,
        isClosable: true,
    });
    return;
}
  try {
    const { request } = await prepareWriteContract({
      address: contractAddress,
      abi: abi,
      functionName: 'tallyVotes',
    })
    const { hash } = await writeContract(request)
    await fetchWorkflowStatus()
    const updatedMessage = getToastMessage(workflowStatus + 1);
    toast({
      title: 'Congrats !',
      description: updatedMessage,
      status: 'success',
      duration: 9000,
      isClosable: true,
    });

  } catch (error) {
      console.error("Erreur lors du démarrage de l'enregistrement des propositions", error)
      toast({
        title: 'Error.',
        description: "Une erreur est survenue",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
  }
}

    
    const fetchWorkflowStatus = async () => {
      try {
          const response = await readContract({
              address: contractAddress,
              abi: abi,
              functionName: 'workflowStatus',
          });
          console.log("workFlowStatus avant le set : ", workflowStatus)
          console.log("le retour de la lecture du workflow dans le contrat : ", response);
          setWorkflowStatus(response);
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
}, [address, isConnected,]);





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
