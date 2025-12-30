const { MongoClient } = require("mongodb");

const dbURL =
  "mongodb+srv://roshanonclick_db_user:0QZ47irfn3BL7O1S@hrm.udr45iv.mongodb.net/?appName=HRM";

const client = new MongoClient(dbURL);

const dbName = "HRM";

async function main() {
  await client.connect();
  console.log("connected to db");

  const db = client.db(dbName);
  const Createdata = { employee: "Naman", status: true };
  const Deletedata = { employee: "Suraj" };

  const collection = db.collection("Employee");

  //CREATE
  const insertResult = await collection.insertOne(Createdata);
  console.log("Inserted documents =>", insertResult);

  //DELETE
  const deleteResult = await collection.deleteOne(Deletedata);
  console.log("Deleted documents =>", deleteResult);

  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);
  return "done";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
