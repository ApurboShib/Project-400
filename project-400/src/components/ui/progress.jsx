import React, { useState, useEffect } from "react";
import { Progress } from "./Progress";
import { Button } from "@/components/ui/button";

export default function ProgressExample() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Progress value={progress} className="w-64" />
      <Button onClick={() => setProgress(0)}>Reset Progress</Button>
      <p>{progress}%</p>
    </div>
  );
}
