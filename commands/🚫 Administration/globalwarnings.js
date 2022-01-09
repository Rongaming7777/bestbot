const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const {
  databasing
} = require("../../handlers/functions");
module.exports = {
  name: `globalwarnings`,
  category: `🚫 Administration`,
  aliases: [`globalwarns`, `globalwarnlist`, `global-warn-list`],
  description: `Shows the warnings of a User, globally`,
  usage: `globalwarnings @User`,
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      //find the USER
      let warnmember = message.mentions.users.first();
      if(!warnmember && args[0] && args[0].length == 18) {
        let tmp = await client.users.fetch(args[0])
        if(tmp) warnmember = tmp;
        if(!tmp) return message.reply("<a:no:921989165242003476> I failed finding that User...")
      }
      else if(!warnmember && args[0]){
        let alluser = message.guild.members.cache.map(member=> String(member.user.username).toLowerCase())
        warnmember = alluser.find(user => user.includes(args[0].toLowerCase()))
        warnmember = message.guild.members.cache.find(me => (me.user.username).toLowerCase() == warnmember)
        if(!warnmember || warnmember == null || !warnmember.id) return message.reply("<a:no:921989165242003476> I failed finding that User...")
        warnmember = warnmember.user;
      }
      else {
        warnmember = message.mentions.users.first() || message.author;
      }
      if (!warnmember)
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<a:no:921989165242003476> Please add a Member you want to see the warnings of!`)
          .setDescription(`Useage: \`${prefix}warn @User [Reason]\``)
        );


      try {
        client.userProfiles.ensure(warnmember.id, {
          id: message.author.id,
          guild: message.guild.id,
          totalActions: 0,
          warnings: [],
          kicks: []
        });
        const warnIDs = client.userProfiles.get(warnmember.id, 'warnings');
        const warnData = warnIDs.map(id => client.modActions.get(id));
        if (!warnIDs || !warnData || !warnIDs.length)
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(`He/She has: ${client.userProfiles.get(warnmember.id, 'warnings') ? client.userProfiles.get(warnmember.id, 'warnings').filter(v=>v.guild == message.guild.id).length : 0} in ${message.guild.name}`, "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/joypixels/275/globe-with-meridians_1f310.png")
            
            .setTitle(`<a:no:921989165242003476> \`${warnmember.username}\` has no Global-Warnings`)
          );

        let warnings = warnData
        let warnembed = new MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(`He/She has: ${client.userProfiles.get(warnmember.id, 'warnings') ? client.userProfiles.get(warnmember.id, 'warnings').filter(v=>v.guild == message.guild.id).length : 0} in ${message.guild.name}`, "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/joypixels/275/globe-with-meridians_1f310.png")
          
          .setTitle(`[${warnIDs.length}] Global-Warnings of: ${warnmember.tag}`)
        let string = ``;
        for (let i = 0; i < warnings.length; i++) {
          string +=
            `================================
**Warn Id:** \`${i}\`
**Warned at:** \`${warnings[i].when}\`
**Warned in:** \`${client.guilds.cache.get(warnings[i].guild) ? client.guilds.cache.get(warnings[i].guild).name :  warnings[i].guild}\`
**Reason:** \`${warnings[i].reason.length > 50 ? warnings[i].reason.substr(0, 50) + ` ...` : warnings[i].reason}\`
`
        }
        warnembed.setDescription(string)
        let k = warnembed.description
        for (let i = 0; i < k.length; i += 2048) {
          await message.channel.send(warnembed.setDescription(k.substr(i, i + 2048)))
        }

        if(client.settings.get(message.guild.id, `adminlog`) != "no"){
          try{
            var channel = message.guild.channels.cache.get(client.settings.get(message.guild.id, `adminlog`))
            if(!channel) return client.settings.set(message.guild.id, "no", `adminlog`);
            channel.send(new MessageEmbed()
              .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
              .setAuthor(`${require("path").parse(__filename).name} | ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
              .setDescription(`\`\`\`${String(message.content).substr(0, 2000)}\`\`\``)
              .addField(`Executed in: `, `<#${message.channel.id}> \`${message.channel.name}\``)
              .addField(`Executed by: `, `<@${message.author.id}> (${message.author.tag})\n\`${message.author.tag}\``)
              .setTimestamp().setFooter("ID: " + message.author.id)
            )
          }catch (e){
            console.log(e)
          }
        } 

      } catch (e) {
        console.log(String(e.stack).red);
        return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<a:no:921989165242003476> An error occurred`)
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
        );
      }
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
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
