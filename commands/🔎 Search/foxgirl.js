const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../botconfig/config.json")
module.exports = {
  name: "foxgirl",
  category: "🔎 Search",
  usage: "foxgirl",
  description: "Search Any Thing On foxgirl.",
  run: async (client, message, args, cmduser, text, prefix) => {
                let owo = (await neko.sfw.foxGirl());

            const foxGirl = new Discord.MessageEmbed()
                  .setTitle("Random Fox Girl")
                  .setImage(owo.url)
                  .setColor("RANDOM")
                  .setFooter(client.user.username, "https://cdn.discordapp.com/attachments/880336519305523210/880632358364127254/2Q.png")
                  .setURL(owo.url);
            message.channel.send(foxGirl);

      }
};