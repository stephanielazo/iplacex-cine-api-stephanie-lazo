import { MongoClient, ServerApiVersion } from 'mongodb';


const uri = 'mongodb+srv://ev3_express:iplacex@cluster-express.5gxjq7q.mongodb.net/cine-db?retryWrites=true&w=majority&appName=cluster-express';

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

export default client

