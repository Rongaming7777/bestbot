const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
module.exports = {
  name: "cat",
  category: "🔎 Search",
  usage: "cat",
  description: "Search Any Thing On cat.",
  run: async (client, message, args, cmduser, text, prefix) => {
            let owo = (await neko.sfw.meow());

            const cat = new Discord.MessageEmbed()
                  .setTitle("Random Cat Image")
                  .setImage(owo.url)
                  .setColor("#00d7ff")
                  .setFooter(client.user.username, "https://cdn.discordapp.com/attachments/880336519305523210/880632358364127254/2Q.png")
                  .setURL(owo.url);
            message.channel.send(cat);

      }
};