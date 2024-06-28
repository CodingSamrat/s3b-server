// =================================================================================
// Name         : index.js
// Author       : Sam (Coding Samrat)
// Description  : Root of s3b server
// =================================================================================




import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import config from './s3b.config.js'



import BucketRouter from './src/routes/bucket.router.js'
import ClientFileRouter from './src/routes/client.file.router.js'
import AuthRouter from './src/routes/auth.route.js'

// Express Server
const app = express();


// MongoDB:
// if you are using MongoDB then uncomment following lines 
// import { mongodbConfig } from './src/models/mongodb.js'
// mongodbConfig()


// Parsers...
app.use(cookieParser());
app.use(bodyParser.json({ limit: config.MAX_FILE_SIZE }))


// CORS Setup
app.use(cors({ credentials: true, origin: config.TRUSTED_HOST }));


// Static Dir
app.use(express.static('./public'));
app.use(express.static(config.CLOUD_BASE_PATH));




// API Routes
app.use(`${config.API_BASE}/auth`, AuthRouter);
app.use(`${config.API_BASE}/bucket`, BucketRouter);
app.use(`${config.API_BASE}/client/file`, ClientFileRouter);


// Static Routes
// Home page
app.use(`/`, (req, res) => {
    res.sendFile(path.join(path.resolve('public'), 'template', 'index.html'))
});







app.listen(config.PORT, async () => {
    console.log('=|=======================================|=')
    console.log(' |                    🪴                  |')
    console.log(" |                s3b server             |")
    console.log('=|=======================================|=')
    console.log(`\n⚙️  Server is up & running on ${config.HOST_NAME} ✓`)
})

