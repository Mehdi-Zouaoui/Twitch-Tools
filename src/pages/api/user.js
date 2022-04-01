import dbConnect from "../../utils/dbConnect";
const UserSchema = require("../../schemas/user_schema");
dbConnect();

const user = async (req, res) => {
  if (req.method === "POST") {
    console.log('post' , req.body)
    const item = new UserSchema({
      userId: req.body.sub,
      interactionTools: {
        surveys: [],
      },
      displayTools : {
          counters : [],
          timers : []
      },
      games : {}
      
    });
    res.json(item);
    item.save(function (err) {
      if (err) console.log(err);
    });
  }

  if (req.method === "GET") {
    UserSchema.find({}, (err, users) => {
      if (err) {
        res.send("Something went wrong");
        next();
      } else res.status(200).json(users);
    });
  }
};
export default user;