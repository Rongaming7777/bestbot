const weather = require('weather-js');

const Discord = require('discord.js');
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
    name: "weather",
    category: "🕹️ Fun",
    useage: `weather`,
    description: "*Image cmd in the style:* ",
    run: async (client, message, args, cmduser, text, prefix) => {
        weather.find({search: args.join(" "), degreeType: `C`}, function (error, result) {
            if(error) return message.channel.send(error);
            if(!args[0]) return message.channel.send('Please specify a location!')

            if(result === undefined || result.length === 0) return message.channel.send('**invlaid** location!!')

            var current = result[0].current;
            var location = result[0].location;

            const embed = new Discord.MessageEmbed()
            .setColor(`#4b93d5`)
            .setAuthor(`Weather forecast for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setDescription(`**${current.skytext}**`)
            .addField('TimeZone', `UTC ${location.timezone}`, true)
            .addField('Degree Type', 'Celcius', true)
            .addField('Temperature', `${current.temperature}°`, true) 
            .addField('Wind', `${current.winddisplay}`, true)
            .addField('Feels Like', `${current.feelslike}°`, true)
            .addField('Humidity', `${current.humidity}%`, true)

            message.channel.send(embed)
        })
    }
}