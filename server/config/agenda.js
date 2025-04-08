const Agenda = require('agenda');
const dotenv = require('dotenv');
const { sendEmail } = require('../utils/sendEmail');

dotenv.config();

const agenda = new Agenda({ db: { address: process.env.MONGO_URI, collection: 'agendaJobs' } });

// Define the job
agenda.define('send-email', async (job) => {
  const { to, subject, text } = job.attrs.data;
  await sendEmail(to, subject, text);
});

module.exports = { agenda };
