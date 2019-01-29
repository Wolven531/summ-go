import { capitalize } from './util'

describe('Utilities', () => {
	describe('capitalize', () => {
		it('should handle basic cases', () => {
			expect(capitalize('asdf')).toBe('Asdf')
			expect(capitalize('ASDF')).toBe('ASDF')
		})

		it('should handle mixed cases', () => {
			expect(capitalize('AsDf')).toBe('AsDf')
			expect(capitalize('aSdF')).toBe('ASdF')
			expect(capitalize('AsdF')).toBe('AsdF')
			expect(capitalize('aSDf')).toBe('ASDf')
		})

		it('should handle numeric cases', () => {
			expect(capitalize('1asdf')).toBe('1asdf')
			expect(capitalize('asdf1')).toBe('Asdf1')
			expect(capitalize('1as1df1')).toBe('1as1df1')
			expect(capitalize('as1df1')).toBe('As1df1')
		})

		it('should handle edge/special cases', () => {
			expect(capitalize('')).toBe('')
			expect(capitalize(null)).toBe(null)
			expect(capitalize(undefined)).toBe(undefined)
		})
	})
})
