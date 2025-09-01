
import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./InputOTP";

export default function OTPExample() {
  const [otp, setOtp] = useState(["", "", "", ""]); // 4-digit OTP

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Entered OTP: " + otp.join(""));
      }}
      className="flex flex-col items-center gap-4 p-4"
    >
      <InputOTPGroup>
        {otp.map((digit, index) => (
          <React.Fragment key={index}>
            {index > 0 && <InputOTPSeparator />}
            <InputOTPSlot
              index={index}
              onClick={() => console.log("Slot clicked:", index)}
              onChange={(e) => {
                const val = e.target.value.slice(-1);
                setOtp((prev) => {
                  const updated = [...prev];
                  updated[index] = val;
                  return updated;
                });
              }}
            >
              {digit}
            </InputOTPSlot>
          </React.Fragment>
        ))}
      </InputOTPGroup>

      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Submit OTP
      </button>
    </form>
  );
}
