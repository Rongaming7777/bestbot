const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const translate = require("translatte");
module.exports = {
  name: "translate",
  category: "🔰 Info",
  aliases: ["trans", "tran", "tr"],
  cooldown: 5,
  usage: "translate <from> <to> <TEXT>",
  description: "Gives you an Invite link for this Bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      if(!args[0]) return message.channel.send(`<a:no:865653977977454632> Error | Unknown Command Usage! \`${prefix}translate <from> <to> <Text>\`\nExample: \`${prefix}translate en de Hello World\``)

      if(!args[1]) return message.channel.send(`<a:no:865653977977454632> Error | Unknown Command Usage! \`${prefix}translate <from> <to> <Text>\`\nExample: \`${prefix}translate en de Hello World\``)

      if(!args[2]) return message.channel.send(`<a:no:865653977977454632> Error | Unknown Command Usage! \`${prefix}translate <from> <to> <Text>\`\nExample: \`${prefix}translate en de Hello World\``)

      translate(args.slice(2).join(" "), {from: args[0], to: args[1]}).then(res=>{
        let embed = new MessageEmbed()
        .setColor("#2f3136")
        .setAuthor(`Translated to: ${args[1]}`, "https://imgur.com/0DQuCgg.png", "https://discord.gg/G99nPWMBYe")
        .setFooter(`Translated from: ${args[0]}`, message.author.displayAvatarURL({dynamic:true}))
        .setDescription("```"+res.text.substr(0, 2000)+"```")
        message.channel.send(embed)
        }).catch(err => {
          let embed = new MessageEmbed()
          .setColor("#2f3136")
          .setTitle("<a:no:865653977977454632> Error | Something went wrong")
          .setDescription(String("```"+err.stack+"```").substr(0, 2000))
          message.channel.send(embed)
            console.log(err);
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<a:no:865653977977454632> An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e.stack)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}
