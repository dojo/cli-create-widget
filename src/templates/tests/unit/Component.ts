const { registerSuite } = intern.getInterface('object');

import harness, { Harness } from '@dojo/test-extras/harness';

import <%= name %>, { <%= name %>Properties } from './<%= testComponentPath %>';

let widget: Harness<<%= name %>Properties, typeof <%= name %>>;

registerSuite('<%= name %>', {
	beforeEach() {
		widget = harness(<%= name %>);
	},

	afterEach() {
		widget.destroy();
	},

	tests: {
		'should construct <%= name %>'() {
			widget.expectRender(null);
		}
	}
});
