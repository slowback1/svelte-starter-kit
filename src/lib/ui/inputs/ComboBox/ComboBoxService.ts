export type ComboBoxOption<T> = {
	label: string;
	value: T;
};

export type ComboBoxOptionOutput<T> = ComboBoxOption<T> & { id: number };

export default class ComboBoxService<T> {
	value: string = '';
	constructor(private options?: ComboBoxOption<T>[]) {}

	getOptions(): ComboBoxOptionOutput<T>[] {
		if (!this.options) return [];

		return this.options.map((opt, index) => ({ ...opt, id: index }));
	}
}
