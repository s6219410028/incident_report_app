$.fn.pcodedmenu = function(e) {
    var t = this.attr("id"),
        a = {
            themelayout: "vertical",
            MenuTrigger: "click",
            SubMenuTrigger: "click",
            activeMenuClass: "active",
            ThemeBackgroundPattern: "pattern6",
            HeaderBackground: "theme4",
            LHeaderBackground: "theme4",
            NavbarBackground: "theme4",
            ActiveItemBackground: "theme0",
            SubItemBackground: "theme4",
            LogoTheme: "theme6",
            ActiveItemStyle: "style0",
            freamtype: "theme1",
            ItemBorderStyle: "solid",
            SubItemBorder: !0,
            DropDownIconStyle: "style1",
            FixedNavbarPosition: !1,
            FixedHeaderPosition: !1,
            horizontalMenuplacement: "top",
            horizontalMenulayout: "widebox",
            horizontalBrandItem: !0,
            horizontalLeftNavItem: !0,
            horizontalRightItem: !1,
            horizontalSearchItem: !1,
            horizontalBrandItemAlign: "left",
            horizontalLeftNavItemAlign: "right",
            horizontalRightItemAlign: "right",
            horizontalsearchItemAlign: "right",
            horizontalstickynavigation: !1,
            horizontalNavigationView: "view1",
            horizontalNavIsCentered: !1,
            horizontalNavigationMenuIcon: !0,
            layouttype: "light",
            verticalMenuplacement: "left",
            verticalMenulayout: "wide",
            collapseVerticalLeftHeader: !0,
            VerticalSubMenuItemIconStyle: "style6",
            VerticalNavigationView: "view1",
            verticalMenueffect: {
                desktop: "shrink",
                tablet: "push",
                phone: "overlay"
            },
            defaultVerticalMenu: {
                desktop: "expanded",
                tablet: "collapsed",
                phone: "offcanvas"
            },
            onToggleVerticalMenu: {
                desktop: "collapsed",
                tablet: "expanded",
                phone: "expanded"
            }
        },
        e = $.extend({}, a, e),
        o = {
            PcodedMenuInit: function() {
                o.Handlethemelayout(), o.HandleverticalMenuplacement(), o.HandlehorizontalMenuplacement(), o.HandleMenulayout(), o.HandleDeviceType(), o.Handlecomponetheight(), o.HandleMenuOnClick(), o.HandleMenuTrigger(), o.HandleSubMenuTrigger(), o.HandleActiveItem(), o.HandleOffcanvasMenu(), o.HandleVerticalLeftHeader(), o.HandleThemeBackground(), o.HandleActiveItemStyle(), o.HandleItemBorder(), o.HandleBorderStyle(), o.HandleSubItemBorder(), o.HandleDropDownIconStyle(), o.HandleOptionSelectorPanel(), o.HandleNavbarPosition(), o.HandleVerticalSubMenuItemIconStyle(), o.HandleVerticalNavigationView(), o.HandleHorizontalItemIsCentered(), o.HandleHorizontalItemAlignment(), o.HandleSubMenuOffset(), o.HandleHorizontalStickyNavigation(), o.HandleDocumentClickEvent(), o.HandleVerticalScrollbar(), o.HandleHorizontalMobileMenuToggle(), o.horizontalNavigationMenuIcon(), o.verticalNavigationSearchBar(), o.safariBrowsercompatibility(), o.Handlemenutype(), o.Handlelayoutvartype()
            },
            safariBrowsercompatibility: function() {
                is_chrome = navigator.userAgent.indexOf("Chrome") > -1, is_explorer = navigator.userAgent.indexOf("MSIE") > -1, is_firefox = navigator.userAgent.indexOf("Firefox") > -1, is_safari = navigator.userAgent.indexOf("Safari") > -1, is_opera = navigator.userAgent.indexOf("Presto") > -1, is_mac = -1 != navigator.userAgent.indexOf("Mac OS"), is_windows = !is_mac, is_chrome && is_safari && (is_safari = !1), is_safari || is_windows
            },
            verticalNavigationSearchBar: function() {
                "vertical" === e.themelayout && $(".searchbar-toggle").on("click", function() {
                    $(this).parent(".pcoded-search").toggleClass("open")
                })
            },
            horizontalNavigationMenuIcon: function() {
                if ("horizontal" === e.themelayout) switch (e.horizontalNavigationMenuIcon) {
                    case !1:
                        $("#" + t + ".pcoded .pcoded-navbar .pcoded-item > li > a .pcoded-micon").hide(), $("#" + t + ".pcoded .pcoded-navbar .pcoded-item.pcoded-search-item > li > a .pcoded-micon").show()
                }
            },
            HandleHorizontalMobileMenuToggle: function() {
                "horizontal" === e.themelayout && $("#mobile-collapse,#mobile-collapse1").on("click", function() {
                    $(".pcoded-navbar").toggleClass("show-menu")
                })
            },
            HandleVerticalScrollbar: function() {
                "vertical" === e.themelayout && (satnt = e.defaultVerticalMenu.desktop, "expanded" !== satnt && "compact" !== satnt || (mt = e.MenuTrigger, "click" === mt && $("#mobile-collapse,#mobile-collapse1").on('click', function(e) {
                    e.preventDefault();
                    var t = $(this);
                    rel = t.attr("rel"), el = $(".pcoded-navbar"), "collapsed" == $("#pcoded").attr("vertical-nav-type") ? ($(".main-menu").slimScroll({
                        destroy: !0
                    }), $(".main-menu").css("overflow", "visible")) : $(".main-menu").slimScroll({
                        setTop: "1px",
                        size: "5px",
                        wheelStep: 10,
                        alwaysVisible: !0,
                        allowPageScroll: !0,
                        height: "100%",
                        width: "100%"
                    })
                }), $(".main-menu").slimScroll({
                    setTop: "1px",
                    size: "5px",
                    wheelStep: 10,
                    alwaysVisible: !0,
                    allowPageScroll: !0,
                    height: "100%",
                    width: "100%"
                })))
            },
            HandleDocumentClickEvent: function() {
                ! function() {
                    $(document).on("click", function(e) {
                        var a = $(e.target),
                            o = $("#" + t).attr("pcoded-device-type"),
                            i = $("#" + t).attr("vertical-nav-type"),
                            d = $("#" + t).attr("theme-layout"),
                            n = $("#" + t + " .pcoded-item li");
                        a.parents(".pcoded-item").length || "phone" != o && "horizontal" != d && "expanded" != i && ($(".pcoded-submenu").slideUp(), setTimeout(function() {
                            n.removeClass("pcoded-trigger")
                        }, 400))
                    })
                }(),
                function() {
                    $(document).on("click", function(e) {
                        var a = $(e.target),
                            o = $("#" + t + " .pcoded-search");
                        a.parents(".pcoded-search").length || o.removeClass("open")
                    })
                }()
            },
            HandleHorizontalStickyNavigation: function() {
                switch (e.horizontalstickynavigation) {
                    case !0:
                        $(window).on("scroll", function() {
                            var e = $(this).scrollTop();
                            e >= 100 ? ($(".pcoded-navbar").addClass("stickybar"), $("stickybar").fadeIn(3e3)) : e <= 100 && ($(".pcoded-navbar").removeClass("stickybar"), $(".stickybar").fadeOut(3e3))
                        });
                        break;
                    case !1:
                        $(".pcoded-navbar").removeClass("stickybar")
                }
            },
            HandleSubMenuOffset: function() {
                switch (e.themelayout) {
                    case "horizontal":
                        "hover" === e.SubMenuTrigger ? $("li.pcoded-hasmenu").on("mouseenter mouseleave", function(e) {
                            if ($(".pcoded-submenu", this).length) {
                                var t = $(".pcoded-submenu:first", this),
                                    a = t.offset(),
                                    o = a.left,
                                    i = t.width();
                                $(window).height();
                                o + i <= $(window).width() ? $(this).removeClass("edge") : $(this).addClass("edge")
                            }
                        }) : $("li.pcoded-hasmenu").on("click", function(e) {
                            if (e.preventDefault(), $(".pcoded-submenu", this).length) {
                                var t = $(".pcoded-submenu:first", this),
                                    a = t.offset(),
                                    o = a.left,
                                    i = t.width();
                                $(window).height();
                                o + i <= $(window).width() || $(this).toggleClass("edge")
                            }
                        })
                }
            },
            HandleHorizontalItemIsCentered: function() {
                if ("horizontal" === e.themelayout) switch (e.horizontalNavIsCentered) {
                    case !0:
                        $("#" + t + " .pcoded-navbar").addClass("isCentered");
                        break;
                    case !1:
                        $("#" + t + " .pcoded-navbar").removeClass("isCentered")
                }
            },
            HandleHorizontalItemAlignment: function() {
                "horizontal" === e.themelayout && !1 === e.horizontalNavIsCentered && (function() {
                    var a = $("#" + t + ".pcoded .pcoded-navbar .pcoded-brand");
                    if (!0 === e.horizontalBrandItem) switch (e.horizontalBrandItemAlign) {
                        case "left":
                            a.removeClass("pcoded-right-align"), a.addClass("pcoded-left-align");
                            break;
                        case "right":
                            a.removeClass("pcoded-left-align"), a.addClass("pcoded-right-align")
                    } else a.hide()
                }(), function() {
                    var a = $("#" + t + ".pcoded .pcoded-navbar .pcoded-item.pcoded-left-item");
                    if (!0 === e.horizontalLeftNavItem) switch (e.horizontalLeftNavItemAlign) {
                        case "left":
                            a.removeClass("pcoded-right-align"), a.addClass("pcoded-left-align");
                            break;
                        case "right":
                            a.removeClass("pcoded-left-align"), a.addClass("pcoded-right-align")
                    } else a.hide()
                }(), function() {
                    var a = $("#" + t + ".pcoded .pcoded-navbar .pcoded-item.pcoded-right-item");
                    if (!0 === e.horizontalRightItem) switch (e.horizontalRightItemAlign) {
                        case "left":
                            a.removeClass("pcoded-right-align"), a.addClass("pcoded-left-align");
                            break;
                        case "right":
                            a.removeClass("pcoded-left-align"), a.addClass("pcoded-right-align")
                    } else a.hide()
                }(), function() {
                    var a = $("#" + t + ".pcoded .pcoded-navbar .pcoded-search-item");
                    if (!0 === e.horizontalSearchItem) switch (e.horizontalsearchItemAlign) {
                        case "left":
                            a.removeClass("pcoded-right-align"), a.addClass("pcoded-left-align");
                            break;
                        case "right":
                            a.removeClass("pcoded-left-align"), a.addClass("pcoded-right-align")
                    } else a.hide()
                }())
            },
            HandleVerticalNavigationView: function() {
                switch (e.themelayout) {
                    case "vertical":
                        var a = e.VerticalNavigationView;
                        $("#" + t + ".pcoded").attr("vnavigation-view", a);
                        break;
                    case "horizontal":
                        var a = e.horizontalNavigationView;
                        $("#" + t + ".pcoded").attr("hnavigation-view", a)
                }
            },
            HandleVerticalSubMenuItemIconStyle: function() {
                switch (e.themelayout) {
                    case "vertical":
                        var a = e.VerticalSubMenuItemIconStyle;
                        $("#" + t + " .pcoded-navbar .pcoded-hasmenu").attr("subitem-icon", a);
                        break;
                    case "horizontal":
                        $("#" + t + " .pcoded-navbar .pcoded-hasmenu").attr("subitem-icon", a)
                }
            },
            HandleNavbarPosition: function() {
                var a = e.FixedNavbarPosition,
                    o = e.FixedHeaderPosition;
                e.FixedRightHeaderPosition;
                switch (e.themelayout) {
                    case "vertical":
                    case "horizontal":
                        1 == a ? ($("#" + t + " .pcoded-navbar").attr("pcoded-navbar-position", "fixed"), $("#" + t + " .pcoded-header .pcoded-left-header").attr("pcoded-lheader-position", "fixed")) : ($("#" + t + " .pcoded-navbar").attr("pcoded-navbar-position", "absolute"), $("#" + t + " .pcoded-header .pcoded-left-header").attr("pcoded-lheader-position", "absolute")), 1 == o ? ($("#" + t + " .pcoded-header").attr("pcoded-header-position", "fixed"), $("#" + t + " .pcoded-main-container").css("margin-top", $(".pcoded-header").outerHeight())) : ($("#" + t + " .pcoded-header").attr("pcoded-header-position", "relative"), $("#" + t + " .pcoded-main-container").css("margin-top", "0px"))
                }
            },
            HandleOptionSelectorPanel: function() {
                $(".selector-toggle > a").on("click", function() {
                    $("#styleSelector").toggleClass("open")
                })
            },
            HandleDropDownIconStyle: function() {
                var a = e.DropDownIconStyle;
                switch (e.themelayout) {
                    case "vertical":
                    case "horizontal":
                        $("#" + t + " .pcoded-navbar .pcoded-hasmenu").attr("dropdown-icon", a)
                }
            },
            HandleSubItemBorder: function() {
                switch (e.SubItemBorder) {
                    case !0:
                        $("#" + t + " .pcoded-navbar .pcoded-item").attr("subitem-border", "true");
                        break;
                    case !1:
                        $("#" + t + " .pcoded-navbar .pcoded-item").attr("subitem-border", "false")
                }
            },
            HandleBorderStyle: function() {
                var a = e.ItemBorderStyle;
                switch (e.ItemBorder) {
                    case !0:
                        $("#" + t + " .pcoded-navbar .pcoded-item").attr("item-border-style", a);
                        break;
                    case !1:
                        $("#" + t + " .pcoded-navbar .pcoded-item").attr("item-border-style", "")
                }
            },
            HandleItemBorder: function() {
                switch (e.ItemBorder) {
                    case !0:
                        $("#" + t + " .pcoded-navbar .pcoded-item").attr("item-border", "true");
                        break;
                    case !1:
                        $("#" + t + " .pcoded-navbar .pcoded-item").attr("item-border", "false")
                }
            },
            HandleActiveItemStyle: function() {
                var a = e.ActiveItemStyle;
                void 0 != a && "" != a ? $("#" + t + " .pcoded-navbar").attr("active-item-style", a) : $("#" + t + " .pcoded-navbar").attr("active-item-style", "style0")
            },
            Handlemenutype: function() {
                var a = e.menutype,
                    o = e.freamtype;
                void 0 != a && "" != a ? $("#" + t).attr("nav-type", a) : $("#" + t).attr("nav-type", "st1"), void 0 != o && "" != o ? $("#" + t).attr("fream-type", o) : $("#" + t).attr("fream-type", "theme1")
            },
            Handlelayoutvartype: function() {
                var a = e.layouttype;
                void 0 != a && "" != a ? $("#" + t).attr("layout-type", a) : $("#" + t).attr("layout-type", "light")
            },
            HandleThemeBackground: function() {
                ! function() {
                    var t = e.ThemeBackgroundPattern;
                    void 0 != t && "" != t ? $("body").attr("themebg-pattern", t) : $("body").attr("themebg-pattern", "theme1")
                }(),
                function() {
                    var a = e.HeaderBackground,
                        o = e.LogoTheme;
                    void 0 != a && "" != a ? $("#" + t + " .pcoded-header").attr("header-theme", a) : $("#" + t + " .pcoded-header").attr("header-theme", "theme1"), void 0 != o && "" != o ? $("#" + t + " .navbar-logo").attr("logo-theme", o) : $("#" + t + " .navbar-logo").attr("logo-theme", "theme1")
                }(),
                function() {
                    var a = e.LHeaderBackground;
                    void 0 != a && "" != a ? $("#" + t + " .pcoded-navigation-label").attr("menu-title-theme", a) : $("#" + t + " .pcoded-navigation-label").attr("menu-title-theme", "theme4")
                }(),
                function() {
                    var a = e.NavbarBackground;
                    void 0 != a && "" != a ? $("#" + t + " .pcoded-navbar").attr("navbar-theme", a) : $("#" + t + " .pcoded-navbar").attr("navbar-theme", "theme1")
                }(),
                function() {
                    var a = e.ActiveItemBackground;
                    void 0 != a && "" != a ? $("#" + t + " .pcoded-navbar").attr("active-item-theme", a) : $("#" + t + " .pcoded-navbar").attr("active-item-theme", "theme1")
                }(),
                function() {
                    var a = e.SubItemBackground;
                    void 0 != a && "" != a ? $("#" + t + " .pcoded-navbar").attr("sub-item-theme", a) : $("#" + t + " .pcoded-navbar").attr("sub-item-theme", "theme1")
                }()
            },
            HandleVerticalLeftHeader: function() {
                if ("vertical" !== e.themelayout) return !1;
                switch (e.collapseVerticalLeftHeader) {
                    case !0:
                        $("#" + t + " .pcoded-header").addClass("iscollapsed"), $("#" + t + " .pcoded-header").removeClass("nocollapsed"), $("#" + t + ".pcoded").addClass("iscollapsed"), $("#" + t + ".pcoded").removeClass("nocollapsed");
                        break;
                    case !1:
                        $("#" + t + " .pcoded-header").removeClass("iscollapsed"), $("#" + t + " .pcoded-header").addClass("nocollapsed"), $("#" + t + ".pcoded").removeClass("iscollapsed"), $("#" + t + ".pcoded").addClass("nocollapsed")
                }
            },
            HandleOffcanvasMenu: function() {
                if ("vertical" === e.themelayout) {
                    "offcanvas" == $("#" + t).attr("vertical-nav-type") && $("#" + t).attr("vertical-layout", "wide")
                }
            },
            HandleActiveItem: function() {},
            HandleSubMenuTrigger: function() {
                function a(e) {

                    if("hover" == e) {

                        i.on('mouseenter', function() {
                            $(this).addClass("pcoded-trigger");
                        });
                        i.on('mouseleave', function() {
                            $(this).removeClass("pcoded-trigger");
                        });
                    }

                    if("click" == e) {

                        i.on('click', function() {
                            $(this).addClass("pcoded-trigger");
                        });
                        i.off('click', function() {
                            $(this).removeClass("pcoded-trigger");
                        });
                    }


            
                }
                switch (e.SubMenuTrigger) {
                    case "hover":
                        $("#" + t + " .pcoded-navbar .pcoded-hasmenu").addClass("is-hover");
                        var o = $(window),
                            i = $(".pcoded-submenu > li"),
                            d = o.width(),
                            n = "";
                        a(d >= 992 ? "hover" : "click"), o.resize(function() {
                            var e = o.width();
                            d != e && (e >= 992 && "hover" != n ? a("hover") : e < 992 && "click" != n && a("click"), d = e)
                        });
                        break;
                    case "click":
                        $("#" + t + " .pcoded-navbar .pcoded-hasmenu").removeClass("is-hover"), $(".pcoded-submenu > li").on("click", function(e) {
                            e.stopPropagation(), 0 === $(this).closest(".pcoded-submenu").length ? $(this).hasClass("pcoded-trigger") ? ($(this).removeClass("pcoded-trigger"), $(this).children(".pcoded-submenu").slideUp()) : ($(".pcoded-hasmenu li.pcoded-trigger").children(".pcoded-submenu").slideUp(), $(this).closest(".pcoded-inner-navbar").find("li.pcoded-trigger").removeClass("pcoded-trigger"), $(this).addClass("pcoded-trigger"), $(this).children(".pcoded-submenu").slideDown()) : $(this).hasClass("pcoded-trigger") ? ($(this).removeClass("pcoded-trigger"), $(this).children(".pcoded-submenu").slideUp()) : ($(".pcoded-hasmenu li.pcoded-trigger").children(".pcoded-submenu").slideUp(), $(this).closest(".pcoded-submenu").find("li.pcoded-trigger").removeClass("pcoded-trigger"), $(this).addClass("pcoded-trigger"), $(this).children(".pcoded-submenu").slideDown())
                        })
                }
            },
            HandleMenuTrigger: function() {
                function a(e) {
                   
                    if("hover" == e) {

                        i.on('mouseenter', function() {
                            $(this).addClass("pcoded-trigger");
                        });
                        i.on('mouseleave', function() {
                            $(this).removeClass("pcoded-trigger");
                        });
                    }

                    if("click" == e) {

                        i.on('click', function() {
                            $(this).addClass("pcoded-trigger");
                        });
                        i.off('click', function() {
                            $(this).removeClass("pcoded-trigger");
                        });
                    }

            
                }


                switch (e.MenuTrigger) {
                    case "hover":
                        $("#" + t + " .pcoded-navbar").addClass("is-hover");
                        var o = $(window),
                            i = $(".pcoded-item > li"),
                            d = o.width(),
                            n = "";
                        a(d >= 992 ? "hover" : "click"), o.resize(function() {
                            var e = o.width();
                            d != e && (e >= 992 && "hover" != n ? a("hover") : e < 992 && "click" != n && a("click"), d = e)
                        });
                        break;
                    case "click":
                        $("#" + t + " .pcoded-navbar").removeClass("is-hover"), $(".pcoded-item > li ").on("click", function() {
                            $(this).hasClass("pcoded-trigger") ? ($(this).removeClass("pcoded-trigger"), $(this).children(".pcoded-submenu").slideUp()) : ($("li.pcoded-trigger").children(".pcoded-submenu").slideUp(), $(this).closest(".pcoded-inner-navbar").find("li.pcoded-trigger").removeClass("pcoded-trigger"), $(this).addClass("pcoded-trigger"), $(this).children(".pcoded-submenu").slideDown())
                        })
                }
            },
            HandleMenuOnClick: function() {
                var a = $(window)[0].innerWidth;
                "vertical" === e.themelayout ? $("#mobile-collapse,#mobile-collapse1,.sidebar_toggle a, .pcoded-overlay-box,.menu-toggle a").on("click", function() {
                    $(this).parent().find(".menu-icon").toggleClass("is-clicked");
                    var a = $("#" + t).attr("pcoded-device-type");
                    if ("desktop" == a) {
                        var o = e.onToggleVerticalMenu.desktop,
                            i = e.defaultVerticalMenu.desktop,
                            d = $("#" + t).attr("vertical-nav-type");
                        if (d == i) $("#" + t).attr("vertical-nav-type", o);
                        else {
                            if (d != o) return !1;
                            $("#" + t).attr("vertical-nav-type", i)
                        }
                    } else if ("tablet" == a) {
                        var n = e.onToggleVerticalMenu.tablet,
                            r = e.defaultVerticalMenu.tablet,
                            c = $("#" + t).attr("vertical-nav-type");
                        c == r ? $("#" + t).attr("vertical-nav-type", n) : d == o && $("#" + t).attr("vertical-nav-type", r)
                    } else if ("phone" == a) {
                        var l = e.onToggleVerticalMenu.phone,
                            s = e.defaultVerticalMenu.phone,
                            p = $("#" + t).attr("vertical-nav-type");
                        p == s ? $("#" + t).attr("vertical-nav-type", l) : d == o && $("#" + t).attr("vertical-nav-type", s)
                    }
                    $(".pcoded").addClass("pcoded-toggle-animate"), setTimeout(function() {
                        $(".pcoded").removeClass("pcoded-toggle-animate")
                    }, 500)
                }) : "horizontal" === e.themelayout && (a >= 768 && a <= 992 ? $("#" + t).attr("pcoded-device-type", "tablet") : a < 768 ? $("#" + t).attr("pcoded-device-type", "phone") : $("#" + t).attr("pcoded-device-type", "desktop"))
            },
            Handlecomponetheight: function() {
                function e() {
                    $(window).height(), $(".pcoded-header").innerHeight(), $(".pcoded-navbar").innerHeight(), $(".pcoded-footer").innerHeight()
                }
                e(), $(window).resize(function() {
                    e()
                })
            },
            HandleDeviceType: function() {
                function a() {
                    var a = $(window)[0].innerWidth;
                    if ("vertical" === e.themelayout)
                        if (a >= 768 && a <= 992) {
                            $("#" + t).attr("pcoded-device-type", "tablet");
                            var o = e.defaultVerticalMenu.tablet;
                            void 0 != o && "" != o ? $("#" + t).attr("vertical-nav-type", o) : $("#" + t).attr("vertical-nav-type", "collapsed");
                            var i = e.verticalMenueffect.tablet;
                            void 0 != i && "" != o ? $("#" + t).attr("vertical-effect", i) : $("#" + t).attr("vertical-effect", "shrink")
                        } else if (a < 768) {
                        $("#" + t).attr("pcoded-device-type", "phone");
                        var o = e.defaultVerticalMenu.phone;
                        void 0 != o && "" != o ? $("#" + t).attr("vertical-nav-type", o) : $("#" + t).attr("vertical-nav-type", "offcanvas");
                        var i = e.verticalMenueffect.phone;
                        void 0 != i && "" != o ? $("#" + t).attr("vertical-effect", i) : $("#" + t).attr("vertical-effect", "push")
                    } else {
                        $("#" + t).attr("pcoded-device-type", "desktop");
                        var o = e.defaultVerticalMenu.desktop;
                        void 0 != o && "" != o ? $("#" + t).attr("vertical-nav-type", o) : $("#" + t).attr("vertical-nav-type", "expanded");
                        var i = e.verticalMenueffect.desktop;
                        void 0 != i && "" != o ? $("#" + t).attr("vertical-effect", i) : $("#" + t).attr("vertical-effect", "shrink")
                    } else "horizontal" === e.themelayout && (a >= 768 && a <= 992 ? $("#" + t).attr("pcoded-device-type", "tablet") : a < 768 ? $("#" + t).attr("pcoded-device-type", "phone") : $("#" + t).attr("pcoded-device-type", "desktop"))
                }
                a(), $(window).resize(function() {
                    tw = $(window)[0].innerWidth, dt = $("#" + t).attr("pcoded-device-type"), "desktop" == dt && tw < 992 ? a() : "phone" == dt && tw > 768 ? a() : "tablet" == dt && tw < 768 ? a() : "tablet" == dt && tw > 992 && a()
                })
            },
            HandleMenulayout: function() {
                if ("vertical" === e.themelayout) switch (e.verticalMenulayout) {
                    case "wide":
                        $("#" + t).attr("vertical-layout", "wide");
                        break;
                    case "box":
                        $("#" + t).attr("vertical-layout", "box");
                        break;
                    case "widebox":
                        $("#" + t).attr("vertical-layout", "widebox")
                } else {
                    if ("horizontal" !== e.themelayout) return !1;
                    switch (e.horizontalMenulayout) {
                        case "wide":
                            $("#" + t).attr("horizontal-layout", "wide");
                            break;
                        case "box":
                            $("#" + t).attr("horizontal-layout", "box");
                            break;
                        case "widebox":
                            $("#" + t).attr("horizontal-layout", "widebox")
                    }
                }
            },
            HandlehorizontalMenuplacement: function() {
                if ("horizontal" === e.themelayout) switch (e.horizontalMenuplacement) {
                    case "bottom":
                        $("#" + t).attr("horizontal-placement", "bottom");
                        break;
                    case "top":
                        $("#" + t).attr("horizontal-placement", "top")
                } else $("#" + t).removeAttr("horizontal-placement")
            },
            HandleverticalMenuplacement: function() {
                if ("vertical" === e.themelayout) switch (e.verticalMenuplacement) {
                    case "left":
                        $("#" + t).attr("vertical-placement", "left");
                        break;
                    case "right":
                        $("#" + t).attr("vertical-placement", "right")
                } else $("#" + t).removeAttr("vertical-placement")
            },
            Handlethemelayout: function() {
                switch (e.themelayout) {
                    case "horizontal":
                        $("#" + t).attr("theme-layout", "horizontal");
                        break;
                    case "vertical":
                        $("#" + t).attr("theme-layout", "vertical")
                }
            }
        };
    o.PcodedMenuInit()
}, $(window).scroll(function() {
    $(this).scrollTop() > 70 ? ($('.pcoded[theme-layout="vertical"] .pcoded-navbar[pcoded-navbar-position="fixed"][pcoded-header-position="relative"]').css("position", "fixed"), $('.pcoded[theme-layout="vertical"] .pcoded-navbar[pcoded-navbar-position="fixed"][pcoded-header-position="relative"]').css("top", 0), $('.pcoded[theme-layout="vertical"] .pcoded-navbar[pcoded-navbar-position="fixed"][pcoded-header-position="relative"]').css("height", "100%"), $('.pcoded[theme-layout="vertical"] .pcoded-navbar[pcoded-navbar-position="fixed"][pcoded-header-position="relative"] .nav-list').css("height", "100%")) : ($('.pcoded[theme-layout="vertical"] .pcoded-navbar[pcoded-navbar-position="fixed"][pcoded-header-position="relative"]').css("position", "absolute"), $('.pcoded[theme-layout="vertical"] .pcoded-navbar[pcoded-navbar-position="fixed"][pcoded-header-position="relative"]').css("top", "auto"))
}), $(window).scroll(function() {
    $(this).scrollTop() > 70 ? ($('.pcoded[theme-layout="horizontal"][pcoded-device-type="desktop"] .pcoded-navbar[pcoded-navbar-position="fixed"][pcoded-header-position="relative"]').css("position", "fixed"), $('.pcoded[theme-layout="horizontal"][pcoded-device-type="desktop"] .pcoded-navbar[pcoded-navbar-position="fixed"][pcoded-header-position="relative"]').css("top", 0)) : ($('.pcoded[theme-layout="horizontal"][pcoded-device-type="desktop"] .pcoded-navbar[pcoded-navbar-position="fixed"][pcoded-header-position="relative"]').css("position", "absolute"), $('.pcoded[theme-layout="horizontal"][pcoded-device-type="desktop"] .pcoded-navbar[pcoded-navbar-position="fixed"][pcoded-header-position="relative"]').css("top", "auto"))
}), $(window).on("load", function() {


  
        $('.pcoded[vertical-nav-type="collapsed"] .pcoded-navbar').on('mouseenter', function() {
            $(".pcoded").attr("vertical-nav-type", "expanded");
        });
        $('.pcoded[vertical-nav-type="collapsed"] .pcoded-navbar').on('mouseleave', function() {
            $(".pcoded").attr("vertical-nav-type", "collapsed");
        });
    



});