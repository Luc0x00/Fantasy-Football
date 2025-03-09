import React from 'react';

const PlayerPagination = ({
                              currentPage,
                              totalPages,
                              goToPreviousPage,
                              goToNextPage,
                              handlePageSelect
                          }) => {
    return (
        <div className="player-pagination">
            <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="pagination-btn"
            >
                Previous
            </button>

            <select
                value={currentPage}
                onChange={handlePageSelect}
                className="pagination-dropdown"
            >
                {[...Array(totalPages)].map((_, index) => (
                    <option key={index} value={index + 1}>
                        Page {index + 1}
                    </option>
                ))}
            </select>

            <button
                onClick={goToNextPage}
                disabled={currentPage >= totalPages}
                className="pagination-btn"
            >
                Next
            </button>
        </div>
    );
};

export default PlayerPagination;
