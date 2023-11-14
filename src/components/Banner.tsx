import { Carousel } from "react-responsive-carousel";
import slider_1 from "../images/slider/sliderImg_1.jpg";
import slider_2 from "../images/slider/sliderImg_2.jpg";
import slider_3 from "../images/slider/sliderImg_3.jpg";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={3000}
      >
        <div>
          <Image priority src={slider_1} alt="slider_1" />
        </div>
        <div>
          <Image priority src={slider_2} alt="slider_2" />
        </div>
        <div>
          <Image priority src={slider_3} alt="slider_3" />
        </div>
      </Carousel>
      <div
        className="w-full h-40 bg-gradient-to-t from-gray-100 to-transparent
          absolute bottom-0 z-10"
      ></div>
    </div>
  );
};

export default Banner;
