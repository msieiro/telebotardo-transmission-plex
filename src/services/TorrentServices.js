const { getTransmissionInstance } = require('../config/Instances')

const transmission = getTransmissionInstance()

function getAllActiveTorrents() {
    const activeTorrents = []
    transmission.active(function (err, result) {
        if (err) {
            console.log(err)
            return err
        }
        else {
            for (let i = 0; i < result.torrents.length; i++) {
                activeTorrents.push({ id: result.torrents[i].id, name: result.torrents[i].name })
                console.log({ id: result.torrents[i].id, name: result.torrents[i].name })
            }
        }
    })
    return activeTorrents
}

function addTorrentToTransmission(url) {
    return transmission.addUrl(url, function (err, arg) {
        if (err) {
            console.error(err)
            return "An error occurred adding the torrent"
        } else {
            return "Torrent added successfully"
        }
    })
}

module.exports = { getAllActiveTorrents, addTorrentToTransmission }
