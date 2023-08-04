
const { createClient } =require('redis') ;

const client = createClient({
    password: 'a5s5JZt8aQSbTDBUbOXtk6L6v1Pv2dRm',
    socket: {
        host: 'redis-19854.c305.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 19854
    }
});

client.on('error', (err) => console.log(err.message));
(async () => await client.connect())()
client.on('ready', () => console.log('Redis client connected'));

module.exports = { client }