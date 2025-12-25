module.exports = {
  name: 'ss',
  aliases: [],
  async execute({ message, input, Discord }) {
    if (!input) return message.channel.send("Masukkan url!");
    const axios = require("axios");
    const url = `https://api.screenshotmachine.com/?key=b3ce7b&url=${input}&dimension=1920x1080&delay=5000&cacheLimit=0`;
    let a = new Discord.MessageAttachment(url, `image.jpg`);
    message.channel.send(a);
  }
};
