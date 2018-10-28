import { OptionsHelper } from '@dojo/cli/interfaces';

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
		type: 'string'
	});
	options('t', {
		alias: 'tests',
		defaultDescription: '<component_folder>/tests',
		demand: false,
		describe: "The location of your widget's tests",
		type: 'string'
	});
	options('c', {
		alias: 'component',
		default: false,
		demand: false,
		describe: 'Generate a Custom Element wrapper for your widget',
		type: 'boolean'
	});
	options('f', {
		alias: 'force',
		default: false,
		demand: false,
		describe: 'Generate element regardless of directory',
		type: 'boolean'
	});
	options('p', {
		alias: 'prefix',
		defaultDescription: 'src/<section_folder>',
		demand: false,
		describe: 'The location to place your widget',
		type: 'string'
	});
}
