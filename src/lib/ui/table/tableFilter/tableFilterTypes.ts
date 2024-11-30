export type TableFilterFieldProps = {
	onChange: (value: any) => void;
	field: TableFilterField;
};

export type TableFilterField = {
	id: string;
	label: string;
	value?: any;
	type: TableFilterFieldType;
};

export enum TableFilterFieldType {
	Text = 'text',
	Number = 'number'
}

export type TableFilterProps = {
	fields: TableFilterField[];
	onFilter: (filters: Record<string, any>) => void;
};
