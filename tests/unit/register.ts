const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');
import register from './../../src/register';
import * as sinon from 'sinon';

let sandbox: sinon.SinonSandbox;

registerSuite('register', {
	beforeEach() {
		sandbox = sinon.sandbox.create();
	},

	afterEach() {
		sandbox.restore();
	},

	tests: {
		'Should add correct yargs options'() {
			const options = sandbox.stub();
			register(options);
			assert.strictEqual(options.callCount, 4);
			assert.isTrue(options.firstCall.calledWithMatch('n', { alias: 'name' }));
			assert.isTrue(options.secondCall.calledWithMatch('s', { alias: 'styles' }));
			assert.isTrue(options.thirdCall.calledWithMatch('t', { alias: 'tests' }));
			assert.isTrue(options.lastCall.calledWithMatch('c', { alias: 'component' }));
		}
	}
});
