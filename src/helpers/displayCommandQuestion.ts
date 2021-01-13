import colors from 'colors/safe';
import moment from 'moment';
import { Command } from 'commander';
import * as readline from 'readline-sync';
import { BasicOptions } from 'readline-sync';

export default function displayCommandQuestion(cmd: Command, message: string, options?: BasicOptions) {
  const timestamp = moment().format('HH:mm:ss');
  const question = `[${timestamp}] [${colors.blue(cmd.name())}] ${message} `;
  return readline.question(question, options);
};
