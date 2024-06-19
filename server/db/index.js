const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/blog_db")
  .then(() => console.log("Connected mongo db"))
  .catch((e) => console.log(e));
