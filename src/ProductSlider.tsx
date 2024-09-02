import React, { useState, useEffect } from 'react'
import Magnifier from './Magnifier';
import "./productSlider.css"

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
    tilePosition?: 'bottom' | 'right' | 'left';
  }

const ProductSlider: React.FC<Props> = ({ width = "700px", height = "80%", magnify = true, images, magnifierSize, zoomLevel, MagnifierBorderRadius, prevIcon = "<", nextIcon = ">", buttonBg="#b8b7b4", imgBg="#b8b7b4", imgRadius="20px", tileRadius="10px", tilePosition="bottom"}) => {
    const [photoIndex, setPhotoIndex] = useState(0);
    const [transitioning, setTransitioning] = useState(false);
    const [direction, setDirection] = useState('');
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
        setDirection('left');
        setPhotoIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleClickNext = () => {
        setTransitioning(true);
        setDirection('right');
        setPhotoIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };
    return (
        <div className={`flex ${tilePosition==="bottom"? "flex-col":( tilePosition==="right"?"flex-row":"flex-row-reverse")}`} style={{ width: `${width}`, height: `${height}` }}>
            <div className='w-full  flex justify-center items-center overflow-hidden border-2 border-gray-400 relative ' style={{background:`${imgBg}`, borderRadius:`${imgRadius}`}}>
                {
                    magnify ?
                        <div className={`w-full transition-transform duration-500 ${transitioning ? (direction === 'left' ? 'slideLeft' : 'slideRight') : ''}`} >
                            <Magnifier imgUrl={mainPhoto} magnifierSize={magnifierSize} zoomLevel={zoomLevel} BorderRadius={MagnifierBorderRadius} />
                        </div> 
                        : 
                        <img src={mainPhoto} alt="product-img" className={`w-full h-[80vh] transition-transform duration-500 ${transitioning ? (direction === 'left' ? 'slideLeft' : 'slideRight') : ''}`} />
                }
                <button className='absolute left-1 rounded-full  font-semibold w-10 h-10 p-2 text-white flex justify-center items-center' onClick={handleClickPrev}  style={{background:`${buttonBg}`}}>{prevIcon}</button>
                <button className='absolute right-1 rounded-full font-semibold w-10 h-10 p-2 text-white flex justify-center items-center' onClick={handleClickNext} style={{background:`${buttonBg}`}}>{nextIcon}</button>
            </div>
            <div className={`${tilePosition!=="bottom" ? "w-1/4" : "p-4"}`}>
                <ul className= "flex h-full overflow-hidden flex-wrap justify-evenly p-4 gap-2">
                    {images.slice(0,tilePosition==="bottom" ? 14 : 10).map((value, index) => (
                        <li className={`${tilePosition ==="bottom" ? "basis-[12%] sm:basis-[10%]" : " basis-[60%] sm:basis-[40%]"} cursor-pointer`} key={index} onClick={() => {
                            setTransitioning(true)
                            index < photoIndex ? setDirection('right') : setDirection('left')
                            setPhotoIndex(index)
                        }}>
                            <img src={value.img} className='h-full object-contain rounded-md' style={{borderRadius:`${tileRadius}`}}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductSlider;