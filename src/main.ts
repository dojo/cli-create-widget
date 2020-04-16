import { Command, OptionsHelper, Helper } from '@dojo/cli/interfaces';
import * as chalk from 'chalk';
import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as path from 'path';

import npmInstall from './npmInstall';

interface CreateWidgetArgs {
	name: string;
}

function stripTemplateFromFileName(filePath: string) {
	const parsedPath = path.parse(filePath);
	parsedPath.base = parsedPath.base.replace('template-', '');
	return path.normalize(path.format(parsedPath));
}

const command: Command<CreateWidgetArgs> = {
	group: 'create',
	name: 'widget',
	description: 'scaffolds a Dojo widget library',
	register(options: OptionsHelper) {
		options('n', {
			alias: 'name',
			describe: 'The name of the widget library',
			demand: true,
			requiresArg: true,
			type: 'string'
		});
	},
	async run(helper: Helper, args: CreateWidgetArgs) {
		const { name } = args;
		const parsedName = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
		console.info(chalk.underline(`Creating widget library project: ${name}\n`));
		if (fs.existsSync(name)) {
			return Promise.reject(new Error('Widget library directory already exists'));
		}

		const templateDirectory = path.join(__dirname, 'template');
		const directories = glob.sync(path.join(templateDirectory, '**', '/'));

		directories.forEach((directory) => {
			const projectDirectory = path
				.join(name, path.relative(templateDirectory, directory))
				.replace('{name}', name);
			console.info(chalk.green.bold(' created ') + projectDirectory);
			fs.mkdirsSync(projectDirectory);
		});

		const files = glob.sync(path.join(templateDirectory, '**'), { nodir: true, absolute: true }).map((absPath) => {
			return {
				src: path.normalize(absPath),
				dest: stripTemplateFromFileName(path.relative(templateDirectory, absPath)).replace('{name}', name)
			};
		});

		process.chdir(name);

		console.info(chalk.underline('\nCreating Files'));
		helper.command.renderFiles(files, { name, parsedName });

		console.info(chalk.underline('\nRunning npm install'));
		await npmInstall();

		console.info(chalk.underline('\nRunning dojo init'));
		await helper.command.run('init', '');

		console.info(chalk.green.bold('\nAll done!\n'));
	}
};

export default command;
