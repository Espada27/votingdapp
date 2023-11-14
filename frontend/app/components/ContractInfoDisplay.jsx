"use client";
import { useEffect, useState } from "react";
import { useContractEvent } from "wagmi";
import { abi, contractAddress } from "../constants/constant";
import { parseAbiItem } from "viem";
import { createPublicClient, http } from "viem";
import { hardhat } from "viem/chains";
import { Box, Text, Divider } from "@chakra-ui/react";
import DisplayGetProposalFromIndex from "./DisplayGetProposalFromIndex";

const client = createPublicClient({
  chain: hardhat,
  transport: http(),
});

export default function ContractInfoDisplay() {
  const [addresses, setAddresses] = useState([]);
  const [liveAddresses, setLiveAddresses] = useState([]);

  useEffect(() => {
    const getLogs = async () => {
      const voterLogs = await client.getLogs({
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

    getLogs();
  }, []);

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

  useEffect(() => {
    const updatedAddresses = [];
    liveAddresses.forEach((addr) => {
      if (!addresses.includes(addr)) {
        updatedAddresses.push(addr);
      }
    });
    setAddresses((previous) => previous.concat(updatedAddresses));
  }, [liveAddresses]);

  return (
    <Box flex={1} p={4}>
      <Text>Informations du Contrat</Text>
      <Text>Nombre de votants : {addresses.length}</Text>
      {/* Ici, tu peux afficher les informations récupérées via les getters du contrat */}
      <Divider my={4} />
      <DisplayGetProposalFromIndex />
    </Box>
  );
}
