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

mongoose.connect(
    'mongodb://author:' +
    '1234cycle' + 
    '@cluster0-shard-00-00-xhdtb.mongodb.net:27017,cluster0-shard-00-01-xhdtb.mongodb.net:27017,cluster0-shard-00-02-xhdtb.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
    {
        useNewUrlParser: true
    }
);

router.route('/issues').get((req, res) => {
    Issue.find((err, issues) => {
        if (err)
            console.log(err);
        else
            res.json(issues);
    });
});

router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err)
            console.log(err);
        else 
            res.json(issue);
    });
});

router.route('/issues/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added successfully'})
        })
        .catch(err => {
            res.status(400).send('Failed to create a new record')
        });
});


app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));