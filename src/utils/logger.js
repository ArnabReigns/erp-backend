const { createLogger, transports, format } = require('winston')
require('winston-mongodb')

const logger = createLogger({
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(format.timestamp({
                format: 'DD.MM.YY-hh:mm a'
            }), format.json())
        }),

        new transports.MongoDB({
            level: 'info',
            db: process.env.MONGOURI,
            options: {
                useUnifiedTopology: true
            },
            collection: 'activity-log',
            format: format.combine(format.timestamp({
                format: 'DD.MM.YY-hh:mm a'
            }), format.json())
        })
    ]
})

module.exports = logger