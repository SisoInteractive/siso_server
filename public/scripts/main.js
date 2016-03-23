// Created by sam mok 2015(Siso brand interactive team).

"use strict";

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

    message: {
        show: function (msg, type, delay) {
            $('.message-wrap .message').addClass(type).append(msg);

            if (delay) {
                setTimeout(function () {
                    app.message.toggle();

                    setTimeout(function () {
                        app.message.toggle();
                    }, delay);
                }, 400);
            }
        },
        toggle: function () {
            $('.message-wrap .message').transition('slide down');
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

