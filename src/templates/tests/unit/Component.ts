const { describe, it, beforeEach, afterEach } = intern.getInterface('bdd');

import { w } from '@dojo/framework/widget-core/d';
import harness from '@dojo/framework/testing/harness';

import <%= className %> from './<%= testComponentPath %>';

describe('<%= className %>', () => {

	it('should construct <%= className %>', () => {
		const h = harness(() => w(<%= className %>, {}));
		h.expect(() => null);
	});
});
