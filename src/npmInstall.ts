import * as cs from 'cross-spawn';
import * as ora from 'ora';
import * as chalk from 'chalk';

export default async function installNpmModules() {
	return new Promise((resolve, reject) => {
		const spinner = ora({
			spinner: 'dots',
			color: 'white',
			text: 'npm install'
		}).start();
		cs.spawn('npm', ['install'], { stdio: 'ignore' })
			.on('exit', function(code: Number) {
				if (code !== 0) {
					spinner.stopAndPersist({ text: chalk.red.bold(' failed') });
					reject(new Error(`exit code: ${code}`));
				} else {
					spinner.stopAndPersist({ text: chalk.green.bold(' completed') });
					resolve();
				}
			})
			.on('error', (err: Error) => {
				spinner.stopAndPersist({ text: chalk.red.bold(' failed') });
				reject(err);
			});
	});
}
