import "./../styles/summary.css";

const Summary = (props) => {
  const {details} = props;
  const { service,  yourReferrals, activeReferrals, totalRefEarnings} = details;

  return (
    <div className="summary-card-content">
        <div className="summary-card">
      <h2 className="summary-label">
        SERVICE
      </h2>
      <p className="summary-value-service">
        {service}
      </p>
        </div>
        <div className="summary-card">
      <h2 className="summary-label">
        YOUR REFERRALS
      </h2>
      <p className="summary-value">
        {yourReferrals}
      </p>
        </div>
        <div className="summary-card">
      <h2 className="summary-label">
        ACTIVE REFERRALS
      </h2>
      <p className="summary-value">
        {activeReferrals}
      </p>
        </div>
        <div className="summary-card">
      <h2 className="summary-label">
        TOTAL REF. EARNINGS
      </h2>
      <p className="summary-value">
        {totalRefEarnings}
      </p>
        </div>
        </div>
  );
};

export default Summary;