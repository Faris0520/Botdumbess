# Botdumbess

A simple discord bot.

<img src="https://github.com/user-attachments/assets/60250ee6-6bb4-4eb2-9334-49f6adae45e9" width=500>

https://discord.com/oauth2/authorize?client_id=727354971707932702&permissions=8&scope=bot

> [!WARNING]
> ⚠️ **This Discord.js version of this bot is deprecated** 
> This bot uses discord.js v12. Some features or syntax may not work with newer Discord API versions. For best results, use Node.js v12–14 and refer to the [discord.js v12 documentation](https://discordjs.guide/additional-info/changes-in-v12.html).

## ✨ Features

- **Modular command system**: Easily add or remove commands in the `commands/` folder.
- **AI integration**: Chat with AI, generate images, and more.
- **Fun & utility tools**: Roasts, Google search, IP lookup, and more.
- **Music & media**: Download YouTube videos as MP3/MP4.
- **Image tools**: Search images, take screenshots, get wallpapers.
- **Prayer times**: Get adzan times for Indonesian cities.

## 📝 Command List

### General
- `h.help` — Show all commands and descriptions
- `h.ping` — Check bot latency
- `h.invite` — Get the bot invite link

### User
- `h.userinfo` — Info about you or a mentioned user
- `h.avatar` — Show user avatar
- `h.serverinfo` — Info about the current server

### AI
- `h.ai`, `h.o1`, `h.4o`, `h.claude` — Chat with AI
- `h.dalle` — Generate images with DALL-E

### Fun
- `h.roast` — Roast your GitHub profile
- `h.respect` — Show respect in the channel
- `h.choose` — Let the bot decide between options

### Images
- `h.images` — Search or get random images
- `h.ss` — Screenshot a URL
- `h.wallpaper` — Get a random wallpaper

### Music
- `h.ytdl` — Download YouTube videos (MP4)
- `h.ytmp3` — Download YouTube audio (MP3)

### Utility
- `h.adzan` — Prayer times for Indonesian cities
- `h.ip` — Info about an IP address
- `h.google` — Google search results


## 🚀 Build & Setup Guide

1. **Clone the repository**
	```sh
	git clone https://github.com/Faris0520/botdumbess.git
	cd botdumbess
	```

2. **Install dependencies**
	```sh
	npm install
	```

3. **Configure environment variables**
	- Create `.env` in the root of the project
	- Add your Discord bot token:
	  ```env
	  TOKEN=your-discord-bot-token
	  ```
    - Optionally, add API keys for OpenAI, Anthropic, and Deep if you plan to use AI features:
      ```env
      OPENAI_API_KEY=your-openai-api-key
      ANTHROPIC_API_KEY=your-anthropic-api-key
      DEEPSEEK_API_KEY=your-deepseek-api-key
      ```
      You can obtain these keys from 
      - https://platform.openai.com/, 
      - https://console.anthropic.com/
      - https://deepinfra.com/

4. **Run the bot**
	```sh
	node index.js
	```

---

## 🤝 Contributing

Contributions are welcome! Fork the repo, make your changes, and submit a pull request.

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

Enjoy using **Botdumbess**! For questions or suggestions, open an issue or reach out.