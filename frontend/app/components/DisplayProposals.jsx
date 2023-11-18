"use client";
import React, { useContext, useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Collapse,
  Divider,
  Heading,
} from "@chakra-ui/react";
import { useDataContext } from "../context/DataContext";
import ContractContext from "../context/ContractContext";

const DisplayProposals = () => {
  const [openRows, setOpenRows] = useState(new Set());
  const [sortedProposals, setSortedProposals] = useState([]);
  const { proposals } = useDataContext();
  const { setVote, workflowStatus, hasVoted, votedProposalId } =
    useContext(ContractContext);
  const [isSorting, setIsSorting] = useState(false);

  const fadeInStyle = {
    animation: `fadeIn 3s`,
    "@keyframes fadeIn": {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
  };

  // Tri des propositions en fonction des votes
  useEffect(() => {
    if (workflowStatus === 5) {
      let sorted = [...proposals].sort(
        (a, b) => b.voteCount.toString() - a.voteCount.toString()
      );
      setSortedProposals(sorted);
      setIsSorting(true);
    } else {
      setSortedProposals(proposals);
    }
  }, [workflowStatus, proposals]);

  const toggleRow = (index) => {
    const newOpenRows = new Set(openRows);
    if (newOpenRows.has(index)) {
      newOpenRows.delete(index);
    } else {
      newOpenRows.add(index);
    }
    setOpenRows(newOpenRows);
  };

  const handleClick = (index, event) => {
    event.stopPropagation();
    setVote(index + 1);
  };

  return (
    <Box overflowY="auto" maxH="800px">
      <Heading as="h2">Tableau des propositions :</Heading>
      <Divider my={4} />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th>Nombre de Votes</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedProposals.map((proposal, index) => (
            <React.Fragment>
              <Tr
                key={index}
                style={{
                  ...fadeInStyle,
                  backgroundColor:
                    index === 0 && workflowStatus === 5
                      ? "lightgreen"
                      : "white",
                }}
                onClick={() => toggleRow(index)}
                cursor="pointer"
              >
                <Td>
                  {proposal.description.slice(0, 50)}
                  {proposal.description.length > 50 ? "..." : ""}
                </Td>
                <Td>{proposal.voteCount.toString()}</Td>
                <Td>
                  <Button
                    isDisabled={workflowStatus != 3 || hasVoted}
                    colorScheme={
                      index === 0 && workflowStatus === 5
                        ? "green"
                        : workflowStatus != 5 &&
                          hasVoted &&
                          votedProposalId == index + 1
                        ? "green"
                        : "blue"
                    }
                    onClick={(e) => handleClick(index, e)}
                  >
                    Voter
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td colSpan={3}>
                  <Collapse in={openRows.has(index)}>
                    <Box p={4} borderWidth="1px" mt={2}>
                      {proposal.description}
                    </Box>
                  </Collapse>
                </Td>
              </Tr>
            </React.Fragment>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default DisplayProposals;
