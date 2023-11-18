"use client";
import { Box, Text, Divider, Flex } from "@chakra-ui/react";
import { useDataContext } from "../context/DataContext";
import { useContext } from "react";
import ContractContext from "../context/ContractContext";
import DisplayAddVoter from "./DisplayAddVoter";
import DisplayAddProposal from "./DisplayAddProposal";
import WinningProposalDisplay from "./WinningProposalDisplay";

export default function ContractInfoDisplay() {
  const { addresses, proposalIds } = useDataContext();
  const { workflowStatus, isOwner, isRegistered } = useContext(ContractContext);

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

      {isRegistered && workflowStatus === 1 && (
        <>
          <Divider my={4} />
          <DisplayAddProposal />
        </>
      )}

      {(isRegistered || isOwner) && workflowStatus === 5 && (
        <Flex direction="column" alignItems="center" justifyContent="center" h="100%">
          <WinningProposalDisplay />
        </Flex>
      )}
    </Box>
  );
}
