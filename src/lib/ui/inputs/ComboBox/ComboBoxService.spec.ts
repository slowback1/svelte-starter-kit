import ComboBoxService, { type ComboBoxOption } from './ComboBoxService';

describe('ComboBoxService', () => {
	const testOptionInput: ComboBoxOption<string>[] = [
		{
			label: 'test 1',
			value: 'value 1'
		},
		{
			label: 'test 2',
			value: 'value 2'
		}
	];

	it('can get the set of options', () => {
		let service = new ComboBoxService(testOptionInput);

		let options = service.getOptions();

		expect(options.length).toEqual(2);
	});

	it.each([
		[0, 'label', 'test 1'],
		[0, 'value', 'value 1'],
		[1, 'label', 'test 2'],
		[1, 'value', 'value 2']
	])('has the correct value for the given option (%s, %s, %s)', (index, key, expectedValue) => {
		let service = new ComboBoxService(testOptionInput);

		let options = service.getOptions();

		expect(options[index][key]).toEqual(expectedValue);
	});

	it.each([0, 1])('each option has the correct id (%s)', (index) => {
		let expectedValue = index;

		let service = new ComboBoxService(testOptionInput);

		let options = service.getOptions();

		expect(options[index].id).toEqual(expectedValue);
	});

	it.each([[null], [undefined], [[]]])(
		'will default to an empty list of options if given no options',
		(nullValue) => {
			let service = new ComboBoxService(nullValue);

			let options = service.getOptions();

			expect(options).toEqual([]);
		}
	);

	it('sets the default value as an empty string', () => {
		let service = new ComboBoxService([]);

		let value = service.value;

		expect(value).toEqual('');
	});
});
