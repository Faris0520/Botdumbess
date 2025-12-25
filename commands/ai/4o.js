module.exports = {
  name: '4o',
  aliases: [],
  async execute({ message, input }) {
    const OpenAI = require('openai');
    const openai = new OpenAI({ apiKey: process.env.OPENAI });
    if (!input) return message.channel.send('Mohon berikan pertanyaan atau pesan untuk AI.');
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: `${input}` }],
      model: 'gpt-4o',
    });
    const responseText = `${completion.choices[0].message.content}\n-# GPT-4o`;
    if (responseText.length > 1999) {
      let partLength = 1999;
      for (let i = 0; i < responseText.length; i += partLength) {
        const part = responseText.substring(i, i + partLength);
        message.channel.send(part);
      }
    } else {
      message.channel.send(responseText);
    }
  }
};