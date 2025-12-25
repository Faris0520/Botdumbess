module.exports = {
  name: 'o1',
  aliases: [],
  async execute({ message, input }) {
    const OpenAI = require('openai');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    if (!input) return message.channel.send('Mohon berikan pertanyaan atau pesan untuk AI.');
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: `${input}` }],
      model: 'o1-mini-2024-09-12',
    });
    const responseText = completion.choices[0].message.content + '\n-# o1-mini-2024-09-12';
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