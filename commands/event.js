const Events = require("../services/Events");

// module.exports = {
//     name: "events",
//     async execute(message, args) {
//         const subcmd = args.shift();
//         if (subcmd === "show") {
//             await showEvents(message, args);
//         } else if (subcmd === "delete") {
//             await deleteEvent(message, args);
//         } else if (subcmd === "add") {
//             await addEvent(message, args)
//         } else {
//             const errorMessage = new Discord.MessageEmbed()
//                 .setColor("#0099ff")
//                 .setTitle("Incorrect Usage!")
//                 .setDescription(
//                     "Use `;help events` to see usage of `;events` command."
//                 );
//             message.send(errorMessage);
//         }
//     }
// }

// if (command === "events") {
//     if (args[0] === "show") {
//         let eventString = "";
//         Events.getAll(mongoose.connection, (err, docs) => {
//             if (err) {
//                 message.reply("Error getting events. Please try again.");
//                 console.log("[EVENT_SHOW]\n" + err);
//                 return;
//             }
//             EVENT_ROWS = docs;
//             const embed = new Discord.MessageEmbed()
//                 .setColor("#0099ff")
//                 .setTitle("Upcoming Events");
//             let count = 1;
//             if (docs.length === 0) eventString = "No events to show.";
//             docs.forEach((doc) => {
//                 let d = new Date(doc.date);
//                 eventString += `\n\n${count}) **${d.getDate()} ${d.toLocaleDateString(
//                     "default",
//                     { month: "short" }
//                 )}**: ${doc.event_name}`;
//                 count += 1;
//             });
//             embed.setDescription(eventString);
//             message.channel.send(embed);
//         });
//         return;
//     } else if (args[0] == "dm") {
//     } else if (args[0] == "delete") {
//         if (EVENT_ROWS.length == 0 || args.length != 2) {
//             embedMessage(
//                 message.channel,
//                 "Incorrect Use!",
//                 "Use `;events show` and then run `;events delete <index_from_the_events_list>`."
//             );
//             return;
//         }
//         index = parseInt(args[1]);
//         if (!index) {
//             embedMessage(
//                 message.channel,
//                 "Incorrect Use!",
//                 "Use `;events show` and then run `;events delete <index_from_the_events_list>`."
//             );
//             return;
//         }
//         if (index > EVENT_ROWS.length) {
//             embedMessage(
//                 message.channel,
//                 "Invalid Index!",
//                 "Index should be within the given values."
//             );
//             return;
//         }
//         index -= 1;
//         Events.deleteEntry(mongoose.connection, EVENT_ROWS[index], (err) => {
//             if (err) {
//                 message.reply("Error trying to delete event");
//                 console.log("[EVENT_DEL]\n" + err);
//                 return;
//             }
//         });
//         eventString = `\n\`${EVENT_ROWS[index].event_name} on ${new Date(
//             EVENT_ROWS[index].date
//         ).toLocaleDateString()}\``;
//         message.reply("The following event was deleted." + eventString);
//         EVENT_ROWS = [];
//         return;
//     } else if (args[0] == "add") {
//         argString = args.join(" ");
//         let event = Events.parse(argString);
//         if (event.err) {
//             embedMessage(
//                 message.channel,
//                 "Incorrect format!",
//                 'Use `;events add "event" on DD/MM/YY`.'
//             );
//             return;
//         }

//         Events.add(mongoose.connection, event, (err) => {
//             if (err) {
//                 message.reply(
//                     "```\nError encountered when adding event to database." +
//                         "\n" +
//                         err +
//                         "```"
//                 );
//                 console.log("[EVENT_ADD]\n" + err);
//                 return;
//             }
//             message.reply("Event added successfully.");
//         });
//         return;
//     } else {
//         let helpString =
//             "Use `;help events` to see usage of `;events` command.";
//         embedMessage(message.channel, "Incorrect Usage!", helpString);
//         return;
//     }
// }
