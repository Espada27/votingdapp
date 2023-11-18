import { useToast as useChakraToast } from "@chakra-ui/react";
const useToast = () => {
  const chakraToast = useChakraToast();
  const TOAST_DURATION = 5000;
  const SUCCESS_TITLE = "Succès !";
  const ERROR_TITLE = "Erreur !";
  const SUCCESS_STATUS = "success";
  const ERROR_STATUS = "error";
  const WORKFLOW_MESSAGE = {
    0: "Enregistrement des électeurs commencé.",
    1: "Enregistrement des propositions commencé.",
    2: "Enregistrement des propositions terminé.",
    3: "Session de vote commencée.",
    4: "Session de vote terminée.",
    5: "Votes comptabilisés.",
  };

  const displayToast = (title, description, status) =>
    chakraToast({
      title,
      description,
      status,
      duration: TOAST_DURATION,
      isClosable: true,
    });

  return {
    displayVoteSuccess: () => {
      return displayToast(
        SUCCESS_TITLE,
        "Vous avez voté pour la proposal",
        SUCCESS_STATUS
      );
    },

    displayVoteError: () => {
      return displayToast(
        ERROR_TITLE,
        "Une erreur est survenue lors du vote",
        ERROR_STATUS
      );
    },

    displayAddProposalSuccess: () => {
      return displayToast(
        SUCCESS_TITLE,
        "Vous avez ajouté une nouvelle proposition",
        SUCCESS_STATUS
      );
    },

    displayNotOwnerError: () => {
      return displayToast(
        ERROR_TITLE,
        "Vous n'êtes pas propriétaire du contrat ! Vous ne pouvez pas accéder à ces fonctionnalités",
        ERROR_STATUS
      );
    },

    displayInvalidAddressError: () => {
      return displayToast(
        ERROR_TITLE,
        "Adresse Ethereum non valide ou non fournie.",
        ERROR_STATUS
      );
    },

    displayAddVoterSuccess: () => {
      return displayToast(
        SUCCESS_TITLE,
        "Vous avez ajouté un nouveau votant",
        SUCCESS_STATUS
      );
    },

    displayAddVoterError: () => {
      return displayToast(
        ERROR_TITLE,
        "Une erreur est survenue lors de l'ajout du votant",
        ERROR_STATUS
      );
    },

    displayNextStepSuccess: (step) => {
      return displayToast(
        SUCCESS_TITLE,
        WORKFLOW_MESSAGE[step],
        SUCCESS_STATUS
      );
    },

    displayNextStepError: () => {
      return displayToast(
        ERROR_TITLE,
        "Une erreur est survenue lors du changement d'étape",
        ERROR_STATUS
      );
    },
  };
};

export default useToast;
