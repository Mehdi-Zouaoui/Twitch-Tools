import dbConnect from "../../utils/dbConnect";
const SondageSchema = require("../../schemas/sondage_schema");
dbConnect();

const sondage = async (req, res) => {

  if (req.method === "POST") {
    const item = new SondageSchema({
      title: req.body.title,
      fields: req.body.fields,
      author: req.body.author,
      index : req.body.index,
      color : req.body.color
    });
    res.json(item);
    item.save(function (err) {
      if (err) console.log(err);
    });
  }

  if (req.method === "GET") {
    SondageSchema.find({}, (err, sondages) => {
      if (err) {
        res.send("Something went wrong");
        next();
      } else res.status(200).json(sondages);
    });
  }
};
export default sondage;

