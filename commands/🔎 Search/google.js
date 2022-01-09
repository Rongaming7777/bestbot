const config = require(`../../botconfig/config.json`);
const ms = require(`ms`);
var ee = require(`../../botconfig/embed.json`)
const emoji = require(`../../botconfig/emojis.json`);
const axios = require('axios');
const Discord = require("discord.js");
module.exports = {
  name: `google`,
  category: `🔎 Search`,
  cooldown: 4,
  usage: `goolge <search>`,
  description: `search from google`,
  run: async (client, message, args, cmduser, text, prefix) => {
    let msg = message.content.split(" ");

let query = msg.slice(1).join("+");

let queryD = msg.slice(1).join(" ");

if(!query)
  return message.channel.send(
    new Discord.MessageEmbed()
      .setTitle("**Googke**")
      .setDescription("```yaml\nPlease specify a google search query.```")
      .setThumbnail('https://media.tenor.com/images/f97eeae3a7e0fd67d6813cfcdf875873/tenor.gif')
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
      .setColor('#4c8bf5')
  )
else {
  message.channel.send(
    new Discord.MessageEmbed()
      .setTitle("**Googke**")
      .setDescription(`\`\`\`yaml\nHere is your search result.\n\`\`\` [Click Here](https://www.google.com/search?q=${query})`)
      
      .setThumbnail('https://media.tenor.com/images/f97eeae3a7e0fd67d6813cfcdf875873/tenor.gif')
      .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
      .setColor('#4c8bf5')    
  )
}
 }
} 