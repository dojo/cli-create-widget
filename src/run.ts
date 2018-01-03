import { Argv } from 'yargs';
import { Helper } from '@dojo/interfaces/cli';
import { join, relative } from 'path';
import * as chalk from 'chalk';
import createDir from '@dojo/cli-create-app/createDir';
import renderFiles from '@dojo/cli-create-app/renderFiles';

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
	component: boolean;
	name: string;
	styles: string;
	tests: string;
}

function getDirectoryNames(args: CreateWidgetArgs, folderName: string) {
	const dirs = [folderName];

	if (!args.styles) {
		dirs.push(`${folderName}/styles`);
	}

	if (!args.tests) {
		dirs.push(`${folderName}/tests/unit`);
	}

	return dirs;
}

function getRenderFilesConfig(args: CreateWidgetArgs, folderName: string, styleRoot: string, testRoot: string) {
	const files = [
		{
			src: join(packagePath, 'templates', 'Component.ts'),
			dest: join(folderName, `${args.name}.ts`)
		},
		{
			src: join(packagePath, 'templates', 'styles/component.m.css'),
			dest: join(styleRoot, `${folderName}.m.css`)
		},
		{
			src: join(packagePath, 'templates', 'styles/component.m.css.d.ts'),
			dest: join(styleRoot, `${folderName}.m.css.d.ts`)
		},
		{
			src: join(packagePath, 'templates', 'tests/unit/Component.ts'),
			dest: join(testRoot, `${args.name}.ts`)
		}
	];

	if (args.component) {
		files.push({
			src: join(packagePath, 'templates', 'createComponentElement.ts'),
			dest: join(folderName, `create${args.name}Element.ts`)
		});
	}

	return files;
}

export default async function(helper: Helper, args: CreateWidgetArgs) {
	const name = args.name;
	const folderName = name.toLowerCase();
	const styleRoot = args.styles || `${folderName}/styles`;
	const testRoot = args.tests || `${folderName}/tests/unit`;

	console.info(chalk.underline(`Creating your new widget: ${name}\n`));

	createDir(...getDirectoryNames(args, folderName));

	renderFiles(getRenderFilesConfig(args, folderName, styleRoot, testRoot), {
		name,
		folderName,
		componentStylePath: relative(folderName, `${styleRoot}/${folderName}.m.css`),
		testStylePath: relative(testRoot, `${styleRoot}/${folderName}.m.css`),
		testComponentPath: relative(testRoot, `${folderName}/${name}`)
	});

	console.info(chalk.green.bold('\nAll done!\n'));
}
