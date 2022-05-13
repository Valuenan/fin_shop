try {
  let widget = '.widget-type_system_widget_v4_header_1';
  let $widget = $('.widget-type_system_widget_v4_header_1');
  /* eslint-disable linebreak-style */

function getWidget(item) {
  return item.closest('.layout');
}

var mobilePoint = 768;
$(document).ready(function() {
  $widget.each(function(index, el) {
    new LazyLoad({
      container: $(el).get(0),
      elements_selector: '.lazyload'
    });
  });

  if ($(window).width() >= mobilePoint) {
    $(widget).find(".js-cut-list").cutList({
      moreBtnTitle: '<span class="icon-ellipsis-h"></span>',
      alwaysVisibleElem: '.is-current'
    });
  }

  $(window).on('load', function() {
    $(widget).find(".js-cut-list").resize();
  });

  $(window).on('resize', function() {
    let collections_menu = $(widget).find(".header__collections");
    let collections_menu_content = collections_menu.find(".header__collections-content");

    if (collections_menu.is(".is-show")) {
      let max_height = $(window).height() - collections_menu.offset().top - 20;
      collections_menu_content.css("maxHeight", max_height);
    }
  });

  if ($(widget).find(".header__collections .is-current").length) {
    $(widget).find(".header__collections .is-current").addClass("is-show-mobile");
    $(widget).find(".header__collections > .header__collections-item.is-current").addClass("is-show");
  }

  $(widget).find(".js-show-header-collections").on("click", function() {
    let thisWidget = getWidget($(this));

    thisWidget.each(function(index, el) {
      let lazyLoadCollectionList = new LazyLoad({
        container: $(el).get(0),
        elements_selector: '.lazyload'
      });

      try {
        lazyLoadCollectionList.loadAll()
      } catch (e) {
        console.log(e)
      }
    });

    let collections_menu = thisWidget.find(".header__collections");
    let collections_menu_content = collections_menu.find(".header__collections-content");

    if (collections_menu.is(".is-show")) {
      collections_menu.removeClass("is-show");
    } else {
      collections_menu.addClass("is-show");

      let max_height = $(window).height() - collections_menu.offset().top - 20;
      collections_menu_content.css("maxHeight", max_height);
    }

    $(this).toggleClass("is-active");
    thisWidget.find(".header__collections-overlay").toggleClass("is-show");
  });

  $(document).on("click", function(event) {
    let thisWidget = getWidget($(event.target).closest('.layout'));

    if ($(event.target).closest(".js-show-header-collections").length || $(event.target).closest(".header__collections-content").length) {
      return;
    }

    thisWidget.find(".header__collections.is-show").removeClass("is-show");
    thisWidget.find(".header__collections-overlay.is-show").removeClass("is-show");
    thisWidget.find(".js-show-header-collections").removeClass("is-active");
  });

  $(widget).find(".js-show-mobile-submenu").on("click", function() {
    $(this).parents(".header__collections-item:first").toggleClass("is-show-mobile");
  });

  $(widget).find(".js-show-mobile-menu").on("click", function() {
    let thisWidget = getWidget($(event.target).closest('.layout'));

    thisWidget.find(".header").addClass("is-show-mobile");
  });

  $(widget).find(".js-hide-mobile-menu").on("click", function() {
    let thisWidget = getWidget($(event.target).closest('.layout'));

    thisWidget.find(".header").removeClass("is-show-mobile");
  });

  $(widget).find(".js-show-mobile-search").on("click", function() {
    $(this).parents(".header__search").toggleClass("is-show-mobile").find(".header__search-field").focus();
  });

  $(widget).find(".js-show-more-subcollections").on("click", function() {
    let thisWidget = getWidget($(this));

    let collections_menu = thisWidget.find(".header__collections-menu");
    let limit = collections_menu.attr("data-subcollections-items-limit");
    let collection_elem = $(this).parents(".header__collections-item.is-level-1");

    if ($(this).is(".is-active")) {
      $(this).removeClass("is-active");
      collection_elem.find('.header__collections-submenu .header__collections-item:nth-child(n+' + (parseInt(limit) + 1) + ')').addClass("is-hide");
    } else {
      $(this).addClass("is-active");
      collection_elem.find(".header__collections-submenu .header__collections-item").removeClass("is-hide");
    }
  });
});

function configureSubcollectionsItemsLimit(limit) {
  let collections_menu = $(widget).find(".header__collections-menu");
  collections_menu.attr("data-subcollections-items-limit", limit);

  $(widget).find(".header__collections-submenu").each(function() {
    let collection_elem = $(this).parents(".header__collections-item.is-level-1");
    let collection_elem_more_controls = collection_elem.find(".header__collections-show-more");

    $(this).find(".header__collections-item").removeClass("is-hide");
    $(this).find('.header__collections-item:nth-child(n+' + (parseInt(limit) + 1) + ')').addClass("is-hide");
    collection_elem_more_controls.find(".js-show-more-subcollections").removeClass("is-active");

    if ($(this).find(".header__collections-item").length > parseInt(limit)) {
      collection_elem_more_controls.addClass("is-show");
    } else {
      collection_elem_more_controls.removeClass("is-show");
    }
  });
}

} catch(error) {
  console.error('Widget "widget-type_system_widget_v4_header_1" throwed an error: "' + error.stack + '"')
}
;
;try {
  let widget = '.widget-type_system_widget_v4_article_previews_1';
  let $widget = $('.widget-type_system_widget_v4_article_previews_1');
  $widget.each(function(index, el) {
  new LazyLoad({
    container: $(el).get(0),
    elements_selector: '.lazyload'
  });
});

} catch(error) {
  console.error('Widget "widget-type_system_widget_v4_article_previews_1" throwed an error: "' + error.stack + '"')
}
;try {
  let widget = '.widget-type_system_widget_v4_banner_2';
  let $widget = $('.widget-type_system_widget_v4_banner_2');
  $widget.each(function(index, el) {
  let lazyLoadBannerList = new LazyLoad({
    container: $(el).get(0),
    elements_selector: '.banner-lazy-bg'
  });
});

} catch(error) {
  console.error('Widget "widget-type_system_widget_v4_banner_2" throwed an error: "' + error.stack + '"')
}
;try {
  let widget = '.widget-type_system_widget_v4_banner_list_1';
  let $widget = $('.widget-type_system_widget_v4_banner_list_1');
  $widget.each(function(index, el) {
  new LazyLoad({
    container: $(el).get(0),
    elements_selector: '.lazyload'
  });
});

} catch(error) {
  console.error('Widget "widget-type_system_widget_v4_banner_list_1" throwed an error: "' + error.stack + '"')
}
;try {
  let widget = '.widget-type_system_widget_v4_banner_list_3';
  let $widget = $('.widget-type_system_widget_v4_banner_list_3');
  var mobile_point = 767;
var bannerBlockList = $(widget).find(".banner-list");

$widget.each(function(index, el) {
  new LazyLoad({
    container: $(el).get(0),
    elements_selector: '.lazyload'
  });
});

bannerBlockList.each(function() {
  let slider_block = $(this).find(".js-banner-list-slider");
  initBannerListSlider(slider_block);
});

function initBannerListSlider(sliderBlock) {
  let slide_min_width = 250;
  let slide_min_width_mobile = 160;
  let slide_gap = 30;

  if (sliderBlock.is("[data-slide-min-width]")) {
    slide_min_width = parseInt(sliderBlock.data("slideMinWidth"));
  } else {
    sliderBlock.data("slideMinWidth", slide_min_width);
  }

  if (sliderBlock.is("[data-slide-min-width-mobile]")) {
    slide_min_width_mobile = parseInt(sliderBlock.data("slideMinWidthMobile"));
  } else {
    sliderBlock.data("slideMinWidthMobile", slide_min_width_mobile);
  }

  if (sliderBlock.is("[data-slide-gap]")) {
    slide_gap = parseInt(sliderBlock.data("slideGap"));
  } else {
    sliderBlock.data("slideGap", slide_gap);
  }

  sliderBlock[0].splide = new Splide(sliderBlock[0], {
    perPage: getSlidesPerView(sliderBlock, isMobileWidth() ? slide_min_width_mobile : slide_min_width, slide_gap),
    gap: slide_gap,
    perMove: 1
  });

  $(window).on("resize", function() {
    let slide_min_width = parseInt(sliderBlock[0].dataset.slideMinWidth);
    let slide_gap = parseInt(sliderBlock[0].dataset.slideGap);
    let slide_min_width_mobile = parseInt(sliderBlock[0].dataset.slideMinWidthMobile);

    sliderBlock[0].splide.options = {perPage: getSlidesPerView(sliderBlock, isMobileWidth() ? slide_min_width_mobile : slide_min_width, slide_gap)};
    configureDragOption(sliderBlock);
  });

  sliderBlock[0].splide.on( 'arrows:updated', function() {
    let banner_list = sliderBlock.parents(".banner-list");
    let prev_btn = banner_list.find(".banner-list__arrow-prev");
    let next_btn = banner_list.find(".banner-list__arrow-next");

    if (banner_list.find(".splide__arrow--prev").prop("disabled") === true) {
      prev_btn.addClass("is-disabled");
    } else {
      prev_btn.removeClass("is-disabled");
    }

    if (banner_list.find(".splide__arrow--next").prop("disabled") === true) {
      next_btn.addClass("is-disabled");
    } else {
      next_btn.removeClass("is-disabled");
    }
  });

  sliderBlock[0].splide.on( 'mounted updated', function() {
    displaySliderControls(sliderBlock);
  });

  sliderBlock[0].splide.on( 'mounted', function() {
    configureDragOption(sliderBlock);
  });

  sliderBlock[0].splide.mount();

  sliderBlock.parents(".banner-list").find(".js-move-slide").on("click", function() {
    let slider_node = $(this).parents(".banner-list").find(".js-banner-list-slider");

    if (slider_node.length) {
      let sliderInst = slider_node[0].splide;

      if ($(this).is(".banner-list__arrow-prev")) {
        sliderInst.go( '-' );
      }

      if ($(this).is(".banner-list__arrow-next")) {
        sliderInst.go( '+' );
      }
    }
  });
}

function updateBannerListSlider(slider, data) {
  let sliderInst = slider[0].splide;

  let slide_min_width = parseInt(slider.data("slideMinWidth"));
  let slide_gap = parseInt(slider.data("slideGap"));
  let slide_min_width_mobile = parseInt(slider.data("slideMinWidthMobile"));

  if (data.setting_name == 'slide-width') {
    let new_slide_min_width = parseInt(data.value);
    let new_per_page = getSlidesPerView(slider, new_slide_min_width, slide_gap);
    slider.attr("data-slide-min-width", new_slide_min_width);

    sliderInst.options = { perPage: new_per_page };

    if (!isMobileWidth()) {
      let new_per_page = getSlidesPerView(slider, new_slide_min_width, slide_gap);
      sliderInst.options = { perPage: new_per_page };
    }
  } else if (data.setting_name == 'slide-width-mobile') {
    let new_slide_min_width_mobile = parseInt(data.value);
    slider.attr("data-slide-min-width-mobile", new_slide_min_width_mobile);

    if (isMobileWidth()) {
      let new_per_page = getSlidesPerView(slider, new_slide_min_width_mobile, slide_gap);
      sliderInst.options = { perPage: new_per_page };
    }


  } else if (data.setting_name == 'slide-gap') {
    let new_slide_gap = parseInt(data.value);
    let new_per_page = getSlidesPerView(slider, slide_min_width, new_slide_gap);
    slider.attr("data-slide-gap", new_slide_gap);

    sliderInst.options = { gap: new_slide_gap, perPage: new_per_page };
  } else {
    setTimeout(function() {
      let new_per_page = getSlidesPerView(slider, isMobileWidth() ? slide_min_width_mobile : slide_min_width, slide_gap);
      sliderInst.options = { perPage: new_per_page };
    }, 0);
  }

  configureDragOption(slider);
}

function getSlidesPerView(sliderBlock, slideMinWidth, slideGap) {
  return Math.floor((sliderBlock.width() + slideGap) / (slideMinWidth + slideGap));
}

$(function() {
  EventBus.subscribe(['widget:input-setting:insales:system:editor', 'widget:change-setting:insales:system:editor'], (data) => {
    $widget.each(function(index, el) {
      if (data.widget_id == $(el).parents(".editable-widget").data("widgetId")) {
        let widget_slider_node = $('[data-widget-id="' + data.widget_id + '"] .js-banner-list-slider');

        if (widget_slider_node.length) {
          widget_slider_node.each(function() {
            updateBannerListSlider($(this), data);
          });
        }
      }
    });
  });
});

function displaySliderControls(slider) {
  let sliderInst = slider[0].splide;
  let slider_arrows = slider.parents(".banner-list").find(".banner-list__arrow");

  if (sliderInst.length <= sliderInst.options.perPage) {
    slider_arrows.addClass("is-hide");
    slider.addClass("is-hide-paging");
  } else {
    slider_arrows.removeClass("is-hide");
    slider.removeClass("is-hide-paging");
  }
}

function configureDragOption(slider) {
  if (slider[0].splide.length <= slider[0].splide.options.perPage) {
    slider[0].splide.options = { drag: false };
  } else {
    slider[0].splide.options = { drag: true };
  }
}
function isMobileWidth() {
  return $(window).width() <= mobile_point;
}

} catch(error) {
  console.error('Widget "widget-type_system_widget_v4_banner_list_3" throwed an error: "' + error.stack + '"')
}
;try {
  let widget = '.widget-type_system_widget_v4_benefits_2';
  let $widget = $('.widget-type_system_widget_v4_benefits_2');
  $widget.each(function(index, el) {
  new LazyLoad({
    container: $(el).get(0),
    elements_selector: '.lazyload'
  });
});

$(function() {
  function isMobileWidth() {
    return $(window).width() <= 767;
  }

  function grid_list_columns_mobile() {
    let data_blocks_size = Math.ceil($widget.find('.grid-list').attr('data-blocks-size'));

    if (isMobileWidth()) {
      $widget.find('.grid-list').css({
        gridTemplateColumns: `repeat(${data_blocks_size}, minmax(160px, calc(50% - calc(var(--grid-list-row-gap)/2))))`
      });
    }
  }

  grid_list_columns_mobile();
  window.addEventListener('resize', grid_list_columns_mobile);
  window.addEventListener('orientationchange', grid_list_columns_mobile);
});

} catch(error) {
  console.error('Widget "widget-type_system_widget_v4_benefits_2" throwed an error: "' + error.stack + '"')
}
;try {
  let widget = '.widget-type_system_widget_v4_footer_3';
  let $widget = $('.widget-type_system_widget_v4_footer_3');
  $(widget).find(".js-show-mobile-submenu").on("click", function() {
  $(this).parents(".menu-item:first").toggleClass("is-show-mobile");
});

} catch(error) {
  console.error('Widget "widget-type_system_widget_v4_footer_3" throwed an error: "' + error.stack + '"')
}
;try {
  let widget = '.widget-type_system_widget_v4_modal_cookie_1';
  let $widget = $('.widget-type_system_widget_v4_modal_cookie_1');
  $widget.ready(function() {
  if ($widget.find('.cookie-banner').length) {
    if (!Cookies.get('was')) {
      $widget.addClass("is-show-fullscreen");
    }

    $('.js-cookies-button').on('click', function() {
      $widget.removeClass("is-show-fullscreen");
      Cookies.set('was', true, {
        expires: 365,
        path: '/'
      });
    })
  }
});

} catch(error) {
  console.error('Widget "widget-type_system_widget_v4_modal_cookie_1" throwed an error: "' + error.stack + '"')
}

;try {
  let widget = '.widget-type_system_widget_v4_promo_slider_2';
  let $widget = $('.widget-type_system_widget_v4_promo_slider_2');
  $(function() {
  $widget.each(function(index, el) {
    new LazyLoad({
      container: $(el).get(0),
      elements_selector: '.lazyload'
    });
  });

  $widget.find(".js-promo-slider").each(function() {
    initPromoSlider($(this));
  });
});

function initPromoSlider(slider) {
  let is_autoplay = slider.data("autoplay");
  let autoplay_delay = slider.data("autoplayDelay");

  slider[0].splide = new Splide(slider[0], {
    rewind: true,
    autoplay: !!is_autoplay,
    interval: autoplay_delay ? parseInt(autoplay_delay) * 1000 : 5000
  });

  slider[0].splide.on( 'mounted updated', function() {
    displaySliderControls(slider);
  });

  slider[0].splide.mount();
}

$(function() {
  EventBus.subscribe(['widget:input-setting:insales:system:editor', 'widget:change-setting:insales:system:editor'], (data) => {
    $widget.each(function(index, el) {
      if (data.widget_id == $(el).parents(".editable-widget").data("widgetId")) {
        let widget_slider_node = $('[data-widget-id="' + data.widget_id + '"] .js-promo-slider');

        if (widget_slider_node.length) {
          updatePromoSlider(widget_slider_node, data);
        }
      }
    });
  });
});

function updatePromoSlider(slider, data) {
  let sliderInst = slider[0].splide;

  if (data.setting_name == 'autoplay') {
    slider.data("autoplay", data.value);

    sliderInst.destroy();
    initPromoSlider(slider);
  } else if (data.setting_name == 'autoplay-delay') {
    slider.data("autoplayDelay", data.value);

    sliderInst.destroy();
    initPromoSlider(slider);
  } else {
    setTimeout(function() { sliderInst.refresh() }, 0);
  }
}

function displaySliderControls(slider) {
  let sliderInst = slider[0].splide;

  if (sliderInst.length <= sliderInst.options.perPage) {
    slider.addClass("is-hide-controls");
  } else {
    slider.removeClass("is-hide-controls");
  }
}

} catch(error) {
  console.error('Widget "widget-type_system_widget_v4_promo_slider_2" throwed an error: "' + error.stack + '"')
}
;try {
  let widget = '.widget-type_system_widget_v4_shop-reviews_1';
  let $widget = $('.widget-type_system_widget_v4_shop-reviews_1');
  $(function() {
  /* Massonry with Grid list */
  function resizeMassonryGridItem(item) {
    let grid = $widget.find(".masonry-reviews-list")[0];
    let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));

    if (rowGap == 0) {
      rowGap = 1;
    }

    let rowSpan = Math.ceil((item.querySelector('.masonry-reviews-item__content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));

    item.style.gridRowEnd = "span " + rowSpan;
  }

  function resizeAllMassonryGridItems() {
    const allItems = $widget.find(".masonry-reviews-item");

    if (allItems) {
      for (let x = 0; x < allItems.length; x++) {
        resizeMassonryGridItem(allItems[x]);
      }
    }
  }

  resizeAllMassonryGridItems();

  window.addEventListener("resize", resizeAllMassonryGridItems);

  EventBus.subscribe(['widget:input-setting:insales:system:editor', 'widget:change-setting:insales:system:editor'], (data) => {
    let masonryReviewsList = $('[data-widget-id="' + data.widget_id + '"] .masonry-reviews-list');

    if (masonryReviewsList) {
      resizeAllMassonryGridItems();
    }
  });

  /* Отображение рейтинга */
  const rating_block = $widget.find(".reviews__rating");

  if (rating_block) {
    for (let x = 0; x < rating_block.length; x++) {
      let rating_value = parseInt(rating_block[x].dataset.rating) || 0;
      if (rating_value > 5) {
        rating_value = 5;
      }
      let rating_stars = rating_block[x].querySelectorAll(".reviews__rating-star");

      for (let x = 0; x < rating_value; x++) {
        rating_stars[x].classList.add("is-active");
      }
    }
  }

  let mobSlider = $widget.find('.js-reviews-mobile-slider');

  /* Слайдер для мобильной версии */
  let reviewsMobileSlider = new Splide(mobSlider[0], {
    type: 'loop',
    arrows: false
  });

  reviewsMobileSlider.mount();
});

} catch(error) {
  console.error('Widget "widget-type_system_widget_v4_shop-reviews_1" throwed an error: "' + error.stack + '"')
}
;try {
  let widget = '.widget-type_system_widget_v4_special_products_1';
  let $widget = $('.widget-type_system_widget_v4_special_products_1');
  var mobile_point = 767;

$widget.each(function(index, el) {
  new LazyLoad({
    container: $(el).get(0),
    elements_selector: '.lazyload',
    use_native: 'loading' in document.createElement('img')
  });
});

$(document).ready(function() {
  let specialProducts = $widget.find(".js-special-products");

  specialProducts.each(function() {
    let special_products_block = $(this);
    let slider_block = special_products_block.find(".js-special-products-slider");
    let slide_min_width = 220;
    let slide_min_width_mobile = 150;
    let slide_gap = 30;

    if (slider_block.is("[data-slide-min-width]")) {
      slide_min_width = parseInt(slider_block.data("slideMinWidth"));
    } else {
      slider_block.data("slideMinWidth", slide_min_width);
    }

    if (slider_block.is("[data-slide-min-width-mobile]")) {
      slide_min_width_mobile = parseInt(slider_block.data("slideMinWidthMobile"));
    } else {
      slider_block.data("slideMinWidthMobile", slide_min_width_mobile);
    }

    if (slider_block.is("[data-slide-gap]")) {
      slide_gap = parseInt(slider_block.data("slideGap"));
    } else {
      slider_block.data("slideGap", slide_gap);
    }

    slider_block[0].splide = new Splide(slider_block[0], {
      perPage: getSlidesPerView(slider_block, isMobileWidth() ? slide_min_width_mobile : slide_min_width, slide_gap),
      gap: slide_gap,
      perMove: 1
    });

    $(window).on("resize", function() {
      let slide_min_width = parseInt(slider_block[0].dataset.slideMinWidth);
      let slide_min_width_mobile = parseInt(slider_block[0].dataset.slideMinWidthMobile);
      let slide_gap = parseInt(slider_block[0].dataset.slideGap);

      slider_block[0].splide.options = { perPage: getSlidesPerView(slider_block, isMobileWidth() ? slide_min_width_mobile : slide_min_width, slide_gap)};
      configureDragOption(slider_block);
    });

    slider_block[0].splide.on( 'arrows:updated', function() {
      let special_products = slider_block.parents(".js-special-products");
      let prev_btn = special_products.find(".special-products__slider-arrow-prev");
      let next_btn = special_products.find(".special-products__slider-arrow-next");

      if (special_products.find(".splide__arrow--prev").prop("disabled") === true) {
        prev_btn.addClass("is-disabled");
      } else {
        prev_btn.removeClass("is-disabled");
      }

      if (special_products.find(".splide__arrow--next").prop("disabled") === true) {
        next_btn.addClass("is-disabled");
      } else {
        next_btn.removeClass("is-disabled");
      }
    });

    slider_block[0].splide.on( 'mounted updated', function() {
      displaySliderControls(slider_block);
    });

    slider_block[0].splide.on( 'mounted', function() {
      configureDragOption(slider_block);
    });

    slider_block[0].splide.mount();

    $widget.find(".js-move-slide").on("click", function() {
      let slider_node = $(this).parents(".js-special-products").find(".js-special-products-slider");

      if (slider_node.length) {
        let sliderInst = slider_node[0].splide;

        if ($(this).is(".special-products__slider-arrow-prev")) {
          sliderInst.go( '-' );
        }

        if ($(this).is(".special-products__slider-arrow-next")) {
          sliderInst.go( '+' );
        }
      }
    });
  });
});

$(function() {
  EventBus.subscribe(['widget:input-setting:insales:system:editor', 'widget:change-setting:insales:system:editor'], (data) => {
    $widget.each(function(index, el) {
      if (data.widget_id == $(el).parents(".editable-widget").data("widgetId")) {
        let widget_slider_node = $('[data-widget-id="' + data.widget_id + '"] .js-special-products-slider');

        if (widget_slider_node.length) {
          widget_slider_node.each(function() {
            updateSpecialProductSlider($(this), data);
          });
        }
      }
    });
  });
});

function updateSpecialProductSlider(slider, data) {
  let sliderInst = slider[0].splide;

  let slide_min_width = parseInt(slider.data("slideMinWidth"));
  let slide_min_width_mobile = parseInt(slider.data("slideMinWidthMobile"));
  let slide_gap = parseInt(slider.data("slideGap"));

  if (data.setting_name == 'slide-width') {
    let new_slide_min_width = parseInt(data.value);
    slider.attr("data-slide-min-width", new_slide_min_width);

    if (!isMobileWidth()) {
      let new_per_page = getSlidesPerView(slider, new_slide_min_width, slide_gap);
      sliderInst.options = { perPage: new_per_page };
    }
  } else if (data.setting_name == 'slide-width-mobile') {
    let new_slide_min_width_mobile = parseInt(data.value);
    slider.attr("data-slide-min-width-mobile", new_slide_min_width_mobile);

    if (isMobileWidth()) {
      let new_per_page = getSlidesPerView(slider, new_slide_min_width_mobile, slide_gap);
      sliderInst.options = { perPage: new_per_page };
    }
  } else if (data.setting_name == 'slide-gap') {
    let new_slide_gap = parseInt(data.value);
    let new_per_page = getSlidesPerView(slider, slide_min_width, new_slide_gap);
    slider.attr("data-slide-gap", new_slide_gap);

    sliderInst.options = { gap: new_slide_gap, perPage: new_per_page };
  } else {
    setTimeout(function() {
      let new_per_page = getSlidesPerView(slider, isMobileWidth() ? slide_min_width_mobile : slide_min_width, slide_gap);
      sliderInst.options = { perPage: new_per_page };
    }, 0);
  }

  configureDragOption(slider);
}

function getSlidesPerView(sliderBlock, slideMinWidth, slideGap) {
  return Math.floor((sliderBlock.width() + slideGap) / (slideMinWidth + slideGap));
}

function displaySliderControls(slider) {
  let sliderInst = slider[0].splide;
  let special_products = slider.parents(".js-special-products");
  let prev_btn = special_products.find(".special-products__slider-arrow-prev");
  let next_btn = special_products.find(".special-products__slider-arrow-next");

  if (sliderInst.length <= sliderInst.options.perPage) {
    prev_btn.addClass("is-hide");
    next_btn.addClass("is-hide");
    slider.addClass("is-hide-paging");
  } else {
    prev_btn.removeClass("is-hide");
    next_btn.removeClass("is-hide");
    slider.removeClass("is-hide-paging");
  }
}

function configureDragOption(slider) {
  if (slider[0].splide.length <= slider[0].splide.options.perPage) {
    slider[0].splide.options = { drag: false };
  } else {
    slider[0].splide.options = { drag: true };
  }
}

function isMobileWidth() {
  return $(window).width() <= mobile_point;
}

} catch(error) {
  console.error('Widget "widget-type_system_widget_v4_special_products_1" throwed an error: "' + error.stack + '"')
}
;try {
  let widget = '.widget-type_system_widget_v4_button_on_top_1';
  let $widget = $('.widget-type_system_widget_v4_button_on_top_1');
  let scroll_timeout;

$widget.find(".js-go-top-page").on("click", function() {
  $('html, body').animate({scrollTop: 0}, 500);
  return false;
});

$(window).on("scroll", function() {
  clearTimeout(scroll_timeout);
  scroll_timeout = setTimeout( function() {
    showButtonOnTop($widget.find(".js-go-top-page"));
  }, 50);
});

function showButtonOnTop(btn) {
  if ($(window).scrollTop() >= $(window).height()) {
    btn.addClass("is-show");
  } else {
    btn.removeClass("is-show");
  }
}

$(function() {
  EventBus.subscribe(['widget:input-setting:insales:system:editor', 'widget:change-setting:insales:system:editor'], (data) => {
    if (data.setting_name == 'icon-view') {
      let btn = $('[data-widget-id="' + data.widget_id + '"] .js-go-top-page');
      btn.find("> span").removeClass().addClass(data.value);
    }
  });
});
} catch(error) {
  console.error('Widget "widget-type_system_widget_v4_button_on_top_1" throwed an error: "' + error.stack + '"')
}