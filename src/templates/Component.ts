import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemeableMixin, theme } from '@dojo/widget-core/mixins/Themeable';

import * as css from './<%= componentStylePath %>';

/**
 * @type <%= name %>Properties
 *
 * Properties that can be set on <%= name %> components
 */
export interface <%= name %>Properties extends WidgetProperties { };

export const <%= name %>Base = ThemeableMixin(WidgetBase);

@theme(css)
export class <%= name %> extends <%= name %>Base<<%= name %>Properties> {
	protected render(): DNode | DNode[] { {
		return null;
	}
}

export default <%= name %>;
