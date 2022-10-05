const request = require('request')


exports.notifyBooking = (msg) => {
    request({
        uri: 'https://notify-api.line.me/api/notify',
        method: 'POST',
        auth: {
            bearer:'DZBffNxRcznraw5zy1yGx56qIR7x4FYxQQkaGEnOA6C'
        },
        form:{
            message: msg
        }
    })
}