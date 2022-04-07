const twilio = require('twilio');
const config = require('../../src/config');

const accountSid = config.TWILIO_SID
const authToken = config.TWILIO_TK

const client = twilio(accountSid, authToken)

async function mensagge(body, mediaUrl) {
    try {
        client.messages
            .create({
                body: body,
                from: config.NUMBER_SMS,
                to: config.NUMBER_TO_SMS
            })
            .then(message => console.log(message.sid))
            .catch(console.log)

        client.messages
            .create({
                body: body,
                mediaUrl: mediaUrl,
                from: config.NUMBER_WA,
                to: config.NUMBER_TO_WA
            })
            .then(message => console.log(message.sid))
            .done();
    } catch (error) { console.log(error) }
}

module.exports = mensagge