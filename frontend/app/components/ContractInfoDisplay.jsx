import { Box, Text } from '@chakra-ui/react';

export default function ContractInfoDisplay() {
    return (
        <Box flex={1} p={4}>
          <Text>Informations du Contrat</Text>
          {/* Ici, tu peux afficher les informations récupérées via les getters du contrat */}
        </Box>
      );
}
