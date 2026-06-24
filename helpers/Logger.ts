// helpers/Logger.ts
import chalk from "chalk";
import fs from "fs";
import path from "path";

const logDir = path.join(process.cwd(), "logs");

// Tạo folder logs nếu chưa có
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// File log duy nhất cho cả test run (ngày/giờ hiện tại)
const logFile = path.join(logDir, `test-log-${new Date().toISOString().replace(/[:.]/g, "-")}.log`);

// Ghi log step
export function logStep(message: string) {
    const time = new Date().toISOString();
    const fullMessage = `[${time}] ${message}\n`;
    fs.appendFileSync(logFile, fullMessage); // ghi vào file chung
    console.log(fullMessage.trim());         // vẫn in ra console
}

export function logTitle(message: string) {
    const separator = "-".repeat(100);
    const time = new Date().toISOString();
    console.log(chalk.yellow(separator));
    console.log(chalk.yellow(message));
    console.log(chalk.yellow(separator));
    
    // file output without chalk (just plain text)
    const fileMessage = `[${time}] ${separator}\n[${time}] ${message}\n[${time}] ${separator}\n`;
    fs.appendFileSync(logFile, fileMessage);
}