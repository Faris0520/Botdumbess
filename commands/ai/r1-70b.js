module.exports = {
  name: 'r1-70b',
  aliases: [],
  async execute({ message, input }) {
    const OpenAI = require('openai');
    const openai = new OpenAI({ baseURL: 'https://api.deepinfra.com/v1/openai', apiKey: process.env.DEEP });
    function formatThinkBlockquote(text) {
      return text.replace(/<think>([\s\S]*?)<\/think>/g, (match, content) => {
        return content.split('\n').map((line) => (line.trim() ? `-# ${line}` : '')).join('\n');
      });
    }
    if (!input) return message.channel.send('Mohon berikan pertanyaan atau pesan untuk AI.');
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: input }],
        model: 'deepseek-ai/DeepSeek-R1-Distill-Llama-70B',
      });
      let responseText = completion.choices[0].message.content + '\n-# deepseek-ai/DeepSeek-R1-Distill-Llama-70B';
      responseText = formatThinkBlockquote(responseText);
      if (responseText.length > 1999) {
        let partLength = 1999;
        for (let i = 0; i < responseText.length; i += partLength) {
          const part = responseText.substring(i, i + partLength);
          message.channel.send(part);
        }
      } else {
        message.channel.send(responseText);
      }
    } catch (error) {
      console.error('Error saat mengakses AI:', error);
      message.channel.send('Terjadi kesalahan saat memproses permintaan AI.');
    }
  }
};