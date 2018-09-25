// ---
//
// command: ban(client, message, args)
//
// A fun command where guild members can 'ban'
// other members.
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
//  => a!ban (user)
//
// ---

exports.run = async (client, message, args) => {

 // get an array of the ID's of everyone who was mentioned
 const mentions = message.mentions.members.keyArray();
 // then, check the length of the variable to see if any
 // user was mentioned, if not we inform the author to mention members
 if (!(mentions.length)) return message.reply('please mention a user to get the ban hammer.');

 // iterate through each member who was mentioned
 mentions.forEach((ID) => {

  // we get the settings for the guild because we store settings for
  // members in their in order for settings to be server unique. if
  // the server doesn't have their own settingss we supply a fresh object
  const settings = client.settings.get(message.guild.id) || {};
  // we use their settings to see how many times they've been banned

  // check if the settings have custom settings for the guild member,
  // if not we initialize their settings here
  if (!(ID in settings)) settings[ID] = {};

  // then, we check if their settings have the property 'banCount',
  // we use this property to determine how many times a member has been banned
  if (!(settings[ID].banCount)) settings[ID].banCount = 0;


  // increase the ban count by 1
  settings[ID].banCount += 1;

  // then, humiliate the banned user
  message.channel.send(`<@${message.author.id}> has banned <@${ID}>!`)
  message.channel.send(`<@${ID}> has been banned ${settings[ID].banCount} time(s)!`);;

  // and finally, save the changes
  client.settings.set(message.guild.id, settings);

 });

}

// Provides useful information about this command.
exports.help = {
 name: 'ban',
 category: 'fun',
 description: 'Ban a fellow guild member.',
 usage: 'a!ban (user)'
};

// Provides configeration use fors
// this commands, like useful properties such
// as permission levels.
exports.config = {
 permissionLevel: 0,
 requiredRole: "Guests",
 guildOnly: true
};
