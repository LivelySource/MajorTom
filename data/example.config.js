// invite link
// https://discordapp.com/oauth2/authorize/?permissions=336030840&scope=bot&client_id=445791504028532749

const config = {

 // The bot's token.
 "token": "",


 // Default settings, if a guild doesn't initialize
 // their own custom settings then the bot will
 // refer to this.
 "defaultSettings" : {

 // The bot's prefix, used to call the bot.
 "prefix": "a!",

 //
 "modLogChannel": "mod-log",

 // The name for guests.
 "guestsRole": "Guests",

 // The name for moderators.
 "modRole": "Moderators",

 // The name for admins.
 "adminRole": "Admins",

 // This gives a notice when a user tries to run a command that they do not have permission to use.
 "systemNotice": "true",

 // The default channel for a guild, this channel is used to welcome new users.
 "welcomeChannel": "general",

 // What the bot says when a new user has joined.
 "welcomeMessage": "Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D",

 // Determines if this bot should welcome new users.
 "welcomeEnabled": "false",

 },

 // Permission system.
 // Whenever we want to check a user's permission level we come here.

 "permissions" : [

  // The lowest permission level, this is for users who don't have roles
  // or are new to the guild.
  {

   // The level for this permission.
   level: 0,

   // This is the general name for those who fall under this category,
   // though some guilds might have their own custom name this is what
   // they're generally called.
   name: "Guests",

   // We don't bother checking if a guild member needs this role
   // to do a certain command. Since they're given this role on join
   // they're already allowed to.
   check: () => true

  },


  // The next level in permissions, this is for
  // those who are mods.
  {

   // The level for this permission.
   level: 1,

   // As stated before, this is the name for those who fall under this
   // category. Some guilds might have custom names but this is what
   // they're generally called.
   name: "Mods",

   // The following line checks if the author of the message
   // has a mod role. We call on the guild collection and see if there is
   // a role that represents mods, then we check if the author has said
   // role. If so, we return true which allows the user to execute the command in question.
   check: (message) => {

    // We try to find a role that represents mods in the guild
    // that this message was initialized.
    const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
    // If one wasn't found, then obviously an error has occured, then it just jumps to returning false.

    // If one was found, we then check if the author has the role in
    // question, then return the resulting boolean value.
    if (modRole && message.member.roles.has(modRole.id)) return true;

   }

 },


 // Permission level for admins.
  {

   // The level for this permission.
   level: 2,

   // The name for this role, like I've stated before
   // this doesn't necessarily mean that the roles that
   // represent admins are called 'Admins', but that that's
   // what they're generally known as.
   name: "Admins",

   // The following line checks if the author of the message
   // has an admin role. We call on the guild collection and see if there is
   // a role that represents admins, then we check if the author has said
   // role. If so, we return true which allows the user to execute the command in question.
   check: (message) => {

    // We try to find a role that represents mods in the guild
    // that this message was initialized.
    const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
    // If one wasn't found, then obviously an error has occured, then it just jumps to returning false.

    // If one was found, we then check if the author has the role in
    // question, then return the resulting boolean value.
    return (adminRole && message.member.roles.has(adminRole.id));

   }

  },


  // The highest *earnable* permission level, the owner.
  {

   // The level for this permission.
   level: 3,

   // Bla bla bla you already know the description for the name
   // of this role.
   name: "Owner",

   // This is a simple check, simply check if the id of the author is
   // the same id for the guild's owner.
   check: (message) => message.channel.type === "text" ? ((message.guild.ownerID === message.author.id) ? true : false) : false

  },

  // The highest peermission level, can only be obtained
  // by the owner of thr bot.
  {

   // the level for this permission
   level: 4,

   // you know what this is
   name: "Bot Owner",

   // simple check, simply determine if the id of the author is
   // the id of the owner of the bot
   check: (message) => message.channel.type === "text" ? ((message.author.id === "318853256749252610") ? true : false) : false

  }

 ],

}

module.exports = config;
