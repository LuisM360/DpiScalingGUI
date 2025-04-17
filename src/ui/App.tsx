import { useEffect, useState } from "react";
import "./App.css";
import { MonitorSelector } from "./components/MonitorSelector";
import { ScaleDisplay } from "./components/ScaleDisplay";
import { ScaleButtons } from "./components/ScaleButtons";
import { StatusIndicator } from "./components/StatusIndicator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type StatusType = "success" | "error" | "idle" | "loading";

function App() {
  const [selectedMonitor, setSelectedMonitor] = useState<string>("1");
  const [currentScale, setCurrentScale] = useState<number | null>(null);
  const [status, setStatus] = useState<StatusType>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleMonitorSelect(selectedMonitor);
  }, [selectedMonitor]);

  const handleMonitorSelect = async (monitorId: string) => {
    setSelectedMonitor(monitorId);
    setLoading(true);
    setStatus("idle");
    setStatusMessage("");
    try {
      const result = await window.electronAPI.getCurrentScale(monitorId);
      if (result.error) {
        setCurrentScale(null);
        setStatus("error");
        setStatusMessage(result.error);
      } else {
        setCurrentScale(result.scale);
        setStatus("idle");
        setStatusMessage("");
      }
    } catch (err: unknown) {
      setCurrentScale(null);
      setStatus("error");
      setStatusMessage(
        err instanceof Error ? err.message : "Failed to get current scale"
      );
    } finally {
      setLoading(false);
    }
  };

  // Placeholder: Simulate applying scale
  const handleApplyScale = async (scale: number) => {
    setLoading(true);
    setStatus("loading");
    setStatusMessage("Applying scale...");
    try {
      const result = await window.electronAPI.setScale(selectedMonitor, scale);
      if (result.success) {
        setCurrentScale(scale);
        setStatus("success");
        setStatusMessage(result.message);
      } else {
        setStatus("error");
        setStatusMessage(result.message || "Failed to set scale");
      }
    } catch (err: unknown) {
      setStatus("error");
      setStatusMessage(
        err instanceof Error ? err.message : "Failed to set scale"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>DPI Scaling</CardTitle>
          <Separator className="my-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <MonitorSelector
            selectedMonitor={selectedMonitor}
            onselectedMonitor={handleMonitorSelect}
          />
          <ScaleDisplay currentScale={currentScale} isloading={loading} />
          <ScaleButtons
            currentScale={currentScale}
            onApplyScale={handleApplyScale}
            isLoading={loading}
          />
        </CardContent>
        <CardFooter>
          <StatusIndicator status={status} message={statusMessage} />
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
