'use client'

import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "../../styles/slider.scss";


export default function Slider(props) {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      const response = await fetch('/api/slides');
      const data = await response.json();
      setSlides(data);
    };

    fetchSlides();
  }, []);

  const max = slides.length;

  useEffect(() => {
    const intervalBetweenSlides = () =>
      autoplay && setActive((active) => (active === max - 1 ? 0 : active + 1));
    const interval = setInterval(() => intervalBetweenSlides(), 5000);
    return () => clearInterval(interval);
  }, [autoplay]);

  const toggleAutoPlay = () => setAutoplay((autoplay) => !autoplay);

  const nextOne = () =>
    active <= max - 1 && setActive((active) => (active === max - 1 ? 0 : active + 1));

  const prevOne = () =>
    active >= 0 && setActive((active) => (active === 0 ? max - 1 : active - 1));

  const isActive = (value) => active === value && 'active';

  const slideWidth = 800;

  const setSliderStyles = () => {
    const transition = active * -slideWidth;

    return {
      width: `${slides.length * slideWidth}px`,
      transform: `translateX(${transition}px)`,
    };
  };

  const renderSlides = () =>
    slides.slice(0, 5).map((item, index) => (
      <div
        className='each-slide'
        key={index}
        style={{ backgroundImage: item.eachSlide }}
      >
        <div className="slider-content">
          <div className="slider-title">{item.title}</div>
          <div className="d-flex flex-align-center flex-content-center description">
            {item.price && <div className="d-flex slider-price">
              <span className="slider-price-inner">${item.price}</span>
              <span className="from">from</span>
            </div>}
            <a className="slider-more-btn" href="">
              더 보기
            </a>
          </div>
        </div>
      </div>
    ));

  const renderDots = () =>
    slides.map((item, index) => (
      <li className={`${isActive(index)} dots`} key={index}>
        <div className="cover">
          <div
            className="each-miniSlide"
            key={index}
            onClick={() => setActive(index)}
            style={{ backgroundImage: item.eachSlide }}
          ></div>
        </div>
      </li>
    ));

  const renderPlayStop = () =>
    autoplay ? (
      <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
      </svg>
    ) : (
      <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
      </svg>
    );

  const renderArrows = () => (
    <Fragment>
      <button type="button" className="arrows prev" onClick={() => prevOne()}>
        <svg fill="#FFFFFF" width="50" height="50" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </button>
      <button type="button" className="arrows next" onClick={() => nextOne()}>
        <svg fill="#FFFFFF" height="50" viewBox="0 0 24 24" width="50">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </button>
    </Fragment>
  );

  return (
    <div className="slider container d-flex flex-justify-eachend">
      <section className="main-slider">
        <div className="wrapper" style={setSliderStyles()}>
          {renderSlides()}
        </div>
        {renderArrows()}
        <button type="button" className="toggle-play" onClick={toggleAutoPlay}>
          {renderPlayStop()}
        </button>
      </section>
      <section>
        <ul className="miniSlide-container d-flex flex-column">
          {renderDots()}
        </ul>
      </section>
    </div>
  );
};
