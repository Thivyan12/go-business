import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Oval } from "react-loader-spinner";
import Navbar from "../components/navBar";
import "../styles/referralView.css";

function ReferralView() {
  const { id } = useParams();

  const [referralData, setReferralData] = useState(null);
  const [loadingState, setLoadingState] = useState(true);
  const [fetchErr, setFetchErr] = useState("");

  useEffect(() => {
    const getReferralDetails = async () => {
      const token = Cookies.get("jwt_token");

      try {
        const response = await fetch(
          `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?id=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setReferralData(data.data.referrals[0]);
        } else {
          setFetchErr(data.message || "Unable to fetch referral details");
        }
      } catch (err) {
        setFetchErr(err.message);
      } finally {
        setLoadingState(false);
      }
    };

    getReferralDetails();
  }, [id]);

  const formatDate = (date) => {
    return date.replaceAll("-", "/");
  };

  const formatProfit = (profit) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(profit);
  };

  if (loadingState) {
    return (
      <div className="loader-detail-container">
        <Oval
          height={40}
          width={40}
          color="#5472f7"
          visible={true}
        />
      </div>
    );
  }

  if (fetchErr || !referralData) {
    return (
      <div className="referral-detail-error-container">
        <h1>Referral not found</h1>
      </div>
    );
  }

  return (
    <div className="referral-detailed-view">
      <Navbar />
      <div className="referral-detailed-view-container ">
        <Link
          to="/"
          className="back-link"
        >
          ← Back to dashboard
        </Link>

        <h1 className="referral-detailed-view-title">
          Referral Details
        </h1>

        <p className="referral-detailed-view-subtitle">
          Full information for this referral partner.
        </p>

        <div className="referral-detailed-card">
          <div className="referral-detailed-card-header">
            <h2>{referralData.name}</h2>

            <div className="service-badge">
              {referralData.serviceName}
            </div>
          </div>

          <div className="referral-detail-row">
            <span>REFERRAL ID</span>
            <strong>{referralData.id}</strong>
          </div>

          <div className="referral-detail-row">
            <span>NAME</span>
            <strong>{referralData.name}</strong>
          </div>

          <div className="referral-detail-row">
            <span>SERVICE NAME</span>
            <strong>{referralData.serviceName}</strong>
          </div>

         <div className="referral-detail-row">
            <span>DATE</span>
            <strong>{formatDate(referralData.date)}</strong>
        </div>

        <div className="referral-detail-row">
            <span>PROFIT</span>
            <strong>{formatProfit(referralData.profit)}</strong>
        </div>
        </div>
      </div>
    </div>
  );
}

export default ReferralView;