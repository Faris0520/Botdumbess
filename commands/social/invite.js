module.exports = {
  name: 'invite',
  aliases: [],
  async execute({ message }) {
    message.channel.send(
      `https://discord.com/oauth2/authorize?client_id=727354971707932702&permissions=8&scope=bot \nthx <3 <@${message.author.id}>`
    );
  }
};
