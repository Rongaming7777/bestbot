const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json")
var ee = require("../../botconfig/embed.json")
const emoji = require(`../../botconfig/emojis.json`);
const moment = require("moment")
module.exports = {
  name: "membercount",
  aliases: ["members"],
  category: "🔰 Info",
  description: "Shows how many Members there are in this Server",
  usage: "membercount",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      await message.guild.members.fetch();
        message.channel.send(new Discord.MessageEmbed()
        .setAuthor("Member Count Information About: " +  message.guild.name, message.guild.iconURL({
          dynamic: true
        }), "https://discord.com/oauth2/authorize?client_id=855662770757435422&permissions=8&scope=bot")
        .setColor(es.color)
        .addField("<a:arrow:865655067348303943> Total USERS", "😀 \`" + message.guild.memberCount + "\`", true)
        .addField("<a:arrow:865655067348303943> Total HUMANS", "👤 \`" + message.guild.members.cache.filter(member => !member.user.bot).size + "\`", true)
        .addField("<a:arrow:865655067348303943> Total BOTS", "🤖 \`" + message.guild.members.cache.filter(member => member.user.bot).size + "\`", true)
        
        .addField("<a:arrow:865655067348303943> ONLINE", "🟢 \`" + message.guild.members.cache.filter(member => member.presence.status != "offline").size + "\`", true)
        .addField("<a:arrow:865655067348303943> ONLINE", "🟢 \`" + message.guild.members.cache.filter(member => !member.user.bot && member.presence.status != "offline").size + "\`", true)
        .addField("<a:arrow:865655067348303943> ONLINE", "🟢 \`" + message.guild.members.cache.filter(member => member.user.bot && member.presence.status != "offline").size + "\`", true)
        
        .addField("<a:arrow:865655067348303943> IDLE", "🟠 \`" + message.guild.members.cache.filter(member => member.presence.status == "idle").size + "\`", true)
        .addField("<a:arrow:865655067348303943> IDLE", "🟠 \`" + message.guild.members.cache.filter(member => !member.user.bot && member.presence.status == "idle").size + "\`", true)
        .addField("<a:arrow:865655067348303943> IDLE", "🟠 \`" + message.guild.members.cache.filter(member => member.user.bot && member.presence.status == "idle").size + "\`", true)
        
        .addField("<a:arrow:865655067348303943> DND", "🔴 \`" + message.guild.members.cache.filter(member => member.presence.status == "dnd").size + "\`", true)
        .addField("<a:arrow:865655067348303943> DND", "🔴 \`" + message.guild.members.cache.filter(member => !member.user.bot && member.presence.status == "dnd").size + "\`", true)
        .addField("<a:arrow:865655067348303943> DND", "🔴 \`" + message.guild.members.cache.filter(member => member.user.bot && member.presence.status == "dnd").size + "\`", true)
        
        .addField("<a:arrow:865655067348303943> OFFLINE", ":black_circle:\`" + message.guild.members.cache.filter(member => member.presence.status == "offline").size + "\`", true)
        .addField("<a:arrow:865655067348303943>OFFLINE", ":black_circle:\`" + message.guild.members.cache.filter(member => !member.user.bot && member.presence.status == "offline").size + "\`", true)
        .addField("<a:arrow:865655067348303943> OFFLINE", ":black_circle:\`" + message.guild.members.cache.filter(member => member.user.bot && member.presence.status == "offline").size + "\`", true)
        .setTimestamp()
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`ERROR | An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}