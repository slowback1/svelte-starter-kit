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
	Text = 'text'
}

export type TableFilterProps = {
	fields: TableFilterField[];
	onFilter: (filters: Record<string, any>) => void;
};
