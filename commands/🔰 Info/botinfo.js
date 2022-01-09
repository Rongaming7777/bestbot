const Discord = require("discord.js");
const { MessageButton } = require('discord-buttons')

let os = require("os");

let cpuStat = require("cpu-stat");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
    duration
} = require("../../handlers/functions")
module.exports = {
    name: "botinfo",
    aliases: ["info"],
    category: "🔰 Info",
    description: "Sends detailed info about the client",
    usage: "botinfo",
    run: async (client, message, args, cmduser, text, prefix) => {
        try {
            cpuStat.usagePercent(function (e, percent, seconds) {
                if (e) {
                    return console.log(String(e.stack).red);
                }
                let connectedchannelsamount = 0;
                let guilds = client.guilds.cache.map((guild) => guild);
                for (let i = 0; i < guilds.length; i++) {
                    if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
                }
                if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
                //info
                const botinfo = new Discord.MessageEmbed()
                    .setAuthor(client.user.username, client.user.displayAvatarURL())
                    .setTitle("__**BOTINFO**__")
                    .setColor(ee.color)
                    .addField("📁 Memory Usage", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``)
                    .addField("<a:emoji_15:863382962362646558> Uptime ", `\`${duration(client.uptime)}\``)
                    .addField("<:emoji_51:867751921884725279> Users", `\`Total: ${client.users.cache.size} Users\``)
                    .addField("<:emoji_52:867751969250345002> Servers", `\`Total: ${client.guilds.cache.size} Servers\``)
                    .addField("🎙️ Voice-Channels", `\`${client.channels.cache.filter((ch) => ch.type === "voice").size}\``)
                    .addField("<:cool:863399662693777418> Connected Channels", `\`${connectedchannelsamount}\``)
                    .addField("<:jj:863396103402684426> Discord.js", `\`v${Discord.version}\``)
                    .addField("<:gg:863395813874073600> Node", `\`${process.version}\``)
                    .addField("🤖 CPU", `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
                    .addField("🤖 CPU usage", `\`${percent.toFixed(2)}%\``)
                    .addField("🤖 Arch", `\`${os.arch()}\``)
                    .addField("<a:emoji_16:863385736916762635> API Latency", `\`${client.ws.ping}ms\``)
                    .addField("<a:emoji_23:863644511703662592> Developer",
                    `\` 1 • BROKARONAGAMING#9999
 2 • SDD Gaming#0202\``)
                    .setFooter("BOT_MUSIC | powered by KARONAGAMING", "https://cdn.discordapp.com/avatars/855662770757435422/8f9a0e7e8b3057b032f0fdb23c10feb7.webp?size=1024");

                message.channel.send(botinfo);
            })
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new Discord.MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
                .setDescription(`\`\`\`${e.message}\`\`\``)
            );
        }
    },
};