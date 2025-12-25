module.exports = {
  name: 'servers',
  aliases: [],
  async execute({ message, client, MessageEmbed }) {
    let p = new MessageEmbed()
      .setColor("GOLD")
      .setAuthor(`Servers im join. Thanks for inviting!`)
      .setDescription(
        client.guilds.cache.map((guild) => guild.name).join("*,\n*")
      )
      .setTimestamp()
      .setFooter(`Noob bot`);
    message.channel.send(p).catch(console.error);
  }
};
