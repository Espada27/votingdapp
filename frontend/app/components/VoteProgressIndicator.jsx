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
  { description: 'Registering Voters' },
  { description: 'Proposals Registration Started' },
  { description: 'Proposals Registration Ended' },
  { description: 'Voting Session Started' },
  { description: 'Voting Session Ended' },
  { description: 'Votes Tallied' },
];

export default function VoteProgressIndicator({workflowStatus, onStartRegistering, onEndRegistering, onStartVoting, onEndVoting, ontallyVotes}) {


  // Utilisez directement workflowStatus comme activeStep
  const activeStep = workflowStatus


  const handleStepClick = (stepIndex) => {
    if (stepIndex === 1) {
      onStartRegistering() 
    }
    if (stepIndex === 2) {
      onEndRegistering()
    }
    if (stepIndex === 3) {
      onStartVoting()
    }
    if (stepIndex === 4) {
      onEndVoting()
    }
    if (stepIndex === 5) {
      ontallyVotes()
    }
};

  return (
    <Box marginTop="6" marginBottom="6" marginRight="20" marginLeft="20">
      <Stepper size='md' index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index} onClick={() => handleStepClick(index)}>
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
