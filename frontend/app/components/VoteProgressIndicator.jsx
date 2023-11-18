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
import { useContext } from "react";
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
  const {
    workflowStatus,
    startProposalsRegistering,
    endProposalsRegistering,
    startVotingSession,
    endVotingSession,
    tallyVotes,
  } = useContext(ContractContext);

  const activeStep = workflowStatus;

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
