'use client'
import { Flex } from "@chakra-ui/react";
import {useState} from "react"
import Nav from "./Nav";
import VoteProgressIndicator from "./VoteProgressIndicator";
import ContractManager from "./ContractManager";
import ContractInfoDisplay from "./ContractInfoDisplay";

export default function Main() {
    const [currentWorkflowStatus, setcurrentWorkflowStatus] = useState(5) // state pour le workflowStatus
  return (
    <Flex direction="column" h="100vh">
      <Nav />
      <VoteProgressIndicator currentWorkflowStatus = {currentWorkflowStatus} />
      <Flex flex="1">
        <ContractManager flex="2" />
        <ContractInfoDisplay flex="1" />
      </Flex>
    </Flex>
  )
}
