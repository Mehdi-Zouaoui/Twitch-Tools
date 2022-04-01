// import dbConnect from "../../utils/dbConnect";
// import { hash } from "bcrypt";
// const UserSchema = require('../../schemas/user_schema')
// dbConnect();

// const signup = async (req, res) => {
  
//   if (req.method === "POST") {
//     hash(req.body.password, 10, async function (err, hash) {
//       // Store hash in your password DB.
//       const user = {
//         "name" : req.body.name,
//         "email": req.body.email,
//         "password" :  hash
//       }
      
//       await new UserSchema(user).save()
//     });
//   } else {
//     res.status(405).json({ message: "We only support POST"});
//   }
// };
// export default signup