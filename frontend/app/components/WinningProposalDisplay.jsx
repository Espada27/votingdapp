import React, { useContext, useEffect, useState } from "react";
import { Box, Text, Stat, StatLabel, StatNumber, useColorModeValue, Divider } from "@chakra-ui/react";
import { useDataContext } from "../context/DataContext";
import ContractContext from "../context/ContractContext";


const WinningProposalDisplay = () => {
  const { proposals } = useDataContext();
  const { workflowStatus } = useContext(ContractContext);
  const [winningProposal, setWinningProposal] = useState(null);
  const boxBg = useColorModeValue('gray.100', 'gray.700');


  useEffect(() => {
    if (workflowStatus === 5 && proposals.length > 0) {
      const sortedProposals = proposals.slice().sort((a, b) => b.voteCount.toString() - a.voteCount.toString());
      setWinningProposal(sortedProposals[0]);
    }
  }, [proposals, workflowStatus]);

  if (!winningProposal) {
    return <Text>Les votes ne sont pas encore terminés ou aucune proposition n'est disponible.</Text>;
  }

  return (
    <Box 
      p={4} 
      bg={boxBg}
      borderRadius="lg"
      borderWidth="2px"
      borderColor="lightgreen"
      boxShadow="lg"
      textAlign="center"
    >
      <Stat>
        <StatLabel>Voici la proposition Gagnante de cette session :</StatLabel>
        <Divider my={4} borderColor="lightgreen"/>
        <StatNumber>{winningProposal.description}</StatNumber>
        <Text>Avec pour nombre de votes :</Text>
        <Text>{winningProposal.voteCount.toString()}</Text>
      </Stat>
    </Box>
  );
};

export default WinningProposalDisplay;
