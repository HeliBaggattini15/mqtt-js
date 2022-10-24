const postgres = require('../mqtt/controller/postgres')
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://test.mosquitto.org')

postgres.connect();
var state = '';
var connected = false;

client.on('connect', () => {
    client.subscribe('proj/atomic/dev/heli/desc');
    client.subscribe('proj/atomic/dev/heli/pwr');
    client.subscribe('proj/atomic/dev/heli/mode');
})

client.on('message', (topic, message) => {
    switch (topic) {
        case 'proj/atomic/dev/heli/desc':
            return handleConnected(message);
        case 'proj/atomic/dev/heli/pwr':
            return handlePwrState(message);
        case 'proj/atomic/dev/heli/mode':
            return handleMode(message);
    }
    console.log('No handler for topic %s', topic);
})

function handleConnected(message) {
    console.log('%s conected', message);
    connected = (message.toString() === 'true');
    helper.default().insertData();
}

function handlePwrState(message) {
    state = message;
    console.log('Power updated to %s', message);
}

function handleMode(message) {
    console.log('Mode Changed to %s', message);
    connected = (message.toString() === 'true');
}

postgres.query('insert into Persons values (2,\'helimas\'); ')