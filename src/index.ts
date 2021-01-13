#!/usr/bin/env node

import program from 'commander';
import colors from 'colors';
import example from './commands/example';
import Package from './models/Package';
import { PATH_TO_PACKAGE } from './constants';

const info = new Package({ path: PATH_TO_PACKAGE });

// display program description
program
  .version(info.version)
  .description('Command line tools boilerplate');

// bind commands
// to the program
example(program);

// override exit
program.exitOverride();

// listen to promises rejection
process.on('uncaughtException' as any, processError);
process.on('unhandledRejection' as any, processError);

// parse arguments
program.parse(process.argv);

// display help command
if (!process.argv.slice(2).length) {
  program.help();
}

function processError(error: any) {
  if (typeof error.exitCode === 'undefined' || error.exitCode > 0) {
    console.log(colors.red.bold(error.toString()));
    console.log(error);
    process.exit(1);
  }
}
