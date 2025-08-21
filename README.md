# Discord Monitoring Bot

A Node.js Discord bot that monitors and logs message deletions and voice channel activity.

## Features
- 🗑️ **Message Deletion Monitoring**: Logs deleted messages with content, author, and timestamp.
- 🔊 **Voice Channel Activity**: Tracks when users join, leave, or switch voice channels.
- ✨ **Rich Embeds**: Beautifully formatted notifications with color coding.
- 🔒 **Secure Configuration**: Uses environment variables for bot token and log channel.
- ⚡ **Real-time Monitoring**: Instant notifications for all monitored events.

## Prerequisites
- Node.js (version 16.0.0 or higher)
- A Discord bot token
- A Discord server where you have administrator permissions

## Setup Instructions

### 1. Create a Discord Bot
1. Go to the [Discord Developer Portal].  
2. Click **"New Application"** → name your bot.  
3. Navigate to the **"Bot"** section → click **"Add Bot"**.  
4. Under **Token**, click **"Copy"** to save your bot token.  
5. Under **Privileged Gateway Intents**, enable:
   - **Message Content Intent**
   - **Server Members Intent** (optional, for richer user information)

### 2. Invite the Bot to Your Server
1. Go to **OAuth2 → URL Generator** section.  
2. Select scope: `bot`.  
3. Grant these permissions:
   - View Channels
   - Send Messages
   - Read Message History
   - Connect (for voice channel monitoring)  
### 4. Copy the generated invite URL → paste in browser → select your server → authorize.

### 3. Configure Environment Variables
Create a file named `.env` in the project root with the following content:
```env
BOT_TOKEN=your_bot_token_here
LOG_CHANNEL_ID=your_log_channel_id_here
```

- To get `LOG_CHANNEL_ID`, enable Developer Mode in Discord settings → right-click your desired channel → Copy ID.

### 5. Run the Bot
```
npm start
```

Or:
```
node index.js
```

### Preview

### Deleted Message
<img width="760" height="267" alt="Screenshot 2025-08-21 212225" src="https://github.com/user-attachments/assets/efc70f42-f587-4e13-9218-982cc3cbd25f" />

### Voice Activity
<img width="650" height="604" alt="Screenshot 2025-08-21 212156" src="https://github.com/user-attachments/assets/66768419-7c25-40fe-8277-0b7ca0b32d9a" />



