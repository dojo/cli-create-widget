import { DNode } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ThemeableMixin, ThemeableProperties, theme } from '@dojo/widget-core/mixins/Themeable';
import { v } from '@dojo/widget-core/d';

import * as css from './<%= componentStylePath %>';

/**
 * @type <%= name %>Properties
 *
 * Properties that can be set on <%= name %> components
 */
export interface <%= name %>Properties extends ThemeableProperties { };

export const <%= name %>Base = ThemeableMixin(WidgetBase);

@theme(css)
export default class <%= name %> extends <%= name %>Base<<%= name %>Properties> {
	protected render(): DNode | DNode[] {
		return v('div', { classes: this.classes(css.root) }, [ 'My <%= name %>' ]);
	}
}
