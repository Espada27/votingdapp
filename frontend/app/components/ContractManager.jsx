import { Box, Text, Alert, AlertIcon, Heading } from '@chakra-ui/react';

export default function ContractManager({isConnected, isOwner}) {

    return (
        <Box flex={2} p={4} borderRight="1px" borderColor="gray.200">
            
            {isConnected ? (
                isOwner ? (
                    <Text>Vous êtes le propriétaire du contrat</Text>
                ) : (
                    <Text>Vous n'êtes pas le propriétaire du contrat.</Text>
                )
            ) : (
                <Alert status="warning">
                    <AlertIcon />
                    Veuillez connecter votre portefeuille à notre Dapp.
                </Alert>
            )}
        </Box>
    );
}