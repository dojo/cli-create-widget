import { DNode } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

import * as css from './<%= componentStylePath %>';

/**
 * @type <%= name %>Properties
 *
 * Properties that can be set on <%= name %> components
 */
export interface <%= name %>Properties { };

export const ThemedBase = ThemedMixin(WidgetBase);

@theme(css)
export class <%= name %><P extends <%= name %>Properties = <%= name %>Properties> extends ThemedBase<P> {
	protected render(): DNode | DNode[] {
		return null;
	}
}

export default <%= name %>;
