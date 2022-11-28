const mqtt = require('mqtt');
const { Op } = require("sequelize");
const sequelize = require('../mqtt/database/db');
const users = require('../mqtt/models/users');

const client = mqtt.connect('mqtt://test.mosquitto.org');

const connect = async () => {
    try {
        sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const findUserByCode = async (code) => {
    try {
        return await users.findAll(
            {
                where: {
                    code: {
                        [Op.eq]: code
                    }
                }
            }
        )
    } catch (error) {
        console.error('Unable to search user:', error);
    }
}

const findUserByRFID = async (rfid) => {
    try {
        return await users.findAll(
            {
                where: {
                    rfid: {
                        [Op.eq]: rfid
                    }
                }
            }
        )
    } catch (error) {
        console.error('Unable to search user:', error);
    }
}


connect()

client.on('connect', () => {
    client.subscribe('proj/atomic/dev/heli/desc');
    client.subscribe('proj/atomic/dev/heli/code');
    client.subscribe('proj/atomic/dev/heli/rfid');
})

client.on('message', (topic, message) => {
    switch (topic) {
        case 'proj/atomic/dev/heli/desc':
            return handleConnected(message);
        case 'proj/atomic/dev/heli/code':
            return handleCode(message);
        case 'proj/atomic/dev/heli/rfid':
            return handleRFID(message);
    }
    console.log('No handler for topic %s', topic);
})

function handleConnected(message) {
    console.log('%s conected', message);
}

async function handleCode(message) {
    console.log('code received %s', message);
    const userCode = await findUserByCode(message.toString());
    if (userCode.length === 0) {
        client.publish('proj/atomic/dev/heli/err', `user not found`);
    } else {
        client.publish('proj/atomic/dev/heli/return', `checked user ${userCode[0].username}`);
    }
}

async function handleRFID(message) {
    console.log('rfid received %s', message);
    let userRfid = await findUserByRFID(message.toString());
    if (userRfid.length === 0) {
        client.publish('proj/atomic/dev/heli/err', `user not found`);
    } else {
        client.publish('proj/atomic/dev/heli/return', `checked user ${userRfid[0].username}`);
    }
}