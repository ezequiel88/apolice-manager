import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

type ApoliceListPaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function ApoliceListPagination({ currentPage, totalPages, onPageChange }: ApoliceListPaginationProps) {

    const [currentPageInternal, setCurrentPageInternal] = useState(currentPage);

    const changePage = (page: number) => {
        setCurrentPageInternal(page);
        onPageChange(page);
    };

    const renderPageButtons = () => {
        const maxPagesToShow = 5;
        const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
        const startPage = Math.max(1, currentPageInternal - halfMaxPagesToShow);
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        const pageButtons = [];
        for (let page = startPage; page <= endPage; page++) {
            pageButtons.push(
                <button
                    key={page}
                    onClick={() => changePage(page)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-slate-500 hover:text-gray-200 ${currentPageInternal === page ? 'z-10 bg-slate-500 text-white shadow-sm' : 'cursor-pointer'
                        }`}
                >
                    {page}
                </button>
            );
        }
        return pageButtons;
    };

    const isFirstPage = currentPageInternal === 1;
    const isLastPage = currentPageInternal === totalPages;

    return (
        <div className="flex items-center justify-center mt-8">
            <nav className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
                <button
                    onClick={() => changePage(1)} 
                    disabled={isFirstPage}
                    className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${isFirstPage ? 'cursor-not-allowed' : 'cursor-pointer'
                        }`}
                >
                    <ChevronDoubleLeftIcon className='text-gray-600 w-4 h-4' />

                </button>
                <button
                    onClick={() => changePage(currentPageInternal - 1)}
                    disabled={isFirstPage}
                    className={`relative inline-flex items-center px-3 py-2 border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${isFirstPage ? 'cursor-not-allowed' : 'cursor-pointer'
                        }`}
                >
                    <ChevronLeftIcon className='text-gray-600 w-4 h-4' />

                </button>
                {renderPageButtons()}
                <button
                    onClick={() => changePage(currentPageInternal + 1)}
                    disabled={isLastPage}
                    className={`relative inline-flex items-center px-3 py-2 border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${isLastPage ? 'cursor-not-allowed' : 'cursor-pointer'
                        }`}
                >
                    <ChevronRightIcon className='text-gray-600 w-4 h-4' />
                </button>
                <button
                    onClick={() => changePage(totalPages)} 
                    disabled={isLastPage}
                    className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${isLastPage ? 'cursor-not-allowed' : 'cursor-pointer'
                        }`}
                >
                    <ChevronDoubleRightIcon className='text-gray-600 w-4 h-4' />

                </button>
            </nav>
        </div>
    );
}
