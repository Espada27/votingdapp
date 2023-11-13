'use client'
import { VStack, Text, Input, Button } from '@chakra-ui/react';
import { useState, useContext } from 'react';
import ContractContext from '../context/ContractContext';


export default function DisplayAddVoter() {

    const { addVoter } = useContext(ContractContext);

    const [newVoterAddress, setNewVoterAddress] = useState('');


    const handleAddVoter = () => {
        if (newVoterAddress) {
            addVoter(newVoterAddress);
            setNewVoterAddress('')
        }
    }

  return (
    <VStack spacing={4}>
        <Text>Ajouter un Voter :</Text>
        <Input 
             placeholder="Adresse du voter" 
            value={newVoterAddress} 
            onChange={(e) => setNewVoterAddress(e.target.value.toString())} 
        />
        <Button colorScheme="blue" onClick={handleAddVoter}>Ajouter</Button>
    </VStack>
  )
}
