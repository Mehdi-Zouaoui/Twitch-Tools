import { useState, useEffect } from "react";
import StreamedCounter from "./components/StreamedCounter";
import {
  GET_COUNTERS,
  GET_SURVEYS,
  GET_TIMERS,
} from "../../../graphql/queries";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const browserSource = ({ countersData, timersData, sondagesData }) => {
  return (
    <div>
      {countersData
        .filter((counters) => counters.isStreamed === true)
        .map((item, index) => (
          <div key={index}>
            <StreamedCounter counterData={item} />
          </div>
        ))}
    </div>
  );
};

export default browserSource;

export const getStaticProps = async () => {
  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
  });

  const counters = await client.query({ query: GET_COUNTERS });
  const countersJSON = counters.data.getCounters;
  const timers = await client.query({ query: GET_TIMERS });
  const timersJSON = timers.data.getTimers;
  const surveys = await client.query({ query: GET_SURVEYS });
  const surveysJSON = surveys.data.getSurveys;

  return {
    props: {
      sondagesData: surveysJSON,
      countersData: countersJSON,
      timersData: timersJSON,
    },
  };
};
