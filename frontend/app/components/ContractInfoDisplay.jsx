"use client";
import { Box, Text, Divider } from "@chakra-ui/react";
import DisplayGetProposalFromIndex from "./DisplayGetProposalFromIndex";
import { useDataContext } from "../context/DataContext";

export default function ContractInfoDisplay() {
  const { addresses, proposalIds } = useDataContext();

  return (
    <Box flex={1} p={4}>
      <Text>Informations du Contrat</Text>
      <Text>Nombre de votants : {addresses.length}</Text>
      <Text>Nombre de propositions : {proposalIds.length}</Text>
      {/* Ici, tu peux afficher les informations récupérées via les getters du contrat */}
      <Divider my={4} />
      <DisplayGetProposalFromIndex />
    </Box>
  );
}
