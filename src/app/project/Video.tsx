import { useRef, useEffect, useState } from "react";
import styles from "./projectPage.module.scss";

export const Video = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
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
    if (!videoRef.current || !isLoaded) return;
    videoRef.current.play();

    return () => videoRef.current?.pause();
  }, []);

  return (
    <div
      ref={container}
      onClick={handleClickVideo}
      className={styles.videoWrapper}
    >
      <div
        className={styles.wrapper}
        style={{
          background: isPlaying ? "#000" : "#adadad",
        }}
      >
        <video
          ref={videoRef}
          className={styles.videoContainer}
          autoPlay
          src={"/video/reservation.mp4"}
          muted
          loop
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onLoad={() => {
            setIsLoaded(true);
          }}
        />
      </div>
    </div>
  );
};
