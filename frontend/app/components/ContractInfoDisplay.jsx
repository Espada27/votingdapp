"use client";
import { useEffect, useState } from "react";
import { useContractEvent, usePublicClient } from "wagmi";
import { abi, contractAddress } from "../constants/constant";
import { parseAbiItem } from "viem";
import { Box, Text, Divider } from "@chakra-ui/react";
import DisplayGetProposalFromIndex from "./DisplayGetProposalFromIndex";

export default function ContractInfoDisplay() {
  const [addresses, setAddresses] = useState([]);
  const [liveAddresses, setLiveAddresses] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [liveProposals, setLiveProposals] = useState([]);

  const viemPublicClient = usePublicClient();

  //Get past voters
  useEffect(() => {
    const getVoterRegisteredLogs = async () => {
      const voterLogs = await viemPublicClient.getLogs({
        address: contractAddress,
        event: parseAbiItem("event VoterRegistered(address voterAddress)"),
        fromBlock: 0n,
      });
      const pastVoterAddresses = [];
      for (const log of voterLogs) {
        pastVoterAddresses.push(log.args.voterAddress);
      }
      setAddresses(pastVoterAddresses);
    };

    getVoterRegisteredLogs();
  }, []);

  //Get past proposals
  useEffect(() => {
    const getProposalsLogs = async () => {
      const proposalsLogs = await viemPublicClient.getLogs({
        address: contractAddress,
        event: parseAbiItem("event ProposalRegistered(uint proposalId)"),
        fromBlock: 0n,
      });
      const pastProposals = [];
      for (const log of proposalsLogs) {
        pastProposals.push(log.args.proposalId);
      }
      setProposals(pastProposals);
    };
    getProposalsLogs();
  }, []);

  //Get new voters
  useContractEvent({
    address: contractAddress,
    abi,
    eventName: "VoterRegistered",
    listener(events) {
      const newVoterAddresses = [];
      for (const event of events) {
        newVoterAddresses.push(event.args.voterAddress);
      }
      if (newVoterAddresses.length) {
        setLiveAddresses(newVoterAddresses);
      }
    },
  });

  //Get new proposals
  useContractEvent({
    address: contractAddress,
    abi,
    eventName: "ProposalRegistered",
    listener(events) {
      const newProposals = [];
      for (const event of events) {
        newProposals.push(event.args.proposalId);
      }
      if (newProposals.length) {
        setLiveProposals(newProposals);
      }
    },
  });

  useEffect(() => {
    const updatedAddresses = [];
    liveAddresses.forEach((addr) => {
      if (!addresses.includes(addr)) {
        updatedAddresses.push(addr);
      }
    });
    setAddresses((previous) => previous.concat(updatedAddresses));
  }, [liveAddresses]);

  useEffect(() => {
    const updatedProposals = [];
    liveProposals.forEach((proposal) => {
      if (!proposals.includes(proposal)) {
        updatedProposals.push(proposal);
      }
    });
    setProposals((previous) => previous.concat(updatedProposals));
  }, [liveProposals]);

  return (
    <Box flex={1} p={4}>
      <Text>Informations du Contrat</Text>
      <Text>Nombre de votants : {addresses.length}</Text>
      <Text>Nombre de propositions : {proposals.length}</Text>
      {/* Ici, tu peux afficher les informations récupérées via les getters du contrat */}
      <Divider my={4} />
      <DisplayGetProposalFromIndex />
    </Box>
  );
}
