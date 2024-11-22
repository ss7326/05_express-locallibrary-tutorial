// https://github.com/mongodb-developer/nodejs-quickstart/blob/master/connection.js

const Book = require("../models/book");

var mongoose = require("mongoose");

async function main() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = "mongodb://localhost:27017/";

  /**
   * The Mongo Client you will use to interact with your database
   * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
   * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
   * pass option { useUnifiedTopology: true } to the MongoClient constructor.
   * const client =  new MongoClient(uri, {useUnifiedTopology: true})
   */

  try {
    // Mongooseで接続
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Mongoose接続成功");
    await listDatabases();
    await getCntBooks();
  } catch (e) {
    console.error(e);
  } finally {
    // Close the connection to the MongoDB cluster
    await mongoose.connection.close();
  }
}

main().catch(console.error);

async function listDatabases() {
  // mongooseを使用してデータベース一覧を取得
  const connection = mongoose.connection;
  const admin = connection.db.admin();
  const databasesList = await admin.listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function getCntBooks(params) {
  const cnt = await Book.countDocuments({}).exec();
  console.log("books cnt:", cnt);
}
