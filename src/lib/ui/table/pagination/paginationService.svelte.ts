import doNothing from '$lib/utils/doNothing';

export type PaginationServiceSettings = {
	rowsPerPageOptions: number[];
	onPageChange: (parameters: PaginationRequestParameters) => void;
};

export type PaginationRequestParameters = {
	page: number;
	rowsPerPage: number;
};

export type PaginationDataRetrieved = {
	totalCount: number;
};

export default class PaginationService {
	private static readonly MAX_VISIBLE_PAGES = 5;

	public settings: PaginationServiceSettings;
	private parameters: PaginationRequestParameters = $state();
	public totalCount: number = $state(0);

	constructor(settings: Partial<PaginationServiceSettings> = {}) {
		this.settings = this.normalizeSettings(settings);
		this.parameters = this.buildInitialParameters();
	}

	public getPageParameters(): PaginationRequestParameters {
		return this.parameters;
	}

	public onDataRetrieved(data: PaginationDataRetrieved) {
		this.totalCount = data.totalCount;
	}

	public getVisiblePageNumbers(): number[] {
		const visiblePages = [this.parameters.page];

		if (this.parameters.page > 1) {
			visiblePages.unshift(this.parameters.page - 1);
		}

		if (this.parameters.page > 2) {
			visiblePages.unshift(this.parameters.page - 2);
		}

		for (let i = this.parameters.page; i < this.totalCount / this.parameters.rowsPerPage; i++) {
			visiblePages.push(i + 1);

			if (visiblePages.length >= PaginationService.MAX_VISIBLE_PAGES) {
				break;
			}
		}

		if (visiblePages.length < PaginationService.MAX_VISIBLE_PAGES) {
			for (let i = this.parameters.page - 3; i > 0; i--) {
				visiblePages.unshift(i);

				if (visiblePages.length >= PaginationService.MAX_VISIBLE_PAGES) {
					break;
				}
			}
		}

		return visiblePages;
	}

	public goToPage(page: number) {
		this.parameters.page = page;
		this.settings.onPageChange(this.parameters);
	}

	public goToFirstPage() {
		this.goToPage(1);
	}

	public goToLastPage() {
		const lastPage = this.getLastPage();

		this.goToPage(lastPage);
	}

	public shouldDisableNextButton() {
		return this.parameters.page === this.getLastPage();
	}

	public shouldDisablePreviousButton() {
		return this.parameters.page === 1;
	}

	private getLastPage() {
		return Math.ceil(this.totalCount / this.parameters.rowsPerPage);
	}

	public goToNextPage() {
		const isLastPage = this.parameters.page === this.getLastPage();

		if (!isLastPage) {
			this.goToPage(this.parameters.page + 1);
		}
	}

	public goToPreviousPage() {
		const isFirstPage = this.parameters.page === 1;

		if (!isFirstPage) {
			this.goToPage(this.parameters.page - 1);
		}
	}

	public updateRowsPerPage(rowsPerPage: number) {
		this.parameters.rowsPerPage = rowsPerPage;
		this.goToPage(1);
	}

	private buildInitialParameters(): PaginationRequestParameters {
		return {
			page: 1,
			rowsPerPage: this.settings.rowsPerPageOptions[0] || 10
		};
	}

	private normalizeSettings(
		settings: Partial<PaginationServiceSettings>
	): PaginationServiceSettings {
		return {
			rowsPerPageOptions: settings.rowsPerPageOptions || [10, 25, 50, 100],
			onPageChange: settings.onPageChange || doNothing
		};
	}
}
