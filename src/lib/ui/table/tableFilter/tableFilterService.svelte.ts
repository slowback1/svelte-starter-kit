import type {
	TableFilterField,
	TableFilterFieldProps,
	TableFilterProps
} from '$lib/ui/table/tableFilter/tableFilterTypes';

export default class TableFilterService {
	private fields: TableFilterField[] = $state([]);
	private readonly onFilter: (filters: Record<string, any>) => void;

	constructor(props: TableFilterProps) {
		this.fields = props.fields;
		this.onFilter = props.onFilter;
	}

	public getInputProps(): TableFilterFieldProps[] {
		return this.fields.map((field) => {
			return {
				field,
				onChange: this.getFilterCallback(field)
			};
		});
	}

	public resetFields() {
		this.fields = this.fields.map((field) => {
			field.value = undefined;
			return field;
		});

		this.filterFields();
	}

	private getFilterCallback(field: TableFilterField) {
		return (value: any) => {
			this.fields[this.fields.findIndex((f) => f.id === field.id)].value = value;
			this.filterFields();
		};
	}

	private filterFields() {
		let fieldMap = this.buildFieldMap();
		this.onFilter(fieldMap);
	}

	private buildFieldMap() {
		let fieldMap: Record<string, any> = {};

		this.fields.forEach((field) => {
			fieldMap[field.id] = field.value;
		});
		return fieldMap;
	}
}
