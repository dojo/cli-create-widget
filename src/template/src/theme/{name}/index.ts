import * as Button from './Button.m.css';

import * as defaultVariant from './variants/default.m.css';
import * as redVariant from './variants/red.m.css';

export default {
	theme: {
		'<%= name %>/Button': Button
	},
	variants: {
		default: defaultVariant,
		red: redVariant
	}
};
