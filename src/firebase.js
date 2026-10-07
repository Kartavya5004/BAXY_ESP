// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://kartavya22_db_user:5hiCkjUeCL4CeDwG@cluster0.weijjsw.mongodb.net/?appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);




import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBZ-3nKQZs-FNQYrU0Jjn_eh_CmoyvZq9U",
  authDomain: "database-d04fb.firebaseapp.com",
  projectId: "database-d04fb",
  storageBucket: "database-d04fb.firebasestorage.app",
  messagingSenderId: "1086714336972",
  appId: "1:1086714336972:web:4889213e88dca0c8111469",
  measurementId: "G-WTTBYJJXRF"
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
