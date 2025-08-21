# Discord Monitoring Bot

A Node.js Discord bot that monitors and logs message deletions and voice channel activity.

## Features

- 🗑️ **Message Deletion Monitoring**: Logs deleted messages with content, author, and timestamp
- 🔊 **Voice Channel Activity**: Tracks when users join, leave, or switch voice channels
- 📊 **Rich Embeds**: Beautiful formatted notifications with color coding
- 🔒 **Secure Configuration**: Uses environment variables for sensitive data
- ⚡ **Real-time Monitoring**: Instant notifications for all monitored events

## Prerequisites

- Node.js (version 16.0.0 or higher)
- A Discord bot token
- A Discord server where you have administrator permissions

## Setup Instructions

### 1. Create a Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section in the left sidebar
4. Click "Add Bot"
5. Under "Token", click "Copy" to get your bot token
6. Under "Privileged Gateway Intents", enable:
   - Message Content Intent
   - Server Members Intent (optional, for better user info)

### 2. Invite Bot to Your Server

1. Go to the "OAuth2" > "URL Generator" section
2. Select these scopes:
   - `bot`
3. Select these bot permissions:
   - View Channels
   - Send Messages
   - Read Message History
   - Connect (for voice channel monitoring)
4. Copy the generated URL and open it in your browser
5. Select your server and authorize the bot

### 3. Configure Environment Variables

1. Copy the provided `.env` file
2. Replace `BOT_TOKEN` with your actual bot token
3. Replace `LOG_CHANNEL_ID` with the ID of the channel where you want logs:
   - Enable Developer Mode in Discord (User Settings > Advanced > Developer Mode)
   - Right-click on your desired log channel
   - Select "Copy ID"

### 4. Install Dependencies

```bash
npm install discord.js dotenv
