import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFilePath = path.join(__dirname, "logs.txt");

function getTimestamp() {
  return new Date().toISOString();
}

export function log(message) {
  const logLine = `${getTimestamp()} - ${message}\n`;

  try {
    fs.appendFileSync(logFilePath, logLine, { encoding: "utf-8" });
  } catch (error) {
    console.error("Log yozishda xatolik:", error.message);
  }
}

export function readLogs() {
  try {
    const data = fs.readFileSync(logFilePath, "utf-8");
    return data;
  } catch (error) {
    console.error("Log faylini o‘qib bo‘lmadi:", error.message);
    return "";
  }
}
