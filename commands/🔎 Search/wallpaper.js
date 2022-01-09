const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
module.exports = {
  name: "wallpaper",
  category: "🔎 Search",
  usage: "wallpaper",
  description: "Search Any Thing On wallpaper.",
  run: async (client, message, args, cmduser, text, prefix) => {
        let owo = (await neko.sfw.wallpaper());

    const wallpaper = new Discord.MessageEmbed()
      .setTitle("Random Wallpaper")
      .setImage(owo.url)
      .setColor("RANDOM")
      .setFooter(client.user.username, "https://cdn.discordapp.com/attachments/880336519305523210/880632358364127254/2Q.png")
      .setURL(owo.url);
    message.channel.send(wallpaper);
  }
};