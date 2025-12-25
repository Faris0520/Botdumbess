module.exports = {
  name: 'serverinfo',
  aliases: [],
  async execute({ message, Discord, MessageEmbed }) {
    const d = new Date(message.guild.createdTimestamp);
    let day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    let month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth();
    const guild = message.guild;
    const Embed = new MessageEmbed()
      .setTitle(message.guild.name)
      .setThumbnail(message.guild.iconURL())
      .setColor("BLUE")
      .addFields([
        { name: "Owner", value: `<@${guild.ownerID}>`, inline: true },
        { name: "Region", value: guild.region, inline: true },
        { name: "Members", value: guild.memberCount, inline: true },
        { name: "Highest Role", value: guild.roles.highest, inline: true },
      ])
      .setFooter(`Server Created = ${day}/${month}/${d.getFullYear()}`);
    message.channel.send(Embed);
  }
};
