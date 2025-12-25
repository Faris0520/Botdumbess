module.exports = {
  name: 'clear',
  aliases: [],
  async execute({ message, args, input, owner }) {
    // Bot Owner Only
    if (message.author.id !== owner)
      return message.channel.send(`<@${owner}>`);
    if (!input) return message.channel.send("masukkan jumlah!");
    message
      .delete()
      .then(() => {
        message.channel.bulkDelete(input).then((messages) => {
          message.channel
            .send(`Cleared ${messages.size} message(s).`)
            .then((botMessage) => {
              setTimeout(function () {
                botMessage.delete();
              }, 3000);
            });
        });
      })
      .catch(console.error);
  }
};
