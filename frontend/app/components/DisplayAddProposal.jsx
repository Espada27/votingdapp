"use client";
import { VStack, Text, Input, Button } from "@chakra-ui/react";
import { useState, useContext } from "react";
import ContractContext from "../context/ContractContext";

export default function DisplayAddProposal() {
  const { addProposal } = useContext(ContractContext);

  const [newProposal, setNewProposal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddProposal = async () => {
    if (!newProposal || isLoading) {
      return;
    }
    setIsLoading(true);

    await addProposal(newProposal).finally(() => {
      setIsLoading(false);
    });

    setNewProposal("");
  };

  return (
    <VStack spacing={4}>
      <Text>Ajouter une Proposal :</Text>
      <Input
        placeholder="Décrivez votre proposal"
        value={newProposal}
        isDisabled={isLoading}
        width="400px"
        onChange={(e) => setNewProposal(e.target.value)}
      />
      <Button
        colorScheme="blue"
        onClick={handleAddProposal}
        isDisabled={isLoading}
        isLoading={isLoading}
      >
        Ajouter
      </Button>
    </VStack>
  );
}
