import { DNode } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themeable';

import * as css from './<%= componentStylePath %>';

/**
 * @type <%= name %>Properties
 *
 * Properties that can be set on <%= name %> components
 */
export interface <%= name %>Properties { };

export const <%= name %>Base = ThemedMixin(WidgetBase);

@theme(css)
export class <%= name %> extends <%= name %>Base<<%= name %>Properties> {
	protected render(): DNode | DNode[] {
		return null;
	}
}

export default <%= name %>;
