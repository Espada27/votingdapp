'use client'
import { Box, Alert, AlertIcon, Button, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import ContractContext from '../context/ContractContext';
import DisplayAddVoter from './DisplayAddVoter';
import DisplayGetProposalFromIndex from './DisplayGetProposalFromIndex';

export default function ContractManager({ isConnected }) {
    const { workflowStatus, isOwner, isRegistered, checkIfRegistered } = useContext(ContractContext);


    return (
        <Box flex={2} p={4} borderRight="1px" borderColor="gray.200">
            {!isConnected && (
                <Alert status="warning">
                    <AlertIcon />
                    Veuillez connecter votre portefeuille à notre Dapp.
                </Alert>
            )}
    
                <>
                    {isRegistered && <Text>Vous êtes enregistré comme votant.</Text>}
                    {isRegistered === false && <Text>Vous n'êtes pas enregistré comme votant.</Text>}
                </>

            {isConnected && isOwner && workflowStatus === 0 && (
                <DisplayAddVoter />
            )}
            {isConnected && isRegistered && workflowStatus === 1 && (
                <DisplayGetProposalFromIndex />
            )}
        </Box>
    );
}
