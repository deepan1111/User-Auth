import { Client, Account ,Storage } from "appwrite";

const client = new Client();

// Replace these placeholders with your actual Appwrite project details
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite Endpoint
  .setProject("6765404000114b7fbb40"); // Your Project ID

const account = new Account(client);
const storage = new Storage(client);
export { client, account ,storage };