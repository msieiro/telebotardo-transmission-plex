const { getTransmissionInstance } = require('../config/Instances')
const { TransmissionErrorResponse, TransmissionSuccessResponse, BotSuccessResponse } = require('../models/Messages')

const transmission = getTransmissionInstance()

const DOWNLOADS_DIR = "/downloads/complete"

function getStatusType(type) {
    return transmission.statusArray[type]
}

function getAllActiveTorrents(chatId, bot) {
    transmission.active(function (err, result) {
        const activeTorrents = []
        if (err) {
            console.error(JSON.stringify(err))
            bot.sendMessage(chatId, TransmissionErrorResponse.FAIL_FETCH_TORRENTS)
        }
        else {
            if (result && result.torrents && result.torrents.length > 0) {
                for (let i = 0; i < result.torrents.length; i++) {
                    console.info({
                        id: result.torrents[i].id,
                        name: result.torrents[i].name,
                        completed: result.torrents[i].percentDone * 100,
                        eta: result.torrents[i].eta / 3600,
                        status: getStatusType(result.torrents[i].status)
                    })
                    activeTorrents.push({
                        id: result.torrents[i].id,
                        name: result.torrents[i].name,
                        completed: result.torrents[i].percentDone * 100,
                        eta: result.torrents[i].eta / 3600,
                        status: getStatusType(result.torrents[i].status)
                    })
                }
                /* TODO: Prettify results response */
                bot.sendMessage(chatId, JSON.stringify(activeTorrents))
            } else {
                bot.sendMessage(chatId, BotSuccessResponse.NO_CURRENT_DOWNLOADS)
            }
        }
    })
}

function addTorrentToTransmission(chatId, bot, url) {
    transmission.addUrl(url, function (err, arg) {
        if (err) {
            console.error(JSON.stringify(err))
            bot.sendMessage(chatId, TransmissionErrorResponse.FAIL_ADD_TORRENT)
        } else {
            bot.sendMessage(chatId, TransmissionSuccessResponse.SUCCESS_ADD_TORRENT)
        }
    })
}

/* 🚧 *· Rename* NOT WORKING 🚧 */
function renameTorrentById(chatId, bot, id, fileName) {
    transmission.rename(id, DOWNLOADS_DIR, fileName, function (err, arg) {
        if (err) {
            console.error(JSON.stringify(err))
            bot.sendMessage(chatId, "Fail to rename torrent with id: " + id)
        } else {
            bot.sendMessage(chatId, "Successfully renamed torrent")
        }
    })
}


function getFreeDiskSpace(chatId, bot) {
    transmission.freeSpace(DOWNLOADS_DIR, function (err, arg) {
        if (err) {
            console.error(JSON.stringify(err))
            bot.sendMessage(chatId, TransmissionErrorResponse.FAIL_CHECK_FREE_SPACE)
        } else {
            bot.sendMessage(chatId, `Disk space: ${arg["size-bytes"] / 1_000_000_000} gigabytes free`)
        }
    })
}

module.exports = {
    getAllActiveTorrents,
    addTorrentToTransmission,
    getFreeDiskSpace,
    renameTorrentById
}
