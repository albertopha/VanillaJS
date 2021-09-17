"use strict";
class Card extends HTMLElement {
    constructor() {
        super();
        this.template = document.createElement("template");
        this.template.innerHTML = `
			<style>
				section {
					border: 2px solid black;
				}
			</style>
			<section>
				<slot name="title"></slot>
				<slot name="description"></slot>
				<slot name="people"></slot>
			</section>
		`;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    }
}
window.customElements.define("project-card", Card);
//# sourceMappingURL=card.js.map