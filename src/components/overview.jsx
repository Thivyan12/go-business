import {
  BsCurrencyDollar,
  BsArrowLeftRight,
} from "react-icons/bs";

import {
  FaRegCreditCard,
  FaLink,
  FaSackDollar,
} from "react-icons/fa6";

import { FaUserFriends } from "react-icons/fa";

import { CgSandClock } from "react-icons/cg";
import { VscPercentage } from "react-icons/vsc";

import "./../styles/overview.css";

const logos = {
  "Total Balance": <BsCurrencyDollar />,
  "Discount Percentage": <FaRegCreditCard />,
  "Total Referral": <FaLink />,
  "Discount Amount": <CgSandClock />,
  "Commission Amount": <VscPercentage />,
  "Total Earning": <FaSackDollar />,
  "Commission Discount": <FaUserFriends />,
  "Total Bank Transfer": <BsArrowLeftRight />,
};

const OverView = ({ details }) => {
  const { label, value } = details;

  return (
    <div className="overview-detail-card">
      <div className="overview-logo">
        {logos[label]}
      </div>

      <h2 className="overview-value">
        {value}
      </h2>

      <p className="overview-label">
        {label}
      </p>
    </div>
  );
};

export default OverView;