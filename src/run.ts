import { Argv } from 'yargs';
import { Helper } from '@dojo/cli/interfaces';
import { join, posix } from 'path';
import { mkdirsSync } from 'fs-extra';
import chalk from 'chalk';

const pkgDir: any = require('pkg-dir');
const packagePath = pkgDir.sync(__dirname);

/**
 * @type CreateWidgetArgs
 *
 * Arguments that can be passed when creating a widget using the Dojo CLI
 *
 * @property component       Generate a Custom Element wrapper
 * @property name            Name used for the generated widget
 * @property styles          Path to place generated CSS files
 * @property tests           Path to place generated test files
 */
export interface CreateWidgetArgs extends Argv {
	class: boolean;
	name: string;
	styles: string;
	tests: string;
	tsx: boolean;
}

function getRenderFilesConfig(args: CreateWidgetArgs, folderName: string, styleRoot: string, testRoot: string) {
	let module = 'FunctionComponent';
	if (args.class) {
		module = 'ClassComponent';
	}
	module = args.tsx ? `${module}.tsx` : `${module}.ts`;
	return [
		{
			src: join(packagePath, 'templates', module),
			dest: join(folderName, `${args.name}.ts`)
		},
		{
			src: join(packagePath, 'templates', 'styles', 'Component.m.css'),
			dest: join(styleRoot, `${folderName}.m.css`)
		},
		{
			src: join(packagePath, 'templates', 'styles', 'Component.m.css.d.ts'),
			dest: join(styleRoot, `${folderName}.m.css.d.ts`)
		},
		{
			src: join(packagePath, 'templates', 'tests', 'unit', module),
			dest: join(testRoot, `${args.name}.ts`)
		}
	];
}

export default async function(helper: Helper, args: CreateWidgetArgs) {
	const name = args.name;
	const className = args.name
		.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter) => letter.toUpperCase())
		.replace(/\s+/g, '')
		.replace(/\W+/g, '');
	const folderName = name.toLowerCase();
	const styleRoot = args.styles || `${folderName}/styles`;
	const testRoot = args.tests || `${folderName}/tests/unit`;

	console.info(chalk.underline(`Creating your new widget: ${name}\n`));

	for (const dirPath of [folderName, styleRoot, testRoot]) {
		console.info(chalk.green.bold(' create ') + dirPath);
		mkdirsSync(dirPath);
	}

	helper.command.renderFiles(getRenderFilesConfig(args, folderName, styleRoot, testRoot), {
		name,
		className,
		folderName,
		componentStylePath: posix.relative(folderName, `${styleRoot}/${folderName}.m.css`),
		testStylePath: posix.relative(testRoot, `${styleRoot}/${folderName}.m.css`),
		testComponentPath: posix.relative(testRoot, `${folderName}/${name}`)
	});

	console.info(chalk.green.bold('\nAll done!\n'));
}
