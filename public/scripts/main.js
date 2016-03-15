// Created by sam mok 2015(Siso brand interactive team).

"use strict";

//  limit browser drag move
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
},true);

var app = {
    searchBar: {
        init: function () {
            //  tab
            $('.header-search .tab span').click(function (e) {
                e.stopPropagation();
                $(this).addClass('active').siblings().removeClass('active');
                $('.search-bar-txt')[0].focus();
            });

            //  close
            $('.header .search-btn').click(function (e) {
                e.stopPropagation();
                $('.header-search').toggleClass('hide');
            });

            $('.header').siblings().click(function () {
                $('.header-search').addClass('hide');
            });

            $('.header').click(function (e) {
                e.stopPropagation();
            });

            $('body').click(function () {
                $('.header-search').addClass('hide');
            });
        }
    },

    init: function (){
        this.searchBar.init();
    }
};

$(function (){
    // init app
    app.init();
});

