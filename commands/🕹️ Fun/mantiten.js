const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { Random } = require("something-random-on-discord");
module.exports = {
  name: "mantiten",
  category: "🕹️ Fun",
  usage: "mantiten",
  description: "SMUG",
  run: async (client, message, args, cmduser, text, prefix) => {
        const data = await fetch("https://nekos.life/api/v2/img/smug").then(res =>
      res.json()
    );

    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`)
      .setTimestamp();

    message.channel.send(embed);
  }
};