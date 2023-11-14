'use client'
import { Box, Alert, AlertIcon, Button, Text, VStack, Divider } from '@chakra-ui/react';
import { useContext } from 'react';
import ContractContext from '../context/ContractContext';
import DisplayAddVoter from './DisplayAddVoter';
import DisplayAddProposal from './DisplayAddProposal';
import DisplayGetProposalFromIndex from './DisplayGetProposalFromIndex';

export default function ContractManager({ isConnected }) {
    const { workflowStatus, isOwner, isRegistered } = useContext(ContractContext);


    return (
        <Box flex={2} p={4} borderRight="1px" borderColor="gray.200">
            {!isConnected && (
                <Alert status="warning">
                    <AlertIcon />
                    Veuillez connecter votre portefeuille à notre Dapp.
                </Alert>
            )}
    
            {isRegistered && <Text>Vous êtes enregistré comme votant.</Text>}
            {isRegistered === false && <Text>Vous n'êtes pas enregistré comme votant.</Text>}

            <VStack spacing={4}>
                {isConnected && isOwner && workflowStatus === 0 && <DisplayAddVoter />}

                {isConnected && isRegistered && workflowStatus === 1 && (
                    <>
                        <DisplayAddProposal />
                        <Divider my={4} />
                        <DisplayGetProposalFromIndex />
                    </>
                )}
            </VStack>
        </Box>
    );
}
