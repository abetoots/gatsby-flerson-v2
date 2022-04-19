import { MongoClient } from "mongodb";

let client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default client.connect();
