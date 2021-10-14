import dbConnect from "../../utils/dbConnect";
const SondageSchema = require("../../schemas/sondage_schema");
dbConnect();

const sondage = async (req, res) => {
  if (req.method === "POST") {
    const item = new SondageSchema({
      title: req.body.title,
      fields: req.body.fields,
      author: req.body.author,
    });

    res.json(item);
    item.save(function (err) {
      if (err) console.log(err);
    });
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
};
export default sondage;
