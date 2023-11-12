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
  StepStatus,
  Button
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
    switch (stepIndex) {
        case 1:
            onStartRegistering();
            break;
        case 2:
            onEndRegistering();
            break;
        case 3:
            onStartVoting();
            break;
        case 4:
            onEndVoting();
            break;
        case 5:
            ontallyVotes();
            break;
        default:
            console.log("Etape inconnue");
    }
};

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
            {index === workflowStatus + 1 ? (
              <Button 
                size="sm" 
                colorScheme="blue" 
                onClick={() => handleStepClick(index)}
              >
                {step.description}
              </Button>
            ) : (
              <StepDescription fontSize="xs">
                {step.description}
              </StepDescription>
            )}
          </VStack>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  </Box>
)
}
