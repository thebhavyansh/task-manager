const express = require('express');
const AuthRouter=require('./controllers/Auth');
const BlogRouter=require('./controllers/Tasks');
const UserRouter=require('./controllers/User')


const app = express();
app.use(express.json());

app.use("/auth", AuthRouter);
app.use("/task",BlogRouter)
app.use("/user",UserRouter)

app.listen(8800, () => {
  console.log("Connected...");
});