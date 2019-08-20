init();

function init() {
  openHours();
  loopingCarousel();
  loopingOurCreation();
  loopingCarouselTesti();
}

//  SHOW/HIDE NAVBAR

$(window).scroll(show_navbar);

var current_scroll = 0;

function show_navbar() {

  var window_y = window.scrollY;

  if (window_y > current_scroll) {
    $("#navbar").addClass("unpinned");
  } else {
    $('#navbar').removeClass('unpinned');
  }

  current_scroll = window_y;
  console.log(current_scroll);
};

// END SHOW/HIDE NAVBAR

function openHours() {
  var today = new Date();
  var hour = today.getHours();
  var day = today.getDay();
  console.log(hour);
  console.log(day);

  if (hour >= 10 && hour <= 16 && day != 6 && day != 0) {
    console.log('yay!')
    $('#openHours').html('yes, we are open now!');
  } else {
    console.log('nay!');
    $('#openHours').html('we are closed :(');
  }
};

function loopingCarousel() {
  for (var i = 0; i < carouselImage.length; i++) {
    var carouselTemplates = `
          <div class="carousel-item ${carouselImage[i].default}">
            <img class="d-block w-100 full object-cover" src="${carouselImage[i].src}" alt="${carouselImage[i].name}">
            <div class="carousel-caption d-none d-md-block ${carouselImage[i].pos} ${carouselImage[i].txtColor}">
              <h5>${carouselImage[i].captionTitle}</h5>
              <p>${carouselImage[i].captionDescription}</p>
            </div>
          </div>
    `;

    $('#carouselImages').append(carouselTemplates);
  }
};

function loopingOurCreation() {
  for (var i = 0; i < ourCreation.length; i++) {
    var creationData = `
                      <div class="col-4 p-0 pointer position-relative" id="${ourCreation[i].id}" onmouseenter="blurOurCreation('${ourCreation[i].id}')"
                        onmouseleave="resetOurCreation('${ourCreation[i].id}')" onclick="showGallery(${ourCreation[i].nmbr})">
                        <img class="w-100 trans-4" src="${ourCreation[i].src}" alt="${ourCreation[i].alt}">
                        <div class="position-absolute p-0 center-overlay opa-0 trans-4">
                          <button class="btn btn-lg px-3 text-nanum bg-pink text-dark-green shadow" type="button">${ourCreation[i].name}</button>
                        </div>
                      </div>
                      `;

    $("#ourCreationImages").append(creationData);
  }
};

function loopingCarouselTesti() {
  for (var i = 0; i < testimonial.length; i++) {
    var data = `
        <div class="carousel-item pr-5 ${testimonial[i].default}">
          <div class="w-75 ml-auto pr-lg-5 pr-md-5">
            <div class="position-relative mr-lg-5">
              <div class="position-absolute" id="quoteLeft"><i class="fas fa-quote-left"></i></div>
              <div class="position-absolute" id="quoteRight"><i class="fas fa-quote-right"></i></div>
              <p class="p-4 text-right">${testimonial[i].testi}</p>
              <h3 class="text-right text-nanum">- ${testimonial[i].name}</h3>
            </div>
          </div>
        </div>
              `;

    $('#carouselTestiData').append(data);
  }
};

function blurOurCreation(id) {
  $('#' + id).children().first().addClass('blur');
  $('#' + id).children().last().css('opacity', 1);
  console.log('yay!');
};

function resetOurCreation(id) {
  $('#' + id).children().first().removeClass('blur');
  $('#' + id).children().last().css('opacity', 0);
};

function showGallery(id) {
  $('#ourCreationGallery').removeClass('animated fadeOutRightBig');
  $('#ourCreationImages').addClass('animated fadeOutLeft').on('animationend', galleryFadeIn(id));
  $('#creation').addClass('animated fadeOutLeft');
  console.log('Uye!');
}

function galleryFadeIn(id) {
  setTimeout(() => {
    $('#ourCreationGallery').addClass('animated fadeInRightBig');
    loopingGallery(id);
    featherlightOn();
    setTimeout(() => {
      $('#ourCreationImages').empty();
    }, 100);
  }, 700);
}

function revertCarousel() {
  $('#ourCreationGallery').removeClass('animated fadeInRightBig').addClass('animated fadeOutRightBig').on('animationend', galleryFadeOut())
  console.log('Mantul!');
}

function galleryFadeOut() {
  setTimeout(() => {
    loopingOurCreation();

    setTimeout(() => {
      $('#creation').removeClass('animated fadeOutLeft').addClass('animated fadeInLeft');
      $('#ourCreationGallery').empty();
      $('#ourCreationImages').removeClass('animated fadeOutLeft').addClass('animated fadeInLeft');
    }, 100);
  }, 700);
};

function loopingGallery(id) {
  var header = `
          <div class="row py-5">
            <div class="col-12">
              <div class="row">
                <div class="col-2" onclick="revertCarousel()">
                  <a class="carousel-control-prev" role="button" href="#ourCreation">
                    <i class="fas text-dark-green fa-3x fa-angle-double-left"></i>
                    <span class="sr-only">Back to Gallery</span>
                  </a>
                </div>
                <div class="col-10 text-right">
                  <p class="h1 text-dark-green text-nanum">${ourCreation[id].name}</p>
                </div>
              </div>
            </div>
          </div>
  `;

  $('#ourCreationGallery').append(header);
  // console.log(header);

  var galleryContainer = '';
  var galleryData = '';

  for (var i = 0; i < ourCreation[id].gallery.length; i++) {
    galleryData += `<div class="col-3 pb-4">
                      <a href="${ourCreation[id].gallery[i].full}" class="thumbnail gallery">
                        <img class="w-100 rounded" src="${ourCreation[id].gallery[i].thumb}" alt="${ourCreation[id].gallery[i].alt}">
                      </a>
                    </div>`;
  };

  // console.log(galleryData);

  galleryContainer = '<div class="row pb-5" id="ourCreationGalleryContainer">' + galleryData + '</div>';

  // console.log(galleryContainer);

  $('#ourCreationGallery').append(galleryContainer);
};

function backgroundBlurred() {
  $('#ourCreation, #ourStory, #ourTestimonial, #home, #navbar').addClass('blur');
}

function backgroundUnblurred() {
  $('#ourCreation, #ourStory, #ourTestimonial, #home, #navbar').removeClass('blur');
}

function featherlightOn() {
  $(document).ready(function () {
    $('.gallery').featherlightGallery({
      gallery: {
        fadeIn: 300,
        fadeOut: 300
      },
      openSpeed: 300,
      closeSpeed: 300
    });
  });
}

$.featherlight.defaults.afterClose = afterClose;
$.featherlight.defaults.beforeOpen = beforeOpen;

function afterClose() {
  backgroundUnblurred();
}

function beforeOpen() {
  backgroundBlurred();
}


function testAnimate() {
  $('#ourStory').addClass('animated fadeInDown slow');
}

function testDeleteAnimation() {
  $('#ourStory').removeClass('animated fadeInDown slow');
}
