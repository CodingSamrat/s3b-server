// =================================================================================
// Name         : index.js
// Author       : Sam (Coding Samrat)
// Description  : Root of s3b server
// =================================================================================


import { config as envConfig } from "dotenv";
envConfig()

import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import config from './s3b.config.js'



import ClientFileRouter from './src/routes/client.file.router.js'
import { getVersion } from "./src/libs/version.js";
import { fetchAllBucket } from "./src/constants.js";


// Express Server
const app = express();


// MongoDB:
// if you are using MongoDB then uncomment following lines 
// import { mongodbConfig } from './src/models/mongodb.js'
// mongodbConfig()

fetchAllBucket()

// Parsers...
app.use(cookieParser());
app.use(bodyParser.json({ limit: config.MAX_FILE_SIZE }))


// CORS Setup
app.use(cors({ credentials: true, origin: config.TRUSTED_HOST }));


// Static Dir
app.use(express.static('./public'));
app.use(express.static(config.CLOUD_BASE_PATH));




// API Routes

app.use(`${config.API_BASE}/client/file`, ClientFileRouter);








app.listen(config.PORT, async () => {
    console.log('')
    console.log('s3b-server')
    console.log('version -', await getVersion())
    console.log("-------------------------------------")
    console.log(`\n⚙️  Server is up & running on http://localhost:${config.PORT} ✓`)
})

