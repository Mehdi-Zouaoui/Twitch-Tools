import dbConnect from "../../utils/dbConnect";
const TimerSchema = require("../../schemas/timer_schema");
dbConnect();

const timer = async (req, res) => {
  if (req.method === "POST") {
    const item = new TimerSchema({
      title: req.body.title,
      color: req.body.color,
      author: req.body.author,
      format: req.body.format,
      display: req.body.display,
      values : req.body.values,
      type: req.body.type
    });
    res.json(item);
    item.save(function (err) {
      if (err) console.log(err);
    });
  }

  if (req.method === "GET") {
    TimerSchema.find({}, (err, timers) => {
      if (err) {
        res.send("Something went wrong");
        next();
      } else res.status(200).json(timers);
    });
  }
};
export default timer;
