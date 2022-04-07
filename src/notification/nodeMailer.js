"use strict";
const nodemailer = require("nodemailer");
const config = require('../../src/config')

// async..await is not allowed in global scope, must use a wrapper
async function main(from, subject, text, html) {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: config.MAILER_US,
            pass: config.MAILER_PW
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: from, // sender address
        to: config.MAILER_ADMIN, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);

module.exports = main;