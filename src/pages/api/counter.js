import dbConnect from "../../utils/dbConnect";
const CounterSchema = require("../../schemas/counter_schema");
dbConnect();

const counter = async (req, res) => {

  if (req.method === "POST") {
    const item = new CounterSchema({
      title: req.body.title,
      color: req.body.color,
      author: req.body.author,
    });
    res.json(item);
    item.save(function (err) {
      if (err) console.log(err);
    });
  }

  if (req.method === "GET") {
    CounterSchema.find({}, (err, counters) => {
      if (err) {
        res.send("Something went wrong");
        next();
      } else res.status(200).json(counters);
    });
  }

};
export default counter;

