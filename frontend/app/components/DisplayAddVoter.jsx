"use client";
import { VStack, Text, Input, Button } from "@chakra-ui/react";
import { useState, useContext } from "react";
import ContractContext from "../context/ContractContext";

export default function DisplayAddVoter() {
  const { addVoter } = useContext(ContractContext);

  const [newVoterAddress, setNewVoterAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddVoter = async () => {
    if (!newVoterAddress) {
      return;
    }
    setIsLoading(true);
    try {
      await addVoter(newVoterAddress);
      setNewVoterAddress("");
    } catch (error) {
      console.log("Error while adding a new voter", error);
    }
    setIsLoading(false);
  };

  return (
    <VStack spacing={4}>
      <Text>Ajouter un Voter :</Text>
      <Input
        placeholder="Adresse du voter"
        value={newVoterAddress}
        onChange={(e) => setNewVoterAddress(e.target.value.toString())}
      />
      <Button
        colorScheme="blue"
        isDisabled={isLoading}
        isLoading={isLoading}
        onClick={handleAddVoter}
      >
        Ajouter
      </Button>
    </VStack>
  );
}
