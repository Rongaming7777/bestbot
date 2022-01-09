const Discord = require('discord.js')
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
  duration
} = require("../../handlers/functions")
const { MessageMenuOption, MessageMenu } = require("discord-buttons")
module.exports = {
  name: "help",
  category: "🔰 Info",
  aliases: ["h", "commandinfo", "halp", "hilfe"],
  usage: "help [Command/Category]",
  description: "Returns all Commmands, or one specific command",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    let settings = client.settings.get(message.guild.id)
    try {
      if (args[0]) {
        const embed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null);
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        var cat = false;
        if(args[0].toLowerCase().includes("cust")){
          let cuc = client.customcommands.get(message.guild.id, "commands");
          if (cuc.length < 1) cuc = ["NO CUSTOM COMMANDS DEFINED YET, do it with: `!setup-customcommands`"]
          else cuc = cuc.map(cmd => `\`${cmd.name}\``)
          const items = cuc


          const embed = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(`<a:Save:922776326086225961> **Custom Commands [${cuc[0].includes("NO") ? 0 : items.length}]**`)
            .setDescription(items.join(", "))
            .setFooter(`No custom information for the Custom Commands ;(`, client.user.displayAvatarURL());
          
          message.channel.send(embed)
          return;
        }var cat = false;
        if (!cmd) {
          cat = client.categories.find(cat => cat.toLowerCase().includes(args[0].toLowerCase()))
        }
        if (!cmd && (!cat || cat == null)) {
          return message.channel.send(embed.setColor(es.wrongcolor).setDescription(`No Information found for command **${args[0].toLowerCase()}**`));
        } else if (!cmd && cat) {
          var category = cat;
          const items = client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
          const embed = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(`MENU <a:info:921990336472055840> **${category.toUpperCase()} [${items.length}]**`)
            .setFooter(`To see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());

          if (category.toLowerCase().includes("custom")) {
            const cmd = client.commands.get(items[0].split("`").join("").toLowerCase()) || client.commands.get(client.aliases.get(items[0].split("`").join("").toLowerCase()));
            try {
              embed.setDescription(`**${category.toUpperCase()} [${items.length}]**`, `> \`${items[0]}\`\n\n**Usage:**\n> \`${cmd.usage}\``);
            } catch {}
          } else {
            embed.setDescription(`${items.join(", ")}`)
          }
          return message.channel.send(embed)
        }
        if (cmd.name) embed.addField("**<a:arrow:922760789822152725> Command name**", `\`${cmd.name}\``);
        if (cmd.name) embed.setTitle(`<a:arrow:922760789822152725> Detailed Information about: \`${cmd.name}\``);
        if (cmd.description) embed.addField("**<a:arrow:922760789822152725> Description**", `\`\`\`${cmd.description}\`\`\``);
        if (cmd.aliases) try {
          embed.addField("**<a:arrow:922760789822152725> Aliases**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
        } catch {}
        if (cmd.cooldown) embed.addField("**<a:arrow:922760789822152725> Cooldown**", `\`\`\`${cmd.cooldown} Seconds\`\`\``);
        else embed.addField("**<a:arrow:922760789822152725> Cooldown**", `\`\`\`3 Seconds\`\`\``);
        if (cmd.usage) {
          embed.addField("**<a:arrow:922760789822152725> Usage**", `\`\`\`${config.prefix}${cmd.usage}\`\`\``);
          embed.setFooter("Syntax: <> = required, [] = optional", es.footericon);
        }
        if (cmd.useage) {
          embed.addField("**<a:arrow:922760789822152725> Useage**", `\`\`\`${config.prefix}${cmd.useage}\`\`\``);
          embed.setFooter("Syntax: <> = required, [] = optional", es.footericon);
        }
        return message.channel.send(embed);
      }

        let option1 = new MessageMenuOption()
        .setLabel("​Information")
        .setValue("​Information")
        .setDescription("​Information Commands")
        .setDefault()
        .setEmoji("921990336472055840")
        
        let option2 = new MessageMenuOption()
            .setLabel("Music Related")
            .setValue("Music Related")
            .setDescription("Music Commands")
            .setDefault()
            .setEmoji("922769038302662656")
        let setting = new MessageMenuOption()
            .setLabel("Settings & 👑 Owner")
            .setValue("Settings & 👑 Owner")
            .setDescription("Settings & Owner Commands")
            .setDefault()
            .setEmoji("921989736804016231")
        let rank = new MessageMenuOption()
            .setLabel("Voice & 📈 Ranking")
            .setValue("Voice & 📈 Ranking")
            .setDescription("Voice & Ranking Commands")
            .setDefault()
            .setEmoji("922770355217653790")
        let game = new MessageMenuOption()
            .setLabel("Mini Games & 🕹️ Fun")
            .setValue("Mini Games & 🕹️ Fun")
            .setDescription("Mini Games & Fun Commands")
            .setDefault()
            .setEmoji("921990895350468648")
        let admin = new MessageMenuOption()
           .setLabel("🛠️ Modretion & 💪 Setup")
           .setValue("Administration & 💪 Setup")
           .setDescription("🛠️ Modretion & 💪 Setup Commands")
           .setEmoji("921990039397892138")

        let nsfw = new MessageMenuOption()
           .setLabel("NSFW​")
           .setValue("NSFW​")
           .setDescription("🔞 NSFW​ Commands")
           .setEmoji("🔞")
        
          let custom = new MessageMenuOption()
           .setLabel("Custom Commands")
           .setValue("Custom Commands")
           .setDescription(" Custom Commands")
           .setEmoji("922776326086225961")
          
          let mine = new MessageMenuOption()
            .setLabel("Minecraft")
           .setValue("Minecraft")
           .setDescription("Minecraft Commands")
           .setEmoji("922771520596627476")

                    
          let search = new MessageMenuOption()
            .setLabel("Search")
           .setValue("Search")
           .setDescription("Search Commands")
           .setEmoji("922771967436800030")

        let selection = new MessageMenu()
            .setID("Selection")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Commands")
            .addOption(option1)
            .addOption(option2)
            .addOption(setting)
            .addOption(rank)
            .addOption(game)
            .addOption(admin)
            .addOption(nsfw)
            .addOption(custom)
            .addOption(mine)
            .addOption(search)


        let embed = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL())
.setColor(es.color)
.setFooter("Best_Bot | Made by: Ron", client.user.displayAvatarURL())
.setTitle(`<a:info:921990336472055840> Information about the`)
.addField("**<a:discord1:922778077275246682> __My Features__**",
`>>> **58+ Systems**, like: <a:twitter:922777591822286848> **Twitter-** & <a:YouTube:922768065446424586> **Youtube-Auto-Poster** 
**Application-**, Ticket-, **Welcome-Images-** and Reaction Role-, ... Systems
:notes: An advanced <a:music:922769038302662656> **Music System** with **Audio Filtering**
<a:gamer:921990895350468648> Many **Minigames** and :joystick: **Fun** Commands (150+)
:no_entry_sign: **Administration** and **Auto-Moderation** and way much more!`)
        .addField("<a:question:912598623366283276> **__How do you use me?__**",
`>>> \`${prefix}setup\` and react with the Emoji for the right action,
but you can also do \`${prefix}setup-SYSTEM\` e.g. \`${prefix}setup-welcome\``)
.addField("<:stats:923040664093085767> **__STATS:__**",                           
`>>> <a:users:922764284264591432> **Total Users:** \`${client.users.cache.size} Users\`
<a:Discord:921991406703222804> **Total Server:** \`${client.guilds.cache.size} Servers\`
<:command:922765550805975041> **Total Commands:** \`${client.commands.map(a=>a).length} Commands\`
<:time:922765913344847922> **Uptime:** \`${duration(client.uptime).map(i=> `${i}`).join(", ")}\``)

.addField("<a:network:922766378199580682> **Ping**", `>>>  <a:arrow2:922760817064153139>**\`${Math.round(Date.now() - message.createdTimestamp)}ms\`
      <a:CDS_Network:922766520583589908> Api Latency:** <a:arrow2:922760817064153139> \`${client.ws.ping}ms\``)

        
        .addField("<a:Developer:922766793074950144> **__Developer__**",
 `>>> \` • Ron
\``)
.setImage("https://media.discordapp.net/attachments/921624391769546863/922767677561385009/rainbow_line.gif")

        
let embed0 = new Discord.MessageEmbed()
.setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
.setTitle(`<a:info:921990336472055840> Information Commands <a:info:921990336472055840>`)
.setDescription(`> ${client.commands.filter((cmd) => cmd.category === "🔰 Info").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
.addField(settings.ECONOMY ? "<a:Economy:922776670199513138> **Economy** | <:enabled:921992057206210600> ENABLE" : "<a:Economy:922776670199513138> **Economy** | <:desabled:922218632417804319> DISABLED",`> ${client.commands.filter((cmd) => cmd.category === "💸 Economy").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
.addField(settings.SCHOOL ? "🏫 **School** | <:enabled:921992057206210600> ENABLE" : "🏫 **School** | <:desabled:922218632417804319> DISABLED", `> ${client.commands.filter((cmd) => cmd.category === "🏫 School Commands").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
.setFooter(`Panda_Bot | Made by: Ron\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())

          let embed1 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`<a:music:922769038302662656> Music Related Commands <a:music:922769038302662656>`)
            .setDescription(`<a:music:922769038302662656> **Music**${settings.MUSIC ? " | <:enabled:921992057206210600> ENABLE" : " | <:desabled:922218632417804319> DISABLED"}\n> ${client.commands.filter((cmd) => cmd.category === "🎶 Music").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField(settings.MUSIC ? "<a:filter:921991388529319946> **Filter** | <:enabled:921992057206210600> ENABLE" : "<a:filter:921991388529319946> **Filter** | <:desabled:922218632417804319> DISABLED", `>>> ${client.commands.filter((cmd) => cmd.category === "👀 Filter").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField(settings.MUSIC ? "<a:Save:922776326086225961>️ **Custom Queue(s)** | <:enabled:921992057206210600> ENABLE" : "<a:Save:922776326086225961>️ **Custom Queue(s)** | <:desabled:922218632417804319> DISABLED", `${client.commands.filter((cmd) => cmd.category === "⚜️ Custom Queue(s)").map((cmd) => `\`${cmd.name}\``).join(", ")}`.substr(0, 1024))
            .setFooter(`Panda_Bot | Made by: Ron\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())

              let embed2 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`<a:settings:923758403766059048> Settings & Owner Commands <a:Owner:921989736804016231>`)
            .setDescription(`<a:settings:923758403766059048> **Settings**\n> ${client.commands.filter((cmd) => cmd.category === "⚙️ Settings").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField("<a:Owner:921989736804016231> **Owner**", `>>> ${client.commands.filter((cmd) => cmd.category === "👑 Owner").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField("<a:programing:922764962592587796> **Programming**", `${client.commands.filter((cmd) => cmd.category === "⌨️ Programming").map((cmd) => `\`${cmd.name}\``).join(", ")}`.substr(0, 1024))
            .setFooter(`Panda_Bot | Made by: Ron\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())

           let embed3 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`<a:Microphone:922770355217653790> Voice & Ranking Commands 📈`)
            .setDescription(`<a:Microphone:922770355217653790> **Voice**${settings.VOICE ? " | <:enabled:921992057206210600> ENABLE" : " | <:desabled:922218632417804319> DISABLED"}\n> ${client.commands.filter((cmd) => cmd.category === "🎤 Voice").map((cmd) => `**Command:**\n>>> \`${cmd.name}\`\n\n**Usage:**\n ${cmd.usage}`)}`)
            .addField("📈 **Ranking**", `>>> ${client.commands.filter((cmd) => cmd.category === "📈 Ranking").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField(settings.SOUNDBOARD ? "<a:Speaker:922775414454243368> **Soundboard** | <:enabled:921992057206210600> ENABLE" : "<a:Speaker:922775414454243368> **Soundboard** | <:desabled:922218632417804319> DISABLED", `${client.commands.filter((cmd) => cmd.category === "🔊 Soundboard").map((cmd) => `\`${cmd.name}\``).join(", ")}`.substr(0, 1024))
            .setFooter(`Panda_Bot | Made by: Ron\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())
            
              let embed4 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`<a:gamer:921990895350468648> Mini Games & Fun Commands <a:funny:922774664130986004>`)
            .setDescription(`️<a:funny:922774664130986004> **Fun**${settings.FUN ? " | <:enabled:921992057206210600> ENABLE" : " | <:desabled:922218632417804319> DISABLED"}\n> ${client.commands.filter((cmd) => cmd.category === "🕹️ Fun").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField(settings.MINIGAMES ? "<a:gamer:921990895350468648> **Mini Games** | <:enabled:921992057206210600> ENABLE" : "<a:gamer:921990895350468648> **Mini Games**| <:desabled:922218632417804319> DISABLED", `> ${client.commands.filter((cmd) => cmd.category === "🎮 MiniGames").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .setFooter(`Panda_Bot | Made by: Ron\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())

            let embed5 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`<a:mods:921990039397892138> Modretion & Setup Commands 💪`)
            .setDescription(`<a:mods:921990039397892138> **Admin**\n> ${client.commands.filter((cmd) => cmd.category === "🚫 Administration").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField("💪 **Setup**", `>>> ${client.commands.filter((cmd) => cmd.category === "💪 Setup").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .setFooter(`Panda_Bot | Made by: Ron\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())

            let embed6 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(settings.NSFW ? "🔞 NSFW Commands 🔞 | <:enabled:921992057206210600> ENABLE" : "🔞 NSFW Commands 🔞 | <:desabled:922218632417804319> DISABLED")
            .setDescription(`> ${client.commands.filter((cmd) => cmd.category === "🔞 NSFW").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .setFooter(`Panda_Bot | Made by: Ron\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())
          
          let embed7 = new Discord.MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setTitle("<a:Save:922776326086225961> Custom Commands")
          .setFooter(`Panda_Bot | Made by: Ron\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
          let cuc = client.customcommands.get(message.guild.id, "commands");
          if (cuc.length < 1) cuc = ["NO CUSTOM COMMANDS DEFINED YET, do it with: `!setup-customcommands`"]
          else cuc = cuc.map(cmd => `\`${cmd.name}\``)
          const items = cuc
            embed7.setTitle(`<a:Save:922776326086225961> **Custom Commands [${cuc[0].includes("NO") ? 0 : items.length}]**`)
            embed7.setDescription(items.join(", "))
        
        let embed8 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`<a:minecraft:922771520596627476> Mincraft`)
            .setDescription(`> ${client.commands.filter((cmd) => cmd.category === "🤞 Mincraft").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .setFooter(`Panda_Bot | Made by: Ron\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());

        let embed9 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`<:search:922771967436800030> Search`)
            .setDescription(`> ${client.commands.filter((cmd) => cmd.category === "🔎 Search").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .setFooter(`Panda_Bot | Made by: Ron\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())


        let menumsg = await message.channel.send(embed, selection)

        function menuselection(menu) {
            switch(menu.values[0]) {
                case "​Information": 
                    menu.reply.send(embed0 , true)
                break;
                case "Music Related": 
                    menu.reply.send(embed1, true)
                break;
                case "Settings & 👑 Owner": 
                    menu.reply.send(embed2, true)
                break;
                case "Voice & 📈 Ranking": 
                    menu.reply.send(embed3, true)
                break;
                case "Mini Games & 🕹️ Fun":
                     menu.reply.send(embed4 ,true)
                break;
                case "Administration & 💪 Setup":
                     menu.reply.send(embed5, true)
                break;
                    case "NSFW​":
                     menu.reply.send(embed6, true)
                break;
                    case "Custom Commands":
                     menu.reply.send(embed7, true)
                break;
                    case "Minecraft":
                     menu.reply.send(embed8, true)
                break;
                    case "Search":
                     menu.reply.send(embed9, true)
                break;


            }
        }

        client.on("clickMenu", (menu) => {
            if(menu.message.id == menumsg.id) {
                if(menu.clicker.user.id == message.author.id) menuselection(menu)
                else menu.reply.send("<a:no:921989165242003476> you are not allowed to pick something", true)
            }
        })
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<a:no:900373243939131422> An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}