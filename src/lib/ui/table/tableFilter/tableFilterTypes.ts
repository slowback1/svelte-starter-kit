export type TableFilterFieldProps = {
	onChange: (value: never) => void;
	field: TableFilterField;
};

export type TableFilterField = {
	id: string;
	label: string;
	value?: never;
	type: TableFilterFieldType;
};

export enum TableFilterFieldType {
	Text = 'text',
	Number = 'number'
}

export type TableFilterProps = {
	fields: TableFilterField[];
	onFilter: (filters: Record<string, never>) => void;
};
