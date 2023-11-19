"use client";
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
  Button,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import ContractContext from "../context/ContractContext";

const workflowSteps = [
  {
    incomplete: "Enregistrement des votants",
    active: "Enregistrement des votants",
    complete: "Votants enregistrés",
  },
  {
    incomplete: "Saisie des propositions",
    active: "Saisir les propositions",
    complete: "Propositions enregistrées",
  },
  {
    incomplete: "Saisie terminée",
    active: "Terminer la saisie",
    complete: "Saisie terminée",
  },
  {
    incomplete: "Vote en cours...",
    active: "Démarrer le vote",
    complete: "Vote terminé",
  },
  {
    incomplete: "Attente de dépouillement",
    active: "Terminer le vote",
    complete: "Vote terminé",
  },
  {
    incomplete: "Votes comptabilisés",
    active: "Compter les votes",
    complete: "Votes comptabilisés",
  },
];

export default function VoteProgressIndicator() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    workflowStatus,
    startProposalsRegistering,
    endProposalsRegistering,
    startVotingSession,
    endVotingSession,
    tallyVotes,
  } = useContext(ContractContext);

  const activeStep = workflowStatus;

  const handleStepClick = async (stepIndex) => {
    setIsLoading(true);
    try {
      switch (stepIndex) {
        case 1:
          await startProposalsRegistering();
          break;
        case 2:
          await endProposalsRegistering();
          break;
        case 3:
          await startVotingSession();
          break;
        case 4:
          await endVotingSession();
          break;
        case 5:
          await tallyVotes();
          break;
        default:
          console.log("Etape inconnue");
      }
    } catch (error) {
      console.log("Error while changing the workflow status", error);
    }
    setIsLoading(false);
  };

  return (
    <Box marginTop="6" marginBottom="6" marginRight="20" marginLeft="20">
      <Stepper size="md" index={activeStep}>
        {workflowSteps.map((step, index) => (
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
                  isDisabled={isLoading}
                  isLoading={isLoading}
                  onClick={() => handleStepClick(index)}
                >
                  {step.active}
                </Button>
              ) : (
                <StepDescription fontSize="xs">
                  {index < workflowStatus ? step.complete : step.incomplete}
                </StepDescription>
              )}
            </VStack>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
