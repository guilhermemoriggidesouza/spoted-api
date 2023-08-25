import * as mongoDB from "mongodb";
import config from "./api/config";

export const collections: { user?: mongoDB.Collection, spoted?: mongoDB.Collection } = {}
export async function connectToDatabase() {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(config.db.uri);
    await client.connect();
    const db: mongoDB.Db = client.db(config.db.name);
    const UserCollection: mongoDB.Collection = db.collection("user");
    const SpotedCollection: mongoDB.Collection = db.collection("spoted");
    collections.user = UserCollection;
    collections.spoted = SpotedCollection;
    collections.spoted?.createIndex({ loc: "2dsphere" }, { sparse: false })
    console.log(`Successfully connected to database: ${db.databaseName}`);
}