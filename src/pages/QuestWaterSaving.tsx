import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Clock, Camera, MapPin } from "lucide-react";

const QuestWaterSaving = () => {
  const [progress, setProgress] = useState(0);
  const [beforePhoto, setBeforePhoto] = useState<string | null>(null);
  const [afterPhoto, setAfterPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Start camera on load
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(err => console.error("Camera error:", err));

    // Get geolocation
    navigator.geolocation.getCurrentPosition(
      pos => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      err => console.error("Location error:", err)
    );
  }, []);

  const capturePhoto = (type: "before" | "after") => {
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, 640, 480);
    const dataUrl = canvasRef.current.toDataURL("image/png");

    if (type === "before") {
      setBeforePhoto(dataUrl);
      setProgress(50);
    } else {
      setAfterPhoto(dataUrl);
      setProgress(100);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto">
        <Card className="p-6 shadow-md">
          <h1 className="text-3xl font-bold mb-4">
            Analysing soil using image
          </h1>
          <p className="text-muted-foreground mb-6">
            Complete this quest in 5 days to earn <b>250 XP</b>. 
            Capture proof photos before and after implementing irrigation improvements.
          </p>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Camera Module */}
          <div className="mb-6">
            <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg shadow mb-4" />
            <canvas ref={canvasRef} width="640" height="480" className="hidden" />

            <div className="flex space-x-4">
              <Button onClick={() => capturePhoto("before")} disabled={!!beforePhoto}>
                <Camera className="mr-2 h-4 w-4" /> Capture Before
              </Button>
              <Button onClick={() => capturePhoto("after")} disabled={!beforePhoto || !!afterPhoto}>
                <Camera className="mr-2 h-4 w-4" /> Capture After
              </Button>
            </div>
          </div>

          {/* Preview */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {beforePhoto && (
              <div>
                <h3 className="text-sm font-medium mb-1">Before</h3>
                <img src={beforePhoto} alt="Before quest" className="rounded-lg shadow" />
              </div>
            )}
            {afterPhoto && (
              <div>
                <h3 className="text-sm font-medium mb-1">After</h3>
                <img src={afterPhoto} alt="After quest" className="rounded-lg shadow" />
              </div>
            )}
          </div>

          {/* Location */}
          {location && (
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </div>
          )}

          {/* XP + Timer */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4" /> <span>250 XP</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" /> <span>5 days</span>
            </div>
          </div>

          {/* Complete Quest Button */}
          <Button className="w-full" disabled={!afterPhoto}>
            {progress === 100 ? "Complete Quest" : "Complete Task"}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default QuestWaterSaving;
