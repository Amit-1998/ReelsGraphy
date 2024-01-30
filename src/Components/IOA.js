import React, { useEffect } from "react";
import Mandir from "../videos/Mandir.mp4";
import RashYatra from "../videos/RashYatra.mp4";
import Welcome from "../videos/Welcome.mp4";

const IOA = () => {
  const callback = (entries) => {
    entries.forEach((entry) => {
      let ele = entry.target.childNodes[0];
      ele.play().then(() => {
        if (!ele.paused && !entry.isIntersecting) {
          ele.pause();
        }
      });
    });
  };

  let observer = new IntersectionObserver(callback, { threshold: 0.6 });

  useEffect(() => {
    const elements = document.querySelectorAll(".videos");
    elements.forEach((elem) => {
      observer.observe(elem);
    });
  }, []);

  return (
    <div className="video-container">
      <div className="videos">
        <video src={Mandir} muted="muted" style={{ height: "85vh" }} />
      </div>
      <div className="videos">
        <video src={RashYatra} muted="muted" style={{ height: "85vh" }} />
      </div>
      <div className="videos">
        <video src={Welcome} muted="muted" style={{ height: "85vh" }} />
      </div>
    </div>
  );
};

export default IOA;
