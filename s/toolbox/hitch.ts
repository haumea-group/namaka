
export const hitch = {

	before<F extends (...args: any[]) => any>(
			func1: F,
			func2: () => void
		) {
		return <F>((...args: any[]) => {
			func2()
			return func1(...args)
		})
	},

	after<F extends (...args: any[]) => any>(
			func1: F,
			func2: () => void
		) {
		return <F>((...args: any[]) => {
			const result = func1(...args)
			func2()
			return result
		})
	},
}
