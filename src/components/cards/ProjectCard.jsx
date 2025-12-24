import React, { useRef, useEffect } from "react";
import styled from "styled-components";

/* -------- GLOBAL ACTIVE VIDEO -------- */
let activeVideo = null;
/* ----------------------------------- */

const Card = styled.div`
  width: 330px;
  height: 490px;
  background-color: ${({ theme }) => theme.card};
  border-radius: 10px;
  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.4s ease-in-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.6);
    filter: brightness(1.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const ProjectCard = ({ project }) => {
  const videoRef = useRef(null);

  const isVideo =
    project.video ||
    (project.image &&
      (project.image.includes(".mp4") || project.image.includes("Videos/")));

  /* -------- STOP OTHER VIDEOS -------- */
  const stopOtherVideos = (current) => {
    if (activeVideo && activeVideo !== current) {
      activeVideo.pause();
      activeVideo.muted = true;
    }
    activeVideo = current;
  };

  /* -------- DESKTOP: HOVER PLAY WITH SOUND -------- */
  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (!video) return;

    stopOtherVideos(video);
    video.muted = false;
    video.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.muted = true;
    if (activeVideo === video) activeVideo = null;
  };

  /* -------- MOBILE: SCROLL PLAY WITH SOUND -------- */
  useEffect(() => {
    if (!isVideo || !videoRef.current) return;

    const video = videoRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          stopOtherVideos(video);
          video.muted = false;
          video.play().catch(() => {});
        } else {
          video.pause();
          video.muted = true;
          if (activeVideo === video) activeVideo = null;
        }
      },
      { threshold: 0.7 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isVideo]);

  return (
    <Card>
      {isVideo ? (
        <Video
          ref={videoRef}
          muted
          preload="metadata"
          playsInline
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <source src={project.video || project.image} type="video/mp4" />
        </Video>
      ) : (
        <Image src={project.image} alt={project.title} />
      )}
    </Card>
  );
};

export default ProjectCard;
