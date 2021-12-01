const TimerSchema = require("../../../schemas/timer_schema");

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  if (method === "DELETE") {
    try {
      await TimerSchema.deleteOne({ _id: id });
      res.status(200).json({ success: "Your timer as been deleted" });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  }
  if (method === "PUT") {
    try {
      const timer = await TimerSchema.findByIdAndUpdate( id , req.body , {
          new: true,
          runValidators: true
      });
      res.status(200).json({ success: "Your counter as been updated", data : timer});
    } catch (err) {
      res.status(400).json({ success: false });
    }
  }
};
