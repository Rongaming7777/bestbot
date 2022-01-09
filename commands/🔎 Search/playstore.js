const { MessageEmbed } = require('discord.js');
const play = require('google-play-scraper');
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "playstore",
  category: "🔎 Search",
  aliases: ["app", "playstore", "ps"],
  cooldown: 2,
  usage: "playstore <app name>",
  description: "Gives you information on how fast the Bot can respond to you",
  run: async (client, message, args, cmduser, text, prefix) => {
  let kata = args.join(" ") 
    if(!kata) return message.reply(`What's The Name Of Application Will You Search??`);
    
    play.search({term: kata,num:1})
    .then(data => {
      
    let app = data[0].appId
    play.app({appId:app})
    .then(lata => {
    let price = lata.price === 0? "Free" : `${lata.price}`
    
    let embed = new MessageEmbed()
    .setColor('#4b93d5')
    .setTitle(lata.title)
    .setThumbnail(lata.icon)
    .setDescription(lata.summary)
    .addField('Developer', lata.developer, true)
    .addField('Price', price, true)
    .addField('Ratings', lata.scoreText, true)
    .addField('Install', lata.installs === undefined ? "None" : lata.installs, true)
    .addField('Genre', lata.genre === undefined ? "None" : lata.genre, true)
    .addField('Released Date', lata.released === undefined ? "None" : lata.released, true)
    .addField('Application Link', `[App Link](${lata.url})`, true)
    .addField('Comment', lata.comments[0] === undefined ? "None" : lata.comments[0], true)
    .setFooter(`Request by: ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true }))
    .setTimestamp()
    return message.channel.send(embed);
    })
    })
  }
}