const Discord = require("discord.js");
const ms = require("ms")
module.exports = {
    name: "hack",
    aliases: ["hax"],
    category: "🕹️ Fun",
    description: "Only for fun",
    usage: "hack @user",  
run: async (client, message, args, cmduser, text, prefix) => {
    const hacked = message.mentions.users.first();
    const user = message.mentions.users.first();
    if(user == client.users.cache.get(message.author.id))
    {
      return message.channel.send(" ok, You are hacked Pick someone else")
    }
            function wait(ms){
            let start = new Date().getTime();
            let end = start;
            while(end < start + ms) {
              end = new Date().getTime();
           }
         }

//====================embed





if(!user)
{
  return message.reply("Who to hack? Please Mention him");
}
const prompt = await message.channel.send(new Discord.MessageEmbed()
.setColor('RANDOM')
.setTitle(`Hacking ${user ? hacked.username : hacked} now...`)
);



    
   await wait(2700);
     await  prompt.edit(`[▖] Finding discord login... (2fa bypassed)`);
     await wait(2700);
     await  prompt.edit(`[▘] Found: \n**Email:** \`${hacked.username}***@gmail.com\` \n**Password:** \`1234567890\``);
     await  wait(2700);
     await  prompt.edit('[▝] Fetching dms with closest friends (if there are any friends at all)');
     await  wait(2700);
     await prompt.edit('[▗] **Last DM:** "I hope no one sees my nudes folder"');
     await  wait(2700);
     await  prompt.edit(`[▖] Finding most common word...`);
    await  wait(2700);
     await  prompt.edit('[▘] `const mostCommonWord: string = \'small\';`');
     await  wait(2700);
   await prompt.edit('[▝] Injecting trojan virus into discriminator #6218');
   await  wait(2700);
   await prompt.edit('[▗] Virus injected, emotes stolen');
    await wait(2700);
   await  prompt.edit('[▖] Setting up Epic Store account..');
   await wait(2700);
   await  prompt.edit('[▘] Hacking Epic Store account....');
   await  wait(2700);
   await  prompt.edit('[▝] Finding IP address');
   await  wait(2700);
   await  prompt.edit('[▗] **IP address:** 127.0.0.1:8100');
   await  wait(2700);
   await  prompt.edit('[▖] Selling data to the Government...');
   await  wait(2700);
   await  prompt.edit('[▘] Reporting account to Discord for breaking TOS...');
   await  wait(2700);
   await  prompt.edit(`[▝] Finished hacking ${user ? hacked.username : hacked}`);
  await   wait(2700);
  let embed = new Discord.MessageEmbed()
  .setDescription(`Hack of ${user ? hacked.username : hacked} is just completed`)
  .setImage("https://media1.tenor.com/images/5ba5501d9ee356cc0c478daa57306c19/tenor.gif?itemid=20964053");
  await prompt.delete
   await  message.channel.send(embed);
    

  }
}