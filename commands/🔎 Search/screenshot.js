const { Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");
const fetch = require("node-fetch");
const url = require("url");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "screenshot",
  category: "🔎 Search",
  aliases: ["ss"],
  cooldown: 2,
  usage: "screenshot",
  description: "will take ss for u",
  run: async (client, message, args, cmduser, text, prefix) => {
    const user = message.author.tag
    const urls = args[0].replace(`pornhub.com`,"❌").replace(`nhentai.net`,"❌").replace(`Tube2.net`,"❌").replace(`tube2.net`,"❌").replace(`TUBE2.net`,"❌").replace(`www.xnxx.com`,"❌").replace(`www.XNXX.com`,"❌").replace(`www.Xnxx.com`,"❌");
    if (urls.length < 8)
      return message
        .reply(
          "❌ https is too short to reach - 8 limit"
        )
        .then(m => m.delete({ timeout: 9000 }).catch(e => {}));

    const site = /^(https?:\/\/)/i.test(urls) ? urls : `http://${urls}`;
    try {
      const { body } = await fetch(
        `https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`
      );
       
      const embed = new Discord.MessageEmbed()
      .setDescription(`\`\`\`\nHere is a screenshot from requested URL\n\`\`\``)
      .setColor("RANDOM").setImage("attachment://Screenshot.png")
      .attachFiles([{ attachment: body, name: "Screenshot.png" }]
     );
      return message.channel.send(
     embed);
    } catch (err) {
      if (err.status === 404)
        return message.channel
          .send("Could not find any results. Invalid URL?")
          .then(m => m.delete({ timeout: 14000 }).catch(e => {}));
      return message
        .reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`)
        .then(m => m.delete({ timeout: 13000 }).catch(e => {}));
    }
  }
};