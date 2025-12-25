module.exports = {
  name: 'say',
  aliases: [],
  async execute({ message, input, owner }) {
    if (message.author.id == owner) {
      message.delete({ timeout: 100 });
      message.channel.send(input);
    } else {
      if (!input)
        return message.channel.send(
          `mau ngomong ap, ${message.author.username}?`
        );
      message.channel.send(`${input} \n-# ${message.author.username}`);
    }
  }
};
