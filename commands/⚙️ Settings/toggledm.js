const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");
module.exports = {
  name: "toggledm",
  aliases: ["toggledmmessage", "toggledmmsg"],
  category: "⚙️ Settings",
  description: "Toggles if the Bot should send you dm messages",
  usage: "toggledm",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {

      client.settings.set(message.author.id, !client.settings.get(message.author.id, "dm"), `dm`);
      return message.channel.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<a:yes2:921988805442043925> ${client.settings.get(message.author.id, "dm") ? "Enabled": "Disabled"} Dm messages`)
        .setDescription(`${client.settings.get(message.author.id, "dm") ? "I will now send you DMS after the COMMANDS, if needed" : "I will not send you DMS after the COMMANDS"}`.substr(0, 2048))
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<a:no:921989165242003476> An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
};
