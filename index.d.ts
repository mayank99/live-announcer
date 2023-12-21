export class LiveAnnouncer extends HTMLElement {
	setup(options: { target: HTMLElement | ShadowRoot } = {});
	notify(text: string, options: { priority: 'none' | 'important' } = {})
}

export const setup: () => void;

export const notify: (text: string, options: { priority: 'none' | 'important' } = {}) => void;
