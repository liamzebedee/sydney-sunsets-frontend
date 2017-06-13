export function onlyTruthyStyles(styles) {
	return Object.keys(styles).filter((el) => styles[el]).join(' ')
}