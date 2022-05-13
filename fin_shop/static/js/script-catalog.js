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

EventBus.subscribe('widget:input-setting:insales:system:editor', (data) => {
  $(widget).find(".js-cut-list").resize();

  if (data.setting_name == 'subcollections-items-limit') {
    configureSubcollectionsItemsLimit(data.value);
  }
});

EventBus.subscribe('widget:change-setting:insales:system:editor', (data) => {
  $(widget).find(".js-cut-list").resize();

  if (data.setting_name == 'subcollections-items-limit') {
    configureSubcollectionsItemsLimit(data.value);
  }
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
;try {
  let widget = '.widget-type_system_widget_v4_alerts';
  let $widget = $('.widget-type_system_widget_v4_alerts');
  let alertsSettings = $widget.find('[data-micro-alerts-settings]').data('micro-alerts-settings');

function replaceAlertCheckIcon(message) {
  let iconCheck = '<span class="icon-check" style="margin-right:5px;"></span>';
  if (message.indexOf('✓') != -1 ) {
    return message.replace(/✓/gi, iconCheck);
  } else {
    return `${iconCheck} ${message}`;
  }
}

function replaceAlertWarningIcon(message) {
  let iconWarning = '<span class="icon-exclamation-triangle" style="margin-right:5px;"></span>';
  if (message.indexOf('⚠') != -1 ) {
    return message.replace(/⚠/gi, iconWarning);
  } else {
    return `${iconWarning} ${message}`;
  }
}

EventBus.subscribe('error-feedback:insales:ui_feedback', function(data) {
  let iconWarning = '<span class="icon-exclamation-triangle" style="margin-right:5px;"></span>';
  $.each(data.errors, function(i, val) {
    let errorText = typeof val == 'string' ? val : val[0];

    microAlert(iconWarning + errorText, 5000, {
      modificator: 'warning-notice'
    });
  });
});

EventBus.subscribe('send-feedback:insales:ui_feedback', function(data) {
  let success_feedback = alertsSettings['success_feedback'];
  let preorder = false;

  if ($(data.form[0]).find('[name="is-preorder-form"]').length) {
    success_feedback = alertsSettings['success_preorder'];
    preorder = true;
  }

  if ($(window).width() >= '767' && preorder) {
    microAlert(replaceAlertCheckIcon(success_feedback), 5000, {
      modificator: 'success-notice'
    });
  } else if ($(window).width() <= '768' && !preorder) {
    microAlert(replaceAlertCheckIcon(success_feedback), 5000, {
      modificator: 'success-notice'
    });
  }
});

EventBus.subscribe('overload:insales:compares', function() {
  let overload_compares = alertsSettings['overload_compares'];
  microAlert(replaceAlertWarningIcon(overload_compares), 5000, {
    modificator: 'warning-notice'
  });
});

EventBus.subscribe('add_item:insales:compares', () => {
  let add_item_compares = alertsSettings['add_item_compares'];

  microAlert(replaceAlertCheckIcon(add_item_compares), 5000, {
    modificator: 'success-notice'
  });
});

EventBus.subscribe('remove_item:insales:compares', () => {
  let remove_item_compares = alertsSettings['remove_item_compares'];
  microAlert(remove_item_compares, 5000, {
    modificator: 'success-notice'
  });
});

EventBus.subscribe('add_item:insales:favorites_products', () => {
  let add_item_favorites = alertsSettings['add_item_favorites'];
  microAlert(replaceAlertCheckIcon(add_item_favorites), 5000, {
    modificator: 'success-notice'
  });
});

EventBus.subscribe('remove_item:insales:favorites_products', () => {
  let remove_item_favorites = alertsSettings['remove_item_favorites'];
  microAlert(remove_item_favorites, 5000, {
    modificator: 'success-notice'
  });
});

EventBus.subscribe(['overload:quantity:insales:product', 'unchange_quantity:insales:ui_add-cart-counter'], () => {
  let overload_quantity = alertsSettings['overload_quantity'];
  microAlert(replaceAlertWarningIcon(overload_quantity), 5000, {
    modificator: 'warning-notice'
  });
});

EventBus.subscribe('add_items:insales:cart', function(data) {
  if (data.action.button) {
    let success_cart = alertsSettings['success_cart'];
    let btn_add_cart_counter_attr = $(data.action.button).is("[data-add-cart-counter-btn]") || $(data.action.button).is("[data-add-cart-counter]");
    let show_alert_always = $(data.action.button.prevObject).is("[data-show-alert-always]");

    if (btn_add_cart_counter_attr && data.action.currentItems && data.action.currentItems.length) {
      let current_id = data.action.currentItems[0].variant_id;
      let first_added = Cart.order.order_lines.filter(i => {
        return i.variant_id == current_id && i.quantity == 1;
      });

      if (first_added.length || show_alert_always) {
        microAlert(replaceAlertCheckIcon(success_cart), 3000, {
          modificator: 'success-notice'
        });
      }
    }
  }
});

} catch(error) {
  console.error('Widget "widget-type_system_widget_v4_alerts" throwed an error: "' + error.stack + '"')
}
;try {
  let widget = '.widget-type_system_widget_v4_breadcrumbs_1';
  let $widget = $('.widget-type_system_widget_v4_breadcrumbs_1');
  $(document).ready(function() {
  if (window.innerWidth <= 768) {
    if ($('.hidden-breadcrumbs').hasClass("js-hidden-bread")) {
      $('.breadcrumb-item').each(function(index) {
        if (index > 2 && index != $(".breadcrumb-item").length - 1) {
          $(this).not('.button-breadcrumb').addClass("hidden");
        }
      });

      $('.js-hidden-bread').click(function() {
        $('.breadcrumb-item').removeClass("hidden");
        $('.js-hidden-bread').parent().addClass("hidden");
      });
    }
  }
});

} catch(error) {
  console.error('Widget "widget-type_system_widget_v4_breadcrumbs_1" throwed an error: "' + error.stack + '"')
}
;try {
  let widget = '.widget-type_system_widget_v4_callback_modal_1';
  let $widget = $('.widget-type_system_widget_v4_callback_modal_1');
  $(document).ready(function() {
  $(widget).find(".js-hide-modal").on("click", function() {
    $(widget).removeClass("is-show-fullscreen");
  });

  $(widget).on("click", function(event) {
    if ($(event.target).closest(widget + ' .layout__content').length) {
      return;
    }

    $(widget).removeClass("is-show-fullscreen");
  });
});

EventBus.subscribe('send-feedback:insales:ui_feedback', (data) => {
  data.form.addClass("is-sended");

  setTimeout(function() {
    data.form.removeClass("is-sended");
    $(widget).removeClass("is-show-fullscreen");
  }, 5000);
});

EventBus.subscribe('show-modal-feedback:insales:ui_feedback', (data) => {
  if (data.modal_id && data.modal_id == "default") {
    $(widget).addClass("is-show-fullscreen");
  }
});

} catch(error) {
  console.error('Widget "widget-type_system_widget_v4_callback_modal_1" throwed an error: "' + error.stack + '"')
}
;try {
  let widget = '.widget-type_system_widget_v4_catalog_1';
  let $widget = $('.widget-type_system_widget_v4_catalog_1');
  var infinityProductsTempPage = [];
var isTouch = !!('ontouchstart' in window || navigator.msMaxTouchPoints);

if (isTouch) {
  $(widget).find(".product-preview").addClass("is-touch");
}

$widget.each(function(index, el) {
  new LazyLoad({
    container: $(el).get(0),
    elements_selector: '.lazyload'
  });
});

function loadMoreCollectionProducts(productListBlock, showMoreBtn) {
  let next_page = productListBlock.data('collectionInfinity');

  if (next_page && next_page != '') {
    if (infinityProductsTempPage.indexOf(next_page) > -1) {
      return;
    }

    infinityProductsTempPage.push(next_page);
    showMoreBtn.addClass('is-loading');

    $.ajax({
      url: next_page,
      dataType: 'html'
    })
      .done(function(resultDom) {
        let new_products = $(resultDom).find('[data-collection-infinity]');
        let next = new_products.data('collectionInfinity');

        productListBlock.append( new_products.html() );
        productListBlock.data('collectionInfinity', next);

        productListBlock.find('[data-product-id]').each(function(index, el) {
          Products.initInstance($(el));
        });

        productListBlock.each(function(index, el) {
          new LazyLoad({
            container: $(el).get(0),
            elements_selector: '.lazyload',
            use_native: 'loading' in document.createElement('img')
          });
        });

        if (productListBlock.data('collectionInfinity') == '') {
          showMoreBtn.parents(".layout").hide();
        }
      })
      .always(function() {
        showMoreBtn.removeClass('is-loading');
      })
  }
}

EventBus.subscribe('load-more-products:insales:site', function(data) {
  let product_list_block = $widget.find("[data-collection-infinity]");
  let btn = $(data.event_target);

  loadMoreCollectionProducts(product_list_block, btn);
});

if (window.location.pathname == '/favorites') {
  EventBus.subscribe('remove_item:insales:favorites_products', (data) => {
    $widget.find('[data-product-id="' + data.action.item + '"]').remove();
    if (data.products.length == 0 ) {
      $widget.find('.empty-catalog-message').removeClass('hidden');
    }
  })
}

} catch(error) {
  console.error('Widget "widget-type_system_widget_v4_catalog_1" throwed an error: "' + error.stack + '"')
}
;try {
  let widget = '.widget-type_system_widget_v4_collection_sort_1';
  let $widget = $('.widget-type_system_widget_v4_collection_sort_1');
  $(document).on("change", ".js-filter-trigger", function() {
  var thisEl = $(this);
  var thisForm = thisEl.parents('form:first');
  var defaultSize = $('.js-show-page-size').html();
  var order_val = thisForm.find('[name="order"]').val();
  var page_size = thisForm.find('[name="page_size"]').val();

  if (order_val == '') {
    $('[name="order"]').attr('disabled', 'disabled');
  }

  if (page_size == defaultSize) {
    $('[name="page_size"]').attr('disabled', 'disabled');
  }

  thisForm.submit();
});

} catch(error) {
  console.error('Widget "widget-type_system_widget_v4_collection_sort_1" throwed an error: "' + error.stack + '"')
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
  let widget = '.widget-type_system_widget_v4_notification_add_to_cart_1';
  let $widget = $('.widget-type_system_widget_v4_notification_add_to_cart_1');
  EventBus.subscribe('add_items:insales:cart', function(data) {
  if (data.action.button) {
    var btn_add_cart_counter_attr = $(data.action.button[0]).attr("data-add-cart-counter");

    if (typeof btn_add_cart_counter_attr === typeof undefined && data.action.currentItems && data.action.currentItems.length) {

      var photo_area = $(widget).find(".notification-product__photo");
      var title_area = $(widget).find(".notification-product__title");
      var price_area = $(widget).find(".notification-product__price");
      var count_area = $(widget).find(".notification-product__count");

      photo_area.find("img").remove();
      title_area.text('');
      price_area.text('');
      count_area.text('');

      var product_info = data.action.currentItems[0];
      var variant_id = product_info.variant_id;
      var count = data.action.items[variant_id] || 1;

      $('<img src="' + product_info.first_image.medium_url + '"/>').appendTo($(widget).find(".notification-product__photo"));
      $(widget).find(".notification-product__title").html(product_info.title);
      $(widget).find(".notification-product__price").html(Shop.money.format(product_info.sale_price));
      $(widget).find(".notification-product__count").text(count + ' ' + Shop.units.getName(product_info.product.unit) + '.');

      $(widget).addClass("is-show-fullscreen");
    }
  }
});

$(document).ready(function() {
  $(widget).find(".js-hide-notification").on("click", function() {
    $(widget).removeClass("is-show-fullscreen");
  });

  $(widget).on("click", function(event) {
    if ($(event.target).closest(widget + ' .layout__content').length) {
      return;
    }

    $(widget).removeClass("is-show-fullscreen");
  });
});

} catch(error) {
  console.error('Widget "widget-type_system_widget_v4_notification_add_to_cart_1" throwed an error: "' + error.stack + '"')
}
;try {
  let widget = '.widget-type_system_widget_v4_preorder_1';
  let $widget = $('.widget-type_system_widget_v4_preorder_1');
  EventBus.subscribe('show-preorder:insales:ui_product', (data) => {
  let content_field = $(widget).find('[name="content"]');
  let product_label = content_field.data("preorderProductLabel");
  let variant_label = content_field.data("preorderVariantLabel");

  let product_info = product_label + data.product;

  if (data.variant) {
    product_info += "<br/>" + variant_label + data.variant;
  }

  $(widget).find('[name="content"]').val(product_info);
  $(widget).addClass("is-show-fullscreen");
});

$(document).ready(function() {
  $(widget).find(".js-hide-preorder").on("click", function() {
    $(widget).removeClass("is-show-fullscreen");
  });

  $(widget).on("click", function(event) {
    if ($(event.target).closest(widget + ' .layout__content').length) {
      return;
    }

    $(widget).removeClass("is-show-fullscreen");
  });
});

EventBus.subscribe('send-feedback:insales:ui_feedback', (data) => {
  data.form.addClass("is-sended");

  setTimeout(function() {
    data.form.removeClass("is-sended");
    $(widget).removeClass("is-show-fullscreen");
  }, 5000);
});

} catch(error) {
  console.error('Widget "widget-type_system_widget_v4_preorder_1" throwed an error: "' + error.stack + '"')
}
;try {
  let widget = '.widget-type_system_widget_v4_sidebar_collections_menu_1';
  let $widget = $('.widget-type_system_widget_v4_sidebar_collections_menu_1');
  $(document).ready(function() {
  $(widget).find(".sidebar-collections__menu .is-current").addClass("is-show");

  $(widget).find(".js-show-submenu").on("click", function() {
    var cur_item = $(this).parents(".sidebar-collections__item:first");
    cur_item.toggleClass("is-show");
  });
});

} catch(error) {
  console.error('Widget "widget-type_system_widget_v4_sidebar_collections_menu_1" throwed an error: "' + error.stack + '"')
}
;try {
  let widget = '.widget-type_system_widget_v4_sidebar_filter_1';
  let $widget = $('.widget-type_system_widget_v4_sidebar_filter_1');
  $(function() {
  initFilterRangeSlider($widget.find(".js-filter-range"));

  $widget.find(".js-reset-filter").on("click", function() {
    let filter_form = $(this).parents('form.filter');

    filter_form.find(".filter-option__field").prop('checked', false);
    filter_form.find(".filter-range__field").prop('disabled', true);

    filter_form.submit();
  });

  $widget.find(".filter-option__field:checked").parents(".filter-item").addClass("is-show");
  $widget.find(".js-filter-range .filter-range__field:not(:disabled)").parents(".filter-item").addClass("is-show");

  if ($widget.find(".filter-option__field:checked").length > 0 || $widget.find(".js-filter-range .filter-range__field:not(:disabled)").length > 0) {
    $widget.find(".js-show-mobile-filter, .filter__head-reset").addClass("is-active-filters");
  }

  $widget.find(".filter-range__values-item").on("click", function() {
    $(this).find(".filter-range__field").prop('disabled', false).focus();
  });

  $widget.find(".js-toggle-show-filter-item").on("click", function() {
    let filter_item = $(this).parents(".filter-item");

    if (filter_item.is(".is-show")) {
      filter_item.find(".filter-item__content").stop().slideUp(250, function() {
        filter_item.removeClass("is-show");
      });
    } else {
      filter_item.find(".filter-item__content").stop().slideDown(250, function() {
        filter_item.addClass("is-show");
      });
    }
  });

  $widget.find('.js-more-items').on("click", function() {
    $(this).parent().find('.filter-item__list-item.hidden').removeClass('hidden').addClass('show');
    $(this).parent().find('.js-hide-items').removeClass('hidden').addClass('show');
    $(this).addClass('hidden');
  });

  $widget.find('.js-hide-items').on("click", function() {
    $(this).parent().find('.filter-item__list-item.show').toggleClass('hidden show');
    $(this).toggleClass('show hidden');
    $(this).parent().find('.js-more-items').toggleClass('hidden show');
  });

  $widget.find(".js-show-mobile-filter").on("click", function() {
    $widget.find(".filter").addClass("is-show-mobile");
  });

  $widget.find(".js-hide-mobile-filter").on("click", function() {
    $widget.find(".filter").removeClass("is-show-mobile");
  });

  // Сортировка
  $(document).on("change", ".js-sorting-trigger", function() {
    let thisEl = $(this);
    let thisForm = thisEl.parents('form:first');
    let defaultSize = $('.js-show-page-size').html();
    let order_val = thisForm.find('[name="order"]').val();
    let page_size = thisForm.find('[name="page_size"]').val();

    if (order_val == '') {
      $('[name="order"]').attr('disabled', 'disabled');
    }

    if (page_size == defaultSize) {
      $('[name="page_size"]').attr('disabled', 'disabled');
    }

    thisForm.submit();
  });
});

function initFilterRangeSlider(filterRange) {
  filterRange.each(function() {
    let filter_range = $(this);
    let filter_range_slider = filter_range.find(".filter-range__slider")[0];
    let filter_range_field_min = filter_range.find(".filter-range__field-min");
    let filter_range_field_max = filter_range.find(".filter-range__field-max");

    let slider_min_value = Math.floor(filter_range.data("range-min"));
    let slider_max_value = Math.floor(filter_range.data("range-max"));
    let slider_start_val = Math.floor(filter_range.data("range-start"));
    let slider_end_val = Math.floor(filter_range.data("range-end"));
    let slider_step = Math.floor(filter_range.data("range-step"));

    let rangeMin = slider_min_value == slider_max_value ? 0 : slider_min_value;
    let rangeMax = slider_max_value == 0 ? 1 : slider_max_value;

    noUiSlider.create(filter_range_slider, {
      start: [slider_start_val, slider_end_val],
      range: {
        'min': rangeMin,
        'max': rangeMax
      },
      step: slider_step,
      connect: true
    });

    filter_range_slider.noUiSlider.on('slide', function() {
      changeRangeValue(
        filter_range_slider.noUiSlider.get()[0],
        filter_range_slider.noUiSlider.get()[1]
      );
    });

    filter_range_slider.noUiSlider.on('set', function() {
      changeRangeValue(
        filter_range_slider.noUiSlider.get()[0],
        filter_range_slider.noUiSlider.get()[1]
      );
    });

    changeRangeValue(
      filter_range_slider.noUiSlider.get()[0],
      filter_range_slider.noUiSlider.get()[1]
    );

    function changeRangeValue(curMinValue, curMaxValue) {
      filter_range_field_min.val(Math.floor(curMinValue));
      filter_range_field_max.val(Math.floor(curMaxValue));

      curMinValue > slider_min_value
        ? filter_range_field_min.prop('disabled', false)
        : filter_range_field_min.prop('disabled', true);

      curMaxValue < slider_max_value
        ? filter_range_field_max.prop('disabled', false)
        : filter_range_field_max.prop('disabled', true);
    }

    filter_range_field_min.on("blur", function() {
      filter_range_slider.noUiSlider.set(
        [$(this).val(), filter_range_slider.noUiSlider.get()[1]]
      );
    });

    filter_range_field_max.on("blur", function() {
      filter_range_slider.noUiSlider.set(
        [filter_range_slider.noUiSlider.get()[0], $(this).val()]
      );
    });
  });
}

} catch(error) {
  console.error('Widget "widget-type_system_widget_v4_sidebar_filter_1" throwed an error: "' + error.stack + '"')
}
;try {
  let widget = '.widget-type_system_widget_v4_subcollections_1';
  let $widget = $('.widget-type_system_widget_v4_subcollections_1');
  $widget.each(function(index, el) {
  new LazyLoad({
    container: $(el).get(0),
    elements_selector: '.lazyload'
  });
});

} catch(error) {
  console.error('Widget "widget-type_system_widget_v4_subcollections_1" throwed an error: "' + error.stack + '"')
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