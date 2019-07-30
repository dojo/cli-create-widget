import { ThemedMixin, theme } from '@dojo/framework/core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/core/WidgetBase';
import * as css from './<%= componentStylePath %>';

/**
 * @type <%= className %>Properties
 *
 * Properties that can be set on <%= className %> components
 */
export interface <%= className %>Properties { }

@theme(css)
export class <%= className %> extends ThemedMixin(WidgetBase)<<%= className %>Properties> {
	protected render() {
		return null;
	}
}

export default <%= className %>;
