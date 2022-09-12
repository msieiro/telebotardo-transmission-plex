require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api')
const Transmission = require('transmission')

const token = process.env.API_TOKEN || ''

const transmission = new Transmission({
    port: process.env.TRANSMISSION_PORT || "",
    host: process.env.TRANSMISSION_HOST || "",
    username: 'admin',
    password: 'admin'
})
const bot = new TelegramBot(token, { polling: true, interval: 2000 })


function getTransmissionInstance() {
    try {
        console.info("Starting transmission instance")
        if (transmission) return transmission
        else return new Transmission({
            port: process.env.TRANSMISSION_PORT || "",
            host: process.env.TRANSMISSION_HOST || "",
            username: 'admin',
            password: 'admin'
        })
    } catch (_) {
        console.error("Error creating transmission instance")
    }
}

function getBotInstance() {
    try {
        console.info("Starting bot instance")
        if (bot) return bot
        else return new TelegramBot(token, { polling: true, interval: 2000 })
    } catch (_) {
        console.error("Error creating bot instance")
    }
}


module.exports = { getTransmissionInstance, getBotInstance }
