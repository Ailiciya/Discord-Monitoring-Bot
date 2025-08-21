# Discord Monitoring Bot

A Node.js Discord bot that monitors and logs message deletions and voice channel activity.

## Features
- 🗑️ **Message Deletion Monitoring**: Logs deleted messages with content, author, and timestamp.
- 🔊 **Voice Channel Activity**: Tracks when users join, leave, or switch voice channels.
- ✨ **Rich Embeds**: Beautifully formatted notifications with color coding.
- 🔒 **Secure Configuration**: Uses environment variables for bot token and log channel.
- ⚡ **Real-time Monitoring**: Instant notifications for all monitored events.

## ⚠️ Important Note
This bot is designed to run locally on your own device.  
It will only stay online as long as your terminal (command prompt) is open and running the bot.  
For 24/7 uptime, you need to deploy it to a server or hosting service.

## Prerequisites
- Node.js (version 16.0.0 or higher)
- A Discord bot token
- A Discord server where you have administrator permissions

## Setup Instructions

### 1. Create a Discord Bot
1. Go to the [Discord Developer Portal](https://discord.com/developers)  
   → This is where you can register and manage your bot application.  
2. Click **"New Application"** → give your bot a name, then click **Create**.  
3. In the left sidebar, go to the **Bot** section → click **Add Bot**.  
4. Under **Token**, click **Reset Token** (if needed), then **Copy** to save your bot token.  
   ⚠️ **Do not share this token** — it grants full access to your bot.  
5. Scroll down to **Privileged Gateway Intents** and enable:  
   - **Presence Intent**  
   - **Server Members Intent** (optional, for richer user information)  
   - **Message Content Intent**  

### 2. Invite the Bot to Your Server
1. Go to **OAuth2 → URL Generator** section.  
2. Select scope: `bot`.  
3. Grant these permissions:
   - View Channels
   - Send Messages
   - Read Message History
   - Connect (for voice channel monitoring)  
4. Copy the generated invite URL → paste in browser → select your server → authorize.

### 3. Configure Environment Variables
Create a file named `.env` in the project root with the following content:
```env
BOT_TOKEN=your_bot_token_here
LOG_CHANNEL_ID=your_log_channel_id_here
```

- To get `LOG_CHANNEL_ID`, enable Developer Mode in Discord settings → right-click your desired channel → Copy ID.


### 4. How To Run the Bot

Open a terminal (Command Prompt on Windows, or Terminal on Mac/Linux), then:

### Go to your project folder
```
D:
cd DiscordBot
```

### (Optional, already created) Initialize package.json
```
npm init -y
```

### Install dependencies
```
npm install discord.js dotenv express
```

### Run the bot
```
node index.js
```

### And if everything works
```
✅ Bot is ready! Logged in as {Your Bot Name # 1234}
📊 Monitoring 1 server(s)
```
### Preview

### Deleted Message
<img width="760" height="267" alt="Screenshot 2025-08-21 212225" src="https://github.com/user-attachments/assets/efc70f42-f587-4e13-9218-982cc3cbd25f" />

### Voice Activity
<img width="650" height="604" alt="Screenshot 2025-08-21 212156" src="https://github.com/user-attachments/assets/66768419-7c25-40fe-8277-0b7ca0b32d9a" />



