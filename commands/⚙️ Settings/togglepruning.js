const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");
module.exports = {
    name: "togglepruning",
    aliases: ["toggleprunning", "pruning", "prunning", "toggeldebug", "debug"],
    category: "⚙️ Settings",
    description: "Toggles pruning. If its true a message of playing a new track will be sent, even if your afk. If false it wont send any message if a new Track plays! | Default: true aka send new Track information",
    usage: "togglepruning",
    memberpermissions: ["ADMINISTRATOR"],
    run: async (client, message, args, cmduser, text, prefix) => {
      let es = client.settings.get(message.guild.id, "embed")
    try{
      
      //set the new prefix
      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, `pruning`), `pruning`);
      //return success embed
      return message.channel.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`<a:yes2:921988805442043925> ${client.settings.get(message.guild.id, `pruning`) ? `${emoji.msg.enabled} Enabled` : `${emoji.msg.ERROR} Disabled`} Pruning`)
        .setDescription(`I will now ${client.settings.get(message.guild.id, `pruning`) ? `` : `not`} send a message with Track Information, if I am on "AFK"`)
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
