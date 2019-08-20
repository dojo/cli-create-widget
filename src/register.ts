import { OptionsHelper } from '@dojo/cli/interfaces';

export default function(options: OptionsHelper): void {
	options('name', {
		alias: 'n',
		demand: true,
		describe: 'The name of your widget',
		requiresArg: true,
		type: 'string'
	});
	options('styles', {
		alias: 's',
		defaultDescription: '<component_folder>/styles',
		demand: false,
		describe: "The location of your widget's styles",
		type: 'string'
	});
	options('tests', {
		alias: 't',
		defaultDescription: '<component_folder>/tests',
		demand: false,
		describe: "The location of your widget's tests",
		type: 'string'
	});
	options('class', {
		alias: 'c',
		default: false,
		demand: false,
		describe: 'Scaffolds a class-based widget (defaults: function-based)',
		type: 'boolean'
	});
}
