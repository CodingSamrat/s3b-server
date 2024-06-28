# s3b-server
s3b-server is a robust and flexible server implementation for self-hosted S3 bucket. It provides a streamlined interface for seamless integration, allowing for efficient storage, retrieval, and manipulation of data within self-hosted S3-compatible storage systems. Designed with scalability and performance in mind, s3b-server simplifies the process of handling S3 operations, making it an ideal choice for developers and organizations looking to leverage self-hosted S3 storage solutions.


## Installation

### Clone repository
To install `s3b-server` clone the GitHub repository.
``` bash
git clone https://github.com/CodingSamrat/s3b-server.git
```


### Install server
You need to install the repo as a package, so that you can run commands. In order to do this  run install command. 

``` bash
cd s3b-server
npm i .
```

### Configurations
The `s3b.config.js` file contains all configurations for the server. some configurations needs to be modified. 

 - `HOST_NAME` = Change the HOST_NAME with your actual host name. The client will connect to the bucket through this host name. 
Ex: `https://cdn.example.com` . And it will serve all files over the internet.
 - `CLOUD_BASE_PATH` = This is the physical path on drive, where all files and data will be stored. By default it use `/volume/s3b-server` for _linux_ & `C://s3b-server` for _windows_. Make user user has permission to CLOUD_BASE_PATH. Safest way is create & give permission to user for CLOUD_BASE_PATH.
   
**Create Directory**
``` bash
sudo mkdir -p /volume/s3b-server
```
   
**Change owner**
``` bash
chown -R username /volume/s3b-server # change username
```
Now you are good to go. Go through all other properties as well.






## Run server
You can run the server now, by command `npm start`. The server will boot up on `http://localhost:8800`. 

``` bash
npm start 

# or use pm2
npm install pm2 -g
pm2 start index.js
```



## CLI Admin Panel
s3b-server has a beautiful CLI Admin panel. Where you can create or manage Buckets and Users. To access the CLI Admin Panel a Admin User is needed. So create the Amin user first. 


#### Create Admin User
After running server to create Admin User open another terminal on the same directory, and run:

``` bash
s3b-server create-admin-user
```

Now you can login to the CLI Admin Panel. run:
``` bash
s3b-server admin
```




## Client integration
To integrate client app create a Bucket/Project from the CLI Admin Panel. It will give you all secret keys required to integrate client.

Now visit [s3b npm package](https://www.npmjs.com/package/s3b) to install the package. And go through it. 





## Contributing
Thank you for investing your time in contributing to our project! Whether it's a bug report, new feature, correction, or additional documentation, we greatly value feedback and contributions from our community. Any contribution you make will be reflected on `github.com/CodingSamrat/s3b-server`.

Contributions to _s3b-server_ are welcome! Here's how to get started:

- Open an [issue](https://github.com/CodingSamrat/s3b-server/issues) or find for related issues to start a discussion around a feature idea or a bug.
- Fork the [repository](https://github.com/CodingSamrat/s3b-server) on GitHub.
- Create a new branch of the master branch and start making your changes.
- Make a meaning-full commit.
- Write a test, which shows that the bug is fixed or the feature works as expected.
- Send a pull request and wait until it gets merged and published.