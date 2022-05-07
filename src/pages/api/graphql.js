import { gql, ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
import dbConnect from "../../utils/dbConnect";
const CounterSchema = require("../../schemas/counter_schema");
const SondageSchema = require("../../schemas/sondage_schema");
const TimerSchema = require("../../schemas/timer_schema");
dbConnect();

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
    defaultValue: String
    values: Int
  }
  type Query {
    getCounters: [Counter]
    getSurveys: [Survey]
    getTimers: [Timer]
  }

  input CounterInput {
    author: String
    color: String
    isStreamed: Boolean
    title: String
    value: Int
  }

  type Mutation {
    createCounter(counter: CounterInput): Counter
    deleteCounter(id: ID!): String
    updateCounter(id: ID!, input: CounterInput): Counter

  }
`;

const resolvers = {
  Query: {
    getCounters: async () => {
      return await CounterSchema.find();
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
      let counter = await CounterSchema.findById(id)

      if (!counter) {
        throw new Error('Product not found')
      }

      counter = await CounterSchema.findOneAndUpdate({ _id: id }, input, {
        new: true,
      })

      return counter
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
