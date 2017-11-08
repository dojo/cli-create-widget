const { describe, it, beforeEach, afterEach } = intern.getInterface('bdd');

import harness, { Harness } from '@dojo/test-extras/harness';

import <%= name %>, { <%= name %>Properties } from './<%= testComponentPath %>';

let widget: Harness<<%= name %>Properties, typeof <%= name %>>;

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
