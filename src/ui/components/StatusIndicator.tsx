import React from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

type StatusType = "success" | "error" | "idle" | "loading";

interface StatusIndicatorProps {
  status: StatusType;
  message?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  message,
}) => {
  let icon = null;
  let color = "";

  switch (status) {
    case "success":
      icon = <CheckCircle className="text-green-600" />;
      color = "text-green-700";
      break;
    case "error":
      icon = <XCircle className="text-red-600" />;
      color = "text-red-700";
      break;
    case "loading":
      icon = <Loader2 className="animate-spin text-blue-600" />;
      color = "text-blue-700";
      break;
    default:
      icon = null;
      color = "text-muted";
  }

  return (
    <div className={`flex items-center gap-2 mt-2 ${color}`}>
      {icon}
      <span>{message || (status === "idle" ? "No action yet" : "")}</span>
    </div>
  );
};
