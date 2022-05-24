
export function clone<X>(x: X): X {
	return x === undefined
		? undefined
		: JSON.parse(JSON.stringify(x))
}
