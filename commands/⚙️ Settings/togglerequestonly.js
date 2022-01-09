const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");
module.exports = {
    name: "togglerequestonly",
    aliases: ["togglerequest", "tro"],
    category: "⚙️ Settings",
    description: "Toggles if u are allowed to use MUSIC and FILTER Comamnds in different channels too! Default: true == Not allowed",
    usage: "togglerequestonly",
    memberpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args, cmduser, text, prefix) => {
      let es = client.settings.get(message.guild.id, "embed")
    try{
      
      //set the new prefix
      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, `requestonly`), `requestonly`);
      //return success embed
      return message.channel.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<a:yes2:921988805442043925> ${client.settings.get(message.guild.id, `requestonly`) ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.disabled} Disabled`} Request Only`)
        .setDescription(`You are now ${client.settings.get(message.guild.id, `requestonly`) ? `` : `not`} allowed to use Commands in different Channels`)
      );
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
						.setFooter(es.footertext, es.footericon)
            .setTitle(`<a:no:921989165242003476> An error occurred`)
            .setDescription(`${e.message}`)
        );
    }
  }
};
