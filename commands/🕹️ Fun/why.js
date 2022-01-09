const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();




module.exports = {
  name: "why",
  aliases: [""],
  category: "🕹️ Fun",
  description: "IMAGE CMD",
  usage: "why",
  run: async (client, message, args, cmduser, text, prefix) => {
        if (!message.guild) return;
            async function why() {
            const whyTEXT = await neko.sfw.why();
            message.channel.send(whyTEXT.why);
            }
            why();
    }
}