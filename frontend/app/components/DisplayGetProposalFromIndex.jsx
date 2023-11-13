'use client'
import { useState, useContext } from 'react';
import { VStack, Input, Text, Box, Button } from '@chakra-ui/react';
import ContractContext from '../context/ContractContext';

export default function DisplayGetProposalFromIndex() {
    const { getOneProposal } = useContext(ContractContext);
    const [index, setIndex] = useState('');
    const [proposal, setProposal] = useState(null);

    const handleInputChange = (event) => {
        setIndex(event.target.value);
    };

    const fetchProposal = async () => {
        if (index !== '') {
            try {
                const proposalData = await getOneProposal(index);
                setProposal(proposalData);
            } catch (error) {
                console.error("Erreur lors de la récupération de la proposal:", error);
                setProposal(null); // En cas d'erreur, réinitialiser la proposal
            }
        }
    };

    return (
        <VStack spacing={4}>
            <Input
                placeholder="Entrez l'index de la proposal"
                value={index}
                width="250px"
                onChange={handleInputChange}
            />
            <Button onClick={fetchProposal}>Rechercher la Proposal</Button>
            {proposal && (
                <Box p={5} shadow='md' borderWidth='1px'>
                    <Text fontWeight='bold'>Description: {proposal.description}</Text>
                    <Text mt={2}>Nombre de votes: {proposal.voteCount.toString()}</Text>
                </Box>
            )}
        </VStack>
    );
}
