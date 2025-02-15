const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


//QRkc1L5V3IG3RmT0
const uri = "mongodb+srv://shawonrezasr81:QRkc1L5V3IG3RmT0@cluster0.qgd6b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const database = client.db("UserDB");
    const haiku = database.collection("users");


    app.get('/users',async(req,res)=>{
      const cursor = haiku.find();
      const result= await cursor.toArray();
      res.send(result);
    })

    app.get('/users/updates/:id',async(req,res)=>{
      const id= req.params.id
      console.log("Updated id ",id);

      const query = { _id: new ObjectId(id) }
      const result = await haiku.findOne(query);
      console.log(result);
      res.send(result)

    })

    app.post('/users', async(req, res) => {
     const user= req.body;
     console.log("New user ",user);
     const result = await haiku.insertOne(user);
     res.send(result)
    })

    app.put('/users/updates/:id',async(req,res)=>{
      const updateddetails= req.body;
      const id= req.params.id
      console.log("Detalssssssssssss",updateddetails);

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          name: updateddetails.name
        },
      };

      const result = await haiku.updateOne(filter, updateDoc, options);

    })

    app.delete('/users/:id',async(req,res)=>{
      const id= req.params.id
      console.log("Dlelete",id);
      const query = { _id: new ObjectId(id) };
      const result = await haiku.deleteOne(query);
      res.send(result)
    })

  }


  finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);








app.get('/', (req, res) => {
  res.send("Simple Client Side");
})

app.listen(port, () => {
  console.log("server is running on port ", port);
})