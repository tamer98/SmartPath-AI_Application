const dbName = "path_finderDB";
const dbRef = db.getSiblingDB(dbName);

dbRef.createCollection("dataprompts");

dbRef.users.insertOne({
  name: "Admin User",
  email: "admin@example.com"
});

dbRef.createUser({
  user: "user",
  pwd: "user_pass",
  roles: [
    {
      role: "readWrite",
      db: dbName
    }
  ]
});

print("Database initialized successfully");