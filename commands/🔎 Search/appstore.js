const { MessageEmbed } = require('discord.js')
const AppleStore = require('app-store-scraper') // npm i app-store-scraper
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "appstore",
  category: "🔎 Search",
  aliases: ['app-store'],
  usage: "appstore",
  description: "Search For App On AppStore And Gets Its Info",
  run: async (client, message, args, cmduser, text, prefix) => {
            const appname = args.join(' ') // Name Of App
        if(!appname) return message.reply(`Which Apps Info You Need?`) // If No App Name Is Provided

        AppleStore.search({ // Search It Using Package
            term: args.join(' '), // App Name
            num: 1, // Number Of Results
        }).then((data) => {
            let AppInfo

            try {
                AppInfo = JSON.parse(JSON.stringify(data[0])) // Get Info Of App
            } catch (error) {
                return message.reply(`No App With Name **${appname}** Found`)
            }

            let description = AppInfo.description.length > 200 ? `${AppInfo.description.substr(0, 200)}...` : AppInfo.description // If Description Is Longer Than 200 Words
            let price = AppInfo.free ? 'Free' : `$${AppInfo.price}`
            let rating = AppInfo.score.toFixed(1)

            const embed = new MessageEmbed()
            .setTitle(AppInfo.title)
            .setThumbnail(AppInfo.icon)
            .setURL(AppInfo.url)
            .setTimestamp()
            .setColor('#4b93d5')
            .setDescription(description)
            .addField(`Price:`, price)
            .addField(`Developer:`, AppInfo.developer)
            .addField(`Rating:`, rating)
            .setFooter(`Requested By ${message.author.username}`)
            message.channel.send(embed)
        })
    }
}