const { describe, it, beforeEach, afterEach } = intern.getInterface('bdd');

import harness, { Harness } from '@dojo/test-extras/harness';

import <%= name %> from './<%= testComponentPath %>';

let widget: Harness<<%= name %>>;

describe('<%= name %>', () => {
	beforeEach(() => {
		widget = harness(<%= name %>);
	});

	afterEach(() => {
		widget.destroy();
	});

	it('should construct <%= name %>', () => {
		widget.expectRender(null);
	});
});
