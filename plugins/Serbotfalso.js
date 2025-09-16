const handler = async (msg, { conn, command }) => {
  const chatId = msg.key.remoteJid;

  await conn.sendMessage(chatId, {
    react: { text: "🔨", key: msg.key }
  });

  const texto = `
🐱 *Sistema en desarrollo...* 🦥

💡 El sistema de *subbots* aún no está disponible en *Gatoland*.  
Estamos trabajando en ello para que funcione perfectamente.  
🕒 Estimamos que tomará entre *2 a 3 meses más* para estar listo.

✨ Gracias por tu paciencia y por ser parte del desarrollo de *Gatoland* 👻
`.trim();

  await conn.sendMessage(chatId, {
    image: { url: "https://qu.ax/RdtUa.jpg" },
    caption: texto
  }, { quoted: msg });
};

handler.command = ["code", "sercode", "qr", "serbot", "jadibot"];
handler.tags = ["info"];
handler.help = ["code", "sercode", "qr", "serbot", "jadibot"];
handler.register = false;

module.exports = handler;
