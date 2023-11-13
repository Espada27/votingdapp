export const getWorkflowMessage = (workflowStatus) => {
    switch(workflowStatus) {
      case 0:
      return "Enregistrement des électeurs commencé.";
      case 1:
        return "Enregistrement des propositions commencé.";
      case 2:
        return "Enregistrement des propositions terminé.";
      case 3:
        return "Session de vote commencée.";
      case 4:
        return "Session de vote terminée.";
      case 5:
        return "Votes comptabilisés.";
      default:
        return "Opération réussie.";
    }
  }