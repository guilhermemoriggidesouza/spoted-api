import * as mongoDB from "mongodb";
import config from "./api/config";

export const collections: { user?: mongoDB.Collection } = {}
export async function connectToDatabase() {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(config.db.uri);
    await client.connect();
    const db: mongoDB.Db = client.db(config.db.name);
    const UserCollection: mongoDB.Collection = db.collection("user");
    collections.user = UserCollection;
    console.log(`Successfully connected to database: ${db.databaseName}`);
}