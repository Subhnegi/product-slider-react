import React, { useState, useEffect } from "react";
import Magnifier from "./Magnifier";
import "./productSlider.css";

interface Props {
    width?: string;
    height?: string;
    magnify?: boolean;
    images: { img: string }[];
    magnifierSize?: number;
    zoomLevel?: number;
    MagnifierBorderRadius?: string;
    prevIcon?: string;
    nextIcon?: string;
    buttonBg?: string;
    imgBg?: string;
    imgRadius?: string;
    tileRadius?: string;
    tilePosition?: "bottom" | "right" | "left";
}

const ProductSlider: React.FC<Props> = ({
    width = "700px",
    height = "100%",
    magnify = true,
    images,
    magnifierSize,
    zoomLevel,
    MagnifierBorderRadius,
    prevIcon = "<",
    nextIcon = ">",
    buttonBg = "#b8b7b4",
    imgBg = "#b8b7b4",
    imgRadius = "20px",
    tileRadius = "10px",
    tilePosition = "bottom",
}) => {
    const [photoIndex, setPhotoIndex] = useState(0);
    const [transitioning, setTransitioning] = useState(false);
    const [direction, setDirection] = useState("");
    const mainPhoto = images[photoIndex].img;
    useEffect(() => {
        if (transitioning) {
            const timer = setTimeout(() => {
                setTransitioning(false);
            }, 250); // Duration of the transition
            return () => clearTimeout(timer);
        }
    }, [transitioning]);

    const handleClickPrev = () => {
        setTransitioning(true);
        setDirection("left");
        setPhotoIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleClickNext = () => {
        setTransitioning(true);
        setDirection("right");
        setPhotoIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };
    return (
        <div
            style={{
                display: "flex",
                flexDirection:
                    tilePosition === "bottom"
                        ? "column"
                        : tilePosition === "right"
                        ? "row"
                        : "row-reverse",
                width: `${width}`,
                height: `${height}`,
            }}
        >
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    border: "2px solid #ccc",
                    background: imgBg,
                    borderRadius: imgRadius,
                    position: "relative",
                }}
            >
                {magnify ? (
                    <div
                        style={{
                            width: "100%",
                            animation: transitioning ? 
                                    direction==='left'?
                                    'slideLeft 0.25s forwards'
                                    :'slideRight 0.25s forwards' : 'none',
                        }}
                    >
                        <Magnifier
                            imgUrl={mainPhoto}
                            magnifierSize={magnifierSize}
                            zoomLevel={zoomLevel}
                            BorderRadius={MagnifierBorderRadius}
                        />
                    </div>
                ) : (
                    <img
                        src={mainPhoto}
                        alt="product-img"
                        style={{
                            width: "100%",
                            height: "80vh",
                            animation: transitioning ? 
                                    direction==='left'?
                                    'slideLeft 0.25s forwards'
                                    :'slideRight 0.25s forwards' : 'none',
                        }}
                    />
                )}
                <button
                    style={{
                        position: "absolute",
                        left: "1rem",
                        borderRadius: "50%",
                        fontWeight: "600",
                        width: "2.5rem",
                        height: "2.5rem",
                        padding: "0.5rem",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: buttonBg,
                        border: "none",
                    }}
                    onClick={handleClickPrev}
                >
                    {prevIcon}
                </button>
                <button
                    style={{
                        position: "absolute",
                        right: "1rem",
                        borderRadius: "50%",
                        fontWeight: "600",
                        width: "2.5rem",
                        height: "2.5rem",
                        padding: "0.5rem",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: buttonBg,
                        border: "none",
                    }}
                    onClick={handleClickNext}
                >
                    {nextIcon}
                </button>
            </div>
            <div
                style={{
                    width: tilePosition !== "bottom" ? "25%" : "auto",
                    padding: "1rem",
                    display: tilePosition === "bottom" ? "block" :"flex" ,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ul
                    style={{
                        display: "flex",
                        height:"auto",
                        overflow: "hidden",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        listStyle: "none",
                        justifyContent: "space-evenly",
                        paddingLeft: "0"
                    }}
                >
                    {images
                        .slice(0, tilePosition === "bottom" ? 14 : 10)
                        .map((value, index) => (
                            <li
                                style={{
                                    width:
                                        tilePosition === "bottom"
                                            ? "12%"
                                            : "40%",
                                    aspectRatio: "1/1",
                                    cursor: "pointer",
                                }}
                                key={index}
                                onClick={() => {
                                    setTransitioning(true);
                                    index < photoIndex
                                        ? setDirection("right")
                                        : setDirection("left");
                                    setPhotoIndex(index);
                                }}
                            >
                                <img
                                    src={value.img}
                                    alt="tileImage"
                                    style={{
                                        borderRadius: `${tileRadius}`,
                                        objectFit: "contain",
                                        height: "100%",
                                    }}
                                />
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductSlider;
