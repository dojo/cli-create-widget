import { OptionsHelper } from '@dojo/interfaces/cli';

export default function(options: OptionsHelper): void {
	options('n', {
		alias: 'name',
		demand: true,
		describe: 'The name of your widget',
		requiresArg: true,
		type: 'string'
	});
	options('s', {
		alias: 'styles',
		defaultDescription: '<component_folder>/styles',
		demand: false,
		describe: "The location of your widget's styles",
		requiresArg: true,
		type: 'string'
	});
	options('t', {
		alias: 'tests',
		defaultDescription: '<component_folder>/tests',
		demand: false,
		describe: "The location of your widget's tests",
		requiresArg: true,
		type: 'string'
	});
	options('c', {
		alias: 'component',
		default: false,
		demand: false,
		describe: 'Generate a Custom Element wrapper for your widget',
		type: 'boolean'
	});
}
