import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';

import Issue from './models/Issue'

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

// mongoose.connect('');

// const connection = mongoose.connection;

// connection.once('open', () => {
//     console.log('MongoDB database connection extablished successfully');
// });

router.route('/issues').get((req, res) => {
    Issue.find((err, issues) => {
        if (err)
            console.log(err);
        else
            res.json(issues);
    });
});

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));