import { Button } from "@heroui/button";
import { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function WebcamPage() {
    const [image, setImage] = useState<string | null>(null);
    const webcamRef = useRef<Webcam>(null);
  return (
    <div>
      <h1>Webcam</h1>
      <Webcam ref={webcamRef} width={320} height={240} />
      <Button onPress={() => setImage(webcamRef.current?.getScreenshot() ?? null)}>Capture</Button>
      {image && <img src={image} alt="Captured" />}
    </div>
  );
}