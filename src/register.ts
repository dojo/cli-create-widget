import { OptionsHelper } from '@dojo/interfaces/cli';

export default function(options: OptionsHelper): void {
	options('n', {
		alias: 'name',
		describe: 'The name of your widget',
		demand: true,
		requiresArg: true,
		type: 'string'
	});
	options('s', {
		alias: 'styles',
		describe: 'The location of your widget\'s styles',
		demand: false,
		requiresArg: true,
		type: 'string'
	});
	options('t', {
		alias: 'tests',
		describe: 'The location of your widget\'s tests',
		demand: false,
		requiresArg: true,
		type: 'string'
	});
	options('c', {
		alias: 'component',
		describe: 'Generate a Custom Element wrapper for your widget',
		demand: false,
		type: 'boolean'
	});
}
