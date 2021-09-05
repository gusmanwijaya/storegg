import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckoutConfirmation() {
  const [dataTopUp, setdataTopUp] = useState({
    bankAccountName: "",
    paymentItem: {
      bank: {
        bankName: "",
        name: "",
        noRekening: "",
        _id: "",
      },
      payment: {
        type: "",
      },
    },
  });

  useEffect(() => {
    const dataFromLocal = localStorage.getItem("data-topup");
    const dataTopUpLocal = JSON.parse(dataFromLocal!);
    setdataTopUp(dataTopUpLocal);
  }, []);

  return (
    <>
      <div className="payment pt-md-50 pb-md-50 pt-10 pb-10">
        <h2 className="fw-bold text-xl color-palette-1 mb-20">
          Payment Informations
        </h2>
        <p className="text-lg color-palette-1 mb-20">
          Your Account Name{" "}
          <span className="purchase-details">{dataTopUp.bankAccountName}</span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Type{" "}
          <span className="payment-details">
            {dataTopUp.paymentItem.payment.type}
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Name{" "}
          <span className="payment-details">
            {dataTopUp.paymentItem.bank.bankName}
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Account Name{" "}
          <span className="payment-details">
            {dataTopUp.paymentItem.bank.name}
          </span>
        </p>
        <p className="text-lg color-palette-1 mb-20">
          Bank Number{" "}
          <span className="payment-details">
            {dataTopUp.paymentItem.bank.noRekening}
          </span>
        </p>
      </div>
      <label className="checkbox-label text-lg color-palette-1">
        I have transferred the money
        <input type="checkbox" />
        <span className="checkmark"></span>
      </label>
      <div className="d-md-block d-flex flex-column w-100 pt-50">
        <Link href="/complete-checkout">
          <a
            className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg"
            role="button"
          >
            Confirm Payment
          </a>
        </Link>
      </div>
    </>
  );
}
