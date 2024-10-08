import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import video from '/src/assets/safesecmovie.mp4';
import video from '/src/assets/safesecmovie.mov';


export default function HomeIntro() {
    const navigate = useNavigate();
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.addEventListener("ended", () => {
                video.pause();
                video.setAttribute("style", "object-fit: cover;");
                video.currentTime = video.duration - 0.1; // Ensure the last frame is shown
            });
        }

        return () => {
            if (video) {
                video.removeEventListener("ended", () => {});
            }
        };
    }, []);

    return (
        <div className="flex flex-col items-center mt-10 lg:mt-20">
            <div className="flex flex-col items-center mt-10 lg:mt-20 text-center">
                <h1 className="mx-8 text-5xl sm:text-7xl lg:text-8xl tracking-wide">
                    <span className="bg-gradient-to-r from-blue-300 to-purple-800 text-transparent bg-clip-text font-bold">
                        SAFE SECURITY
                    </span>
                </h1>
                <h2 className="text-xl lg:text-3xl mt-2">
                    ACCESSIBLE-IZING CYBERSECURITY
                </h2>
                <div className="mt-32">
                    <video
                        ref={videoRef}
                        src={video}
                        className="video-scale"
                        autoPlay
                        muted
                    />
                </div>
            </div>
        </div>
    );
}
