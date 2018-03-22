const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');
import { getHelperStub } from '../support/testHelper';
import { Helper } from '@dojo/cli/interfaces';
import { join } from 'path';
import { SinonStub, stub } from 'sinon';
import * as mockery from 'mockery';

type ESModule = {
	default: any;
};

const name = 'testAppName';
const lowerCaseName = name.toLowerCase();
const args = { name };
const createDirStub: SinonStub = stub();
const renderFilesStub: SinonStub = stub().returns(Promise.resolve());
let consoleStub: SinonStub;
let helperStub: Helper;
let run: any;

registerSuite('run', {
	before() {
		consoleStub = stub(console, 'info');
		mockery.enable({ warnOnUnregistered: false });
		mockery.registerMock('@dojo/cli-create-app/createDir', { default: createDirStub });
		mockery.registerMock('@dojo/cli-create-app/renderFiles', { default: renderFilesStub });
		run = (<ESModule>require('../../src/run')).default;
	},

	after() {
		consoleStub.restore();
		mockery.deregisterAll();
		mockery.disable();
	},

	beforeEach() {
		helperStub = getHelperStub();
		createDirStub.reset();
		renderFilesStub.reset();
	},

	tests: {
		async 'Should get directories to create from config'() {
			await run(helperStub, args);
			assert.isTrue(createDirStub.calledOnce);

			const createDirArgs = createDirStub.args[0];

			assert.strictEqual(createDirArgs[0], lowerCaseName);
			assert.strictEqual(createDirArgs[1], `${lowerCaseName}/styles`);
			assert.strictEqual(createDirArgs[2], `${lowerCaseName}/tests/unit`);
		},

		async 'Should get files to render from config'() {
			await run(helperStub, Object.assign(args, { component: true, styles: '.', tests: '.' }));
			assert.isTrue(renderFilesStub.calledOnce);

			const renderFilesArgs = renderFilesStub.args[0];

			assert.deepEqual(renderFilesArgs[0].map((obj: any) => obj.dest), [
				`${join(lowerCaseName, name)}.ts`,
				`${lowerCaseName}.m.css`,
				`${lowerCaseName}.m.css.d.ts`,
				`${name}.ts`
			]);
		},

		async 'Should use correct paths'() {
			await run(helperStub, Object.assign(args, { component: true, styles: '.', tests: '.' }));

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
