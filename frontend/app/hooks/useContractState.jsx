"use client";
import { useState, useEffect } from "react";
import {
  readContract,
  prepareWriteContract,
  writeContract,
  getWalletClient,
} from "@wagmi/core";
import { abi, contractAddress } from "../constants/constant";
import { useAccount } from "wagmi";
import { isAddress } from "viem";
import useToast from "./useToast";

const useContractState = () => {
  const [workflowStatus, setWorkflowStatus] = useState(5);
  const [voters, setVoters] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const { address, isConnected } = useAccount();
  const toast = useToast();

  const setVote = async (indexDeLaProposal) => {
    console.log("Vote pour la proposition :", indexDeLaProposal);
    const walletClient = await getWalletClient();
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "setVote",
        args: [indexDeLaProposal],
        account: walletClient.account,
      });
      const { hash } = await writeContract(request);
      //await waitForTransaction(hash);
      toast.displayVoteSuccess();
    } catch (error) {
      console.error("Erreur lors du vote:", error);
      toast.displayVoteError();
    }
  };

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
      toast.displayAddProposalSuccess();
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
      toast.displayNotOwnerError();
      return;
    }

    if (!voterAddress || !isAddress(voterAddress)) {
      toast.displayInvalidAddressError();
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

      toast.displayAddVoterSuccess();

      setVoters([...voters, voterAddress]);
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un votant", error);
      toast.displayAddVoterError();
    }
  };

  const startProposalsRegistering = async () => {
    if (!isOwner) {
      toast.displayNotOwnerError();
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
      toast.displayNextStepSuccess(workflowStatus + 1);
    } catch (error) {
      console.error(
        "Erreur lors du démarrage de l'enregistrement des propositions",
        error
      );
      toast.displayNextStepError();
    }
  };

  const endProposalsRegistering = async () => {
    if (!isOwner) {
      toast.displayNotOwnerError();
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
      toast.displayNextStepSuccess(workflowStatus + 1);
    } catch (error) {
      console.error(
        "Erreur lors du démarrage de l'enregistrement des propositions",
        error
      );
      toast.displayNextStepError();
    }
  };
  const startVotingSession = async () => {
    if (!isOwner) {
      toast.displayNotOwnerError();
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
      toast.displayNextStepSuccess(workflowStatus + 1);
    } catch (error) {
      console.error(
        "Erreur lors du démarrage de l'enregistrement des propositions",
        error
      );
      toast.displayNextStepError();
    }
  };

  const endVotingSession = async () => {
    if (!isOwner) {
      toast.displayNotOwnerError();
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
      toast.displayNextStepSuccess(workflowStatus + 1);
    } catch (error) {
      console.error(
        "Erreur lors du démarrage de l'enregistrement des propositions",
        error
      );
      toast.displayNextStepError();
    }
  };

  const tallyVotes = async () => {
    if (!isOwner) {
      toast.displayNotOwnerError();
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
      toast.displayNextStepSuccess(workflowStatus + 1);
    } catch (error) {
      console.error(
        "Erreur lors du démarrage de l'enregistrement des propositions",
        error
      );
      toast.displayNextStepError();
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
    checkIfRegistered();
  }, [address]);

  useEffect(() => {
    if (workflowStatus === 1) {
      checkIfRegistered();
    }
  }, [workflowStatus]);

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
    setVote,
  };
};

export default useContractState;
