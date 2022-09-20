import { Command } from 'commander';

// Declare your own CLI here!
const program = new Command();

program.option('-W, --wipe', 'Wipe all guild and global slash commands', false);

export default program;
export const parsed = program.parse(process.argv);
