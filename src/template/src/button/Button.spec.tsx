const { describe, it } = intern.getInterface('bdd');
import { tsx } from '@dojo/framework/core/vdom';
import assertionTemplate from '@dojo/framework/testing/assertionTemplate';
import harness from '@dojo/framework/testing/harness';

import Button from './Button';
import * as css from '../theme/default/Button.m.css';

const baseAssertion = assertionTemplate(() => {
	return (
		<button classes={[css.root]} onclick={() => {}}>Click Me!</button>
	);
});

describe('Button', () => {
	it('render', () => {
		const h = harness(() => <Button onClick={() => {}}>Click Me!</Button>);
		h.expect(baseAssertion);
	});
});
