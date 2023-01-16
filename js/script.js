document.addEventListener("DOMContentLoaded", function () {
  //+select (NiceSelect)
  document.querySelectorAll('.js-select-search').forEach(function (item) {
    NiceSelect.bind(item, { searchable: true });
  })
  document.querySelectorAll('.js-select').forEach(function (item) {
    NiceSelect.bind(item, { searchable: false });
  })
  //-select (NiceSelect)

  //+mobile btn home
  document.querySelectorAll('.js-close-modals').forEach(function (item) {
    item.addEventListener('click', function () {
      closeMobileMenu();
      closeCatalog();
      closeCart();
      closeSearch();
    })
  })
  //-mobile btn home

  //+mobile menu
  const mobileMenu = document.querySelector('.header-top-nav');
  let menuBtns = document.querySelectorAll('.menu-btn');
  menuBtns.forEach(function (item) {
    item.addEventListener('click', function () {
      if (document.body.classList.contains('_mobile-menu-open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
        closeCatalog();
        closeCart();
        closeSearch();
      }
    })
  })
  function openMobileMenu() {
    menuBtns.forEach(function (item) {
      item.classList.add('_active');
    })
    mobileMenu.classList.add('_active');
    document.body.classList.add('_mobile-menu-open');
  }
  function closeMobileMenu() {
    menuBtns.forEach(function (item) {
      item.classList.remove('_active');
    })
    mobileMenu.classList.remove('_active');
    document.body.classList.remove('_mobile-menu-open');
  }
  //-mobile menu

  //+sdebar (category)
  const filterSidebar = document.querySelector('.category-sidebar')
  document.querySelectorAll('.btn-filter-mobile').forEach(function (item) {
    item.addEventListener('click', function () {
      filterSidebar.classList.add('_active');
      document.body.classList.add('_filter-open');
    })
  })

  document.querySelectorAll('.js-close-filter').forEach(function (item) {
    item.addEventListener('click', function (e) {
      if (e.target.classList.contains('js-close-filter')) {
        e.preventDefault();
        filterSidebar.classList.remove('_active');
        document.body.classList.remove('_filter-open');
      }
    })
  })
  //-sdebar (category)

  //+breadcrumb (mobile collapse)
  var breadcrumb = new Array;
  function collapseBreadcrumb() {
    document.querySelectorAll(".breadcrumbs").forEach(function (breadcrumbList, index) {
      let breadcrumbItem = breadcrumbList;
      if (breadcrumbItem.classList.contains('_collapsed')) return
      breadcrumbItem.classList.add('_collapsed');
      if (breadcrumbItem.children.length >= 4) {
        let breadcrumbDetached = new Array;
        for (let i = 0; i < breadcrumbItem.children.length; i++) {
          if (i > 0 && i < breadcrumbItem.children.length - 1) {
            breadcrumbDetached.push(breadcrumbItem.removeChild(breadcrumbItem.children[i]));
            i--;
          }
        }
        breadcrumb.push({ 'list': breadcrumbItem, 'detached': breadcrumbDetached })

        let expand_breadcrumb = document.createElement("li");
        expand_breadcrumb.innerHTML = '<a href="#">...</a>';
        expand_breadcrumb.addEventListener('click', function (e) {
          e.preventDefault();
          breadcrumbItem.children[1].remove();
          for (let i = 0; i < breadcrumbDetached.length; i++) {
            breadcrumbItem.children[i].after(breadcrumbDetached[i]);
          }
        })
        breadcrumbItem.children[0].after(expand_breadcrumb);
      }
    })
  }
  function expandBreadcrumb() {
    let i = breadcrumb.length;
    while (i--) {
      breadcrumb[i].list.children[1].remove();
      for (let j = 0; j < breadcrumb[i].detached.length; j++) {
        breadcrumb[i].list.children[j].after(breadcrumb[i].detached[j]);
      }
      breadcrumb[i].list.classList.remove('_collapsed');
      breadcrumb.splice(i, 1);
    }
  }

  let wWidth = window.innerWidth;
  if (wWidth <= 767) {
    collapseBreadcrumb();
  }
  window.addEventListener('resize', function () {
    wWidth = window.innerWidth
    if (wWidth <= 767) {
      collapseBreadcrumb();
    } else {
      expandBreadcrumb();
    }
  })
  //-breadcrumb

  //+scroll top (product)
  document.querySelectorAll('.product-details__head-top').forEach(function (item) {
    item.addEventListener('click', function () {
      doScrolling(0, 0.1);
    })
  })
  //-scroll top 

  //+popup comparison 
  const compareBtns = document.querySelectorAll('.js-popup-comparison');
  compareBtns.forEach(function (item) {
    item.addEventListener('click', function () {
      compareBtns.forEach(function (btn) {
        if (btn.classList.contains('btn-compare-mobile')) {
          btn.querySelector('.btn__text').innerText = 'GO TO COMPARE';
        } else {
          btn.classList.remove('btn-text_blue');
          btn.classList.add('btn-text_red');
          btn.querySelector('.btn-text__text').innerText = 'Go to compare';
        }
        btn.classList.add('_added');
      })
      let popup = document.body.querySelector('#popup-comparison');
      if (popup.classList.contains('_active')) return;
      popup.classList.add('_active');
      let popupTimeout = setTimeout(function () {
        hideComparisonPopup();
      }, 5000);
      popup.querySelector('.popup-comparison__close').addEventListener('click', hideComparisonPopup)
      function hideComparisonPopup() {
        popup.querySelector('.popup-comparison__close').removeEventListener('click', hideComparisonPopup, false);
        popup.classList.remove('_active');
        clearTimeout(popupTimeout);
      }
    })
  })
  //-popup comparison 
  //+comparison table
  document.querySelectorAll('.comparison-table__head-btn').forEach(function (item) {
    item.addEventListener('click', function () {
      this.closest('tbody').classList.toggle('_show')
    })
  })
  //-comparison table

  //+img modal
  document.querySelectorAll('.js-modal-img').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      let href = this.href || this.querySelector('img').src;
      let modal = document.createElement("div");
      modal.classList.add('modal-img');
      let modalClose = document.createElement("div");
      modalClose.classList.add('modal-img__close');
      modalClose.innerHTML = '<svg width="32" height="32"><use href="images/svg-icons.svg#icon-cross"></use></svg>';
      let modalImg = document.createElement("img");
      modalImg.src = href;
      modal.append(modalClose);
      modal.append(modalImg);
      document.body.classList.toggle('_modal-img');
      document.body.append(modal);

      modalClose.addEventListener('click', function (e) {
        modal.remove();
        document.body.classList.remove('_modal-img');
      })
      modal.addEventListener('click', function (e) {
        if (e.target == modal) {
          modal.remove();
          document.body.classList.remove('_modal-img');
        }
      })
    })
  })
  //-img modal

  //+sort (category)
  document.querySelectorAll('.sort__link').forEach(function (item) {
    item.addEventListener('click', function () {
      document.querySelectorAll('.sort__link._active').forEach(function (prevItem) {
        prevItem.classList.remove('_active');
      })
      this.classList.add('_active');
      let container = this.closest('.sort');
      container.querySelector('.sort__current').innerHTML = this.innerText;
      container.classList.remove('_active');
    })
  })
  document.querySelectorAll('.sort__current').forEach(function (item) {
    item.addEventListener('click', function () {
      this.closest('.sort').classList.toggle('_active');
    })
  })
  document.addEventListener('click', function (e) {
    let sortTarget = e.target.closest('.sort');
    let activeSort = document.querySelectorAll('.sort._active')
    activeSort.forEach(function (item) {
      if (item != sortTarget) {
        item.classList.remove('_active');
      }
    })
  })
  //-sort

  //+price range (category sidebar)
  document.querySelectorAll('.js-price-range').forEach(function (item) {
    let $min = item.querySelector('.js-price-range-min');
    let minValue = $min.getAttribute('min');
    let $max = item.querySelector('.js-price-range-max');
    let maxValue = $min.getAttribute('max');
    setInputFilter($min, function (value) {
      return /^\d*$/.test(value) && (value === "" || parseInt(value) <= parseInt($max.value)) && (value === "" || parseInt(value) >= minValue);
    });
    $min.addEventListener('focusout', function () {
      if (this.value === '')
        this.value = minValue;
    })
    setInputFilter($max, function (value) {
      return /^\d*$/.test(value) && (value === "" || parseInt(value) <= maxValue) && (value === "" || parseInt(value) >= parseInt($min.value));
    });
    $max.addEventListener('focusout', function () {
      if (this.value === '')
        this.value = maxValue;
    })
  })
  //-price range

  //+filter (category sidebar)
  document.querySelectorAll('.filter-tags__link').forEach(function (item) {
    item.addEventListener('click', function () {
      document.querySelectorAll('.filter-tags__link._active').forEach(function (prevItem) {
        prevItem.classList.remove('_active');
      })
      this.classList.add('_active');
    })
  })
  //-filter

  //+header
  const header = document.querySelector('.header');
  let headerOffset = 0;
  if (window.innerWidth < 768) {
    headerOffset = 0;
  } else {
    headerOffset = 60;
  }
  window.addEventListener("scroll", function () {
    if (window.scrollY > headerOffset) {
      header.classList.add('_fixed');
    } else {
      header.classList.remove('_fixed');
    }
  })

  window.addEventListener('resize', function () {
    if (window.innerWidth < 768) {
      headerOffset = 0;
    } else {
      headerOffset = 60;
    }
  })
  //-header

  //+catalog (header)
  let headerCatalog = document.querySelector('.header-catalog');
  let headerCatalogBtns = document.querySelectorAll('.js-show-catalog');
  headerCatalogBtns.forEach(function (item) {
    item.addEventListener('click', function () {
      if (document.body.classList.contains('_catalog-open')) {
        closeCatalog();
      } else {
        openCatalog();
        closeMobileMenu();
        closeCart();
        closeSearch();
      }
    })
  })
  function openCatalog() {
    headerCatalogBtns.forEach(function (btn) {
      btn.classList.add('_active');
    });
    headerCatalog.classList.add('_active');
    document.body.classList.add('_catalog-open');
  }
  function closeCatalog() {
    headerCatalogBtns.forEach(function (btn) {
      btn.classList.remove('_active');
    });
    headerCatalog.classList.remove('_active');
    document.body.classList.remove('_catalog-open');
    resetCatalog();
  }

  document.querySelector('.header-catalog__drop').addEventListener('click', function (e) {
    if (e.target == e.currentTarget) {
      headerCatalogBtns.forEach(function (btn) {
        btn.classList.remove('_active');
      });
      headerCatalog.classList.remove('_active');
      document.body.classList.remove('_catalog-open');
      resetCatalog();
    }
  })

  function resetCatalog() {
    //++mobile
    headerCatalog.classList.remove('_lvl2');
    headerCatalog.classList.remove('_lvl3');
    headerCatalog.querySelectorAll('.header-catalog__box').forEach(function (current, i) {
      current.classList.remove('_active');
    });
    //--mobile
    headerCatalog.querySelectorAll('.header-catalog__categories li').forEach(function (current, i) {
      if (i == 0) {
        current.classList.add('_active');
      } else {
        current.classList.remove('_active');
      }
    });
    headerCatalog.querySelectorAll('.header-catalog__content').forEach(function (current, i) {
      if (i == 0) {
        current.classList.add('_active');
      } else {
        current.classList.remove('_active');
      }
    });
    headerCatalog.querySelectorAll('.header-catalog__item._active').forEach(function (current) {
      current.classList.remove('_active');
    });
    headerCatalog.querySelectorAll('.header-catalog__box._active').forEach(function (current) {
      current.classList.remove('_active');
    });
  }
  document.querySelectorAll('.header-catalog__categories a').forEach(function (item) {
    item.addEventListener('mouseenter', function () {
      this.closest('.header-catalog__categories').querySelectorAll('._active').forEach(function (current) {
        current.classList.remove('_active');
      })
      this.classList.add('_active');
      let index = elIndex(this.parentNode);
      this.closest('.header-catalog').querySelectorAll('.header-catalog__content').forEach(function (current, i) {
        if (i == index) {
          current.classList.add('_active');
        } else {
          current.classList.remove('_active');
        }
      });
    })

  })
  //++mobile
  document.querySelectorAll('.header-catalog__categories li').forEach(function (item) {
    item.addEventListener('click', function () {
      let index = elIndex(this);
      this.closest('.header-catalog').querySelectorAll('.header-catalog__content').forEach(function (current, i) {
        if (i == index) {
          current.classList.add('_active');
        } else {
          current.classList.remove('_active');
        }
      });
      headerCatalog.classList.add('_lvl2')
    })
  })
  document.querySelectorAll('.header-catalog__categorie-title').forEach(function (item) {
    item.addEventListener('click', function () {
      headerCatalog.classList.remove('_lvl2')
    })
  })
  document.querySelectorAll('.header-catalog__sub-title').forEach(function (item) {
    item.addEventListener('click', function () {
      let box = this.closest('.header-catalog__box');
      if (box.classList.contains('_active')) {
        box.classList.remove('_active');
        headerCatalog.classList.remove('_lvl3');
      } else {
        box.classList.add('_active');
        headerCatalog.classList.add('_lvl3');
      }
    })
  })
  //--mobile
  document.querySelectorAll('.header-catalog__item-more').forEach(function (item) {
    item.addEventListener('click', function () {
      this.closest('.header-catalog__item').classList.toggle('_active')
    })
  })
  document.querySelectorAll('.header-catalog__more').forEach(function (item) {
    item.addEventListener('click', function () {
      this.closest('.header-catalog__box').classList.toggle('_active')
    })
  })
  //-catalog

  //+search (header)
  const headerSearch = document.querySelector('.header-search');
  const headerSearchInput = document.querySelector('.header-search__input');
  //++mobile btn
  document.querySelectorAll('.search-btn').forEach(function (item) {
    item.addEventListener('click', function () {
      openMobileSearch();
      closeMobileMenu();
      closeCatalog();
      closeCart();
    })
  })
  document.querySelectorAll('.header-search__close').forEach(function (item) {
    item.addEventListener('click', function () {
      closeSearch();
    })
  })
  //--mobile btn
  let searchMoveEvent = window.event;
  headerSearch.addEventListener('click', function (e) {
    if (e.target.closest('.js-search-remove')) {
      e.preventDefault();
      e.target.closest('.header-search__item').remove();
    }
  })
  document.addEventListener('mousedown', function (e) {
    searchMoveEvent = e.target;
  })
  document.addEventListener('touchstart', function (e) {
    searchMoveEvent = e.target;
  })
  headerSearchInput.addEventListener('focus', function (e) {
    searchMoveEvent = e.target;
    openSearch();
    closeMobileMenu();
    closeCatalog();
    closeCart();
  })
  headerSearchInput.addEventListener('focusout', function (e) {
    if (searchMoveEvent.closest('.header-search__outer') && !searchMoveEvent.closest('.header-search__close')) {
      setTimeout(function () {
        headerSearchInput.focus();
      }, 1);
    } else {
      closeSearch()
    }
  })
  function openMobileSearch() {
    headerSearch.classList.add('_active');
  };
  function openSearch() {
    headerSearch.classList.add('_show-drop');
    headerSearch.classList.add('_active');
    document.body.classList.add('_search-open');
  }
  function closeSearch() {
    headerSearch.classList.remove('_active');
    headerSearch.classList.remove('_show-drop');
    document.body.classList.remove('_search-open');
    hideSearchSelect()
  }
  document.querySelector('.header-search__select-btn').addEventListener('click', function () {
    searcSelect.classList.add('_active');
    document.body.classList.add('_search-select-open');
    closeMobileMenu();
    closeCatalog();
    closeCart();
  });
  document.querySelector('.header-search__select-close').addEventListener('click', function () {
    hideSearchSelect();
  });
  document.querySelector('.header-search__select-outer').addEventListener('click', function (e) {
    if (e.currentTarget == e.target) {
      hideSearchSelect();
    }
  });

  document.querySelectorAll('.header-search__select-item').forEach(function (item) {
    item.addEventListener('click', function () {
      document.querySelectorAll('.header-search__select-item._active').forEach(function (prevItem) {
        prevItem.classList.remove('_active');
      })
      this.classList.add('_active');
      let value = this.innerText;
      let currentField = this.closest('.header-search__select').querySelector('.header-search__select-current');
      currentField.innerHTML = value;
      currentField.setAttribute('title', value);
      hideSearchSelect();
    })
  })
  let searcSelect = document.querySelector('.header-search__select')
  function hideSearchSelect() {
    searcSelect.classList.remove('_active');
    document.body.classList.remove('_search-select-open');
  }
  //+search

  //+cart (header)
  document.querySelectorAll('.js-cart-item-remove').forEach(function (item) {
    item.addEventListener('click', function () {
      let cart = this.closest('.js-cart');
      let item = this.closest('.js-cart-item');
      item.remove();
      if (cart.querySelectorAll('.js-cart-item').length <= 0) {
        cart.querySelectorAll('.js-disable-empty').forEach(function (item) {
          item.setAttribute("disabled", "");
        })
      }
    })
  })
  const headerCart = document.querySelector('.header-cart')
  const headerCartBtn = document.querySelectorAll('.js-show-cart')
  headerCartBtn.forEach(function (item) {
    item.addEventListener('click', function () {
      if (document.body.classList.contains('_cart-open')) {
        closeCart();
      } else {
        openCart();
        closeMobileMenu();
        closeCatalog();
        closeSearch();
      }
    })
  })
  document.querySelectorAll('.js-hide-cart').forEach(function (item) {
    item.addEventListener('click', function () {
      closeCart();
    })
  })
  document.querySelector('.header-cart__modal').addEventListener('click', function (e) {
    if (e.currentTarget == e.target) {
      closeCart();
    }
  })

  function openCart() {
    headerCartBtn.forEach(function (btn) {
      btn.classList.add('_active');
    });
    headerCart.classList.add('_active');
    document.body.classList.add('_cart-open');
  }
  function closeCart() {
    headerCartBtn.forEach(function (btn) {
      btn.classList.remove('_active');
    });
    headerCart.classList.remove('_active');
    document.body.classList.remove('_cart-open');
  }
  //-cart

  //+input counter
  document.querySelectorAll('.js-counter-input').forEach(function (item) {
    let min = item.getAttribute('min') || 0;
    let max = item.getAttribute('max') || 9999;
    setInputFilter(item, function (value) {
      return /^\d*$/.test(value) && (value === "" || parseInt(value) <= max) && (value === "" || parseInt(value) >= min);
    });
    item.addEventListener('focusout', function () {
      if (item.value === '')
        item.value = min;
    })
  })
  document.querySelectorAll('.js-counter-dec').forEach(function (item) {
    item.addEventListener('click', function () {
      let input = this.closest('.js-counter').querySelector('.js-counter-input');
      let min = input.getAttribute('min') || 0;
      let value = input.value - 1;
      input.value = (value >= min) ? value : min;
    })
  })
  document.querySelectorAll('.js-counter-inc').forEach(function (item) {
    item.addEventListener('click', function () {
      let input = this.closest('.js-counter').querySelector('.js-counter-input');
      let max = input.getAttribute('max') || 9999;
      let value = +input.value + 1;
      input.value = (value <= max) ? value : max;
    })
  })
  //-input counter


  //+select (header)
  const headerSelectsBtn = document.querySelectorAll('.header-select__btn')
  headerSelectsBtn.forEach(function (item) {
    item.addEventListener('click', function () {
      this.closest('.header-select').classList.toggle('_active');
    })
  })
  const headerSelectItems = document.querySelectorAll('.header-select__item')
  headerSelectItems.forEach(function (item) {
    item.addEventListener('click', function () {
      let headerSelect = this.closest('.header-select');
      let value = this.closest('.header-select__item').getAttribute('data-value');
      let current = headerSelect.querySelector(".header-select__current");
      if (value)
        current.innerHTML = value;
      headerSelect.classList.remove('_active');
    })
  })

  document.addEventListener('click', function (e) {
    let headerSelectTarget = e.target.closest('.header-select');
    let activeHeaderSelects = document.querySelectorAll('.header-select._active')
    activeHeaderSelects.forEach(function (item) {
      if (item != headerSelectTarget) {
        item.classList.remove('_active');
      }
    })
  })
  //-select (header)

  //+gallery (product)
  const gallery = document.querySelector('.product-gallery');
  if (gallery) {
    window.addEventListener('resize', function () {
      if (window.innerWidth < 768) {
        closeGallery();
        swiperGalleyMain.allowTouchMove = true;
      }
    })
  }
  document.querySelectorAll('.product-gallery__main .swiper-slide, .product-gallery__more-btn').forEach(function (item) {
    item.addEventListener('click', function () {
      if (wWidth < 768) return;

      gallery.classList.add('_full-size');
      document.body.classList.add('_gallery-full-size');
      swiperGalleyThumb.params.slidesPerView = "auto";
      swiperGalleyThumb.allowTouchMove = true;
      swiperGalleyThumb.mousewheel.enable();
      swiperGalleyMain.allowTouchMove = true;
    })
  })
  document.querySelectorAll('.product-gallery__close').forEach(function (item) {
    item.addEventListener('click', closeGallery)
  })
  function closeGallery() {
    gallery.classList.remove('_full-size');
    document.body.classList.remove('_gallery-full-size');

    swiperGalleyThumb.params.slidesPerView = 3;
    swiperGalleyThumb.allowTouchMove = false;
    swiperGalleyThumb.mousewheel.disable();

    swiperGalleyMain.allowTouchMove = false;

    if (swiperGalleyMain.activeIndex > 3)
      swiperGalleyMain.slideTo(0, 0)
  }
  const swiperGalleyThumb = new Swiper(".swiper-gallery-thumb", {
    spaceBetween: 16,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
    direction: 'vertical',
    allowTouchMove: false,
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    lazy: {
      loadPrevNext: true,
    },
  });
  const swiperGalleyMain = new Swiper(".swiper-gallery-main", {
    slidesPerView: "auto",
    spaceBetween: 16,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiperGalleyThumb,
    },
    lazy: {
      loadPrevNext: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
        allowTouchMove: false,
      }
    }
  });
  //-gallery

  const swiperCategoryList = new Swiper('.swiper-category-list', {
    slidesPerView: "auto",
    spaceBetween: 16,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  const swiperProductList = new Swiper('.swiper-product-list', {
    slidesPerView: "auto",
    spaceBetween: 12,
    observeParents: true,
    observer: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        spaceBetween: 24,
      }
    }
  });

  const swiperBrandsList = new Swiper('.swiper-brands-list', {
    slidesPerView: "auto",
    spaceBetween: 16,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  const swiperHero = new Swiper('.swiper-hero', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 15,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      dynamicBullets: true,
      dynamicMainBullets: 2
    },
    lazy: {
      loadPrevNext: true,
    },
  });

  //+anchor scroll (product)
  document.querySelectorAll('[data-anchor]').forEach(function (item) {
    item.addEventListener('click', function () {
      let targetId = this.getAttribute('href') || '#' + this.getAttribute('data-anchor');
      if (!targetId) return;
      doScrolling(document.querySelector(targetId).getBoundingClientRect().top + window.pageYOffset - 70, 0.1);
    })
  })
  //-anchor scroll

  //+modal
  document.querySelectorAll('[data-modal]').forEach(function (item) {
    item.addEventListener('click', function () {
      let modalId = this.getAttribute('href') || '#' + this.getAttribute('data-modal');
      if (!modalId) return;
      openModal(modalId)
    })
  })
  function openModal(modalId) {
    document.querySelector(modalId).classList.add('_active')
    document.body.classList.add('_modal-open');
  }

  document.querySelectorAll('.js-modal-hide').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.stopPropagation();
      if (e.target.classList.contains('js-modal-hide')) {
        let modal = this.closest('.modal');
        closeModal(modal);
      }
    })
  })
  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('_active');
    } else {
      document.querySelectorAll('.modal._active').forEach(function (item) {
        item.classList.remove('_active')
      })
    }
    document.body.classList.remove('_modal-open');
  }
  //-modal

  //+tabs
  document.querySelectorAll('.js-tab-btn').forEach(function (item) {
    item.addEventListener('click', function () {
      if (this.classList.contains('_active')) return;

      let tabsBtn = this.closest('.js-tab-btns');
      tabsBtn.querySelectorAll('.js-tab-btn._active').forEach(function (btn) {
        btn.classList.remove('_active');
      });
      this.classList.add('_active');

      let index = elIndex(this);
      let tabsContent = tabsBtn.nextElementSibling.children;
      for (let i = 0; i < tabsContent.length; i++) {
        if (!tabsContent[i].classList.contains('js-tab-content'))
          index++;

        if (i == index) {
          tabsContent[i].classList.add('_active');
        } else {
          tabsContent[i].classList.remove('_active');
        }
      }
    })
  })
  //-tabs

  //+map
  var svgMarker;
  function initMap() {
    svgMarker = {
      path: "M11 0C8.08369 0.00344047 5.28779 1.16347 3.22564 3.22563C1.16348 5.28778 0.00345217 8.08367 1.17029e-05 11C-0.00348119 13.3832 0.774992 15.7018 2.21601 17.6C2.21601 17.6 2.51601 17.995 2.56501 18.052L11 28L19.439 18.047C19.483 17.994 19.784 17.6 19.784 17.6L19.785 17.597C21.2253 15.6996 22.0034 13.3821 22 11C21.9966 8.08367 20.8365 5.28778 18.7744 3.22563C16.7122 1.16347 13.9163 0.00344047 11 0ZM11 15C10.2089 15 9.43553 14.7654 8.77773 14.3259C8.11993 13.8864 7.60724 13.2616 7.30449 12.5307C7.00174 11.7998 6.92253 10.9956 7.07687 10.2196C7.23121 9.44372 7.61217 8.73098 8.17158 8.17157C8.73099 7.61216 9.44373 7.2312 10.2197 7.07686C10.9956 6.92252 11.7998 7.00173 12.5307 7.30448C13.2616 7.60723 13.8864 8.11992 14.3259 8.77772C14.7654 9.43552 15 10.2089 15 11C14.9987 12.0605 14.5768 13.0771 13.827 13.827C13.0771 14.5768 12.0605 14.9987 11 15Z",
      fillColor: "#1C1B1F",
      fillOpacity: 1,
      strokeWeight: 0,
      rotation: 0,
      scale: 1,
      anchor: new google.maps.Point(11, 28),
    };

    if (document.getElementById("company-map"))
      initMapCompany();
    if (document.getElementById("samples-map"))
      initMapSamples();
  }
  window.initMap = initMap;

  function initMapCompany() {
    const mapCenter = { lat: -25.344, lng: 131.031 };
    const map = new google.maps.Map(document.getElementById("company-map"), {
      zoom: 2.5,
      center: mapCenter,
      mapTypeControl: false,
    });
    const marker = new google.maps.Marker({
      position: { lat: -20.344, lng: 139.031 },
      icon: svgMarker,
      map: map,
    });
    const marker2 = new google.maps.Marker({
      position: { lat: -25.344, lng: 131.031 },
      icon: svgMarker,
      map: map,
    });
    const marker3 = new google.maps.Marker({
      position: { lat: -33.344, lng: 125.031 },
      icon: svgMarker,
      map: map,
    });
  }

  function initMapSamples() {
    const mapCenter = { lat: -25.344, lng: 131.031 };
    const map = new google.maps.Map(document.getElementById("samples-map"), {
      zoom: 4,
      center: mapCenter,
      mapTypeControl: false,
      disableDefaultUI: true,
    });
    const marker = new google.maps.Marker({
      position: { lat: -25.344, lng: 131.031 },
      icon: svgMarker,
      map: map,
    });
  }
  //-map
});

function elIndex(el) {
  if (!el) return -1;
  var i = 0;
  while (el = el.previousElementSibling) {
    i++;
  }
  return i;
}

function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
    textbox.addEventListener(event, function (e) {
      if (inputFilter(this.value)) {
        // Accepted value
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        // Rejected value - restore the previous one
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        // Rejected value - nothing to restore
        this.value = "";
      }
    });
  });
}

function doScrolling(elementY, speed) {
  let startingY = window.pageYOffset;
  let diff = elementY - startingY;
  let start;
  let duration = Math.abs(speed * diff);
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    let time = timestamp - start;
    let percent = Math.min(time / duration, 1);
    window.scrollTo(0, startingY + diff * percent);
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  })
}