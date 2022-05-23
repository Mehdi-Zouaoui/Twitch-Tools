import { useState, useEffect, useRef } from "react";
import StreamedCounter from "./components/StreamedCounter";
import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
import { tmiClient } from "../../utils/twitchChat";
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

const twitchConnect = async () => {
  tmiClient.connect();
};
const twitchDisconnect = async () => {
  tmiClient.disconnect();
};

const browserSource = ({ timersData, sondagesData }) => {
  const [countersData, setCountersData] = useState([]);
  const [surveysData, setSurveysData] = useState([]);
  const surveyRef = useRef();
  const [connected, setConnected] = useState(false);
  const [test, setTest] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    surveyRef.current = {};
    const loadData = async () => {
      const counters = await client.query({ query: GET_COUNTERS });
      const survey = await client.query({ query: GET_SURVEYS });
      setCountersData(counters.data.getCounters);
      setSurveysData(survey.data.getSurveys);
      surveyRef.current = survey.data.getSurveys[0];
      setIsLoading(false);
      if (survey.data.getSurveys[0].started) {
        setConnected(true);
        twitchConnect();
      } else {
        setConnected(false);
        twitchDisconnect();
      }
    };
    loadData();
    const pusher = new Pusher("74661ff50b3ca8023bb7", {
      cluster: "eu",
      encrypted: true,
    });
    const channel = pusher.subscribe("browserSource");
    channel.bind("counterUpdated", (data) => {
      setTest("#" + Math.floor(Math.random() * 16777215).toString(16));
      setFetching(!fetching);
    });
    channel.bind("surveyUpdated", (data) => {
      setFetching(!fetching);
    });
  }, [fetching]);

  return (
    <div>
      <button onClick={() => {}}>DC</button>
      {countersData
        .filter((counters) => counters.isStreamed === true)
        .map((item, index) => (
          <div key={index} style={{ background: test, color: "white" }}>
            <StreamedCounter counterData={item} />
          </div>
        ))}

      {isLoading ? (
        <div>Loading</div>
      ) : (
        surveysData
          .filter((surveys) => surveys.isStreamed === true)
          .map((item, index) => (
            <div style={{ background: test, color: "white" }} key={index}>
              <StreamedSurvey surveyData={item} />
            </div>
          ))
      )}
    </div>
  );
};

const StreamedSurvey = ({ surveyData }) => {
  const [index, setIndex] = useState(0);
  const [test, setTest] = useState(false);
  const [currentSurvey, setCurrentSurvey] = useState([]);
  const [percents, setPercents] = useState([]);
  const [username, setUsername] = useState("");
  const [counter, setCounter] = useState(0);

  const testPos = useSpring({ x: 0, y: 0 });
  const bindPos = useDrag((params) => {
    testPos.x.set(params.offset[0]);
    testPos.y.set(params.offset[1]);
  });

  useEffect(() => {
    setPercents(
      surveyData.fields.map((item, index) => {
        return 0;
      })
    );
    if (surveyData.fields.length) {
      surveyData.fields.forEach((item, index) => {
        setCurrentSurvey((oldSurvey) => [...oldSurvey, item]);
      });
      tmiClient.on("message", (channel, tags, message, userstate, self) => {
        console.log('userState' , userstate , tags)
        surveyData.fields.forEach((item, index) => {
          if (message == index + 1) {
            setCounter((counter) => counter + 1);
            setPercents((oldPercents) =>
              oldPercents.map((current, currentIndex) => {
                return currentIndex == index ? current + 1 : current;
              })
            );
            setUsername(tags.username);
          }
        });
      });
    }
  }, []);

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
            <div>{field.name}</div>
            <div>
              {counter > 0
                ? ((percents[index] / counter) * 100).toFixed(0) + "%"
                : ""}
            </div>
          </div>
        ))}
      </div>
      <div> {counter > 0 ? username : ""}</div>
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
