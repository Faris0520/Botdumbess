module.exports = {
  name: 'ai',
  aliases: [],
  async execute({ message, input }) {
    const OpenAI = require('openai');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    if (!input) return message.channel.send('Mohon berikan pertanyaan atau pesan untuk AI.');
    if (message.attachments.size > 0) {
      const attachment = message.attachments.first();
      const imageUrl = attachment.url;
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `${imageUrl}\n${input}. Ketika mengirimkkan kode latex, pastikan menggunakan snippet kode agar lebih rapi.` }],
        model: 'gpt-4.1',
      });
      const responseText = `${completion.choices[0].message.content}\n-# GPT-4.1`;
      if (responseText.length > 1999) {
        let partLength = 1999;
        for (let i = 0; i < responseText.length; i += partLength) {
          const part = responseText.substring(i, i + partLength);
          message.channel.send(part);
        }
      } else {
        message.channel.send(responseText);
      }
    } else {
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `${input}. Ketika mengirimkkan kode latex, pastikan menggunakan snippet kode agar lebih rapi` }],
        model: 'gpt-4.1',
      });
      const responseText = `${completion.choices[0].message.content}\n-# GPT-4.1`;
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
  }
};