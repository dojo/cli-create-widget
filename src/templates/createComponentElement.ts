import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import <%= name %> from './<%= name %>';

/**
 * Configures a <%= name %> web component
 */
export default function create<%= name %>Element(): CustomElementDescriptor {
	return {
		tagName: 'dojo-<%= folderName %>',
		widgetConstructor: <%= name %>,
		attributes: [],
		properties: [],
		events: []
	};
};
