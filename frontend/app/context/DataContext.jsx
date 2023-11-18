// DataContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useContractEvent, usePublicClient } from "wagmi";
import { abi, contractAddress } from "../constants/constant";
import { parseAbiItem } from "viem";
import useContractState from "../hooks/useContractState";

const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [liveAddresses, setLiveAddresses] = useState([]);
  const [proposalIds, setProposalIds] = useState([]);
  const [liveProposalIds, setLiveProposalIds] = useState([]);
  const [proposals, setProposals] = useState([]);
  const { isRegistered, getOneProposal, getProposals } = useContractState();
  const viemPublicClient = usePublicClient();
  const [voteUpdateTrigger, setVoteUpdateTrigger] = useState(false);

  useContractEvent({
    address: contractAddress,
    abi,
    eventName: "Voted",
    listener: () => {
      setVoteUpdateTrigger((prev) => !prev);
    },
  });

  useEffect(() => {
    const fetchUpdatedProposals = async () => {
      try {
        const updatedProposals = await getProposals(proposalIds);
        setProposals(updatedProposals);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des propositions:",
          error
        );
      }
    };

    if (proposalIds.length > 0) {
      fetchUpdatedProposals();
    }
  }, [voteUpdateTrigger, proposalIds]);

  //Get past proposals with the received Ids
  useEffect(() => {
    const getPastProposals = async () => {
      if (isRegistered) {
        setProposals(await getProposals(proposalIds));
      } else {
        setProposals([]);
      }
    };
    getPastProposals();
  }, [isRegistered]);

  //Get past voters
  useEffect(() => {
    const getVoterRegisteredLogs = async () => {
      const voterLogs = await viemPublicClient.getLogs({
        address: contractAddress,
        event: parseAbiItem("event VoterRegistered(address voterAddress)"),
        fromBlock: 0n,
      });
      const pastVoterAddresses = [];
      for (const log of voterLogs) {
        pastVoterAddresses.push(log.args.voterAddress);
      }
      setAddresses(pastVoterAddresses);
    };

    getVoterRegisteredLogs();
  }, []);

  //Get past proposal Ids
  useEffect(() => {
    const getProposalIdsLogs = async () => {
      const proposalIdsLogs = await viemPublicClient.getLogs({
        address: contractAddress,
        event: parseAbiItem("event ProposalRegistered(uint proposalId)"),
        fromBlock: 0n,
      });
      const pastProposalIds = [];
      for (const log of proposalIdsLogs) {
        pastProposalIds.push(log.args.proposalId);
      }
      setProposalIds(pastProposalIds);
    };
    getProposalIdsLogs();
  }, []);

  //Get new voters
  useContractEvent({
    address: contractAddress,
    abi,
    eventName: "VoterRegistered",
    listener(events) {
      const newVoterAddresses = [];
      for (const event of events) {
        newVoterAddresses.push(event.args.voterAddress);
      }
      if (newVoterAddresses.length) {
        setLiveAddresses(newVoterAddresses);
      }
    },
  });

  //Get new proposal Ids
  useContractEvent({
    address: contractAddress,
    abi,
    eventName: "ProposalRegistered",
    listener(events) {
      const newProposalsIds = [];
      for (const event of events) {
        newProposalsIds.push(event.args.proposalId);
      }
      if (newProposalsIds.length) {
        setLiveProposalIds(newProposalsIds);
      }
    },
  });

  //Update the list of voters when new voters are received
  useEffect(() => {
    const updatedAddresses = [];
    liveAddresses.forEach((addr) => {
      if (!addresses.includes(addr)) {
        updatedAddresses.push(addr);
      }
    });
    setAddresses((previous) => previous.concat(updatedAddresses));
  }, [liveAddresses]);

  //Update the list of proposals and proposal Ids when new proposal Ids received
  useEffect(() => {
    const updatedProposalIds = [];
    liveProposalIds.forEach((proposal) => {
      if (!proposalIds.includes(proposal)) {
        updatedProposalIds.push(proposal);
      }
    });

    const getNewProposals = async () => {
      if (isRegistered) {
        const newProposals = await getProposals(updatedProposalIds);
        setProposals((previous) => previous.concat(newProposals));
      }
    };
    getNewProposals();

    setProposalIds((previous) => previous.concat(updatedProposalIds));
  }, [liveProposalIds]);

  return (
    <DataContext.Provider value={{ addresses, proposalIds, proposals }}>
      {children}
    </DataContext.Provider>
  );
};
