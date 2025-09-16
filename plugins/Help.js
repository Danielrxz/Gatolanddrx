const handler = async (msg, { conn }) => {
  const chatId = msg.key.remoteJid;
  const pref = global.prefixes?.[0] || ".";

  // Reacción al iniciar
  await conn.sendMessage(chatId, {
    react: { text: "😼", key: msg.key }
  });

  const caption = `
╭───〔 *📜 MENÚ GATOLAND* 〕───╮
│😼 *Hola, nombre*  
│🚀 *Total comandos:*{46}
│⚔️ *Bot:* Gatoland by Danielrxz
╰───────────────────────╯

╭─❖ *🎯 GRUPO*
│• .abrirgrupo
│• .cerrargrupo
│• .kick
│• .invocar
│• .tag
│• .linkgrupo
│• .infogrupo
│• .reglas
│• .antilink
╰───────────────╯

╭─❖ *📦 DESCARGAS*
│• .play
│• .play2
│• .ytmp4
│• .mediafire
│• .fb (Facebook)
│• .ig (Instagram)
│• .tiktok
│• .spotify
│• .yts
│• .APK
╰───────────────╯

╭─❖ *🎭 DIVERSIÓN*
│• .kiss
│• .slap
│• .memes
╰───────────────╯

╭─❖ *🛠️ TOOLS*
│• .tourl
│• .gifvideo
│• .hd
│• .tts
│• .whatmusic
╰───────────────╯

╭─❖ *🤖 IA & INFO*
│• .chatgpt
│• .ping
│• .perfil
│• .owner
│• .code
│• .help
╰────────────────╯

💬 *Recuerda usar el prefijo "." antes de cada comando.*
🔒 *Algunos comandos requieren permisos especiales.*

✨ *By Danielrxz — Gatoland Bot* ⚔️
`.trim();

  await conn.sendMessage(chatId, {
    video: { url: 'https://qu.ax/mpLHp.mp4' },
    caption
  }, { quoted: msg });
};

handler.command = ['info', 'help'];
handler.tags = ['info'];
handler.help = ['info'];
handler.register = true;

module.exports = handler;
