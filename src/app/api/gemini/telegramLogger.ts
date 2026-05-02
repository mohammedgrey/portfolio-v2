const TELEGRAM_MAX_LENGTH = 4096;
const HEADER_RESERVE = 200;
const PER_FIELD_BUDGET = Math.floor(
  (TELEGRAM_MAX_LENGTH - HEADER_RESERVE) / 2,
);

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const truncate = (str: string, max: number) =>
  str.length <= max ? str : `${str.slice(0, max - 20)}\n…[truncated]`;

export const logChatToTelegram = (question: string, answer: string) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const text = [
    `<b>🟢 Q:</b>`,
    escapeHtml(truncate(question, PER_FIELD_BUDGET)),
    ``,
    `<b>🤖 A:</b>`,
    escapeHtml(truncate(answer, PER_FIELD_BUDGET)),
  ].join("\n");

  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  }).catch((err) => {
    console.error("Telegram log failed", err);
  });
};
