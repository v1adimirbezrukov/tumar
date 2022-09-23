$(document).ready(function () {
  $('.header__burger').click(function () {
    $(this).children().toggleClass('active')
    $('.drop-menu').toggleClass('active')
    $('body').toggleClass('active')
    return false
  })

  $('.about__slider').slick({
    slidesToShow: 1,
    fade: true,
    cssEase: 'linear',
  })

  $('[data-tabs-type]').on('click', function () {
    if (!$(this).hasClass('active')) {
      var index = $(this).index()
      $(this).addClass('active').siblings().removeClass('active')
      $('.object__content').removeClass('active')
      if ($('#object-plan').hasClass('active')) {
        $('#object-content-first').addClass('active')
      }
      if ($('#object-map').hasClass('active')) {
        $('#object-content-second').addClass('active')
      }
      if ($('#object-360').hasClass('active')) {
        $('#object-content-third').addClass('active')
      }
    }
    return false
  })

  if (window.innerWidth > 991) {
    $('.material__block')
      .mouseenter(function () {
        let _this = $(this)
        if (!_this.attr('data-startHide')) {
          _this.attr('data-start', 1)
          _this
            .children()
            .next()
            .slideDown({
              duration: 250,
              queue: false,
              complete: function () {
                $(this).attr('style', 'display: block;')
                _this.attr('data-start', '')
              },
            })
          _this.addClass('active')
        }
      })
      .mouseleave(function () {
        let _this = $(this)
        if (!_this.attr('data-start')) {
          _this.attr('data-startHide', 1)
          _this
            .children()
            .next()
            .slideUp({
              duration: 250,
              queue: false,
              complete: function () {
                $(this).attr('style', 'display: none;')
                _this.attr('data-startHide', '')
              },
            })
          _this.removeClass('active')
        }
      })
  }

  if (window.innerWidth <= 991) {
    $('.material__block').click(function () {
      $(this).children().next().slideToggle(250)
      $(this).toggleClass('active')
    })
  }

  /*   if (window.innerWidth > 991) {
    $('.material__block').hover(function () {
      $(this).children().next().slideToggle(250)
      $(this).toggleClass('active')
    })
  }

  if (window.innerWidth <= 991) {
    $('.material__block').click(function () {
      $(this).children().next().slideToggle(250)
      $(this).toggleClass('active')
    })
  } */

  $('.dvor-slider__items').slick({
    slidesToShow: 1,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          centerMode: false,
        },
      },
    ],
  })

  $('[data-slider-auto]').each(function (index) {
    let $slider = $(this).find('[data-slider-main]')
    if ($slider) {
      let progressbar = $(this).find('[data-slider-progressbar]')

      let sliderCounter = false

      let setProgress = function (index, slickCurrent) {
        if (progressbar) {
          const calc = ((index + 1) / slickCurrent.slideCount) * 100
          progressbar.css('background-size', `${calc}% 100%`).attr('aria-valuenow', calc)
        }
      }

      let updateSliderCounter = function (slick) {
        if (sliderCounter) {
          currentSlide = slick.slickCurrentSlide() + 1
          $(sliderCounter).text('0' + currentSlide + '/' + '0' + slick.slideCount)
        }
      }

      $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        setProgress(nextSlide, slick)
      })

      $slider.on('init', function (event, slick) {
        if (progressbar) {
          sliderCounter = document.createElement('div')
          sliderCounter.classList.add('slider__counter')
          $(this).append(sliderCounter)
          updateSliderCounter(slick)

          setProgress(0, slick)
        }
      })

      $slider.on('afterChange', function (event, slick, currentSlide) {
        updateSliderCounter(slick)
      })

      $slider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 400,
        infinite: false,
        loop: true,
        prevArrow: $(this).find('[data-slider-prev]'),
        nextArrow: $(this).find('[data-slider-next]'),
        responsive: [
          {
            breakpoint: 767,
            settings: {
              adaptiveHeight: true,
            },
          },
        ],
      })
    }
  })

  $('.comerc__slider').slick({
    slidesToShow: 1,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          centerMode: false,
        },
      },
    ],
  })

  let list_appart__block = $('.appart__block')
  list_appart__block.on('click', function () {
    list_appart__block.removeClass('active')
    $(this).addClass('active')

    let roominess = $('.appart__tab.active').text()
    $('.appart__room-value').text(roominess)

    let data_info_current = $(this).attr('data-info-current')
    $('.appart__section-value').text(data_info_current)

    let appart__block_size = $(this).find('.appart__block-size').text()
    $('.appart__room-size').text(appart__block_size)

    let img = $(this).find('img').attr('src')
    $('.appart__right-image').find('img').attr('src', img)
  })

  $('[data-tabs-number]').on('click', function () {
    if (!$(this).hasClass('active')) {
      var index = $(this).index()
      $(this).addClass('active').siblings().removeClass('active')
      let current = $('[data-tabs-plancontent]').hide().eq(index)
      current.fadeIn()
      let appart__block = current.find('.appart__block')
      if (appart__block.length) {
        $(appart__block[0]).trigger('click')
      }
    }
    return false
  })

  $(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
      $('.top_button').fadeIn(500)
    } else {
      $('.top_button').fadeOut(500)
    }
  })
  $('.top_button').click(function (event) {
    event.preventDefault()
    $('html, body').animate({ scrollTop: 0 }, 500)
  })

  var sections = $('section'),
    nav = $('.navigation'),
    nav_height = nav.outerHeight()

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop()

    sections.each(function () {
      var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight()

      if (cur_pos >= top && cur_pos <= bottom) {
        nav.find('li a').removeClass('active')
        sections.removeClass('active')

        $(this).addClass('active')
        nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active')
      }
    })
  })

  nav.find('a').on('click', function () {
    var $el = $(this),
      id = $el.attr('href')

    $('html, body').animate(
      {
        scrollTop: $(id).offset().top,
      },
      500
    )

    return false
  })

  $('.drop-menu__list')
    .find('a')
    .on('click', function () {
      $('.header__burger').children().removeClass('active')
      $('.drop-menu').removeClass('active')
      $('body').removeClass('active')
      var $el = $(this),
        id = $el.attr('href')

      $('html, body').animate(
        {
          scrollTop: $(id).offset().top,
        },
        500
      )

      return false
    })

  $('.showcase__btn-next, .showcase__btn-appart, .icons__header-map').on('click', function () {
    var $el = $(this),
      id = $el.attr('href')

    $('html, body').animate(
      {
        scrollTop: $(id).offset().top,
      },
      500
    )

    return false
  })

  $('.object__tab').click(function () {
    if ($('.object__tab-first').hasClass('active')) {
      $('.object__stat').show()
    } else {
      $('.object__stat').hide()
    }
  })

  function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
        change.target.classList.add('element-show')
      }
    })
  }
  let options = { threshold: [0.5] }
  let observer = new IntersectionObserver(onEntry, options)
  let elements = document.querySelectorAll('.element-animation')
  for (let elm of elements) {
    observer.observe(elm)
  }
})
