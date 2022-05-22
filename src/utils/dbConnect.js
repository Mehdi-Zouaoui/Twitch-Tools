import mongoose from "mongoose";
import { pusher } from "./pusher";

async function dbConnect() {
  if (mongoose.connections[0].readyState) {
    console.log("Connected Already");
    return;
  } else {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const client = mongoose.connection.client;
  
    const db = client.db("myFirstDatabase");
    const collection = db.collection("counters");
    const surveyCollection = db.collection("sondages");
    const changeStream = collection.watch();
    const surveyChangeStream = surveyCollection.watch();

    changeStream.on("change", (next) => {
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

    surveyChangeStream.on("change", (next) => {
      console.log("changes appared", next);
      if (next.operationType === "update") {
        pusher.trigger("browserSource", "surveyUpdated", {
          itemId: next.documentKey,
          updatedFields: next.updateDescription.updatedFields,
        });
      }
      // if (next.operationType === "insert") {
      //   pusher.trigger("browserSource", "surveyAdded", {
      //     itemId: next.documentKey,
      //     fullDocument: next.fullDocument,
      //   });
      // }
      // if (next.operationType === "delete") {
      //   pusher.trigger("browserSource", "surveyDeleted", next.documentKey._id);
      // }
    });
  }
}
export default dbConnect;
