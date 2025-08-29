import cn from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Paginations = ({
  data: { current_page, size, first, last, total_elements, total_pages },
  page,
}: {
  data: any;
  page: (pageNumber?: number, pageSize?: number) => void;
}) => {

  const handlePrevious = () => {
    if (!first) {
      page(current_page - 1, size);
    }
  };

  const handleNext = () => {
    if (!last) {
      page(current_page + 1, size);
    }
  };

  // Ensure current_page and total_pages are numbers and have valid values
  const currentPageDisplay = typeof current_page === 'number' ? current_page + 1 : 1;
  const totalPagesDisplay = typeof total_pages === 'number' ? total_pages : 1;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-8 py-4 z-10">
      <div className="flex items-center justify-center space-x-4">
        <span className="text-sm text-gray-600">Total pages: {totalPagesDisplay}</span>
        <button
          title={'Previous'}
          onClick={handlePrevious}
          disabled={first}
          className={cn(
            'p-2 rounded-md transition-colors duration-200',
            first 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          )}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900">
            {currentPageDisplay}
          </span>
          <span className="text-sm text-gray-500">of {totalPagesDisplay}</span>
        </div>

        <button
          title={'Next'}
          onClick={handleNext}
          disabled={last}
          className={cn(
            'p-2 rounded-md transition-colors duration-200',
            last 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          )}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Paginations;
