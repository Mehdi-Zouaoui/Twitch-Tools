const CounterSchema = require("../../../schemas/counter_schema");

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  if (method === "DELETE") {
    try {
      await CounterSchema.deleteOne({ _id: id });
      res.status(200).json({ success: "Your counter as been deleted" });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  }
  if (method === "PUT") {
    try {
      
      const counter = await CounterSchema.findByIdAndUpdate( id , req.body , {
          new: true,
          runValidators: true
      });
      res.status(200).json({ success: "Your counter as been updated", data : counter});
    } catch (err) {
      res.status(400).json({ success: false });
    }
  }
};
