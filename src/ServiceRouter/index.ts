import SNS = require("aws-sdk/clients/sns");
/*
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.ENDPOINT,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE
  },
  useNullAsDefault: true,
  pool: { min: 0, max: 7 }
});
*/
export const handler = async (event: any = {}): Promise<any> => {
  const message = 'A Message Happened Dude!';
  console.log(`SNS MESSAGE (${process.env.TOPIC_ARN}): ${message}`);
  const sns = new SNS();
  const params = {
    Message: message,
    Subject: `Hero Data Service Alert (${process.env.TOPIC_ARN})`,
    TopicArn: process.env.TOPIC_ARN
  };

  try {
    await sns.publish(params).promise();
    console.log('SUCCESS sending SNS message');
  } catch (err) {
    console.log('Failure sending SNS message', err.message);
  }

  console.log(process.env.DB_ID);
  console.log(process.env.DB_PORT);
  console.log(process.env.DB_ARN);
  console.log(process.env.DB_ADDRESS);
  console.log(process.env.DB_USER);
  console.log(process.env.DB_PASSWORD);
  console.log(process.env.DB_DATABASE)

  // let sitesVisits: any[] = (await knex.raw('show tables;'));
  // console.log(sitesVisits);

  const response = {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: "It is cool"
  }

  return response;
}
