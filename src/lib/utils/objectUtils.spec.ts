import { clone } from '$lib/utils/objectUtils';

describe('objectUtils', () => {
	describe('clone', () => {
		it('clones an object', () => {
			let obj = { a: 1, b: 2, c: 3 };
			let cloned = clone(obj);

			expect(cloned).toEqual(obj);
			expect(cloned).not.toBe(obj);
		});

		it.each([[1], [1.1], ['test'], [true], [false], [null], [undefined], [{}]])(
			'clones a %p',
			(value) => {
				let cloned = clone(value);

				expect(cloned).toEqual(value);
			}
		);

		it('throws an error if the object is a function', () => {
			expect(() => clone(() => {})).toThrow();
		});
	});
});
