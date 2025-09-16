const fetch = require("node-fetch");

const handler = async (msg, { conn, args, command }) => {
  const chatId = msg.key.remoteJid;
  const text = args.join(" ");
  const pref = global.prefixes?.[0] || ".";

  if (!text) {
    return conn.sendMessage(chatId, {
      text: `⚠️ *Uso incorrecto.*\n⚔️ *Ejemplo:* \`${pref}${command} Instagram\``
    }, { quoted: msg });
  }

  await conn.sendMessage(chatId, {
    react: { text: "⏳", key: msg.key }
  });

  try {
    const apiUrl = `https://api.neoxr.eu/api/apk?q=${encodeURIComponent(text)}&no=1&apikey=russellxz`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error de la API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.status || !data.data || !data.file?.url) {
      throw new Error("No se pudo obtener información del APK.");
    }

    const apkInfo = data.data;
    const apkFile = data.file;

    const fileRes = await fetch(apkFile.url);
    if (!fileRes.ok) {
      throw new Error("No se pudo descargar el archivo APK.");
    }

    const fileBuffer = await fileRes.buffer();

    const caption = `📱 *Nombre:* ${apkInfo.name}\n` +
      `⚔️ *Tamaño:* ${apkInfo.size}\n` +
      `⚔️ *Rating:* ${apkInfo.rating}\n` +
      `⚔️ *Instalaciones:* ${apkInfo.installs}\n` +
      `⚔️ *Desarrollador:* ${apkInfo.developer}\n` +
      `⚔️ *Categoría:* ${apkInfo.category}\n` +
      `⚔️ *Versión:* ${apkInfo.version}\n` +
      `⚔️ *Actualizado:* ${apkInfo.updated}\n` +
      `⚔️ *Requisitos:* ${apkInfo.requirements}\n` +
      `⚔️ *ID:* ${apkInfo.id}\n\n────────────\n🚀 Gatoland`;

    // Enviar imagen con info
    await conn.sendMessage(chatId, {
      image: { url: apkInfo.thumbnail },
      caption,
      mimetype: "image/jpeg"
    }, { quoted: msg });

    // Enviar el APK
    await conn.sendMessage(chatId, {
      document: fileBuffer,
      mimetype: "application/vnd.android.package-archive",
      fileName: apkFile.filename
    }, { quoted: msg });

    await conn.sendMessage(chatId, {
      react: { text: "✅", key: msg.key }
    });

  } catch (err) {
    console.error("❌ Error en comando APK:", err.message);
    await conn.sendMessage(chatId, {
      text: `❌ *Error al procesar la solicitud:*\n_${err.message}_\n\n🔹 Inténtalo más tarde.`
    }, { quoted: msg });

    await conn.sendMessage(chatId, {
      react: { text: "❌", key: msg.key }
    });
  }
};

handler.command = ["apk"];
module.exports = handler;
