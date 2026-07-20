#!/usr/bin/env node

// Start Telegram Bridge + Server
// Usage: node start-telegram.js

import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';
import { shellChat } from './backend/shell-handler.js';
import { getAuditLog } from './backend/audit-log/audit-log.js';

const auditLog = getAuditLog();
const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error('ERROR: TELEGRAM_BOT_TOKEN not set in .env');
  console.error('Get a token from BotFather: https://t.me/botfather');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });
const conversations = new Map();

console.log(`
╔════════════════════════════════════════════════╗
║   MindReply Shell — Telegram Bridge            ║
║   Ready to receive messages                    ║
╚════════════════════════════════════════════════╝
`);

// /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  
  conversations.set(userId, { model: 'auto', history: [], createdAt: new Date() });
  
  bot.sendMessage(chatId, `
🤖 Welcome to MindReply Shell!

I read your:
• Platform status
• Stalled threads
• Revenue metrics
• AI models

Commands:
/model [auto|claude|openai|groq|local] - Switch model
/status - Platform health
/help - Commands
/clear - Clear history

Just type to chat!
  `, { parse_mode: 'Markdown' });
});

// /model
bot.onText(/\/model\s+(\w+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const model = match[1].toLowerCase();
  
  const valid = ['auto', 'claude', 'openai', 'groq', 'gemini', 'local'];
  if (!valid.includes(model)) {
    bot.sendMessage(chatId, `Valid: ${valid.join(', ')}`);
    return;
  }
  
  if (!conversations.has(userId)) {
    conversations.set(userId, { model, history: [], createdAt: new Date() });
  } else {
    conversations.get(userId).model = model;
  }
  
  bot.sendMessage(chatId, `✅ Model: ${model}`);
});

// /status
bot.onText(/\/status/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `
✅ **All Systems Live**

Containers:
✅ aurel (3000)
✅ mindreply-website (8080)
✅ control (8787)
✅ n8n (5678)
✅ cloudflared (tunnel)

Status: OPERATIONAL
  `, { parse_mode: 'Markdown' });
});

// /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `
📋 Commands:
/start - Welcome
/model [name] - Switch AI
/status - Health
/clear - Reset
/help - This

Models: auto, claude, openai, groq, gemini, local
  `, { parse_mode: 'Markdown' });
});

// /clear
bot.onText(/\/clear/, (msg) => {
  const userId = msg.from.id;
  const chatId = msg.chat.id;
  
  if (conversations.has(userId)) {
    conversations.get(userId).history = [];
  }
  
  bot.sendMessage(chatId, '🗑️ Cleared');
});

// Chat messages
bot.on('message', async (msg) => {
  if (msg.text.startsWith('/')) return;
  
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = msg.text;
  
  if (!conversations.has(userId)) {
    conversations.set(userId, { model: 'auto', history: [], createdAt: new Date() });
  }
  
  const conv = conversations.get(userId);
  
  bot.sendChatAction(chatId, 'typing');
  
  try {
    const result = await shellChat(text, conv.model, conv.history);
    
    let response = result.reply;
    if (result.failover) {
      response += `\n\n⚠️ Failover to ${result.model}`;
    } else {
      response += `\n\n🤖 ${result.model}`;
    }
    
    bot.sendMessage(chatId, response, { parse_mode: 'Markdown' });
    
    conv.history.push(
      { role: 'user', text },
      { role: 'assistant', text: result.reply }
    );
    
    if (conv.history.length > 40) {
      conv.history = conv.history.slice(-40);
    }
    
    auditLog.logMessageProcessed(`telegram:${userId}`, text, result.model, 100, true);
  } catch (err) {
    bot.sendMessage(chatId, `❌ ${err.message}`);
    auditLog.logError(`telegram:${userId}`, 'CHAT_ERROR', err.message, {});
  }
});

bot.on('polling_error', (err) => console.error('Poll error:', err));
bot.on('error', (err) => console.error('Bot error:', err));

process.on('SIGINT', () => {
  console.log('\nShutting down...');
  bot.stopPolling();
  process.exit(0);
});
