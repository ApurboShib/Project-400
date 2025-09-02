import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// Reusable Progress bar component
export function Progress({ value = 0, className = "", ...props }) {
  return (
    <div
      className={`relative w-full h-4 bg-gray-200 rounded ${className}`}
      {...props}
    >
      <div
        className="absolute left-0 top-0 h-4 bg-blue-500 rounded"
        style={{ width: `${value}%`, transition: "width 0.3s" }}
      />
    </div>
  );
}
