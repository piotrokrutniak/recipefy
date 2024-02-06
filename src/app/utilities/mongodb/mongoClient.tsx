import { Mongoose } from "mongoose";

const connectionString = `mongodb+srv://${process.env.MONGODB_USER}:${encodeURIComponent(process.env.MONGODB_PW ?? "")}@node-rest-recipefy.nzu9cxn.mongodb.net/?retryWrites=true&w=majority`;

const client = new Mongoose();
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

export async function ClientPromise() {
  return await client.connect(connectionString);
}
