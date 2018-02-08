const { describe, it, beforeEach, afterEach } = intern.getInterface('bdd');

import { w } from '@dojo/widget-core/d';
import harness from '@dojo/test-extras/harness';

import <%= name %> from './<%= testComponentPath %>';

describe('<%= name %>', () => {

	it('should construct <%= name %>', () => {
		const h = harness(() => w(<%= name %>, {}));
		h.expect(() => null);
	});
});
