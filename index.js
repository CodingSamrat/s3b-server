// =================================================================================
// Name         : index.js
// Author       : Sam (Coding Samrat)
// Description  : Root of s3b server
// =================================================================================




import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import * as config from './s3b.config.js'


import BucketRouter from './src/routes/bucket.router.js'
import FileRouter from './src/routes/file.router.js'
import { response } from './src/libs/response.js'
import AuthRouter from './src/routes/auth.route.js'



// Express Server
const app = express();


// Parsers...
app.use(cookieParser());
app.use(bodyParser.json({ limit: config.MAX_FILE_SIZE }))


// CORS Setup
app.use(cors({ credentials: true, origin: config.TRUSTED_HOST }));


// Static Dir
app.use(express.static('./public'));
app.use(express.static(config.BUCKET_PATH));



// Routes
app.use(`${config.API_BASE}/auth`, AuthRouter);
app.use(`${config.API_BASE}/bucket`, BucketRouter);
app.use(`${config.API_BASE}/file`, FileRouter);


// Home Page
app.get('/', (req, res) => {
    return res.send('Welcome to s3b-server')
})


app.listen(config.PORT, async () => {
    console.log('=|=======================================|=')
    console.log(' |                    🪴                  |')
    console.log(" |                s3b server             |")
    console.log('=|=======================================|=')
    console.log(`\n⚙️  Server is up & running on ${config.HOST_NAME} ✓`)
})

