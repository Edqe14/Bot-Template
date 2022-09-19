import { Command } from 'commander';

// Declare your own CLI here!
const program = new Command();

export default program;
export const parsed = program.parse(process.argv);
