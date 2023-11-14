import { Box, Text, Divider } from '@chakra-ui/react';
import DisplayGetProposalFromIndex from './DisplayGetProposalFromIndex';

export default function ContractInfoDisplay() {
    return (
        <Box flex={1} p={4}>
          <Text>Informations du Contrat</Text>
          <Divider my={4} />
          <DisplayGetProposalFromIndex />
        </Box>
      );
}
