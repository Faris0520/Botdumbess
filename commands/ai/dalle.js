module.exports = {
  name: 'dalle',
  aliases: [],
  async execute({ message, input, Discord }) {
    const OpenAI = require('openai');
    const openai = new OpenAI({ apiKey: process.env.OPENAI });
    if (!input) return message.channel.send('Mohon berikan pertanyaan atau pesan untuk AI.');
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `${input}`,
      n: 1,
      size: '1024x1024',
    });
    const image = new Discord.MessageAttachment(`${response.data[0].url}`, `${input}.png`);
    message.channel.send(image);
  }
};