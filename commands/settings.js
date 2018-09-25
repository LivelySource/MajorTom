const { inspect } = require("util");

// ---
//
// command: initsettings(client, message, args)
//
// Allows moderators/admins to change settings
// for their guild.
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
// - action (String) : (optional) The action which
// the author wants to execute.
//
// - key (String) : (optional) The name of the setting
// that the author wants to configure.
//
// - value (String) : (optional) If the author wants to
// edit a key in the settings, this parameter will
// represent the new value.
//
// --
//
// Examples
//
//  => a!settings
//  => a!settings edit (key) (value)
//  => a!settings reset (key)
//
// ---

exports.run = async (client, message, [action, key, ...value]) => {

 // get the current settings for this guild
 // if one isn't found, we instead use default settings
 const settings = client.settings.get(message.guild.id) || {settings: client.config.defaultSettings};
 // then, check if the variable has the property to represent settings,
 // if one isn't found we instead supply the default settings
 if (!(settings.settings)) settings.settings = client.config.defaultSettings;


 // if the author wants to edit a key in settings
 if (action === "edit") {

  // check if the author has provided a key to edit
  if (!(key)) return message.reply("please provide a key to edit.");
  // if the author has provided a key to edit, make sure if it's valid
  if (!(settings.settings[key])) return message.reply("please provide a valid key to edit.");
  // check if the author has provided a new value
  if (value.length < 1) return message.reply("please provide a new value.");
  // the author must specifiy a different value
  if (value.join(" ") === settings.settings[key]) return message.reply("this key already has that value!");

  // if all goes well, change the property to the value of the author's choice
  settings.settings[key] = value.join(" ");
  // then save the changes
  client.settings.set(message.guild.id, settings);

  // inform the author that their action is successful
  message.channel.send({embed: {color: 0xff00, title: 'SUCCESS', description: `Successfully changed '${key}' to '${value.join(" ")}'.`}})

 }


 else if (action === "reset") {

 }

 // If the author doesn't provide an action,
 // we simply log the settings.
 else {
  message.channel.send(inspect(settings.settings), {code: "json"});
 }

 // // First, we get the current settings that this
 // // guild currently has. Then, we get the default
 // // settings incase if the author wants to reset a command.
 // const settings = message.settings;
 //
 //
 // // If the author wants to change a certain
 // // property of their guild's settings.
 // if (action === "edit") {
 //  // Check if the author has provided a key to edit.
 //  if (!key) return message.reply("Please specify a key to edit");
 //  // Author must specify a key that actually exists.
 //  if (!settings[key]) return message.reply("This key does not exist in the settings");
 //  // Author must specify a value to change.
 //  if (value.length < 1) return message.reply("Please specify a new value");
 //  // Author must specify a different value than the current one.
 //  if (value.join(" ") === settings[key]) return message.reply("This setting already has that value!");
 //
 //  // If all goes well, we finally change the property to the author's choice.
 //  // Then reply with an embed message saying that the change was a success.
 //  // client.settings.setProp(message.guild.id, key, value.join(" "));
 //  settings[key] = value.join(' ');
 //  client.settings.set(message.guild.id, settings);
 //  message.channel.send({embed: {color: 0xff00, title: 'SUCCESS', description: `Successfully changed '${key}' to '${value.join(" ")}'.`}})
 // } else
 //
 //
 // // If the author wants to reset a certain property from their guild's settings.
 // if (action == "reset") {
 //  // Check if the author has provided a key to reset.
 //  if (!(key)) return message.reply("Please specify a key to reset.");
 //  // Author must specify a key that actually exists.
 //  if (!(settings[key])) return message.reply("This key does not exist in the settings");
 //  // If ythe author wants to reset a key value WHEN the key already has default values.
 //  if (settings[key] === client.config.defaultSettings[key]) return message.reply("This key is already using default values.");
 //
 //
 //  // Since the author wants to reset a property, this can cause major problems.
 //  // So, we want to confirm with the author if they want to proceed.
 //  message.channel.send(`Are you sure you want to reset ${key} to the default value? (respond with ('y'/'yes') to confirm)`)
 //
 //   // listen to this channel for the message's author to confirm/deny his actions
 //   .then(() => message.channel.awaitMessages((response) => response.author.id === message.author.id, {
 //    max: 1,
 //    time: 60000,
 //    errors: ["time"]
 //   }))
 //
 //   // after getting a response, strip the paramters to
 //   // the author's response
 //   .then((content) => {
 //
 //    // get the author's response
 //    let response = content.first().content;
 //
 //    // then, depending on the author's response, do something
 //    // if the author said yes
 //    if (["yes", "y"].includes(response)) {
 //
 //     // reset the value for the key
 //     settings[key] = client.config.defaultSettings[key];
 //     // then, set it to the custom settings for this guild
 //     client.settings.set(message.guild.id, settings);
 //
 //     // inform the author
 //     message.channel.send({embed: {color: 0xff00, title: 'SUCCESS', description: `The key '${key}' has been successfully reset to '${client.config.defaultSettings[key]}'.`}});
 //
 //    }
 //
 //    // if the author cancelled their action
 //    else message.reply("action cancelled.")
 //
 //   })
 //
 //   .catch((error) => message.reply("you failed to answer in 60s."))
 //
 //  // const response = client.awaitReply(message, `Are you sure you want to reset ${key} to the default value? (respond with ('y'/'yes') to confirm)`)
 //  // console.log(1);
 //  // // If the author replys with a 'y' or 'yes', then that
 //  // // means they want to continue.
 //  // console.log(response);
 //  // if (["y", "yes"].includes(response)) {
 //  //  console.log(2);
 //  //  console.log(response);
 //  //  settings[key] = client.config.defaultSettings[key];
 //  //  console.log(3);
 //  //  client.settings.set(message.guild.id, settings);
 //  //  console.log(4);
 //  //  message.channel.send({embed: {color: 0xff00, title: 'SUCCESS', description: `The key '${key}' has been successfully reset to '${client.config.defaultSettings[key]}'.`}});
 //  //  console.log(5);
 //  // }
 //  //
 //  // // If the author replys with a 'n' or 'no', then that
 //  // // means they don't want to continue.
 //  // else if ((["n","no","cancel"].includes(response)) || (response == "cancelled")) {
 //  //  console.log(6);
 //  //  message.reply("Action cancelled.");
 //  // }
 //
 // }
 //
 // // If the author doesn't provide an action, then we assume
 // // that theu author wants to see the default settings for their guild.
 // else {
 //  message.channel.send(inspect(settings), {code: "json"});
 // }

 // message.reply("this command is currently out of order, this bot fuckin sucks :(")

}


// Provides useful information about this command.
exports.help = {
 name: "settings",
 category: "system",
 description: "View or change settings for your server.",
 usage: "a!settings | a!settings (edit/reset) (key) <value>"
};

// Provides configeration use for
// this commands, like useful properties such
// as permission levels.
exports.config = {
 permissionLevel: 2,
 requiredRole: "Admins",
 guildOnly: true
};
