import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import "./style.css";
import Image from "next/image";
import Textfield from "@/components/textfield";
import Button from "@/components/button";
import Close from "@/components/icons/close";

interface PaymentPopupProps {
  viewPayment: boolean;
  setViewPayment: Dispatch<SetStateAction<boolean>>;
  createConsultation: (transactionId: string) => void;
}

const PaymentPopup: FunctionComponent<PaymentPopupProps> = ({
  viewPayment,
  setViewPayment,
  createConsultation,
}) => {
  const [transactionId, setTransactionId] = useState("");
  const [check, setCheck] = useState(false);

  const handleSubmitClick = () => {
    if (transactionId.length == 0) {
      alert("Transaction cannot be empty.");
      return;
    }

    if (!check) {
      alert("Please agree to terms and conditions.");
      return;
    }

    createConsultation(transactionId);
  };

  return (
    <div className={`payment-popup ${viewPayment && "show"}`}>
      <div className="payment-popup-section">
        <div onClick={() => setViewPayment(false)} className="payment-close">
          <Close />
        </div>
        <div className="top">
          <div className="top-left">
            <h3>Scan and Pay using UPI App</h3>
            <Image src="/image/qr_image.png" alt="" width={100} height={100} />
            <span className="top-left-or">OR</span>
            <span className="top-left-upi">
              <b>UPI ID: </b>9876543210
            </span>
          </div>
          <div className="vert-border"></div>
          <div className="top-right">
            <span>Pay Using any App</span>
            <span>₹ 610</span>
            <span>(After Payment)</span>
            <span>Enter Transaction Id:</span>
            <Textfield
              id="transactionId"
              value={transactionId}
              placeholder={"Enter Transaction ID"}
              onChange={(e) => setTransactionId(e.target.value)}
              type="number"
            />
          </div>
        </div>
        <div className="hori-border"></div>
        <div className="bottom">
          <h3 className="bottom-title">CONSENT FOR ONLINE TRANSACTION</h3>
          <span className="bottom-desc">
            By proceeding with your transaction, you agree to our terms and
            conditions. This consent ensures a secure and transparent digital
            payment process. Please review the details carefully before
            confirming your payment.
          </span>
          <div className="bottom-checkdiv">
            <input
              className="bottom-check"
              type="checkbox"
              id="myCheckbox"
              checked={check}
              onChange={() => setCheck(!check)}
            />
            <span className="bottom-text">Yes, I accept</span>
          </div>
          <Button
            type="button"
            value="Submit Appointment"
            onClick={handleSubmitClick}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;
