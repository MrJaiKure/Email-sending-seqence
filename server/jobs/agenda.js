const Agenda = require('agenda');
const sendEmail = require('../utils/sendEmail');
const mongoConnectionString = process.env.MONGO_URI;

const agenda = new Agenda({ db: { address: mongoConnectionString } });

agenda.define('send-email', async (job) => {
  const { email, subject, body } = job.attrs.data;
  await sendEmail(email, subject, body);
});

(async function () {
  await agenda.start();
})();

module.exports = agenda;
