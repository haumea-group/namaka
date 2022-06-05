import { css } from "lit";
export default css `
textarea {
	width: 100%;
	background-color: var(--bg-input, transparent);
	border: 1px solid;
	border-color: var(--input-border-color, #DDE2E5);
	padding: 1.5rem 1rem;
	margin-top: 0.3rem;
	border-radius: 4px;
	color: var(--input-txt-color, inherit);
	overflow: auto;
	resize: vertical;
}

div {
	display: flex;
	gap: 0.5rem;
	align-items: center;
}

ol {
	list-style-type: none;
}

.valid {
	display: flex;
	color: var(--icon-valid-color, green)
}

.invalid {
	display: flex;
	color: var(--icon-invalid-color, red)
}

svg {
	width: 1em;
	height: 1em;
}

.char-count {
	font-weight: bold;
}
`;
//# sourceMappingURL=namaka-textarea.css.js.map