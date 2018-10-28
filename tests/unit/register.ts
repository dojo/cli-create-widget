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
			assert.strictEqual(options.callCount, 6);

			assert.isTrue(options.calledWithMatch('n', { alias: 'name' }), 'one');
			assert.isTrue(options.calledWithMatch('s', { alias: 'styles' }), 'two');
			assert.isTrue(options.calledWithMatch('t', { alias: 'tests' }), 'three');
			assert.isTrue(options.calledWithMatch('c', { alias: 'component' }), 'four');
			assert.isTrue(options.calledWithMatch('f', { alias: 'force' }), 'five');
			assert.isTrue(options.calledWithMatch('p', { alias: 'prefix' }), 'six');
		}
	}
});
