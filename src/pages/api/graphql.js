import { gql, ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
import dbConnect from "../../utils/dbConnect";
const CounterSchema = require("../../schemas/counter_schema");
const SondageSchema = require("../../schemas/sondage_schema");
const TimerSchema = require("../../schemas/timer_schema");

const typeDefs = gql`
  type Counter {
    id: String
    author: String
    color: String
    isStreamed: Boolean
    title: String
    value: Int
  }
  type Field {
    name: String
    percent: String
  }
  type Survey {
    id: String
    title: String
    fields: [Field]
    author: String
    index: String
    color: String
  }

  type Timer {
    id: String
    title: String
    color: String
    author: String
    format: String
    display: String
    type: Boolean
    defaultValue: Int
    values: Int
  }

  input CounterInput {
    author: String
    color: String
    isStreamed: Boolean
    title: String
    value: Int
  }

  input TimerInput {
    title: String
    color: String
    author: String
    format: String
    display: String
    type: Boolean
    defaultValue: Int
    values: Int
  }

  input FieldInput {
    name: String
    percent: String
  }
  input SurveyInput {
    title: String
    fields: [FieldInput]
    author: String
    index: String
    color: String
  }
  type Query {
    getCounters: [Counter]
    getCounterById(id: String!): Counter
    getSurveys: [Survey]
    getTimers: [Timer]
  }

  type Mutation {
    createCounter(counter: CounterInput): Counter
    deleteCounter(id: String!): String
    updateCounter(id: String!, input: CounterInput): Counter
    createTimer(timer: TimerInput): Timer
    deleteTimer(id: String!): String
    updateTimer(id: String!, input: TimerInput): Timer
    createSurvey(survey: SurveyInput): Survey
    deleteSurvey(id: String!): String
    updateSurvey(id: String!, input: SurveyInput): Survey
  }
`;

const resolvers = {
  Query: {
    getCounters: async () => {
      return await CounterSchema.find();
    },
    getCounterById: async (parent, { id }, context) => {
      return await CounterSchema.findById(id);
    },
    getSurveys: async () => {
      return await SondageSchema.find();
    },
    getTimers: async () => {
      return await TimerSchema.find();
    },
  },
  Mutation: {
    createCounter: async (parent, args, context) => {
      const { author, color, isStreamed, title, value } = args.counter;
      const counter = new CounterSchema({
        author,
        color,
        isStreamed,
        title,
        value,
      });
      await counter.save();
      return counter;
    },
    deleteCounter: async (_, { id }) => {
      const counter = await CounterSchema.findById(id);

      if (!counter) {
        throw new Error("Counter not found");
      }

      await CounterSchema.findOneAndDelete({ _id: id });

      return "Your counter has been deleted";
    },
    updateCounter: async (_, { id, input }) => {
      let counter = await CounterSchema.findById(id);

      if (!counter) {
        throw new Error("Counter for foun", id, input);
      }

      counter = await CounterSchema.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });

      return counter;
    },
    createTimer: async (parent, args, context) => {
      const {
        title,
        color,
        author,
        format,
        display,
        type,
        defaultValue,
        values,
      } = args.timer;
      const timer = new TimerSchema({
        title,
        color,
        author,
        format,
        display,
        type,
        defaultValue,
        values,
      });
      await timer.save();
      return timer;
    },

    deleteTimer: async (_, { id }) => {
      const timer = await TimerSchema.findById(id);

      if (!timer) {
        throw new Error("Timer not found");
      }

      await TimerSchema.findOneAndDelete({ _id: id });

      return "Your timer has been deleted";
    },

    updateTimer: async (_, { id, input }) => {
      let timer = await TimerSchema.findById(id);

      if (!timer) {
        throw new Error("Timer not found", id, input);
      }
      console.log(timer);
      timer = await TimerSchema.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });

      return timer;
    },
    createSurvey: async (parent, args, context) => {
      const { title, fields, author, index, color } = args.survey;
      const survey = new SondageSchema({
        title,
        fields,
        author,
        index,
        color,
      });
      await survey.save();
      return survey;
    },

    deleteSurvey: async (_, { id }) => {
      const survey = await SondageSchema.findById(id);

      if (!survey) {
        throw new Error("Survey not found");
      }

      await SondageSchema.findOneAndDelete({ _id: id });

      return "Your survey has been deleted";
    },
    updateSurvey: async (_, { id, input }) => {
      let survey = await SondageSchema.findById(id);

      if (!survey) {
        throw new Error("Survey not found", id, input);
      }
      console.log(survey);
      survey = await SondageSchema.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });

      return survey;
    },
  },
};

const cors = Cors();

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const startServer = apolloServer.start();

//Demande à Next de ne pas utiliser le middleware
export const config = { api: { bodyParser: false } };

export default cors(async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});
