"use client";
import { useState, useEffect } from "react";
import {
  readContract,
  prepareWriteContract,
  writeContract,
  getWalletClient,
} from "@wagmi/core";
import { abi, contractAddress } from "../constants/constant";
import { useToast } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { getWorkflowMessage } from "../components/utils/helper";
import { isAddress } from "viem";

const useContractState = () => {
  const [workflowStatus, setWorkflowStatus] = useState(5);
  const [voters, setVoters] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const { address, isConnected } = useAccount();
  const toast = useToast();

  const addProposal = async (proposal) => {
    console.log("adding proposal : ", proposal);
    const walletClient = await getWalletClient();
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "addProposal",
        args: [proposal],
        account: walletClient.account,
      });
      const { hash } = await writeContract(request);
      //await waitForTransaction(hash);
      toast({
        title: "Succès !",
        description: "Vous avez ajouté une nouvelle proposition",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la proposal:", error);
      throw error;
    }
  };

  const getOneProposal = async (index) => {
    const walletClient = await getWalletClient();
    try {
      const proposal = await readContract({
        address: contractAddress,
        abi: abi,
        functionName: "getOneProposal",
        args: [index],
        account: walletClient.account,
      });
      return proposal;
    } catch (error) {
      console.error("Erreur lors de la récupération de la proposal:", error);
      throw error;
    }
  };

  const getProposals = async (proposalIds) => {
    const walletClient = await getWalletClient();
    try {
      const promises = proposalIds.map((id) =>
        readContract({
          address: contractAddress,
          abi: abi,
          functionName: "getOneProposal",
          args: [id],
          account: walletClient.account,
        })
      );
      const result = await Promise.all(promises);
      return result;
    } catch (error) {
      console.error("Erreur lors de la récupération de la proposal:", error);
      throw error;
    }
  };

  const addVoter = async (voterAddress) => {
    console.log("Adding voter:", voterAddress);
    if (!isOwner) {
      toast({
        title: "Erreur",
        description:
          "Vous n'êtes pas propriétaire du contrat ! Vous ne pouvez pas accéder à ces fonctionnalités",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    if (!voterAddress || !isAddress(voterAddress)) {
      toast({
        title: "Erreur",
        description: "Adresse Ethereum non valide ou non fournie.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "addVoter",
        args: [voterAddress],
      });

      const { hash } = await writeContract(request);

      //await waitForTransaction(hash);

      toast({
        title: "Succès !",
        description: "Vous avez ajouté un nouveau votant",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      setVoters([...voters, voterAddress]);
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un votant", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout du votant",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const startProposalsRegistering = async () => {
    if (!isOwner) {
      toast({
        title: "Erreur",
        description:
          "VOUS N'ETES PAS PROPRIETAIRE DU CONTRAT ! Vous ne pouvez accéder à ces fonctionnalités",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "startProposalsRegistering",
      });
      const { hash } = await writeContract(request);
      await fetchWorkflowStatus();
      const updatedMessage = getWorkflowMessage(workflowStatus + 1);
      toast({
        title: "Congrats !",
        description: updatedMessage,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error(
        "Erreur lors du démarrage de l'enregistrement des propositions",
        error
      );
      toast({
        title: "Error.",
        description: "Une erreur est survenue",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const endProposalsRegistering = async () => {
    if (!isOwner) {
      toast({
        title: "Erreur",
        description:
          "VOUS N'ETES PAS PROPRIETAIRE DU CONTRAT ! Vous ne pouvez accéder à ces fonctionnalités",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "endProposalsRegistering",
      });
      const { hash } = await writeContract(request);
      await fetchWorkflowStatus();
      const updatedMessage = getWorkflowMessage(workflowStatus + 1);
      toast({
        title: "Congrats !",
        description: updatedMessage,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error(
        "Erreur lors du démarrage de l'enregistrement des propositions",
        error
      );
      toast({
        title: "Error.",
        description: "Une erreur est survenue",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const startVotingSession = async () => {
    if (!isOwner) {
      toast({
        title: "Erreur",
        description:
          "VOUS N'ETES PAS PROPRIETAIRE DU CONTRAT ! Vous ne pouvez accéder à ces fonctionnalités",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "startVotingSession",
      });
      const { hash } = await writeContract(request);
      await fetchWorkflowStatus();
      const updatedMessage = getWorkflowMessage(workflowStatus + 1);
      toast({
        title: "Congrats !",
        description: updatedMessage,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error(
        "Erreur lors du démarrage de l'enregistrement des propositions",
        error
      );
      toast({
        title: "Error.",
        description: "Une erreur est survenue",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const endVotingSession = async () => {
    if (!isOwner) {
      toast({
        title: "Erreur",
        description:
          "VOUS N'ETES PAS PROPRIETAIRE DU CONTRAT ! Vous ne pouvez accéder à ces fonctionnalités",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "endVotingSession",
      });
      const { hash } = await writeContract(request);
      await fetchWorkflowStatus();
      const updatedMessage = getWorkflowMessage(workflowStatus + 1);
      toast({
        title: "Congrats !",
        description: updatedMessage,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error(
        "Erreur lors du démarrage de l'enregistrement des propositions",
        error
      );
      toast({
        title: "Error.",
        description: "Une erreur est survenue",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const tallyVotes = async () => {
    if (!isOwner) {
      toast({
        title: "Erreur",
        description:
          "VOUS N'ETES PAS PROPRIETAIRE DU CONTRAT ! Vous ne pouvez accéder à ces fonctionnalités",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "tallyVotes",
      });
      const { hash } = await writeContract(request);
      await fetchWorkflowStatus();
      const updatedMessage = getWorkflowMessage(workflowStatus + 1);
      toast({
        title: "Congrats !",
        description: updatedMessage,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error(
        "Erreur lors du démarrage de l'enregistrement des propositions",
        error
      );
      toast({
        title: "Error.",
        description: "Une erreur est survenue",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const fetchWorkflowStatus = async () => {
    try {
      const response = await readContract({
        address: contractAddress,
        abi: abi,
        functionName: "workflowStatus",
      });
      setWorkflowStatus(response);
    } catch (err) {
      console.error("Error in fetchWorkflowStatus:", err.message);
    }
  };
  const checkIfRegistered = async () => {
    const walletClient = await getWalletClient();

    try {
      const voterInfo = await readContract({
        address: contractAddress,
        abi: abi,
        functionName: "getVoter",
        args: [address],
        account: walletClient.account,
      });

      setIsRegistered(voterInfo.isRegistered);
    } catch (err) {
      console.log("Error in checkIfRegistered:", err.message);
      setIsRegistered(false);
    }
  };

  const checkIfOwner = async () => {
    try {
      const data = await readContract({
        address: contractAddress,
        abi: abi,
        functionName: "owner",
      });
      setIsOwner(data === address);
    } catch (err) {
      console.error("Error in checkIfOwner:", err.message);
    }
  };

  useEffect(() => {
    checkIfOwner();
    fetchWorkflowStatus();
  }, [address, isConnected, voters]);

  useEffect(() => {
    if (address) {
      checkIfRegistered();
    }
  }, [address]);

  return {
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
    getOneProposal,
    getProposals,
    addProposal,
  };
};

export default useContractState;
