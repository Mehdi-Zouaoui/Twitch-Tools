import mongoose from "mongoose";
import { pusher } from "./pusher";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
  }
  const status = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = status.connections[0].readyState;

  const client = mongoose.connection.client;
  console.log("trying to connect");
  const db = client.db("myFirstDatabase");
  const collection = db.collection("counters");
  const changeStream = collection.watch();
  changeStream.on("change", (next) => {
    console.log("changes appared", next);
    if (next.operationType === "update") {
      pusher.trigger("browserSource", "counterUpdated", {
        itemId: next.documentKey,
        updatedFields: next.updateDescription.updatedFields,
      });
    }
    if (next.operationType === "insert") {
      pusher.trigger("browserSource", "counterAdded", {
        itemId: next.documentKey,
        fullDocument: next.fullDocument,
      });
    }
    if (next.operationType === "delete") {
      pusher.trigger("browserSource", "counterDeleted", next.documentKey._id);
    }
  });
}
export default dbConnect;
