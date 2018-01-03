const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');
import { getHelperStub } from '../support/testHelper';
import { Helper } from '@dojo/interfaces/cli';
import * as mockery from 'mockery';
import { SinonStub, stub } from 'sinon';

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
				`${lowerCaseName}/${name}.ts`,
				`${lowerCaseName}.m.css`,
				`${lowerCaseName}.m.css.d.ts`,
				`${name}.ts`,
				`${lowerCaseName}/create${name}Element.ts`
			]);
		}
	}
});
