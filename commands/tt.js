const Discord = require("discord.js");
const getTimeTable = require("../sevices/getTimeTable");

module.exports = {
    name: "tt",
    execute(message, args) {
        getTimeTable((day, data) => {
            embedMessage = new Discord.MessageEmbed()
                .setTitle(day)
                .setDescription(data);
            message.channel.send(embedMessage);
        });
    },
};