import { create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import * as css from './<%= componentStylePath %>';

/**
 * @type <%= className %>Properties
 *
 * Properties that can be set on <%= className %> components
 */
export interface <%= className %>Properties { }

const factory = create({ theme }).properties<<%= className %>Properties>();

export const <%= className %> = factory(function <%= className %>({ middleware: { theme }}) {
	const themedCss = theme.classes(css);
	return null;
});

export default <%= className %>;
