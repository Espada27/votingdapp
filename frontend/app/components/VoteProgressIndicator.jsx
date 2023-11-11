'use client'
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepTitle,
  Stepper,
  Box,
  VStack,
  StepStatus
} from '@chakra-ui/react';

const steps = [
  { title: '0', description: 'Registering Voters' },
  { title: '1', description: 'Proposals Registration Started' },
  { title: '2', description: 'Proposals Registration Ended' },
  { title: '3', description: 'Voting Session Started' },
  { title: '4', description: 'Voting Session Ended' },
  { title: '5', description: 'Votes Tallied' },
];

export default function VoteProgressIndicator({workflowStatus}) {
  console.log("workflowStatus dans VoteProgressIndicator: ", workflowStatus);

  // Utilisez directement workflowStatus comme activeStep
  const activeStep = workflowStatus;

  return (
    <Box marginTop="6" marginBottom="6" marginRight="20" marginLeft="20">
      <Stepper size='md' index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <VStack spacing={2} align="center">
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box textAlign="center">
                <StepTitle fontSize="sm">{step.title}</StepTitle>
                <StepDescription fontSize="xs">{step.description}</StepDescription>
              </Box>
            </VStack>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
