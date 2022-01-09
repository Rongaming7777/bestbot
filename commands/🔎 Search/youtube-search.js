const { MessageEmbed, Util } = require('discord.js')
const youtube = require('youtube-sr') // npm i youtube-sr@2.0.5
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "youtube-search",
  category: "🔎 Search",
  aliases: ['youtube-search', 'yt-search'],
  usage: "youtube-search",
  description: "Search For Videos On YouTube",
  run: async (client, message, args, cmduser, text, prefix) => {
        const video = args.join(' ') // Name Of Video To Search
        if(!video) return message.reply(`Which Video Do You Search For?`) // If No Video Title Is Provided

        function getVideo(title, url, duration, thumbnail, views, uploadedAt, description) { // Get Info About Video
            const reslut = {
                "title": title, // Title Of Video
                "url": url, // URL Of Video
                "duration": duration, // Durtion Of Video
                "thumbnail": thumbnail, // Thumbnail Of Video
                "views": views, // Views Of Video
                "description": description, // Description Of Video
                "uploadedAt": uploadedAt // Time When Video Was Uploaded
            }
            return reslut
        }

        let videoInfo = await youtube.searchOne(video) // Search For Video
        if(!videoInfo) return message.reply(`No Video Found With **${video}**`) // If No Video Found

        videodetail = getVideo(Util.escapeMarkdown(videoInfo.title), videoInfo.url, videoInfo.durationFormatted, videoInfo.thumbnail.url, videoInfo.uploadedAt, videoInfo.views, videoInfo.description) // Details/Info Of Video

        const embed = new MessageEmbed()
        .setTitle(videodetail.title)
        .setURL(videoInfo.url)
        .setTimestamp()
        .setThumbnail(videodetail.thumbnail)
        .setColor('#4b93d5')
        .setDescription(`
Duration: ${videodetail.duration}
Views: ${videodetail.uploadedAt}
Uploaded: ${videodetail.views}
description: ${videoInfo.description}
        `)
        .setFooter(`Video Requested By ${message.author.username}`)
        message.channel.send(embed)

    }
}