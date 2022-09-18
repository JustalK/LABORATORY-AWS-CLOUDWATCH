const winston = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

const cloudwatchConfig = {
  logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
  logStreamName: `${process.env.CLOUDWATCH_GROUP_NAME}-${process.env.NODE_ENV}`,
  awsOptions: {
    credentials: {
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
    region: process.env.REGION,
  },
  retentionInDays: 30,
  name: 'Test',
  messageFormatter: ({ level, message, additionalInfo }) => {
    const data = additionalInfo
      ? `\nData: ${JSON.stringify(additionalInfo)}`
      : '';

    return `[${level}] ${message}${data}`;
  },
};

logger.add(new WinstonCloudWatch(cloudwatchConfig));
