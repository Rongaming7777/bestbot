const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { MessageButton } = require('discord-buttons')
module.exports = {
  name: "invite",
  category: "🔰 Info",
  aliases: ["add"],
  usage: "invite",
  description: "Gives you an Invite link for this Bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let button_support_dc = new MessageButton().setStyle('url').setLabel('Support Server').setURL("https://discord.gg/D7mH7BsKst")
      let button_invite = new MessageButton().setStyle('url').setLabel('Invite this Bot').setURL(`https://discord.com/api/oauth2/authorize?client_id=910406407763931136&permissions=8&scope=bot%20applications.commands`)
      //array of all buttons
      const allbuttons = [button_support_dc, button_invite]
       message.channel.send({
         embed: new MessageEmbed()
          .setColor(ee.color)
          .setTitle("Thanks for inviting Hero_Bot")
          .addField(`Hero_Bot Powered by ZeeXp#1533`, `**[Invite Public Bot](https://discord.com/api/oauth2/authorize?client_id=910406407763931136&permissions=8&scope=bot%20applications.commands)  •  [Support Server](https://discord.gg/D7mH7BsKst)
          **\n\n[**Invite** **${client.user.username}**](https://discord.com/api/oauth2/authorize?client_id=910406407763931136&permissions=8&scope=bot%20applications.commands)`)
          .setImage("https://media.discordapp.net/attachments/910547151002685441/912608702857629716/standard_15.gif")
          .setFooter("Hero_Bot | powered by ZeeXp#1533", "https://cdn.discordapp.com/attachments/880336519305523210/880632358364127254/2Q.png"),
        buttons: allbuttons
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}