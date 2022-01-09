const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const mojang = require('mojang-api');
const https = require('https');
module.exports = {
  name: "uuid",
  category: "🤞 Mincraft",
  usage: "uuid",
  description: "Finds a player\'s uuid from the nickaname",
  run: async (client, message, args, cmduser, text, prefix) => {
            if(!args.length) {
            message.reply('please specify the player\'s name');
            return;
        }
        //send request to find uuid
        mojang.nameToUuid(args[0], (err, resp) => {
            if(err || !resp.length) {
                console.log(err);
                message.reply('there was an error');
            }
            else message.channel.send(resp[0].name + '\'s UUID is ' + resp[0].id);
        });
    }
}