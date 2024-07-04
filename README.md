# s3b-server
s3b-server is a robust and flexible server implementation for self-hosted S3 bucket. It provides a streamlined interface for seamless integration, allowing for efficient storage, retrieval, and manipulation of data within self-hosted S3-compatible storage systems. Designed with scalability and performance in mind, s3b-server simplifies the process of handling S3 operations, making it an ideal choice for developers and organizations looking to leverage self-hosted S3 storage solutions.


## Installation

``` bash
# Clone the repository
git clone https://github.com/CodingSamrat/s3b-server.git

# Change directory to s3b-server
cd s3b-server

# Run install script
# linux -
bash install.sh

# windows -
install.bat

```


## CLI Admin Panel
s3b-server has a beautiful CLI Admin panel. Where you can create or manage Buckets and Users. An admin user will be created while installation. 



### Configurations
Before running the server open `.env` and replace the `HOST_URL` with your actual host name (Ex: https://cdn.example.com). By default server will be running on localhost 8800 prot. You can use reverse proxy to serve the server.




## Run server
Now run the server using [pm2](https://www.npmjs.com/package/pm2). pm2 will be installed during s3b-server installation.
``` bash
pm2 start index.js -n s3b
```



## CLI Admin Panel
s3b-server has a beautiful CLI Admin panel. Where you can create or manage Buckets and Users. Default login credential is `admin` for both username & password.

To access admin panel, run:
``` bash 
s3b admin admin     # s3b admin <username> 
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