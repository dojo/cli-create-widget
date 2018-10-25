import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
<%if (includeCustomElement) { %>
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
<% } -%>
import * as css from './<%= componentStylePath %>';

/**
 * @type <%= className %>Properties
 *
 * Properties that can be set on <%= className %> components
 */
export interface <%= className %>Properties { }

<%if (includeCustomElement) { %>
@customElement({
	tag: 'dojo-<%= name %>',
	attributes: [],
	properties: [],
	events: []
})
<% } -%>
@theme(css)
export class <%= className %> extends ThemedMixin(WidgetBase)<<%= className %>Properties> {
	protected render(): DNode | DNode[] {
		return null;
	}
}

export default <%= className %>;
