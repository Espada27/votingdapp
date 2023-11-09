'use client'
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps, 
  Box,
  VStack,
  Container
} from '@chakra-ui/react'


const steps = [
  { title: '1', description: 'Registering Voters' },
  { title: '2', description: 'Proposals Registration Started' },
  { title: '3', description: 'Proposals Registration Ended' },
  { title: '4', description: 'Voting Session Started' },
  { title: '5', description: 'Voting Session Ended' },
  { title: '6', description: 'Votes Tallied' },

]

export default function VoteProgressIndicator({currentWorkflowStatus}) {
  const { activeStep } = useSteps({
    index: currentWorkflowStatus,
    count: steps.length,
  })

  return (

  <Box marginTop="6" marginBottom="6" marginRight="20" marginLeft="20">
    <Stepper size='md' index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          <VStack spacing={2} align="center"> {/* Utilisez VStack pour un alignement vertical */}
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
