'use client'
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  Stepper,
  Box,
  VStack,
  StepStatus,
  Button
} from '@chakra-ui/react';
import { useContext } from 'react';
import ContractContext from '../context/ContractContext';

const steps = [
  { description: 'Registering Voters' },
  { description: 'Proposals Registration Started' },
  { description: 'Proposals Registration Ended' },
  { description: 'Voting Session Started' },
  { description: 'Voting Session Ended' },
  { description: 'Votes Tallied' },
];

export default function VoteProgressIndicator() {

  const {
    workflowStatus,
    startProposalsRegistering,
    endProposalsRegistering,
    startVotingSession,
    endVotingSession,
    tallyVotes} = useContext(ContractContext)
  
  const activeStep = workflowStatus


  const handleStepClick = (stepIndex) => {
    switch (stepIndex) {
        case 1:
            startProposalsRegistering();
            break;
        case 2:
            endProposalsRegistering();
            break;
        case 3:
            startVotingSession();
            break;
        case 4:
            endVotingSession();
            break;
        case 5:
            tallyVotes();
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
