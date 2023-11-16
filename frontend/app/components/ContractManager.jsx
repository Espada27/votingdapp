"use client";
import {
  Box,
  Alert,
  AlertIcon,
  Button,
  Text,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { useContext } from "react";
import ContractContext from "../context/ContractContext";
import DisplayAddProposal from "./DisplayAddProposal";
import DisplayProposals from "./DisplayProposals";

export default function ContractManager({ isConnected }) {
  const { workflowStatus, isRegistered } = useContext(ContractContext);

  return (
    <Box flex={2} p={4} borderRight="1px" borderColor="gray.200">
      {!isConnected && (
        <Alert status="warning">
          <AlertIcon />
          Veuillez connecter votre portefeuille à notre Dapp.
        </Alert>
      )}
      <DisplayProposals />
    </Box>
  );
}
