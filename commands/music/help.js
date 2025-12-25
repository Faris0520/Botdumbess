module.exports = {
  name: 'help',
  aliases: [],
  async execute({ message, MessageEmbed }) {
    const helpembed = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor(
        "Botdumbess",
        "https://cdn.discordapp.com/avatars/727354971707932702/059bfc408f82dece8c540347bd17fa92.webp?size=1024"
      )
      .setTitle("Command List").setDescription(`
_**==> New Command**_
 \`a.ig\` \`a.ytdl\` \`a.ytmp3\` 
 \` (This command have limitation)\`

**Images**
 \`a.search\` \`a.ss\` \`a.reddit\`
 \`a.images\` \`a.avatar\` \`a.wikihow\`

**Misc**
 \`a.ask\` \`a.morse\` \`a.wink\`
 \`a.adzan\` \`a.choose\` \`a.wangy\` 
 \`a.anime\` \`a.respect\` \`a.kbbi\`

**Tools**
 \`a.ping\` \`a.invite\` \`a.userinfo\`
 \`a.say\` \`a.echo\` \`a.sudo\`

 
Sebenarnya masih bnyk, tpi *Malas* nulis. Coba2 aja, atau tanya ke owner.
 `);
    helpembed.setThumbnail(
      "https://cdn.discordapp.com/avatars/727354971707932702/059bfc408f82dece8c540347bd17fa92.webp?size=1024"
    );
    helpembed.setFooter("bot", message.author.avatarURL);
    message.channel.send(helpembed).catch(console.error);
  }
};
