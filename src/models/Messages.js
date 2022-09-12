const TransmissionSuccessResponse = {
    SUCCESS_ADD_TORRENT: "Torrent added successfully",
}

const TransmissionErrorResponse = {
    FAIL_ADD_TORRENT: "An error occurred adding the torrent",
    FAIL_FETCH_TORRENTS: "An error occurred fetching torrents",
    FAIL_CHECK_FREE_SPACE: "An error occurred checking the disk free space",
}

const BotErrorResponse = {
    MALFORMED_URL: "The url is incorrect",
}

const BotSuccessResponse = {
    NO_CURRENT_DOWNLOADS: "No current downloads",
}

module.exports = {
    TransmissionSuccessResponse,
    TransmissionErrorResponse,
    BotErrorResponse,
    BotSuccessResponse,
}
