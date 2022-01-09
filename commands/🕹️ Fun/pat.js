const discord = require("discord.js");
const superagent = require('superagent');
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
module.exports = {
  name: "pat",
  aliases: [""],
  category: "🕹️ Fun",
  description: "IMAGE CMD",
  usage: "pat",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let target = message.mentions.members.first();

    let { body } = await superagent.get("https://nekos.life/api/pat");
    
    let embed = new discord.MessageEmbed()
    .setColor("RANDOM")
    .setImage(body.url)
    .setFooter(`${message.author.username} pat ${target.user.username}`)
    .setTimestamp();
    message.channel.send(embed);
  }
};