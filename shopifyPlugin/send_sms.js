const accountSid = 'AC96ffe37f6b9c5170af59cf968ec66816';
const authToken = 'a260941697d141d4bb3de4b06af9bcd3';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Probably one of my old Groupon buddies fucking with me',
     from: '+14806133029',
     to: '+13104694409'
   })
  .then(message => console.log(message.sid));