import PaginationService, {
	type PaginationRequestParameters
} from '$lib/ui/table/pagination/paginationService.svelte';
import doNothing from '$lib/utils/doNothing';

describe('PaginationService', () => {
	describe('on construction', () => {
		it('should expose the given settings', () => {
			let service = new PaginationService({ rowsPerPageOptions: [10, 20, 30] });

			expect(service.settings.rowsPerPageOptions).toEqual([10, 20, 30]);
		});

		it('initializes the total count to 0', () => {
			let service = new PaginationService();

			expect(service.totalCount).toEqual(0);
		});

		it('should normalize the rows per page options to 10, 25, 50, 100 if not provided', () => {
			let service = new PaginationService();

			expect(service.settings.rowsPerPageOptions).toEqual([10, 25, 50, 100]);
		});
		it('normalizes the onPageChange callback to a no-op if not provided', () => {
			let service = new PaginationService();

			expect(service.settings.onPageChange).toEqual(doNothing);
		});

		describe('initial page parameters', () => {
			let parameters: PaginationRequestParameters;

			beforeEach(() => {
				let service = new PaginationService();
				parameters = service.getPageParameters();
			});

			it('should default to page 1', () => {
				expect(parameters.page).toEqual(1);
			});

			it('should default to 10 rows per page', () => {
				expect(parameters.rowsPerPage).toEqual(10);
			});

			it('instead defaults to the first rows per page option if provided', () => {
				let service = new PaginationService({ rowsPerPageOptions: [20, 30] });
				parameters = service.getPageParameters();

				expect(parameters.rowsPerPage).toEqual(20);
			});

			it('should default to 10 if the rows per page array is empty', () => {
				let service = new PaginationService({ rowsPerPageOptions: [] });
				parameters = service.getPageParameters();

				expect(parameters.rowsPerPage).toEqual(10);
			});
		});
	});

	describe('onDataRetrieved', () => {
		it('should update the total count', () => {
			let service = new PaginationService();
			service.onDataRetrieved({ totalCount: 100 });

			expect(service.totalCount).toEqual(100);
		});
	});

	describe('getVisiblePageNumbers', () => {
		it.each([
			[{ currentPage: 1, rowsPerPage: 10, totalCount: 100, visiblePages: [1, 2, 3, 4, 5] }],
			[{ currentPage: 1, rowsPerPage: 10, totalCount: 20, visiblePages: [1, 2] }],
			[{ currentPage: 2, rowsPerPage: 10, totalCount: 100, visiblePages: [1, 2, 3, 4, 5] }],
			[{ currentPage: 3, rowsPerPage: 10, totalCount: 100, visiblePages: [1, 2, 3, 4, 5] }],
			[{ currentPage: 5, rowsPerPage: 10, totalCount: 100, visiblePages: [3, 4, 5, 6, 7] }],
			[{ currentPage: 10, rowsPerPage: 10, totalCount: 100, visiblePages: [6, 7, 8, 9, 10] }],
			[{ currentPage: 3, rowsPerPage: 10, totalCount: 30, visiblePages: [1, 2, 3] }],
			[
				{ currentPage: 85, rowsPerPage: 10, totalCount: 100000, visiblePages: [83, 84, 85, 86, 87] }
			],
			[{ currentPage: 35, rowsPerPage: 100, totalCount: 3600, visiblePages: [32, 33, 34, 35, 36] }]
		])(
			'should return the visible page numbers when the current page is $currentPage, the rows per page is $rowsPerPage, the total count is $totalCount',
			({ currentPage, rowsPerPage, totalCount, visiblePages }) => {
				let service = new PaginationService({ rowsPerPageOptions: [rowsPerPage] });
				service.onDataRetrieved({ totalCount });
				service.goToPage(currentPage);

				let result = service.getVisiblePageNumbers();

				expect(result).toEqual(visiblePages);
			}
		);
	});

	describe('goToPage', () => {
		it('should update the current page', () => {
			let service = new PaginationService();
			service.goToPage(5);

			expect(service.getPageParameters().page).toEqual(5);
		});

		it('calls onPageChange with the page number', () => {
			let onPageChange = vi.fn();
			let service = new PaginationService({ onPageChange });

			service.goToPage(5);

			expect(onPageChange).toHaveBeenCalledWith({ page: 5, rowsPerPage: 10 });
		});
	});

	describe('goToFirstPage', () => {
		it('should go to the first page', () => {
			let service = new PaginationService();
			service.goToPage(5);
			service.goToFirstPage();

			expect(service.getPageParameters().page).toEqual(1);
		});

		it('calls onPageChange with the page number', () => {
			let onPageChange = vi.fn();
			let service = new PaginationService({ onPageChange });

			service.goToFirstPage();

			expect(onPageChange).toHaveBeenCalledWith({ page: 1, rowsPerPage: 10 });
		});
	});

	describe('goToLastPage', () => {
		it('should go to the last page', () => {
			let service = new PaginationService();
			service.onDataRetrieved({ totalCount: 100 });
			service.goToLastPage();

			expect(service.getPageParameters().page).toEqual(10);
		});

		it('calls onPageChange with the page number', () => {
			let onPageChange = vi.fn();
			let service = new PaginationService({ onPageChange });

			service.onDataRetrieved({ totalCount: 100 });
			service.goToLastPage();

			expect(onPageChange).toHaveBeenCalledWith({ page: 10, rowsPerPage: 10 });
		});
	});

	describe('updateRowsPerPage', () => {
		it('should update the rows per page', () => {
			let service = new PaginationService();
			service.updateRowsPerPage(20);

			expect(service.getPageParameters().rowsPerPage).toEqual(20);
		});

		it('should call onPageChange with the new rows per page', () => {
			let onPageChange = vi.fn();
			let service = new PaginationService({ onPageChange });

			service.updateRowsPerPage(20);

			expect(onPageChange).toHaveBeenCalledWith({ page: 1, rowsPerPage: 20 });
		});

		it('changes the page number to 1', () => {
			let service = new PaginationService();
			service.goToPage(5);
			service.updateRowsPerPage(20);

			expect(service.getPageParameters().page).toEqual(1);
		});
	});
});
