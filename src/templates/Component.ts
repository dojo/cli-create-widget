import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
<%if (includeCustomElement) { %>
import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
<% } -%>
import * as css from './<%= componentStylePath %>';

/**
 * @type <%= name %>Properties
 *
 * Properties that can be set on <%= name %> components
 */
export interface <%= name %>Properties { }

export const ThemedBase = ThemedMixin(WidgetBase);

<%if (includeCustomElement) { %>
@customElement({
	tag: 'dojo-<%= name %>',
	attributes: [],
	properties: [],
	events: []
})
<% } -%>
@theme(css)
export class <%= name %><P extends <%= name %>Properties = <%= name %>Properties> extends ThemedBase<P> {
	protected render(): DNode | DNode[] {
		return null;
	}
}

export default <%= name %>;
