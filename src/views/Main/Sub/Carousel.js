import m from "mithril";
// import 'slick-carousel';
// import $ from 'jquery';
import store from '../../../data/store';

import "./Carousel.css";
import Groups from './Groups';
import { setNavPostion, setCarouselPage } from "./functions";

const Carousel = {
    oncreate: function (vnode) {


        $('#navCarousel').slick({
            mobileFirst: true,
            infinite: false,
            arrows: false,
            initialSlide: store.current.slide
        });

        //set location to page in store
        setNavPostion(store.current.slide);
        setCarouselPage(store.current.slide);


        $('#navCarousel').on('afterChange', function (event, slick, slide) {
            store.current.slide = slide;
            setNavPostion(slide);

        })
    },
    view: function (vnode) {
        return (
            <div id='navCarousel'>
                <div id='myCarousel' class='carouselPage'><Groups /></div>
                <div id='othersCarousel' class='carouselPage'><Groups /></div>
                <div id='feedCarousel' class='carouselPage'><Groups /></div>
                <div id='alertCarousel' class='carouselPage'><Groups /></div>
            </div>
        )
    }
}



module.exports = Carousel; 