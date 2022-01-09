const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");
module.exports = {
  name: "toggleunknowncommandinfo",
  aliases: ["toggleunknowncmdinfo", "toggleunknowninfo", "unknowncmdinfo", "unknowninfo", "unknowncommandinfo"],
  category: "⚙️ Settings",
  description: "Toggles if the Bot should send you an Informational Message, when the Command is NOT FOUND",
  usage: "toggleunknowncommandinfo",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {

      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "unkowncmdmessage"), `unkowncmdmessage`);
      return message.channel.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<a:yes2:921988805442043925> ${client.settings.get(message.guild.id, "unkowncmdmessage") ? "Enabled": "Disabled"} Unknown Command Information`)
        .setDescription(`${client.settings.get(message.guild.id, "unkowncmdmessage") ? "I will now send an Information when the Command is not found" : "I will not send Information of Unknown Commands"}`.substr(0, 2048))
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
