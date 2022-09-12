const { getBotInstance } = require('./src/config/Instances')
const { addTorrentToTransmission, getAllActiveTorrents } = require('./src/services/TorrentServices')

const bot = getBotInstance()

bot.onText(/\/echo (.+)/, (msg, match) => {
    console.log("User requested /echo")
    const chatId = msg.chat.id
    const response = match[1]
    bot.sendMessage(chatId, response)
})

bot.onText(/\/help/, (msg) => {
    console.log("User requested /help")
    const chatId = msg.chat.id
    const response = `
Commands:
*· Help*
*Use:* /help
*Description:* Shows this menu

*· Echo*
*Use:* /echo message
*Description:* Test the bot's response

*· List*
*Use:* /list
*Description:* Shows the current's downloads

*· Add*
*Use:* /add url
*Description:* Add the torrent to download queue
`
    bot.sendMessage(chatId, response, { parse_mode: "MarkdownV2" })
})

bot.onText(/\/list/, (msg) => {
    console.log("User requested /list")
    const chatId = msg.chat.id
    const response = getAllActiveTorrents()
    if (response && response.length > 0) bot.sendMessage(chatId, response)
    else bot.sendMessage(chatId, "No current downloads")
})

bot.onText(/\/add (.+)/, (msg, match) => {
    console.log("User requested /add")
    const urlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig
    const chatId = msg.chat.id
    const response = match[1]
    if (urlRegex.test(response)) bot.sendMessage(chatId, addTorrentToTransmission(response))
    else bot.sendMessage(chatId, "The url is incorrect")
})
