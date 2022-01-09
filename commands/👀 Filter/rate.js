const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: `speed`,
  category: `👀 Filter`,
  aliases: [``],
  description: `Allows you to change the SPEED of the TRACK`,
  usage: `speed <Multiplicator>   |   Multiplicator could be: 0  -  3`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    ee = client.settings.get(message.guild.id, "embed")
    try {
      if (!args.length)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`<a:no:921989165242003476> Please include the Multiplicator`)
          .setDescription(`Usage: \`${prefix}speed <Multiplicator>\`\n\nExample: \`${prefix}speed 1.5\``)
        );
      if(isNaN(args[0]))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`<a:no:921989165242003476> The Multiplicator must be a Number`)
          .setDescription(`Usage: \`${prefix}speed <Multiplicator>\`\n\nExample: \`${prefix}speed 1.5\``)
        );
      if(Number(args[0]) >= 3 || Number(args[0]) <= 0)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`<a:no:921989165242003476> Multiplicator out of range | Must be between 0 and 3`)
          .setDescription(`Usage: \`${prefix}speed <Multiplicator>\`\n\nExample: \`${prefix}speed 1.5\``)
        );
      player.node.send({
        op: "filters",
        guildId: message.guild.id,
        equalizer: player.bands.map((gain, index) => {
            var Obj = {
              "band": 0,
              "gain": 0,
            };
            Obj.band = Number(index);
            Obj.gain = Number(gain)
            return Obj;
          }),
        timescale: {
              "speed": Number(args[0]),
              "pitch": 1.0,
              "rate": 1.0
          },
      });
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`<a:yes2:921988805442043925> Speed set to \`${args[0]}\``)
        .setDescription(`Note: *It might take up to 5 seconds until you hear the Filter*`)
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`<a:no:921989165242003476> An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  }
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
