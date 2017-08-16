import { Command } from '@dojo/cli/interfaces';

import register from './register';
import run from './run';

const command: Command = {
	description: 'Scaffolds a new widget',
	register,
	run
};

export default command;
