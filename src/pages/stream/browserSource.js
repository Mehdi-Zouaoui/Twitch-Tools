import { useState, useEffect } from "react";
import StreamedCounter from "./components/StreamedCounter";
import Pusher from "pusher-js";
import {
  GET_COUNTERS,
  GET_SURVEYS,
  GET_TIMERS,
} from "../../../graphql/queries";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const browserSource = ({ timersData, sondagesData }) => {
  const [countersData, setCountersData] = useState([]);
  const [test, setTest] = useState();

  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    const loadData = async () => {
      const counters = await client.query({ query: GET_COUNTERS });
      setCountersData(counters.data.getCounters);
      console.log("data loaded");
    };
    loadData();

    const pusher = new Pusher("74661ff50b3ca8023bb7", {
      cluster: "eu",
      encrypted: true,
    });
    const channel = pusher.subscribe("browserSource");
    channel.bind("counterUpdated", (data) => {
      console.log("OH FONCTIONNE ZEUBI");
      console.log("received data", data);
      setTest("#" + Math.floor(Math.random() * 16777215).toString(16));
    });

    // const interval = setInterval(() => {

    //   console.log("in set interval");
    // }, 1000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {countersData
        .filter((counters) => counters.isStreamed === true)
        .map((item, index) => (
          <div key={index} style={{ background:  test }}>
            <StreamedCounter counterData={item} />
          </div>
        ))}
    </div>
  );
};
// appId: process.env.PUSHER_APP_ID,
// key: ,
// secret: process.env.PUSHER_SECRET,
// cluster: process.env.PUSHER_CLUSTER,
// useTLS: true,

export default browserSource;

// export const getServerSideProps = async () => {
//   const timers = await client.query({ query: GET_TIMERS });
//   const timersJSON = timers.data.getTimers;
//   const surveys = await client.query({ query: GET_SURVEYS });
//   const surveysJSON = surveys.data.getSurveys;

//   return {
//     props: {
//       sondagesData: surveysJSON,
//       timersData: timersJSON,
//     },
//   };
// };
