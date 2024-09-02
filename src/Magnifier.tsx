import React, { useState, useRef, useEffect } from "react";

interface MagnifierProps {
    imgUrl: string;
    magnifierSize?: number;
    zoomLevel?: number;
    BorderRadius?: string;
}

const Magnifier: React.FC<MagnifierProps> = ({
    imgUrl,
    magnifierSize = 200,
    zoomLevel = 3,
    BorderRadius = "50",
}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const updateDimensions = () => {
            if (imgRef.current) {
                setImgDimensions({
                    width: imgRef.current.width,
                    height: imgRef.current.height,
                });
            }
        };

        window.addEventListener("resize", updateDimensions);
        updateDimensions();

        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const handleMouseHover = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } =
            imgRef.current!.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setPosition({ x, y });

        setCursorPosition({ x: e.pageX - left, y: e.pageY - top });
    };

    const magnifierOffset = magnifierSize / 2;

    return (
        <div
            className="img-magnifier-container"
            style={{ position: "relative", overflow: "hidden" }}
            onMouseEnter={() => setShowMagnifier(true)}
            onMouseLeave={() => setShowMagnifier(false)}
            onMouseMove={handleMouseHover}
        >
            <img
                ref={imgRef}
                className="magnifier-img"
                src={imgUrl}
                alt="product-img"
                style={{
                    display: "block",
                    width: "100%",
                    height: "80vh",
                }}
            />

            {showMagnifier && (
                <div
                    style={{
                        position: "absolute",
                        left: `${cursorPosition.x - magnifierOffset}px`,
                        top: `${cursorPosition.y - magnifierOffset}px`,
                        pointerEvents: "none",
                        width: `${magnifierSize}px`,
                        height: `${magnifierSize}px`,
                        border: "2px solid white",
                        borderRadius: `${BorderRadius}%`,
                        boxShadow: "0 0 10px rgba(0,0,0,0.25)",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            width: `${magnifierSize * zoomLevel}px`,
                            height: `${magnifierSize * zoomLevel}px`,
                            backgroundImage: `url(${imgUrl})`,
                            backgroundSize: `${
                                imgDimensions.width * zoomLevel
                            }px ${imgDimensions.height * zoomLevel}px`,
                            backgroundPosition: `${
                                -cursorPosition.x * zoomLevel + magnifierOffset
                            }px ${
                                -cursorPosition.y * zoomLevel + magnifierOffset
                            }px`,
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Magnifier;
