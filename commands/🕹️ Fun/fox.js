const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const Discord = require("discord.js");
const fetch = require('node-fetch');
module.exports = {
  name: "fox",
  category: "🕹️ Fun",
  usage: "fox",
  description: "get information about a minecraft server",
  run: async (client, message, args, cmduser, text, prefix) => {
    //code
     const response = await fetch('https://randomfox.ca/floof/');
        const { image } = await response.json();
        message.channel.send(new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setDescription('https://randomfox.ca/')
            .setImage(image)
        );
    }
}