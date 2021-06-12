import { useState } from 'react';
import { SlidesData } from "./sliderData";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const ImageSlider = (slides: object[]) => {
    
    const [ current, setCurrent ] = useState(0);    
    const length = Object.keys(slides).length;

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    }

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    }
    console.log(current);

    if(length <= 0) {
        return null;
    } 

    return (
        <section className="slider">
            <FaArrowAltCircleLeft 
                className="left-arrow" 
                onClick={prevSlide}
            />
            
            <FaArrowAltCircleRight 
                className="right-arrow" 
                onClick={nextSlide}
            />

            {SlidesData.map((slide, index) => {
                return (
                    <div 
                    className={index === current ? 'slide active' : 'slide'}
                    key={index}>
                        {index === current && (
                            <img src={slide.image} 
                            alt={slide.name} 
                            className="image"
                            />
                        )}
                        
                    </div>
                    
                );
            })}
        </section>
    );
}

export default ImageSlider;