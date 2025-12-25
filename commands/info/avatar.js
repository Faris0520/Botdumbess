module.exports = {
  name: 'avatar',
  aliases: [],
  async execute({ message, MessageEmbed }) {
    const user = message.mentions.users.first() || message.author;
    const em = new MessageEmbed()
      .setTitle(`${user.tag}`)
      .setImage(user.avatarURL({ size: 1024, dynamic: "GIF" }))
      .setColor(`BLUE`)
      .setFooter(`Requested by ${message.author.tag}`);
    message.channel.send(em);
  }
};
