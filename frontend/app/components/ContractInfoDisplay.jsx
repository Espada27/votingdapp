"use client";
import { Box, Text, Divider } from "@chakra-ui/react";
import { useDataContext } from "../context/DataContext";
import { useContext } from "react";
import ContractContext from "../context/ContractContext";
import DisplayAddVoter from "./DisplayAddVoter";

export default function ContractInfoDisplay() {
  const { addresses, proposalIds } = useDataContext();
  const { workflowStatus, isOwner } = useContext(ContractContext);

  return (
    <Box flex={1} p={4}>
      <Text>Informations du Contrat</Text>
      <Text>Nombre de votants : {addresses.length}</Text>
      <Text>Nombre de propositions : {proposalIds.length}</Text>
      {/* Ici, tu peux afficher les informations récupérées via les getters du contrat */}
      {isOwner && workflowStatus === 0 && (
        <>
          <Divider my={4} />
          <DisplayAddVoter />
        </>
      )}
    </Box>
  );
}
