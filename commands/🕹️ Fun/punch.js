const discord = require("discord.js");
const { Random } = require("something-random-on-discord");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "punch",
  aliases: [""],
  category: "🕹️ Fun",
  description: "IMAGE CMD",
  usage: "punch",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let target = message.mentions.members.first()
    
    let data = await Random.getAnimeImgURL("punch");
    
    let embed = new discord.MessageEmbed()
    .setImage(data)
    .setColor("RANDOM")
    .setFooter(`${message.author.username} punches ${target.user.username}`)
    .setTimestamp()
    
    message.channel.send(embed);
  }
};