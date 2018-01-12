import { Command } from '@dojo/cli/interfaces';
import register from './register';
import run, { CreateWidgetArgs } from './run';

const command: Command<CreateWidgetArgs> = {
	description: 'scaffolds a new widget',
	register,
	run
};

export default command;
