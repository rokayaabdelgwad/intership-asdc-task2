import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import * as moment from "moment";

@Injectable()
export class LoggerService {
    logError(error: Error) {
        const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
        const logMessage = `[${timestamp}] Error: ${error.message}\nStack Trace: ${error.stack}\n\n`;
        const logDirectory = 'C:\\Users\\e\\OneDrive\\Desktop\\error'; // Specify the log directory

        // Ensure the log directory exists, if not, create it
        if (!fs.existsSync(logDirectory)) {
            fs.mkdirSync(logDirectory, { recursive: true });
        }

        const logFilePath = path.join(logDirectory, `error_${moment().format('YYYY-MM-DD')}.log`);

        // Append the log message to the log file
        fs.appendFile(logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        });
    }
}
