export const db = (async () => {
    const MongoClient = require('mongodb').MongoClient
    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
    const db = await client.db(process.env.MONGODB_DB);
    return db;
})();
