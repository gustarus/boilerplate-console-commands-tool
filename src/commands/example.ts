import * as commander from 'commander';
import * as readline from 'readline-sync';
import displayCommandGreetings from './../helpers/displayCommandGreetings';
import displayCommandStep from './../helpers/displayCommandStep';
import displayCommandDone from './../helpers/displayCommandDone';
import validateOptionFormat from '../helpers/validateOptionFormat';
import { PATTERN_TAG } from './../constants';
import displayCommandQuestion from '../helpers/displayCommandQuestion';

export default function example(program: commander.Command) {
  program
    .command('example')
    .description('Example command with required and optional arguments')
    .requiredOption('--tag <hello>', 'Demo required argument')
    .option('--greeting <world>', 'Demo required argument with default value', 'world')
    .action((cmd) => {
      displayCommandGreetings(cmd);
      validateOptionFormat(cmd, 'tag', PATTERN_TAG);
      const { tag, greeting } = cmd;

      displayCommandStep(cmd, 'Display command options');
      displayCommandStep(cmd, `tag: ${tag}`);
      displayCommandStep(cmd, `greeting: ${greeting}`);

      const answer = displayCommandQuestion(cmd, 'Confirm (y/n)?', { limit: ['y', 'n'] });
      if (answer !== 'y') {
        throw new Error('Rejected');
      }

      displayCommandDone(cmd);
    });
};
