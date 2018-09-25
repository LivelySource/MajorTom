const { version } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

// ---
//
// command: stats(client, message, args)
//
// Logs information about the bot.
//
// --
//
// Parameters
//
// - client (Discord.Client()) : The main
// bot client, allows us to communicate
// with Discord's API.
//
// - message (Message) : Represents a message on Discord.
//
// - args (Array) : An array containing arguments
// called by the message's author.
//
// --
//
// Example
//
//  => a!stats
//
// ---

exports.run = async (client, message, args) => {
 const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
 message.channel.send(`= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.users.size.toLocaleString()}
• Servers    :: ${client.guilds.size.toLocaleString()}
• Channels   :: ${client.channels.size.toLocaleString()}
• Discord.js :: v${version}
• Node       :: ${process.version}`, {code: 'asciidoc'});
};

// Provides useful information about this command.
exports.help = {
 name: 'stats',
 category: 'info',
 description: 'Gives some useful bot statistics.',
 usage: 'a!stats'
};

// Provides configeration use for
// this commands, like useful properties such
// as permission levels.
exports.config = {
 permissionLevel: 0,
 requiredRole: "Guests",
 guildOnly: false
};
