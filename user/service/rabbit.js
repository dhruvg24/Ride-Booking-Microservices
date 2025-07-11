const amqp = require('amqplib')
const RABBITMQ_URL=process.env.RABBITMQ_URL

let connection, channel;

async function connect(){
    connection = await amqp.connect(RABBITMQ_URL)
    channel = await connection.createChannel()
    console.log('connected to rabbitMQ')
}

async function subscribeToQueue(queueName, callback){
    if(!channel){
        await connect()
    }
    await channel.assertQueue(queueName)
    channel.consume(queueName,(message)=>{
        callback(message.content.toString());
        channel.ack(message);
    });
}

async function publishToQueue(queueName, data){
    if(!channel){
        await connect();
    }
    await channel.assertQueue(queueName)

    channel.sendToQueue(queueName, Buffer.from(data),{persistent:true})
}

module.exports={
    subscribeToQueue,publishToQueue,connect
}