import { Flex } from "@chakra-ui/react";
import Nav from "./Nav";
import VoteProgressIndicator from "./VoteProgressIndicator";
import ContractManager from "./ContractManager";
import ContractInfoDisplay from "./ContractInfoDisplay";

export default function Main() {
    const currentStage = 4;
  return (
    <Flex direction="column" h="100vh">
      <Nav />
      <VoteProgressIndicator currentStage = {currentStage} />
      <Flex flex="1">
        <ContractManager flex="2" />
        <ContractInfoDisplay flex="1" />
      </Flex>
    </Flex>
  )
}
