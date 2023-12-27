import React from 'react';
import Slider from "react-slick";
import Ethereumsvg from '../svg/ethereumsvg';
import Reactsvg from '../svg/reactsvg';
import Nodejssvg from '../svg/nodejssvg';
import Codesvg from '../svg/codesvg';
import DesignSvg from '../svg/design';
import Cppsvg from '../svg/cppsvg';
import styles from "./slider.module.css"


const HomeSlider = () => {

//     const settings = {
//         dots: true,
//         infinite: true,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         autoplay: true,
//         speed: 2000,
//         autoplaySpeed: 2000,
//         cssEase: "linear"
//       };



      var settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 0,
          cssEase: "linear",
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        };


    return (
        <>
        <Slider {...settings}  className={styles.slider} >
 
   

  
          <div className={styles.sliderBox} >
                 <div   className={`${styles.sliderItem} shadow `}  > 
               <div> <Ethereumsvg/> </div>
               <h4 className='text-center  text-muted ' > Blockchain  <br /> develpoment </h4>
               </div>
          </div>

          
          <div className={styles.sliderBox} >
                 <div   className={`${styles.sliderItem} shadow `}  > 
               <div> <Reactsvg/> </div>
               <h4 className='text-center  text-muted ' > ReactJs  <br /> develpoment </h4>
               </div>
          </div>

          <div className={styles.sliderBox} >
                 <div   className={`${styles.sliderItem} shadow `}  > 
               <div> <Nodejssvg/> </div>
               <h4 className='text-center  text-muted ' > NodeJs  <br />  develpoment </h4>
               </div>
          </div>
          <div className={styles.sliderBox} >
                 <div   className={`${styles.sliderItem} shadow `}  > 
               <div> <Codesvg/> </div>
               <h4 className='text-center  text-muted ' > Backend  <br /> develpoment </h4>
               </div>
          </div>


          <div className={styles.sliderBox} >
                 <div   className={`${styles.sliderItem} shadow `}  > 
               <div> <DesignSvg/> </div>
               <h4 className='text-center  text-muted ' > Frontend <br /> develpoment </h4>
               </div>
          </div>


          <div className={styles.sliderBox} >
                 <div   className={`${styles.sliderItem} shadow `}  > 
               <div> <Cppsvg/> </div>
               <h4 className='text-center  text-muted ' > C++ <br />  develpoment </h4>
               </div>
          </div>


  




          
         
          
        
        </Slider>
            
        </>
    );
}

export default HomeSlider;
