import SNS = require("aws-sdk/clients/sns");

//const {getMotd} = require('/opt/my-layer-code')
const {getMotd} = require('../../MyLayer/my-layer-code')

const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.DB_ADDRESS,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  },
  useNullAsDefault: true,
  pool: { min: 0, max: 7 }
});

export const handler = async (event: any = {}): Promise<any> => {
  const message = 'A Message Happened Dude!';
  console.log(`SNS MESSAGE (${process.env.TOPIC_ARN}): ${message}`);
  const sns = new SNS();
  const params = {
    Message: `${message} ... and that message is ${getMotd()}`,
    Subject: `Hero Data Service Alert (${process.env.TOPIC_ARN})`,
    TopicArn: process.env.TOPIC_ARN
  };

  try {
    await sns.publish(params).promise();
    console.log('SUCCESS sending SNS message');
  } catch (err) {
    console.log('Failure sending SNS message', err.message);
  }

  let sitesVisits: any[] = (await knex.raw('show tables;'));
  console.log(sitesVisits);

  const response = {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: "It is cool"
  }

  return response;
}
