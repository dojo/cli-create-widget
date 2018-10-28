import { Argv } from 'yargs';
import { Helper, Config } from '@dojo/cli/interfaces';
import { join, posix, dirname, relative } from 'path';
import { mkdirsSync } from 'fs-extra';
import chalk from 'chalk';

const findUp: any = require('find-up');
const pkgDir: any = require('pkg-dir');

const packagePath: string = pkgDir.sync(__dirname);

/**
 * @type CreateWidgetArgs
 *
 * Arguments that can be passed when creating a widget using the Dojo CLI
 *
 * @property component       Generate a Custom Element wrapper
 * @property force           Create widget regardless of project
 * @property name            Name used for the generated widget
 * @property styles          Path to place generated CSS files
 * @property tests           Path to place generated test files
 * @property prefix          The location to place your widget
 */
export interface CreateWidgetArgs extends Argv {
	component: boolean;
	force: boolean;
	name: string;
	styles: string;
	tests: string;
	prefix: string;
}

function getRenderFilesConfig(
	args: CreateWidgetArgs,
	lowerCaseName: string,
	widgetRoot: string,
	styleRoot: string,
	testRoot: string
) {
	return [
		{
			src: join(packagePath, 'templates', 'Component.ts'),
			dest: join(widgetRoot, `${lowerCaseName}.ts`)
		},
		{
			src: join(packagePath, 'templates', 'styles/component.m.css'),
			dest: join(styleRoot, `${lowerCaseName}.m.css`)
		},
		{
			src: join(packagePath, 'templates', 'styles/component.m.css.d.ts'),
			dest: join(styleRoot, `${lowerCaseName}.m.css.d.ts`)
		},
		{
			src: join(packagePath, 'templates', 'tests/unit/Component.ts'),
			dest: join(testRoot, `${args.name}.ts`)
		}
	];
}

function getWidgetPrefix(force: boolean, prefix: string, configPrefix: string): string {
	if (force) {
		return '.';
	} else if (prefix) {
		return prefix;
	} else if (configPrefix) {
		return configPrefix;
	} else {
		console.info(
			chalk.yellow('Warning: No ') +
				chalk.whiteBright.bold('prefix ') +
				chalk.yellow('provided in command or configuration. Continuining with default ') +
				chalk.whiteBright.bold('./src')
		);
		try {
			const projectRootDir = dirname(findUp.sync('.dojorc'));
			return relative(process.cwd(), join(projectRootDir, 'src'));
		} catch (e) {
			return '.';
		}
	}
}

export default async function(helper: Helper, args: CreateWidgetArgs) {
	const name = args.name;
	const config: Config = helper.configuration.get();
	const widgetRoot = getWidgetPrefix(args.force, args.prefix, config['prefix']);
	const widgetName = name.toLowerCase();
	const folderName = `${widgetRoot}/${widgetName}`;
	const styleRoot = args.styles || `${widgetRoot}/${widgetName}/styles`;
	const testRoot = args.tests || `${widgetRoot}/${widgetName}/tests/unit`;

	console.info(chalk.underline(`Creating your new widget: ${name}\n`));

	for (const dirPath of [folderName, widgetRoot, styleRoot, testRoot]) {
		console.info(chalk.green.bold(' create ') + dirPath);
		mkdirsSync(dirPath);
	}

	helper.command.renderFiles(getRenderFilesConfig(args, widgetName, widgetRoot, styleRoot, testRoot), {
		name,
		folderName,
		includeCustomElement: args.component,
		componentStylePath: posix.relative(folderName, `${styleRoot}/${widgetName}.m.css`),
		testStylePath: posix.relative(testRoot, `${styleRoot}/${widgetName}.m.css`),
		testComponentPath: posix.relative(testRoot, `${widgetName}/${name}`)
	});

	console.info(chalk.green.bold('\nAll done!\n'));
}
