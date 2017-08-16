import * as registerSuite from 'intern!object';

import { v } from '@dojo/widget-core/d';
import harness, { Harness } from '@dojo/test-extras/harness';

import <%= name %>, { <%= name %>Properties } from './<%= testComponentPath %>';
import * as css from './<%= testStylePath %>';

let widget: Harness<<%= name %>Properties, typeof <%= name %>>;

registerSuite({
	name: '<%= name %>',

	beforeEach() {
		widget = harness(<%= name %>);
	},

	afterEach() {
		widget.destroy();
	},

	'Should construct <%= name %>'() {
		widget.expectRender(v('div', {
			classes: widget.classes(css.root)
		}, [ 'My <%= name %>' ]));
	}
});
