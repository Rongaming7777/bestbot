const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const {
  createBar,
  format
} = require(`../../handlers/functions`);
module.exports = {
  name: `grab`,
  category: `🎶 Music`,
  aliases: [`save`, `yoink`],
  description: `Saves the current playing song to your Direct Messages`,
  usage: `grab`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    let es = client.settings.get(message.guild.id, "embed")
        if(!client.settings.get(message.guild.id, "MUSIC")){
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<a:no:921989165242003476> THIS COMMAND IS CURRENTLY DISABLED`)
            .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
          );
        }
    message.author.send(new MessageEmbed()
    .setAuthor(`Saved Song:`, message.author.displayAvatarURL({
      dynamic: true
    }))
    .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
    .setURL(player.queue.current.uri)
    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
    .setFooter(es.footertext, es.footericon)
    .setTitle(`${player.playing ? `${emoji.msg.resume}` : `${emoji.msg.pause}`} **${player.queue.current.title}**`)
    .addField(`${emoji.msg.time} Duration: `, `\`${format(player.queue.current.duration)}\``, true)
    .addField(`${emoji.msg.song_by} Song By: `, `\`${player.queue.current.author}\``, true)
    .addField(`${emoji.msg.repeat_mode} Queue length: `, `\`${player.queue.length} Songs\``, true)
    .addField(`${emoji.msg.playing} Play it:`, `\`${prefix}play ${player.queue.current.uri}\``)
    .addField(`${emoji.msg.search} Saved in:`, `<#${message.channel.id}>`)
    .setFooter(`Requested by: ${player.queue.current.requester.tag} | in: ${message.guild.name}`, player.queue.current.requester.displayAvatarURL({
      dynamic: true
    }))
      ).catch(e=>{
        return message.channel.send("**<a:no:921989165242003476> Your Dm's are disabled**")
      })    

    message.react(emoji.react.SUCCESS).catch(e=>console.log("Could not react"))
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
