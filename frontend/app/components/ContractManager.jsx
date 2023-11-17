"use client";
import { Box, Alert, AlertIcon, Text } from "@chakra-ui/react";
import { useContext } from "react";
import ContractContext from "../context/ContractContext";
import DisplayProposals from "./DisplayProposals";

export default function ContractManager({ isConnected }) {
  const { isRegistered } = useContext(ContractContext);

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
      <DisplayProposals />
    </Box>
  );
}
