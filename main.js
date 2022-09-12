const { getBotInstance } = require('./src/config/Instances')
const { BotErrorResponse, BotSuccessResponse, TransmissionErrorResponse } = require('./src/models/Messages')
const { addTorrentToTransmission, getAllActiveTorrents, getFreeDiskSpace, renameTorrentById } = require('./src/services/TorrentServices')

const bot = getBotInstance()

bot.onText(/\/echo (.+)/, (msg, match) => {
    console.info("User requested /echo")
    const chatId = msg.chat.id
    const response = match[1]
    bot.sendMessage(chatId, response)
})

bot.onText(/\/help/, (msg) => {
    console.info("User requested /help")
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

*· Disk*
*Use:* /disk
*Description:* Shows the current free space in disk

*· Add*
*Use:* /add url
*Description:* Add the torrent to download queue

🚧 *· Rename* NOT WORKING 🚧
*Use:* /rename id fileName
*Description:* Add the torrent to download queue
`
    bot.sendMessage(chatId, response, { parse_mode: "MarkdownV2" })
})

bot.onText(/\/list/, (msg) => {
    console.info("User requested /list")
    const chatId = msg.chat.id
    getAllActiveTorrents(chatId, bot)
})

bot.onText(/\/add (.+)/, (msg, match) => {
    console.info("User requested /add")
    const URL_REGEX = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig
    const chatId = msg.chat.id
    const url = match[1]

    if (URL_REGEX.test(url)) addTorrentToTransmission(chatId, bot, url)
    else bot.sendMessage(chatId, BotErrorResponse.MALFORMED_URL)
})

/* 🚧 *· Rename* NOT WORKING 🚧 */
bot.onText(/\/rename (.+) (.+)/, (msg, match) => {
    console.info("User requested /rename")
    const chatId = msg.chat.id
    const id = match[1]
    const fileName = match[1]

    if (id && fileName) renameTorrentById(chatId, bot, id, fileName)
    else bot.sendMessage(chatId, "Error renombrando torrent")
})

bot.onText(/\/disk/, (msg, match) => {
    console.info("User requested /disk")
    const chatId = msg.chat.id
    getFreeDiskSpace(chatId, bot)
})
