const { describe, it, beforeEach, afterEach } = intern.getInterface('bdd');

import { w } from '@dojo/framework/widget-core/d';
import harness from '@dojo/framework/testing/harness';

import <%= name %> from './<%= testComponentPath %>';

describe('<%= name %>', () => {

	it('should construct <%= name %>', () => {
		const h = harness(() => w(<%= name %>, {}));
		h.expect(() => null);
	});
});
