import { useRef, useEffect, useState } from "react";
import styles from "./projectPage.module.scss";

export const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClickVideo = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.play();

    return () => videoRef.current?.pause();
  }, []);

  return (
    <div
      ref={container}
      onClick={handleClickVideo}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#adadad",
        borderRadius: "24px",
        padding: "0 5px",
      }}
    >
      <video
        ref={videoRef}
        className={styles.videoContainer}
        autoPlay
        src={"/video/reservation.mp4"}
        muted
        playsInline
      />
    </div>
  );
};
