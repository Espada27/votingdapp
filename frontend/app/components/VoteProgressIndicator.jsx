import { Flex, Progress, Text, Box } from "@chakra-ui/react";

export default function VoteProgressIndicator({currentStage}) {
  const workflowStages = [
    "Registering Voters",
    "Proposals Registration Started",
    "Proposals Registration Ended",
    "Voting Session Started",
    "Voting Session Ended",
    "Votes Tallied"
  ];
  


  return (
    <Flex direction="column" align="center" mt={10}>
      <Progress value={(currentStage / (workflowStages.length - 1)) * 100} width="80%" height="32px" />
      <Box display="flex" justifyContent="space-between" width="80%" mt={2}>
        {workflowStages.map((stage, index) => (
          <Text fontSize="sm" key={index} color={index <= currentStage ? "blue.500" : "gray.500"}>
            {stage}
          </Text>
        ))}
      </Box>
    </Flex>
  );
}
