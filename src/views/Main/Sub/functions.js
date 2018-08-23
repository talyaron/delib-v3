

export function setNavPostion(position) {

    $('.topMenuNav').removeClass('topMenuNavMarker');
    const indexNav = ['my', 'others', 'feed', 'alert'];
    var targetId = indexNav[position];
    var navElement = document.getElementById(targetId);
    navElement.classList.add('topMenuNavMarker');


}

export function setCarouselPage(position) {

    $('#navCarousel').slick('slickGoTo', position);
}

// module.exports = setNavPostion; 