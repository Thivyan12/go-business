import { useNavigate } from "react-router-dom";
import "../styles/referralRow.css";

const ReferralRow = ({ details }) => {
  const {
    name,
    serviceName,
    date,
    profit,
  } = details;

  const navigate = useNavigate();

  return (
    <div className="referral-row" onClick={() => navigate(`/referral/${details.id}`)}>
      <p>{name}</p>
      <p>{serviceName}</p>
      <p>{date}</p>
      <p className="profit-value">
        {profit}
      </p>
    </div>
  );
};

export default ReferralRow;