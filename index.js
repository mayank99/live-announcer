class LiveAnnouncer extends HTMLElement {
	#assertiveRegion;
	#politeRegion;

	static {
		if (typeof window !== 'undefined') {
			let tagName = 'live-announcer';
			while (customElements.get(tagName) != undefined) {
				tagName += '-';
			}
			customElements.define(tagName, LiveAnnouncer);
		}
	}

	constructor() {
		super();
		this.#assertiveRegion = this.ownerDocument.createElement('div');
		this.#assertiveRegion.setAttribute('aria-live', 'assertive');
		this.#politeRegion = this.ownerDocument.createElement('div');
		this.#politeRegion.setAttribute('aria-live', 'polite');

		this.attachShadow({ mode: 'open' });
		this.shadowRoot?.replaceChildren(this.#assertiveRegion, this.#politeRegion);

		const stylesheet = new CSSStyleSheet();
		stylesheet.replaceSync(`\
			:host {
				clip-path: inset(50%) !important;
				height: 1px !important;
				overflow: hidden !important;
				position: absolute !important;
				white-space: nowrap !important;
				width: 1px !important;
				user-select: none !important;
			}
		`);
		this.shadowRoot?.adoptedStyleSheets.push(stylesheet);
	}

	setup({ target = document.body } = {}) {
		target?.appendChild(this);
	}

	notify(text, { polite = false } = {}) {
		const region = polite ? this.#politeRegion : this.#assertiveRegion;
		region.textContent = '';
		region.textContent = text;
		setTimeout(() => {
			region.textContent = '';
		}, 3_000);
	}
}

let _announcer;

function setup() {
	if (!document.body.shadowRoot) {
		const shadow = document.body.attachShadow({ mode: 'open' });
		shadow.appendChild(document.createElement('slot'));
	}
	_announcer = new LiveAnnouncer();
	_announcer.setup({ target: document.body.shadowRoot });
}

function notify(...args) {
	_announcer.notify(...args);
}

export { setup, notify, LiveAnnouncer };
