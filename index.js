const { Client, GatewayIntentBits, EmbedBuilder, Events } = require('discord.js');
require('dotenv').config();

// Create a new client instance with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// Bot configuration from environment variables
const BOT_TOKEN = process.env.BOT_TOKEN;
const LOG_CHANNEL_ID = process.env.LOG_CHANNEL_ID;

// Validate required environment variables
if (!BOT_TOKEN) {
    console.error('❌ BOT_TOKEN is required in environment variables');
    process.exit(1);
}

if (!LOG_CHANNEL_ID) {
    console.error('❌ LOG_CHANNEL_ID is required in environment variables');
    process.exit(1);
}

// Bot ready event
client.once(Events.ClientReady, (readyClient) => {
    console.log(`✅ Bot is ready! Logged in as ${readyClient.user.tag}`);
    console.log(`📊 Monitoring ${readyClient.guilds.cache.size} server(s)`);
});

// Message deletion event handler
client.on(Events.MessageDelete, async (message) => {
    try {
        // Skip if message is from a bot or if content is not available
        if (message.author?.bot) return;
        
        // Get the log channel
        const logChannel = client.channels.cache.get(LOG_CHANNEL_ID);
        if (!logChannel) {
            console.error('❌ Log channel not found or bot lacks access');
            return;
        }

        // Create embed for deleted message
        const deleteEmbed = new EmbedBuilder()
            .setColor('#ff0000') // Red color for deletions
            .setTitle('🗑️ Message Deleted')
            .setTimestamp()
            .addFields(
                {
                    name: '👤 Author',
                    value: message.author ? `${message.author.tag} (${message.author.id})` : 'Unknown User',
                    inline: true
                },
                {
                    name: '📍 Channel',
                    value: message.channel ? `#${message.channel.name} (${message.channel.id})` : 'Unknown Channel',
                    inline: true
                },
                {
                    name: '🕒 Deleted At',
                    value: `<t:${Math.floor(Date.now() / 1000)}:F>`,
                    inline: true
                }
            );

        // Add message content if available
        if (message.content) {
            deleteEmbed.addFields({
                name: '💬 Message Content',
                value: message.content.length > 1024 ? 
                    message.content.substring(0, 1021) + '...' : 
                    message.content || '*No text content*'
            });
        } else {
            deleteEmbed.addFields({
                name: '💬 Message Content',
                value: '*Content not available (message may be too old or contain only embeds/attachments)*'
            });
        }

        // Add attachments info if any
        if (message.attachments && message.attachments.size > 0) {
            const attachmentList = message.attachments.map(att => att.name).join(', ');
            deleteEmbed.addFields({
                name: '📎 Attachments',
                value: attachmentList
            });
        }

        // Send the embed to log channel
        await logChannel.send({ embeds: [deleteEmbed] });

    } catch (error) {
        console.error('❌ Error handling message deletion:', error);
    }
});

// Voice state update event handler
client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
    try {
        // Get the log channel
        const logChannel = client.channels.cache.get(LOG_CHANNEL_ID);
        if (!logChannel) {
            console.error('❌ Log channel not found or bot lacks access');
            return;
        }

        const member = newState.member || oldState.member;
        if (!member || member.user.bot) return; // Skip bots

        let embed;
        let title;
        let color;
        let description;

        // User joined a voice channel
        if (!oldState.channel && newState.channel) {
            title = '🔊 User Joined Voice Channel';
            color = '#00ff00'; // Green
            description = `${member.user.tag} joined voice channel`;
            
            embed = new EmbedBuilder()
                .setColor(color)
                .setTitle(title)
                .setDescription(description)
                .setTimestamp()
                .addFields(
                    {
                        name: '👤 User',
                        value: `${member.user.tag} (${member.user.id})`,
                        inline: true
                    },
                    {
                        name: '🔊 Voice Channel',
                        value: `${newState.channel.name} (${newState.channel.id})`,
                        inline: true
                    },
                    {
                        name: '🕒 Joined At',
                        value: `<t:${Math.floor(Date.now() / 1000)}:F>`,
                        inline: true
                    }
                );
        }
        // User left a voice channel
        else if (oldState.channel && !newState.channel) {
            title = '🔇 User Left Voice Channel';
            color = '#ff0000'; // Red
            description = `${member.user.tag} left voice channel`;
            
            embed = new EmbedBuilder()
                .setColor(color)
                .setTitle(title)
                .setDescription(description)
                .setTimestamp()
                .addFields(
                    {
                        name: '👤 User',
                        value: `${member.user.tag} (${member.user.id})`,
                        inline: true
                    },
                    {
                        name: '🔊 Voice Channel',
                        value: `${oldState.channel.name} (${oldState.channel.id})`,
                        inline: true
                    },
                    {
                        name: '🕒 Left At',
                        value: `<t:${Math.floor(Date.now() / 1000)}:F>`,
                        inline: true
                    }
                );
        }
        // User switched voice channels
        else if (oldState.channel && newState.channel && oldState.channel.id !== newState.channel.id) {
            title = '🔄 User Switched Voice Channels';
            color = '#ffff00'; // Yellow
            description = `${member.user.tag} switched voice channels`;
            
            embed = new EmbedBuilder()
                .setColor(color)
                .setTitle(title)
                .setDescription(description)
                .setTimestamp()
                .addFields(
                    {
                        name: '👤 User',
                        value: `${member.user.tag} (${member.user.id})`,
                        inline: true
                    },
                    {
                        name: '📤 From Channel',
                        value: `${oldState.channel.name} (${oldState.channel.id})`,
                        inline: true
                    },
                    {
                        name: '📥 To Channel',
                        value: `${newState.channel.name} (${newState.channel.id})`,
                        inline: true
                    },
                    {
                        name: '🕒 Switched At',
                        value: `<t:${Math.floor(Date.now() / 1000)}:F>`,
                        inline: true
                    }
                );
        }

        // Send the embed if it was created
        if (embed) {
            await logChannel.send({ embeds: [embed] });
        }

    } catch (error) {
        console.error('❌ Error handling voice state update:', error);
    }
});

// Error handling
client.on('error', error => {
    console.error('❌ Discord client error:', error);
});

process.on('unhandledRejection', error => {
    console.error('❌ Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
    console.error('❌ Uncaught exception:', error);
    process.exit(1);
});

// Login to Discord
client.login(BOT_TOKEN).catch(error => {
    console.error('❌ Failed to login to Discord:', error);
    process.exit(1);
});
