import { useState, useEffect, useRef } from "react";
import StreamedCounter from "./components/StreamedCounter";
import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
// import StreamedSurvey from "./components/StreamedSurvey";
import Pusher from "pusher-js";
import {
  GET_COUNTERS,
  GET_COUNTER_BY_ID,
  GET_SURVEYS,
  GET_TIMERS,
} from "../../../graphql/queries";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
} from "@apollo/client";

const tmi = require("tmi.js");

const browserSource = ({ timersData, sondagesData }) => {
  const [countersData, setCountersData] = useState([]);
  const surveyRef = useRef({});
  const [test, setTest] = useState();

  const [fetching, setFetching] = useState(false);
  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
  });

  const tmiClient = new tmi.Client({
    options: { debug: true, messagesLogLevel: "info" },
    connection: {
      secure: true,
    },
    identity: {
      username: "twoolsbot",
      password: "oauth:3v5b2me2u2xxq390nmub33xrhyhcxe",
    },
    channels: ["twoolsbot"],
  });

  const loadData = async () => {
    const counters = await client.query({ query: GET_COUNTERS });
    const survey = await client.query({ query: GET_SURVEYS });
    console.log("survey", survey);
    setCountersData(counters.data.getCounters);
    setSurveyData(survey.data.getSurveys);
    console.log("data loaded");
  };

  useEffect(() => {
    surveyRef.current = {};
    console.log("useEffect triggered");
    loadData();
    tmiClient.connect();

    tmiClient.on("message", (channel, tags, message, self) => {
      console.log("yes", surveyData);
      // setCounter((counter) => counter + 1);
      if (surveyData.length > 0) {
        console.log("surveyData");
      }
    });

    const pusher = new Pusher("74661ff50b3ca8023bb7", {
      cluster: "eu",
      encrypted: true,
    });
    const channel = pusher.subscribe("browserSource");
    channel.bind("counterUpdated", (data) => {
      // console.log("OH FONCTIONNE ZEUBI");
      // console.log("received data", data);
      setTest("#" + Math.floor(Math.random() * 16777215).toString(16));
      setFetching(!fetching);
    });

    // const interval = setInterval(() => {

    //   console.log("in set interval");
    // }, 1000);
    // return () => clearInterval(interval);
  }, [fetching]);

  return (
    <div>
      <button
        onClick={() => {
          tmiClient.disconnect();
        }}
      >
        DC
      </button>
      {countersData
        .filter((counters) => counters.isStreamed === true)
        .map((item, index) => (
          <div key={index} style={{ background: test, color: "white" }}>
            <StreamedCounter counterData={item} />
          </div>
        ))}

      {surveyData
        // .filter((surveys) => counters.isStreamed === true)
        .map((item, index) => (
          <div key={index} style={{ background: test, color: "white" }}>
            <StreamedSurvey surveyData={item} client={tmiClient} />
          </div>
        ))}
    </div>
  );
};

const StreamedSurvey = ({ surveyData }) => {
  const [index, setIndex] = useState(0);
  const [test, setTest] = useState(false);
  const [currentSurvey, setCurrentSurvey] = useState([]);
  const [percents, setPercents] = useState([]);
  const [counter, setCounter] = useState(0);
  const testPos = useSpring({ x: 0, y: 0 });
  const bindPos = useDrag((params) => {
    testPos.x.set(params.offset[0]);
    testPos.y.set(params.offset[1]);
  });

  let currentMessage = "Toz";

  useEffect(() => {
    console.log("rerendered");
    if (surveyData.fields.length) {
      console.log(surveyData.fields);
      surveyData.fields.forEach((item, index) => {
        setCurrentSurvey((oldSurvey) => [...oldSurvey, item]);
      });
    }
  }, []);

  // tmiClient.on("message", (channel, tags, message, self) => {
  //   setCounter((counter) => counter + 1);

  //   currentSurvey.forEach((field, index) => {
  //     if (message == index + 1) {
  //       let updatedCurrentSondage = currentSurvey.map((item, itemIndex) => {
  //         return index == itemIndex
  //           ? { ...item, percent: +item.percent + 1 }
  //           : item;
  //       });
  //       setCurrentSurvey(updatedCurrentSondage);
  //     }
  //   });
  // });

  return (
    <animated.div
      key={index}
      {...bindPos()}
      style={{ x: testPos.x, y: testPos.y }}
    >
      <h2>{surveyData.title}</h2>
      <button
        onClick={() => {
          setTest(true);
        }}
      >
        {" "}
        Test
      </button>
      <div>
        {currentSurvey.map((field, index) => (
          <div key={index} styles={{ display: "flex" }}>
            {/* <div>{field.name}</div>
            <div>
              {counter > 0
                ? ((field.percent / counter) * 100).toFixed(0) + "%"
                : ""}
            </div> */}
          </div>
        ))}
      </div>
    </animated.div>
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
