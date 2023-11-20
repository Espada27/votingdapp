"use client";
import { Box, Alert, AlertIcon, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import ContractContext from "../context/ContractContext";
import DisplayProposals from "./DisplayProposals";

export default function ContractManager({ isConnected }) {
  const { isRegistered, isOwner } = useContext(ContractContext);
  return (
    <Box flex={2} p={4} borderRight="1px" borderColor="gray.200">
      {!isConnected && (
        <Alert status="warning">
          <AlertIcon />
          Veuillez connecter votre portefeuille à notre Dapp.
        </Alert>
      )}
      {isRegistered && <Text>Vous êtes enregistré comme votant.</Text>}
      {isRegistered === false && (
        <Text>Vous n'êtes pas enregistré comme votant.</Text>
      )}
      {isOwner && <Text>Vous êtes l'owner du contrat</Text>}
      <DisplayProposals />
    </Box>
  );
}
