const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');
import { getHelperStub } from '../support/testHelper';
import { Helper } from '@dojo/cli/interfaces';
import { SinonStub, stub } from 'sinon';
import * as mockery from 'mockery';

type ESModule = {
	default: any;
};

const name = 'testAppName';
const lowerCaseName = name.toLowerCase();
const args = { name };
const mkdirsSyncStub: SinonStub = stub();
let renderFilesStub: SinonStub;
let consoleStub: SinonStub;
let helperStub: Helper;
let run: any;

registerSuite('run', {
	before() {
		consoleStub = stub(console, 'info');
		mockery.enable({ warnOnUnregistered: false });
		mockery.registerMock('fs-extra', { mkdirsSync: mkdirsSyncStub });
		run = (<ESModule>require('../../src/run')).default;
	},

	after() {
		consoleStub.restore();
		mockery.deregisterAll();
		mockery.disable();
	},

	beforeEach() {
		helperStub = getHelperStub();
		renderFilesStub = helperStub.command.renderFiles as any;
		mkdirsSyncStub.reset();
	},

	tests: {
		async 'Should get directories to create from config'() {
			await run(helperStub, args);
			assert.equal(mkdirsSyncStub.callCount, 4);

			assert.isTrue(mkdirsSyncStub.calledWithExactly(`./${lowerCaseName}`));
			assert.isTrue(mkdirsSyncStub.calledWithExactly('.'));
			assert.isTrue(mkdirsSyncStub.calledWithExactly(`./${lowerCaseName}/styles`));
			assert.isTrue(mkdirsSyncStub.calledWithExactly(`./${lowerCaseName}/tests/unit`));
		},

		async 'Should get files to render from config'() {
			await run(helperStub, { ...args, component: true, styles: '.', tests: '.' });

			assert.equal(mkdirsSyncStub.callCount, 4);

			assert.isTrue(mkdirsSyncStub.calledWithExactly(`./${lowerCaseName}`));
			assert.isTrue(mkdirsSyncStub.calledWithExactly('.'));
			assert.isTrue(mkdirsSyncStub.calledWithExactly('.'));
			assert.isTrue(mkdirsSyncStub.calledWithExactly('.'));

			assert.isTrue(renderFilesStub.calledOnce);

			const renderFilesArgs = renderFilesStub.args[0];

			assert.deepEqual(renderFilesArgs[0].map((obj: any) => obj.dest), [
				`${lowerCaseName}.ts`,
				`${lowerCaseName}.m.css`,
				`${lowerCaseName}.m.css.d.ts`,
				`${name}.ts`
			]);
		},

		async 'Should use correct paths'() {
			await run(helperStub, { ...args, component: true, styles: '.', tests: '.' });

			assert.deepEqual(renderFilesStub.args[0][1] as any, {
				name: 'testAppName',
				folderName: 'testappname',
				includeCustomElement: true,
				componentStylePath: '../testappname.m.css',
				testStylePath: 'testappname.m.css',
				testComponentPath: 'testappname/testAppName'
			});
		}
	}
});
