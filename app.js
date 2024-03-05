const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://mqtt.eclipseprojects.io");
console.log('ok');

const pubSensor = '/mqtt/internet_clock_v.4/sensor'
const subSensor = '/mqtt/internet_clock_v.4/log'

const dataSensor = {
    temperature: 0.0,
    humidity: 0.0
}

client.on("connect", () => {
    client.subscribe(subSensor, (err) => {
        if (!err) {
            client.publish(pubSensor, 'OK')
        }
    });
});
    
client.on("message", (topic, message) => {
    console.log(message.toString());
    //client.end();
});

setInterval(() => {
    dataSensor.temperature += 1
    dataSensor.humidity += 1
    client.publish(pubSensor, JSON.stringify(dataSensor))
}, 1000);
    


