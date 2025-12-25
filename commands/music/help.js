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
 \`h.ig\` \`h.ytdl\` \`h.ytmp3\` 
 \` (This command have limitation)\`

**Images**
 \`h.search\` \`h.ss\` \`h.reddit\`
 \`h.images\` \`h.avatar\` \`h.wikihow\`

**Misc**
 \`h.ask\` \`h.morse\` \`h.wink\`
 \`h.adzan\` \`h.choose\` \`h.wangy\` 
 \`h.anime\` \`h.respect\` \`h.kbbi\`

**Tools**
 \`h.ping\` \`h.invite\` \`h.userinfo\`
 \`h.say\` \`h.echo\` \`h.sudo\`

 
Sebenarnya masih bnyk, tpi *Malas* nulis. Coba2 aja, atau tanya ke owner.
 `);
    helpembed.setThumbnail(
      "https://cdn.discordapp.com/avatars/727354971707932702/059bfc408f82dece8c540347bd17fa92.webp?size=1024"
    );
    helpembed.setFooter("bot", message.author.avatarURL);
    message.channel.send(helpembed).catch(console.error);
  }
};
