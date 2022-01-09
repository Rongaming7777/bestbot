const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../botconfig/config.json")
module.exports = {
  name: "dog",
  category: "🔎 Search",
  usage: "dog",
  description: "Search Any Thing On Dog.",
  run: async (client, message, args, cmduser, text, prefix) => {
           let owo = (await neko.sfw.woof());

            const dog = new Discord.MessageEmbed()
                  .setTitle("Random dog Image")
                  .setImage(owo.url)
                  .setColor("#00d7ff")
                  .setFooter(client.user.username, "https://cdn.discordapp.com/attachments/880336519305523210/880632358364127254/2Q.png")
                  .setURL(owo.url);
            message.channel.send(dog);

      }
};