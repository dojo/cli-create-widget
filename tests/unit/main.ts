const { describe, it, before, beforeEach, after } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');
import { getHelperStub } from '../support/testHelper';
import { Helper } from '@dojo/cli/interfaces';
import * as mockery from 'mockery';
import * as path from 'path';
import { sandbox, SinonStub } from 'sinon';

type ESModule = {
	default: any;
};

const sb = sandbox.create();
const libraryName = 'test-app';
const existsSyncStub = sb.stub();
const mkdirSyncStub = sb.stub();
const createDirStub = sb.stub();
const npmInstallStub = sb.stub().returns(Promise.resolve());
const changeDirStub = sb.stub(process, 'chdir');
const pkgDirStub = sb.stub().returns(libraryName);
let helperStub: Helper;

describe('main', () => {
	before(() => {
		sb.stub(console, 'info');
		mockery.enable({ warnOnUnregistered: false });
		mockery.registerMock('fs-extra', { existsSync: existsSyncStub, mkdirsSync: mkdirSyncStub });
		mockery.registerMock('./createDir', { default: createDirStub });
		mockery.registerMock('./npmInstall', { default: npmInstallStub });
		mockery.registerMock('./changeDir', { default: changeDirStub });
		mockery.registerMock('pkg-dir', { sync: pkgDirStub });
	});

	beforeEach(() => {
		sb.reset();
		existsSyncStub.returns(false);
		helperStub = getHelperStub();
	});

	after(() => {
		sb.restore();
		mockery.deregisterAll();
		mockery.disable();
	});

	it('Should check to see if target appName folder exists', async () => {
		const command = (<ESModule>require('../../src/main')).default;
		existsSyncStub.returns(true);
		try {
			await command.run(helperStub, { name: libraryName });
			assert.fail(null, null, 'Should not call create for existing directory');
		} catch (error) {
			assert.equal('Widget library directory already exists', error.message);
			assert.isTrue(existsSyncStub.calledOnce);
			assert.isTrue(existsSyncStub.firstCall.calledWith(libraryName));
		}
	});

	it('Should scaffold widget library project', async () => {
		const command = (<ESModule>require('../../src/main')).default;
		await command.run(helperStub, { name: libraryName });
		assert.strictEqual(mkdirSyncStub.callCount, 8);
		assert.deepEqual(mkdirSyncStub.getCalls().map((call) => call.args[0]), [
			'test-app',
			'test-app/src',
			'test-app/src/button',
			'test-app/src/examples',
			'test-app/src/examples/button',
			'test-app/src/theme',
			'test-app/src/theme/test-app',
			'test-app/src/theme/default'
		]);
		assert.isTrue((helperStub.command.renderFiles as SinonStub).calledOnce);
		assert.deepEqual((helperStub.command.renderFiles as SinonStub).firstCall.args[0], [
			{
				src: path.join(process.cwd(), 'dist', 'dev', 'src', 'template', 'package.json'),
				dest: 'package.json'
			},
			{
				src: path.join(process.cwd(), 'dist', 'dev', 'src', 'template', 'README.md'),
				dest: 'README.md'
			},
			{
				src: path.join(process.cwd(), 'dist', 'dev', 'src', 'template', 'src', 'button', 'Button.spec.tsx'),
				dest: path.join('src', 'button', 'Button.spec.tsx')
			},
			{
				src: path.join(process.cwd(), 'dist', 'dev', 'src', 'template', 'src', 'button/Button.tsx'),
				dest: path.join('src', 'button/Button.tsx')
			},
			{
				src: path.join(process.cwd(), 'dist', 'dev', 'src', 'template', 'src', 'button/README.md'),
				dest: path.join('src', 'button/README.md')
			},
			{
				src: path.join(
					process.cwd(),
					'dist',
					'dev',
					'src',
					'template',
					'src/examples/button/ButtonExample.tsx'
				),
				dest: path.join('src/examples/button/ButtonExample.tsx')
			},
			{
				src: path.join(process.cwd(), 'dist', 'dev', 'src', 'template', 'src/examples/config.tsx'),
				dest: path.join('src/examples/config.tsx')
			},
			{
				src: path.join(process.cwd(), 'dist', 'dev', 'src', 'template', 'src/examples/README.md'),
				dest: path.join('src/examples/README.md')
			},
			{
				src: path.join(process.cwd(), 'dist', 'dev', 'src', 'template', 'src/examples/tests.tsx'),
				dest: path.join('src/examples/tests.tsx')
			},
			{
				src: path.join(process.cwd(), 'dist', 'dev', 'src', 'template', 'src/index.html'),
				dest: path.join('src/index.html')
			},
			{
				src: path.join(process.cwd(), 'dist', 'dev', 'src', 'template', 'src/main.tsx'),
				dest: path.join('src/main.tsx')
			},
			{
				src: path.join(process.cwd(), 'dist', 'dev', 'src', 'template', 'src/theme/{name}/Button.m.css'),
				dest: path.join('src/theme/test-app/Button.m.css')
			},
			{
				src: path.join(process.cwd(), 'dist', 'dev', 'src', 'template', 'src/theme/{name}/Button.m.css.d.ts'),
				dest: path.join('src/theme/test-app/Button.m.css.d.ts')
			},
			{
				src: path.join(process.cwd(), 'dist', 'dev', 'src', 'template', 'src/theme/{name}/index.ts'),
				dest: path.join('src/theme/test-app/index.ts')
			},
			{
				dest: path.join('src/theme/test-app/variables.css'),
				src: path.join(process.cwd(), 'dist', 'dev', 'src', 'template', 'src/theme/{name}/variables.css')
			},
			{
				dest: path.join('src/theme/default/Button.m.css'),
				src: path.join(process.cwd(), 'dist', 'dev', 'src', 'template', 'src/theme/default/Button.m.css')
			},
			{
				dest: path.join('src/theme/default/Button.m.css.d.ts'),
				src: path.join(process.cwd(), 'dist', 'dev', 'src', 'template', 'src/theme/default/Button.m.css.d.ts')
			},
			{
				dest: '.dojorc',
				src: path.join(process.cwd(), 'dist', 'dev', 'src', 'template', 'template-.dojorc')
			},
			{
				dest: '.gitignore',
				src: path.join(process.cwd(), 'dist', 'dev', 'src', 'template', 'template-.gitignore')
			},
			{
				dest: 'tsconfig.json',
				src: path.join(process.cwd(), 'dist', 'dev', 'src', 'template', 'tsconfig.json')
			}
		]);
		assert.deepEqual((helperStub.command.renderFiles as SinonStub).firstCall.args[1], {
			name: libraryName,
			parsedName: 'testApp'
		});
		assert.isTrue(changeDirStub.calledOnce);
		assert.isTrue(changeDirStub.firstCall.calledWith(libraryName));
		assert.isTrue(npmInstallStub.calledOnce);
		assert.isTrue((helperStub.command.run as any).calledOnce);
	});
});
