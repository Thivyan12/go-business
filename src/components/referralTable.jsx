import { useState } from "react";
import ReferralRow from "./referralRow";
import "../styles/referralTable.css";

const ROWS_PER_PAGE = 10;

const ReferralTable = ({ referrals }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalEntries = referrals.length;
  const totalPages = Math.ceil(totalEntries / ROWS_PER_PAGE);

  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  const currentRows = referrals.slice(startIndex, endIndex);

  const from = totalEntries === 0 ? 0 : startIndex + 1;
  const to = Math.min(endIndex, totalEntries);

  return (
    <div className="referral-table-container">
      <div className="table-scroll-container">
        <div className="referral-header">
          <p>Name</p>
          <p>Service</p>
          <p>Date</p>
          <p>Profit</p>
        </div>

        <div className="referral-body">
          {currentRows.length > 0 ? (
            currentRows.map((item) => (
              <ReferralRow
                key={item.id}
                details={item}
              />
            ))
          ) : (
            <div className="no-records-container">
              <p className="no-records-text">
                No records found
              </p>
            </div>
          )}
        </div>
      </div>

      {totalEntries > 0 && (
        <div className="referral-footer">
          <p className="entries-text">
            Showing {from}-{to} of {totalEntries} entries
          </p>

          <div className="pagination">
            <button
              type="button"
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
            >
              Previous
            </button>

            {totalPages > 1 &&
              Array.from(
                { length: totalPages },
                (_, index) => (
                  <button
                    type="button"
                    key={index + 1}
                    className={`pagination-btn ${
                      currentPage === index + 1
                        ? "active-page"
                        : ""
                    }`}
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                  >
                    {index + 1}
                  </button>
                )
              )}

            <button
              type="button"
              className="pagination-btn"
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralTable;