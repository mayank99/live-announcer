export class LiveAnnouncer extends HTMLElement {
	setup(options: { target: HTMLElement | ShadowRoot } = {});
	notify(text: string, options: { polite: boolean } = {})
}

export const setup: () => void;

export const notify: (text: string, options: { polite: boolean } = {}) => void;
