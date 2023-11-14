'use client'
import { VStack, Text, Input, Button } from '@chakra-ui/react';
import { useState, useContext } from 'react';
import ContractContext from '../context/ContractContext';


export default function DisplayAddProposal() {

    const { addProposal } = useContext(ContractContext);

    const [newProposal, setNewProposal] = useState('');


    const handleAddProposal = () => {
        if (newProposal) {
            addProposal(newProposal);
            setNewProposal('')
        }
    }

  return (
    <VStack spacing={4}>
        <Text>Ajouter une Proposal :</Text>
        <Input 
            placeholder="Décrivez votre proposal" 
            value={newProposal}
            width= "400px" 
            onChange={(e) => setNewProposal(e.target.value.toString())} 
        />
        <Button colorScheme="blue" onClick={handleAddProposal}>Ajouter</Button>
    </VStack>
  )
}
