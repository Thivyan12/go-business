import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Oval } from "react-loader-spinner";
import NavBar from "../components/navBar";
import ReferralTable from "../components/referralTable";
import OverView from "../components/overview";
import Summary from "../components/summary";
import Footer from "../components/footer";
import "./../styles/dashboard.css";

function Dashboard() {
  const [overviewData, setOverviewData] = useState([]);
  const [summaryData, setSummaryData] = useState({});
  const [referralsData, setReferralsData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [loadingState, setLoadingState] = useState(true);
  const [fetchErr, setFetchErr] = useState("");

  useEffect(() => {
  const loadDashboard = async () => {
    setLoadingState(true);

    await getData();

    setLoadingState(false);
  };

  loadDashboard();
}, []);

  const getData = async (
  search = "",
  sort = "desc"
) => {
  const token = Cookies.get("jwt_token");

  try {
    const url = `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?search=${encodeURIComponent(
      search
    )}&sort=${sort}`;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      setOverviewData(data.data.metrics || []);
      setSummaryData(data.data.serviceSummary || {});
      setReferralsData(data.data.referrals || []);
    } else {
      setFetchErr(data.message);
    }
  } catch (err) {
    setFetchErr(err.message);
  }
};

const handleSearchChange = async (e) => {
  const value = e.target.value;

  setSearchText(value);

  await getData(value, sortOrder);
};

const handleSortChange = async (e) => {
  const value = e.target.value;

  setSortOrder(value);

  await getData(searchText, value);
};

  return (
    <div className="dashboard-page">
      <NavBar/>

      <div className="dashboard-content">
        <h1 className="dashboard-title">
          Referral Dashboard
        </h1>

        <p className="dashboard-subtitle">
          Track your referrals, earnings, and partner activity in one place.
        </p>

        {loadingState ? (
          <div className="loader-container" aria-label="Loading">
            <Oval
              height={30}
              width={30}
              color="#5472f7"
              visible={true}
              ariaLabel="loading"
            />
          </div>
        ) : (
          <>
            {fetchErr ? (
              <div className="err-msg-container" role="alert">
                <p className="err-msg">
                  Error Occurred: {fetchErr}
                </p>
              </div>
            ) : (
              <>
                <section className="dashboard-overview" role="region" aria-label="Overview metrics">
                  <h2 className="overview-title">
                    Overview
                  </h2>

                  <div className="overview-content">
                    {overviewData.map((item) => (
                      <OverView
                        details={item}
                        key={item.id}
                      />
                    ))}
                  </div>
                </section>

                <section className="dashboard-service-summary" aria-label="Service summary">
                  <h2 className="summary-title">
                    Service Summary
                  </h2>

                  <Summary details={summaryData} />
                </section>

                <section className="share-referral-container" aria-label="Share referral">
  <h2 className="share-referral-title">
    Refer friends and earn more
  </h2>

  <div className="share-referral-content">
    <div className="share-field">
      <label className="share-label">
        YOUR REFERRAL LINK
      </label>

      <div className="share-input-container">
        <input
          type="text"
          value="https://gobusiness.com/?referral=ABCXYZ"
          readOnly
          className="share-input"
        />

        <button
          type="button"
          className="copy-btn"
        >
          Copy
        </button>
      </div>
    </div>

    <div className="share-field">
      <label className="share-label">
        YOUR REFERRAL CODE
      </label>

      <div className="share-input-container">
        <input
          type="text"
          value="ABCXYZ"
          readOnly
          className="share-input"
        />

        <button
          type="button"
          className="copy-btn"
        >
          Copy
        </button>
      </div>
    </div>
  </div>
                </section>

                <div className="all-referrals-container">
                  <h2 className="all-referrals-title">
                    All referrals
                  </h2>

  <div className="all-referrals-controls">
    <div className="search-container">
      <label htmlFor="search" className="main-label">
        Search
      </label>

      <input
        id="search"
        type="text"
        placeholder="Name or service..."
        aria-label="Search referrals"
        value={searchText}
        onChange={handleSearchChange}
      />
    </div>

    <div className="sort-container">
      <label htmlFor="sort" className="main-label">
        Sort by date
      </label>

      <select
        id="sort"
        value={sortOrder}
        onChange={handleSortChange}
      >
        <option value="desc">
          Newest first
        </option>

        <option value="asc">
          Oldest first
        </option>
      </select>
    </div>
  </div>
</div>

<ReferralTable referrals={referralsData} />
              </>
            )}
          </>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default Dashboard;