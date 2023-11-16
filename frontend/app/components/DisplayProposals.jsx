"use client";
import React, { useContext, useState } from "react";
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

const DisplayProposals = () => {
  const [openRows, setOpenRows] = useState(new Set()); // initialisation de gestion de l'ouverture des descriptions
  const { proposals } = useDataContext();

  // Gestion de l'ouverture des descritpions des proposals
  const toggleRow = (index) => {
    if (openRows.has(index)) {
      openRows.delete(index);
    } else {
      openRows.add(index);
    }
    setOpenRows(new Set(openRows));
  };

  return (
    <Box overflowY="auto" maxH="800px">
      <Heading as="h2">Tableau des proposals :</Heading>
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
          {proposals.map((proposal, index) => (
            <>
              <Tr key={index} onClick={() => toggleRow(index)} cursor="pointer">
                <Td>
                  {proposal.description.slice(0, 50)}
                  {proposal.description.length > 50 ? "..." : ""}
                </Td>
                <Td>{proposal.voteCount}</Td>
                <Td>
                  <Button colorScheme="blue">Voter</Button>
                </Td>
              </Tr>
              <Tr>
                <Td colSpan={3}>
                  <Collapse in={openRows.has(index)}>
                    <Box p={4} borderWidth="1px" mt={2}>
                      {proposal.description}
                      {/* Ajoute d'autres détails si nécessaire ici ? */}
                    </Box>
                  </Collapse>
                </Td>
              </Tr>
            </>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default DisplayProposals;
