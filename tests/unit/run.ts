import { Helper } from '@dojo/interfaces/cli';
import { SinonStub, stub } from 'sinon';
import * as assert from 'intern/chai!assert';
import * as mockery from 'mockery';
import * as registerSuite from 'intern!object';

import { getHelperStub } from '../support/testHelper';

type ESModule = {
	default: any
};

const name = 'testAppName';
const args = { name };
const createDirStub: SinonStub = stub();
const renderFilesStub: SinonStub = stub().returns(Promise.resolve());
let consoleStub: SinonStub;
let helperStub: Helper;
let run: any;

registerSuite({
	name: 'run',

	setup() {
		consoleStub = stub(console, 'info');
		mockery.enable({ warnOnUnregistered: false });
		mockery.registerMock('@dojo/cli-create-app/createDir', { default: createDirStub });
		mockery.registerMock('@dojo/cli-create-app/renderFiles', { default: renderFilesStub });
		run = (<ESModule> require('intern/dojo/node!./../../src/run')).default;
	},

	teardown() {
		consoleStub.restore();
		mockery.deregisterAll();
		mockery.disable();
	},

	beforeEach() {
		helperStub = getHelperStub();
		createDirStub.reset();
		renderFilesStub.reset();
	},

	async 'Should get directories to create from config'() {
		await run(helperStub, args);
		assert.isTrue(createDirStub.calledOnce);
		let createDirArgs = createDirStub.args[0];
		assert.strictEqual(createDirArgs[0], name);
		assert.strictEqual(createDirArgs[1], `${name}/styles`);
		assert.strictEqual(createDirArgs[2], `${name}/tests/unit`);
	},

	async 'Should get files to render from config'() {
		await run(helperStub, Object.assign(args, { component: true }));
		assert.isTrue(renderFilesStub.calledOnce);
		let renderFilesArgs = renderFilesStub.args[0];

		assert.deepEqual(renderFilesArgs[0].map((obj: any) => obj.dest), [
			`${name}/${name}.ts`,
			`${name}/styles/${name}.m.css`,
			`${name}/styles/${name}.m.css.d.ts`,
			`${name}/tests/unit/${name}.ts`,
			`${name}/create${name}Element.ts`
		]);
	}
});
