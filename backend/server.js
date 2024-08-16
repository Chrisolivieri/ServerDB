import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import authorRoutes from "./routes/authorRoutes.js";
import cors from "cors";
import blogPostRoutes from "./routes/blogPostsRoutes.js";

const port = process.env.PORT || 5000;
const server = express();

await mongoose
  .connect(process.env.MONGODB_CONNECTION_URI)
  .then(() => {
    console.log("Conessione al db riuscita");
  })
  .catch((err) => {
    console.log(err);
  });

// dobbiamo dire al server di usare quelle rotte su routes
// stiamo dicendo ad express di prendere quello che arriva nel body e trasformarlo in json
server.use(express.json());

// cors è una sicurezza del browser che dice di non rispondere ai domini diversi dal tuo in questo caso non gli diamo nessuna porta specifica, quindi risponde sempre
// prima di fare le rotte
// connette il backend al frontend
server.use(cors());


// dobbiamo dire al server di usare quelle rotte su routes
//per ogni file di rotte dobbiamo avere un server.use
server.use("/authors", authorRoutes);
server.use("/blogPosts", blogPostRoutes)



server.listen(port, () => {
  console.log(`Il server sta funzionando nella porta ${port}`);
});
