const Discord = require('discord.js');
const schedule = require('node-schedule');
const { embedMessage } = require('./sevices/misc');
const getTimeTable = require('./sevices/getTimeTable');
const Reminder = require('./sevices/Reminder');
const fs = require('fs');
const { time } = require('console');
require('dotenv').config();

const client = new Discord.Client();

const prefix = process.env.PREFIX;

client.once("ready", () => {
    console.log('Ready for some action.');
    console.log('Scheduling to send the time table at 6.30 AM everyday.');
    let job = schedule.scheduleJob('timetable', '30 6,21 * * 1-5', function() {
      let date = new Date();
      let nextDay = 0;
      if (date.getHours() > 18) nextDay = 1;
      getTimeTable(nextDay, (day, data) => {
        client.channels.cache.get('741443367111753820')
          .send(new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(day)
            .setDescription(data)
        )});
    });
    schedule.scheduleJob('tt-sat', '30 21 * * 0', () => {
      getTimeTable(1, (day, data) => {
        client.channels.cache.get('741443367111753820')
          .send(new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(day)
            .setDescription(data))
      });
    });
});

client.on("message", async function(message) {
  
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (message.author.id === "707528865240711188") {
    message.reply('Oom*ikko..');
    return;
  }
  
  if (command == 'tt') {
    let d = new Date();
    let nextDay = 0;
    if (d.getHours() > 17) {
      if (d.getDay() >= 5) nextDay = d.getDay() % 5 + 3;
      else nextDay = 1;
    }
    getTimeTable(nextDay, (day, data) => {
      embedMessage(message.channel, day, data);
    });
  }

  
  else if (command == 'remind') {
    if (!message.member.roles.cache.has(message.guild.roles.cache.get('739449134456766464').id)) {
      message.reply('OMKV...');
      return;
    }
    Reminder.validate(args, (data, err) => {
      if (err) {
        embedMessage(message.channel, 'Incorrect format!', 'Use \`;remind at <HH:MM> <AM/PM> on <#channel> <reminder message>\`');
        return;
      }
      Reminder.set(client, data);
    });
  }
  
  
  else if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.channel.send(`Pong. Latency: ${timeTaken}ms`);
  }

  else if (command == "test") {
    console.log(message.author.id);
  }

  else if (command == "omkv") {
    if (args.length < 1 || args[0] !== '<@!707528865240711188>') {
      return;
    }
    message.channel.send(`<@!707528865240711188>, Odikko Kandam Vazhi`)
  }

  else {
    message.reply('SSD MSM mwonuseeee....');
  }
  
  // else if (command == 'check') {
  //   let d = new Date();
  //   d.setMinutes(25);
  //   let j = schedule.scheduleJob('test', d, (fireDate) => {
  //     embedMessage(message.channel, 'Yo peeps!');
  //     schedule.scheduledJobs.test.cancel();
  //     console.log(schedule.scheduledJobs);
  //   })
  //   // console.log(args[0].substring(2, args[0].length - 1));
  //   // client.channels.cache.get(args[0]).send('check');
  // }

  // else if (command == 'jobs') {
  //   console.log(schedule.scheduledJobs['test']);
  // }

  // else{
  //   d = new Date();
  //   console.log(d.toTimeString());
  //   embedMessage(message.channel, command);
  // }
});

client.login(process.env.BOT_TOKEN);

// TODO:

// 1. Regex for string parsing(reminder)
//         time parsing 12 hr and 24 hr
//         [at <time>/in <time> [on <channel] <reminder>] 
// 2. SQLite3 db for persistence.
//         Associated startup method to schedule jobs.
// 3. Refactor code a bit.
// 4. Get reminders in a server.
// 5. Independent data handling between servers.
// 6. Easy adding links for courses. One time and every time. Command only for admin and moderator.
// 7. Generate time table from db. Also send associated links if available in db.