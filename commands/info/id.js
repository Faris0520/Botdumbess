module.exports = {
  name: 'id',
  aliases: [],
  async execute({ message }) {
    const target = message.mentions.members.first()?.user.id;
    if (!target) return message.channel.send("Unkown member");
    message.channel.send(target);
  }
};
