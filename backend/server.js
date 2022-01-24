// importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher'
import cors from 'cors'

// app config
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1324421",
    key: "52015e15ff268b3ad92a",
    secret: "08d0f599ce56cb6f967b",
    cluster: "eu",
    useTLS: true
});

// middleware
app.use(express.json()) // to properly parse JSON
app.use(cors());

// DB config
const connection_url = 'mongodb+srv://admin:N62kyf1hJEf24rHw@cluster0.xld6v.mongodb.net/whatsappdb?retryWrites=true&w=majority'

mongoose.connect(connection_url)

const db = mongoose.connection;

db.once('open', () => {
    console.log('DB connected');

    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log('A Change occured', change);

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', 
                {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    received: messageDetails.received
                }
            );
        } else {
            console.log('Error triggering Pusher')
        }
    });
});

// api routes
app.get('/', (req, res) => res.status(200).send('hello world'));

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data) // success is 200: downloading, not creating data on server.
        }
    });
});

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;
    
    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data) // success is 201: created data on server.
        }
    });
});

// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));