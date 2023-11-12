'use client'
import { useState, useEffect } from 'react';
import { readContract, prepareWriteContract, writeContract } from '@wagmi/core';
import { abi, contractAddress } from '../constants/constant';
import { useToast } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { getWorkflowMessage } from '../components/utils/helper';

const useContractState = () => {
    const [workflowStatus, setWorkflowStatus] = useState(5);
    const [isOwner, setIsOwner] = useState(false);
    const { address, isConnected } = useAccount();
    const toast = useToast();

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
            const updatedMessage = getWorkflowMessage(workflowStatus + 1);
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
          const updatedMessage = getWorkflowMessage(workflowStatus + 1);
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
        const updatedMessage = getWorkflowMessage(workflowStatus + 1);
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
        const updatedMessage = getWorkflowMessage(workflowStatus + 1);
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
          const updatedMessage = getWorkflowMessage(workflowStatus + 1);
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
      }

    useEffect(() => {
        checkIfOwner();
        fetchWorkflowStatus();
    }, [address, isConnected]);

    return {
        workflowStatus,
        isOwner,
        startProposalsRegistering,
        endProposalsRegistering,
        startVotingSession,
        endVotingSession,
        tallyVotes,

    };
};

export default useContractState;
