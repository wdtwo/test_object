/*!
 * Font Awesome Icon Picker
 * https://farbelous.github.io/fontawesome-iconpicker/
 *
 * @author Javi Aguilar, itsjavi.com
 * @license MIT License
 * @see https://github.com/farbelous/fontawesome-iconpicker/blob/master/LICENSE
 */


(function(e) {
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], e);
    } else {
        e(jQuery);
    }
})(function(j) {
    j.ui = j.ui || {};
    var e = j.ui.version = "1.12.1";
    (function() {
        var r, y = Math.max, x = Math.abs, s = /left|center|right/, i = /top|center|bottom/, f = /[\+\-]\d+(\.[\d]+)?%?/, l = /^\w+/, c = /%$/, a = j.fn.pos;
        function q(e, a, t) {
            return [ parseFloat(e[0]) * (c.test(e[0]) ? a / 100 : 1), parseFloat(e[1]) * (c.test(e[1]) ? t / 100 : 1) ];
        }
        function C(e, a) {
            return parseInt(j.css(e, a), 10) || 0;
        }
        function t(e) {
            var a = e[0];
            if (a.nodeType === 9) {
                return {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                };
            }
            if (j.isWindow(a)) {
                return {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: e.scrollTop(),
                        left: e.scrollLeft()
                    }
                };
            }
            if (a.preventDefault) {
                return {
                    width: 0,
                    height: 0,
                    offset: {
                        top: a.pageY,
                        left: a.pageX
                    }
                };
            }
            return {
                width: e.outerWidth(),
                height: e.outerHeight(),
                offset: e.offset()
            };
        }
        j.pos = {
            scrollbarWidth: function() {
                if (r !== undefined) {
                    return r;
                }
                var e, a, t = j("<div " + "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" + "<div style='height:100px;width:auto;'></div></div>"), s = t.children()[0];
                j("body").append(t);
                e = s.offsetWidth;
                t.css("overflow", "scroll");
                a = s.offsetWidth;
                if (e === a) {
                    a = t[0].clientWidth;
                }
                t.remove();
                return r = e - a;
            },
            getScrollInfo: function(e) {
                var a = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"), t = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"), s = a === "scroll" || a === "auto" && e.width < e.element[0].scrollWidth, r = t === "scroll" || t === "auto" && e.height < e.element[0].scrollHeight;
                return {
                    width: r ? j.pos.scrollbarWidth() : 0,
                    height: s ? j.pos.scrollbarWidth() : 0
                };
            },
            getWithinInfo: function(e) {
                var a = j(e || window), t = j.isWindow(a[0]), s = !!a[0] && a[0].nodeType === 9, r = !t && !s;
                return {
                    element: a,
                    isWindow: t,
                    isDocument: s,
                    offset: r ? j(e).offset() : {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: a.scrollLeft(),
                    scrollTop: a.scrollTop(),
                    width: a.outerWidth(),
                    height: a.outerHeight()
                };
            }
        };
        j.fn.pos = function(h) {
            if (!h || !h.of) {
                return a.apply(this, arguments);
            }
            h = j.extend({}, h);
            var m, p, d, u, T, e, g = j(h.of), b = j.pos.getWithinInfo(h.within), k = j.pos.getScrollInfo(b), w = (h.collision || "flip").split(" "), v = {};
            e = t(g);
            if (g[0].preventDefault) {
                h.at = "left top";
            }
            p = e.width;
            d = e.height;
            u = e.offset;
            T = j.extend({}, u);
            j.each([ "my", "at" ], function() {
                var e = (h[this] || "").split(" "), a, t;
                if (e.length === 1) {
                    e = s.test(e[0]) ? e.concat([ "center" ]) : i.test(e[0]) ? [ "center" ].concat(e) : [ "center", "center" ];
                }
                e[0] = s.test(e[0]) ? e[0] : "center";
                e[1] = i.test(e[1]) ? e[1] : "center";
                a = f.exec(e[0]);
                t = f.exec(e[1]);
                v[this] = [ a ? a[0] : 0, t ? t[0] : 0 ];
                h[this] = [ l.exec(e[0])[0], l.exec(e[1])[0] ];
            });
            if (w.length === 1) {
                w[1] = w[0];
            }
            if (h.at[0] === "right") {
                T.left += p;
            } else if (h.at[0] === "center") {
                T.left += p / 2;
            }
            if (h.at[1] === "bottom") {
                T.top += d;
            } else if (h.at[1] === "center") {
                T.top += d / 2;
            }
            m = q(v.at, p, d);
            T.left += m[0];
            T.top += m[1];
            return this.each(function() {
                var t, e, f = j(this), l = f.outerWidth(), c = f.outerHeight(), a = C(this, "marginLeft"), s = C(this, "marginTop"), r = l + a + C(this, "marginRight") + k.width, i = c + s + C(this, "marginBottom") + k.height, o = j.extend({}, T), n = q(v.my, f.outerWidth(), f.outerHeight());
                if (h.my[0] === "right") {
                    o.left -= l;
                } else if (h.my[0] === "center") {
                    o.left -= l / 2;
                }
                if (h.my[1] === "bottom") {
                    o.top -= c;
                } else if (h.my[1] === "center") {
                    o.top -= c / 2;
                }
                o.left += n[0];
                o.top += n[1];
                t = {
                    marginLeft: a,
                    marginTop: s
                };
                j.each([ "left", "top" ], function(e, a) {
                    if (j.ui.pos[w[e]]) {
                        j.ui.pos[w[e]][a](o, {
                            targetWidth: p,
                            targetHeight: d,
                            elemWidth: l,
                            elemHeight: c,
                            collisionPosition: t,
                            collisionWidth: r,
                            collisionHeight: i,
                            offset: [ m[0] + n[0], m[1] + n[1] ],
                            my: h.my,
                            at: h.at,
                            within: b,
                            elem: f
                        });
                    }
                });
                if (h.using) {
                    e = function(e) {
                        var a = u.left - o.left, t = a + p - l, s = u.top - o.top, r = s + d - c, i = {
                            target: {
                                element: g,
                                left: u.left,
                                top: u.top,
                                width: p,
                                height: d
                            },
                            element: {
                                element: f,
                                left: o.left,
                                top: o.top,
                                width: l,
                                height: c
                            },
                            horizontal: t < 0 ? "left" : a > 0 ? "right" : "center",
                            vertical: r < 0 ? "top" : s > 0 ? "bottom" : "middle"
                        };
                        if (p < l && x(a + t) < p) {
                            i.horizontal = "center";
                        }
                        if (d < c && x(s + r) < d) {
                            i.vertical = "middle";
                        }
                        if (y(x(a), x(t)) > y(x(s), x(r))) {
                            i.important = "horizontal";
                        } else {
                            i.important = "vertical";
                        }
                        h.using.call(this, e, i);
                    };
                }
                f.offset(j.extend(o, {
                    using: e
                }));
            });
        };
        j.ui.pos = {
            _trigger: function(e, a, t, s) {
                if (a.elem) {
                    a.elem.trigger({
                        type: t,
                        position: e,
                        positionData: a,
                        triggered: s
                    });
                }
            },
            fit: {
                left: function(e, a) {
                    j.ui.pos._trigger(e, a, "posCollide", "fitLeft");
                    var t = a.within, s = t.isWindow ? t.scrollLeft : t.offset.left, r = t.width, i = e.left - a.collisionPosition.marginLeft, f = s - i, l = i + a.collisionWidth - r - s, c;
                    if (a.collisionWidth > r) {
                        if (f > 0 && l <= 0) {
                            c = e.left + f + a.collisionWidth - r - s;
                            e.left += f - c;
                        } else if (l > 0 && f <= 0) {
                            e.left = s;
                        } else {
                            if (f > l) {
                                e.left = s + r - a.collisionWidth;
                            } else {
                                e.left = s;
                            }
                        }
                    } else if (f > 0) {
                        e.left += f;
                    } else if (l > 0) {
                        e.left -= l;
                    } else {
                        e.left = y(e.left - i, e.left);
                    }
                    j.ui.pos._trigger(e, a, "posCollided", "fitLeft");
                },
                top: function(e, a) {
                    j.ui.pos._trigger(e, a, "posCollide", "fitTop");
                    var t = a.within, s = t.isWindow ? t.scrollTop : t.offset.top, r = a.within.height, i = e.top - a.collisionPosition.marginTop, f = s - i, l = i + a.collisionHeight - r - s, c;
                    if (a.collisionHeight > r) {
                        if (f > 0 && l <= 0) {
                            c = e.top + f + a.collisionHeight - r - s;
                            e.top += f - c;
                        } else if (l > 0 && f <= 0) {
                            e.top = s;
                        } else {
                            if (f > l) {
                                e.top = s + r - a.collisionHeight;
                            } else {
                                e.top = s;
                            }
                        }
                    } else if (f > 0) {
                        e.top += f;
                    } else if (l > 0) {
                        e.top -= l;
                    } else {
                        e.top = y(e.top - i, e.top);
                    }
                    j.ui.pos._trigger(e, a, "posCollided", "fitTop");
                }
            },
            flip: {
                left: function(e, a) {
                    j.ui.pos._trigger(e, a, "posCollide", "flipLeft");
                    var t = a.within, s = t.offset.left + t.scrollLeft, r = t.width, i = t.isWindow ? t.scrollLeft : t.offset.left, f = e.left - a.collisionPosition.marginLeft, l = f - i, c = f + a.collisionWidth - r - i, o = a.my[0] === "left" ? -a.elemWidth : a.my[0] === "right" ? a.elemWidth : 0, n = a.at[0] === "left" ? a.targetWidth : a.at[0] === "right" ? -a.targetWidth : 0, h = -2 * a.offset[0], m, p;
                    if (l < 0) {
                        m = e.left + o + n + h + a.collisionWidth - r - s;
                        if (m < 0 || m < x(l)) {
                            e.left += o + n + h;
                        }
                    } else if (c > 0) {
                        p = e.left - a.collisionPosition.marginLeft + o + n + h - i;
                        if (p > 0 || x(p) < c) {
                            e.left += o + n + h;
                        }
                    }
                    j.ui.pos._trigger(e, a, "posCollided", "flipLeft");
                },
                top: function(e, a) {
                    j.ui.pos._trigger(e, a, "posCollide", "flipTop");
                    var t = a.within, s = t.offset.top + t.scrollTop, r = t.height, i = t.isWindow ? t.scrollTop : t.offset.top, f = e.top - a.collisionPosition.marginTop, l = f - i, c = f + a.collisionHeight - r - i, o = a.my[1] === "top", n = o ? -a.elemHeight : a.my[1] === "bottom" ? a.elemHeight : 0, h = a.at[1] === "top" ? a.targetHeight : a.at[1] === "bottom" ? -a.targetHeight : 0, m = -2 * a.offset[1], p, d;
                    if (l < 0) {
                        d = e.top + n + h + m + a.collisionHeight - r - s;
                        if (d < 0 || d < x(l)) {
                            e.top += n + h + m;
                        }
                    } else if (c > 0) {
                        p = e.top - a.collisionPosition.marginTop + n + h + m - i;
                        if (p > 0 || x(p) < c) {
                            e.top += n + h + m;
                        }
                    }
                    j.ui.pos._trigger(e, a, "posCollided", "flipTop");
                }
            },
            flipfit: {
                left: function() {
                    j.ui.pos.flip.left.apply(this, arguments);
                    j.ui.pos.fit.left.apply(this, arguments);
                },
                top: function() {
                    j.ui.pos.flip.top.apply(this, arguments);
                    j.ui.pos.fit.top.apply(this, arguments);
                }
            }
        };
        (function() {
            var e, a, t, s, r, i = document.getElementsByTagName("body")[0], f = document.createElement("div");
            e = document.createElement(i ? "div" : "body");
            t = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            };
            if (i) {
                j.extend(t, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                });
            }
            for (r in t) {
                e.style[r] = t[r];
            }
            e.appendChild(f);
            a = i || document.documentElement;
            a.insertBefore(e, a.firstChild);
            f.style.cssText = "position: absolute; left: 10.7432222px;";
            s = j(f).offset().left;
            j.support.offsetFractions = s > 10 && s < 11;
            e.innerHTML = "";
            a.removeChild(e);
        })();
    })();
    var a = j.ui.position;
});

(function(e) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], e);
    } else if (window.jQuery && !window.jQuery.fn.iconpicker) {
        e(window.jQuery);
    }
})(function(c) {
    "use strict";
    var f = {
        isEmpty: function(e) {
            return e === false || e === "" || e === null || e === undefined;
        },
        isEmptyObject: function(e) {
            return this.isEmpty(e) === true || e.length === 0;
        },
        isElement: function(e) {
            return c(e).length > 0;
        },
        isString: function(e) {
            return typeof e === "string" || e instanceof String;
        },
        isArray: function(e) {
            return c.isArray(e);
        },
        inArray: function(e, a) {
            return c.inArray(e, a) !== -1;
        },
        throwError: function(e) {
            throw "Font Awesome Icon Picker Exception: " + e;
        }
    };
    var t = function(e, a) {
        this._id = t._idCounter++;
        this.element = c(e).addClass("iconpicker-element");
        this._trigger("iconpickerCreate", {
            iconpickerValue: this.iconpickerValue
        });
        this.options = c.extend({}, t.defaultOptions, this.element.data(), a);
        this.options.templates = c.extend({}, t.defaultOptions.templates, this.options.templates);
        this.options.originalPlacement = this.options.placement;
        this.container = f.isElement(this.options.container) ? c(this.options.container) : false;
        if (this.container === false) {
            if (this.element.is(".dropdown-toggle")) {
                this.container = c("~ .dropdown-menu:first", this.element);
            } else {
                this.container = this.element.is("input,textarea,button,.btn") ? this.element.parent() : this.element;
            }
        }
        this.container.addClass("iconpicker-container");
        if (this.isDropdownMenu()) {
            this.options.placement = "inline";
        }
        this.input = this.element.is("input,textarea") ? this.element.addClass("iconpicker-input") : false;
        if (this.input === false) {
            this.input = this.container.find(this.options.input);
            if (!this.input.is("input,textarea")) {
                this.input = false;
            }
        }
        this.component = this.isDropdownMenu() ? this.container.parent().find(this.options.component) : this.container.find(this.options.component);
        if (this.component.length === 0) {
            this.component = false;
        } else {
            this.component.find("i").addClass("iconpicker-component");
        }
        this._createPopover();
        this._createIconpicker();
        if (this.getAcceptButton().length === 0) {
            this.options.mustAccept = false;
        }
        if (this.isInputGroup()) {
            this.container.parent().append(this.popover);
        } else {
            this.container.append(this.popover);
        }
        this._bindElementEvents();
        this._bindWindowEvents();
        this.update(this.options.selected);
        if (this.isInline()) {
            this.show();
        }
        this._trigger("iconpickerCreated", {
            iconpickerValue: this.iconpickerValue
        });
    };
    t._idCounter = 0;
    t.defaultOptions = {
        title: false,
        selected: false,
        defaultValue: false,
        placement: "bottom",
        collision: "none",
        animation: true,
        hideOnSelect: false,
        showFooter: false,
        searchInFooter: false,
        mustAccept: false,
        selectedCustomClass: "bg-primary",
        icons: [],
        fullClassFormatter: function(e) {
            return e;
        },
        input: "input,.iconpicker-input",
        inputSearch: false,
        container: false,
        component: ".input-group-addon,.iconpicker-component",
        templates: {
            popover: '<div class="iconpicker-popover popover"><div class="arrow"></div>' + '<div class="popover-title"></div><div class="popover-content"></div></div>',
            footer: '<div class="popover-footer"></div>',
            buttons: '<button class="iconpicker-btn iconpicker-btn-cancel btn btn-default btn-sm">Cancel</button>' + ' <button class="iconpicker-btn iconpicker-btn-accept btn btn-primary btn-sm">Accept</button>',
            search: '<input type="search" class="form-control iconpicker-search" placeholder="Type to filter" />',
            iconpicker: '<div class="iconpicker"><div class="iconpicker-items"></div></div>',
            iconpickerItem: '<a role="button" href="javascript:;" class="iconpicker-item"><i></i></a>'
        }
    };
    t.batch = function(e, a) {
        var t = Array.prototype.slice.call(arguments, 2);
        return c(e).each(function() {
            var e = c(this).data("iconpicker");
            if (!!e) {
                e[a].apply(e, t);
            }
        });
    };
    t.prototype = {
        constructor: t,
        options: {},
        _id: 0,
        _trigger: function(e, a) {
            a = a || {};
            this.element.trigger(c.extend({
                type: e,
                iconpickerInstance: this
            }, a));
        },
        _createPopover: function() {
            this.popover = c(this.options.templates.popover);
            var e = this.popover.find(".popover-title");
            if (!!this.options.title) {
                e.append(c('<div class="popover-title-text">' + this.options.title + "</div>"));
            }
            if (this.hasSeparatedSearchInput() && !this.options.searchInFooter) {
                e.append(this.options.templates.search);
            } else if (!this.options.title) {
                e.remove();
            }
            if (this.options.showFooter && !f.isEmpty(this.options.templates.footer)) {
                var a = c(this.options.templates.footer);
                if (this.hasSeparatedSearchInput() && this.options.searchInFooter) {
                    a.append(c(this.options.templates.search));
                }
                if (!f.isEmpty(this.options.templates.buttons)) {
                    a.append(c(this.options.templates.buttons));
                }
                this.popover.append(a);
            }
            if (this.options.animation === true) {
                this.popover.addClass("fade");
            }
            return this.popover;
        },
        _createIconpicker: function() {
            var t = this;
            this.iconpicker = c(this.options.templates.iconpicker);
            var e = function(e) {
                var a = c(this);
                if (a.is("i")) {
                    a = a.parent();
                }
                t._trigger("iconpickerSelect", {
                    iconpickerItem: a,
                    iconpickerValue: t.iconpickerValue
                });
                if (t.options.mustAccept === false) {
                    t.update(a.data("iconpickerValue"));
                    t._trigger("iconpickerSelected", {
                        iconpickerItem: this,
                        iconpickerValue: t.iconpickerValue
                    });
                } else {
                    t.update(a.data("iconpickerValue"), true);
                }
                if (t.options.hideOnSelect && t.options.mustAccept === false) {
                    t.hide();
                }
            };
            var a = c(this.options.templates.iconpickerItem);
            var s = [];
            for (var r in this.options.icons) {
                if (typeof this.options.icons[r].title === "string") {
                    var i = a.clone();
                    i.find("i").addClass(this.options.fullClassFormatter(this.options.icons[r].title));
                    i.data("iconpickerValue", this.options.icons[r].title).on("click.iconpicker", e);
                    i.attr("title", "." + this.options.icons[r].title);
                    if (this.options.icons[r].searchTerms.length > 0) {
                        var f = "";
                        for (var l = 0; l < this.options.icons[r].searchTerms.length; l++) {
                            f = f + this.options.icons[r].searchTerms[l] + " ";
                        }
                        i.attr("data-search-terms", f);
                    }
                    s.push(i);
                }
            }
            this.iconpicker.find(".iconpicker-items").append(s);
            this.popover.find(".popover-content").append(this.iconpicker);
            return this.iconpicker;
        },
        _isEventInsideIconpicker: function(e) {
            var a = c(e.target);
            if ((!a.hasClass("iconpicker-element") || a.hasClass("iconpicker-element") && !a.is(this.element)) && a.parents(".iconpicker-popover").length === 0) {
                return false;
            }
            return true;
        },
        _bindElementEvents: function() {
            var a = this;
            this.getSearchInput().on("keyup.iconpicker", function() {
                a.filter(c(this).val().toLowerCase());
            });
            this.getAcceptButton().on("click.iconpicker", function() {
                var e = a.iconpicker.find(".iconpicker-selected").get(0);
                a.update(a.iconpickerValue);
                a._trigger("iconpickerSelected", {
                    iconpickerItem: e,
                    iconpickerValue: a.iconpickerValue
                });
                if (!a.isInline()) {
                    a.hide();
                }
            });
            this.getCancelButton().on("click.iconpicker", function() {
                if (!a.isInline()) {
                    a.hide();
                }
            });
            this.element.on("focus.iconpicker", function(e) {
                a.show();
                e.stopPropagation();
            });
            if (this.hasComponent()) {
                this.component.on("click.iconpicker", function() {
                    a.toggle();
                });
            }
            if (this.hasInput()) {
                this.input.on("keyup.iconpicker", function(e) {
                    if (!f.inArray(e.keyCode, [ 38, 40, 37, 39, 16, 17, 18, 9, 8, 91, 93, 20, 46, 186, 190, 46, 78, 188, 44, 86 ])) {
                        a.update();
                    } else {
                        a._updateFormGroupStatus(a.getValid(this.value) !== false);
                    }
                    if (a.options.inputSearch === true) {
                        a.filter(c(this).val().toLowerCase());
                    }
                });
            }
        },
        _bindWindowEvents: function() {
            var e = c(window.document);
            var a = this;
            var t = ".iconpicker.inst" + this._id;
            c(window).on("resize.iconpicker" + t + " orientationchange.iconpicker" + t, function(e) {
                if (a.popover.hasClass("in")) {
                    a.updatePlacement();
                }
            });
            if (!a.isInline()) {
                e.on("mouseup" + t, function(e) {
                    if (!a._isEventInsideIconpicker(e) && !a.isInline()) {
                        a.hide();
                    }
                });
            }
        },
        _unbindElementEvents: function() {
            this.popover.off(".iconpicker");
            this.element.off(".iconpicker");
            if (this.hasInput()) {
                this.input.off(".iconpicker");
            }
            if (this.hasComponent()) {
                this.component.off(".iconpicker");
            }
            if (this.hasContainer()) {
                this.container.off(".iconpicker");
            }
        },
        _unbindWindowEvents: function() {
            c(window).off(".iconpicker.inst" + this._id);
            c(window.document).off(".iconpicker.inst" + this._id);
        },
        updatePlacement: function(e, a) {
            e = e || this.options.placement;
            this.options.placement = e;
            a = a || this.options.collision;
            a = a === true ? "flip" : a;
            var t = {
                at: "right bottom",
                my: "right top",
                of: this.hasInput() && !this.isInputGroup() ? this.input : this.container,
                collision: a === true ? "flip" : a,
                within: window
            };
            this.popover.removeClass("inline topLeftCorner topLeft top topRight topRightCorner " + "rightTop right rightBottom bottomRight bottomRightCorner " + "bottom bottomLeft bottomLeftCorner leftBottom left leftTop");
            if (typeof e === "object") {
                return this.popover.pos(c.extend({}, t, e));
            }
            switch (e) {
              case "inline":
                {
                    t = false;
                }
                break;

              case "topLeftCorner":
                {
                    t.my = "right bottom";
                    t.at = "left top";
                }
                break;

              case "topLeft":
                {
                    t.my = "left bottom";
                    t.at = "left top";
                }
                break;

              case "top":
                {
                    t.my = "center bottom";
                    t.at = "center top";
                }
                break;

              case "topRight":
                {
                    t.my = "right bottom";
                    t.at = "right top";
                }
                break;

              case "topRightCorner":
                {
                    t.my = "left bottom";
                    t.at = "right top";
                }
                break;

              case "rightTop":
                {
                    t.my = "left bottom";
                    t.at = "right center";
                }
                break;

              case "right":
                {
                    t.my = "left center";
                    t.at = "right center";
                }
                break;

              case "rightBottom":
                {
                    t.my = "left top";
                    t.at = "right center";
                }
                break;

              case "bottomRightCorner":
                {
                    t.my = "left top";
                    t.at = "right bottom";
                }
                break;

              case "bottomRight":
                {
                    t.my = "right top";
                    t.at = "right bottom";
                }
                break;

              case "bottom":
                {
                    t.my = "center top";
                    t.at = "center bottom";
                }
                break;

              case "bottomLeft":
                {
                    t.my = "left top";
                    t.at = "left bottom";
                }
                break;

              case "bottomLeftCorner":
                {
                    t.my = "right top";
                    t.at = "left bottom";
                }
                break;

              case "leftBottom":
                {
                    t.my = "right top";
                    t.at = "left center";
                }
                break;

              case "left":
                {
                    t.my = "right center";
                    t.at = "left center";
                }
                break;

              case "leftTop":
                {
                    t.my = "right bottom";
                    t.at = "left center";
                }
                break;

              default:
                {
                    return false;
                }
                break;
            }
            this.popover.css({
                display: this.options.placement === "inline" ? "" : "block"
            });
            if (t !== false) {
                this.popover.pos(t).css("maxWidth", c(window).width() - this.container.offset().left - 5);
            } else {
                this.popover.css({
                    top: "auto",
                    right: "auto",
                    bottom: "auto",
                    left: "auto",
                    maxWidth: "none"
                });
            }
            this.popover.addClass(this.options.placement);
            return true;
        },
        _updateComponents: function() {
            this.iconpicker.find(".iconpicker-item.iconpicker-selected").removeClass("iconpicker-selected " + this.options.selectedCustomClass);
            if (this.iconpickerValue) {
                this.iconpicker.find("." + this.options.fullClassFormatter(this.iconpickerValue).replace(/ /g, ".")).parent().addClass("iconpicker-selected " + this.options.selectedCustomClass);
            }
            if (this.hasComponent()) {
                var e = this.component.find("i");
                if (e.length > 0) {
                    e.attr("class", this.options.fullClassFormatter(this.iconpickerValue));
                } else {
                    this.component.html(this.getHtml());
                }
            }
        },
        _updateFormGroupStatus: function(e) {
            if (this.hasInput()) {
                if (e !== false) {
                    this.input.parents(".form-group:first").removeClass("has-error");
                } else {
                    this.input.parents(".form-group:first").addClass("has-error");
                }
                return true;
            }
            return false;
        },
        getValid: function(e) {
            if (!f.isString(e)) {
                e = "";
            }
            var a = e === "";
            e = c.trim(e);
            var t = false;
            for (var s = 0; s < this.options.icons.length; s++) {
                if (this.options.icons[s].title === e) {
                    t = true;
                    break;
                }
            }
            if (t || a) {
                return e;
            }
            return false;
        },
        setValue: function(e) {
            var a = this.getValid(e);
            if (a !== false) {
                this.iconpickerValue = a;
                this._trigger("iconpickerSetValue", {
                    iconpickerValue: a
                });
                return this.iconpickerValue;
            } else {
                this._trigger("iconpickerInvalid", {
                    iconpickerValue: e
                });
                return false;
            }
        },
        getHtml: function() {
            return '<i class="' + this.options.fullClassFormatter(this.iconpickerValue) + '"></i>';
        },
        setSourceValue: function(e) {
            e = this.setValue(e);
            if (e !== false && e !== "") {
                if (this.hasInput()) {
                    this.input.val(this.iconpickerValue);
                } else {
                    this.element.data("iconpickerValue", this.iconpickerValue);
                }
                this._trigger("iconpickerSetSourceValue", {
                    iconpickerValue: e
                });
            }
            return e;
        },
        getSourceValue: function(e) {
            e = e || this.options.defaultValue;
            var a = e;
            if (this.hasInput()) {
                a = this.input.val();
            } else {
                a = this.element.data("iconpickerValue");
            }
            if (a === undefined || a === "" || a === null || a === false) {
                a = e;
            }
            return a;
        },
        hasInput: function() {
            return this.input !== false;
        },
        isInputSearch: function() {
            return this.hasInput() && this.options.inputSearch === true;
        },
        isInputGroup: function() {
            return this.container.is(".input-group");
        },
        isDropdownMenu: function() {
            return this.container.is(".dropdown-menu");
        },
        hasSeparatedSearchInput: function() {
            return this.options.templates.search !== false && !this.isInputSearch();
        },
        hasComponent: function() {
            return this.component !== false;
        },
        hasContainer: function() {
            return this.container !== false;
        },
        getAcceptButton: function() {
            return this.popover.find(".iconpicker-btn-accept");
        },
        getCancelButton: function() {
            return this.popover.find(".iconpicker-btn-cancel");
        },
        getSearchInput: function() {
            return this.popover.find(".iconpicker-search");
        },
        filter: function(r) {
            if (f.isEmpty(r)) {
                this.iconpicker.find(".iconpicker-item").show();
                return c(false);
            } else {
                var i = [];
                this.iconpicker.find(".iconpicker-item").each(function() {
                    var e = c(this);
                    var a = e.attr("title").toLowerCase();
                    var t = e.attr("data-search-terms") ? e.attr("data-search-terms").toLowerCase() : "";
                    a = a + " " + t;
                    var s = false;
                    try {
                        s = new RegExp("(^|\\W)" + r, "g");
                    } catch (e) {
                        s = false;
                    }
                    if (s !== false && a.match(s)) {
                        i.push(e);
                        e.show();
                    } else {
                        e.hide();
                    }
                });
                return i;
            }
        },
        show: function() {
            if (this.popover.hasClass("in")) {
                return false;
            }
            c.iconpicker.batch(c(".iconpicker-popover.in:not(.inline)").not(this.popover), "hide");
            this._trigger("iconpickerShow", {
                iconpickerValue: this.iconpickerValue
            });
            this.updatePlacement();
            this.popover.addClass("in");
            setTimeout(c.proxy(function() {
                this.popover.css("display", this.isInline() ? "" : "block");
                this._trigger("iconpickerShown", {
                    iconpickerValue: this.iconpickerValue
                });
            }, this), this.options.animation ? 300 : 1);
        },
        hide: function() {
            if (!this.popover.hasClass("in")) {
                return false;
            }
            this._trigger("iconpickerHide", {
                iconpickerValue: this.iconpickerValue
            });
            this.popover.removeClass("in");
            setTimeout(c.proxy(function() {
                this.popover.css("display", "none");
                this.getSearchInput().val("");
                this.filter("");
                this._trigger("iconpickerHidden", {
                    iconpickerValue: this.iconpickerValue
                });
            }, this), this.options.animation ? 300 : 1);
        },
        toggle: function() {
            if (this.popover.is(":visible")) {
                this.hide();
            } else {
                this.show(true);
            }
        },
        update: function(e, a) {
            e = e ? e : this.getSourceValue(this.iconpickerValue);
            this._trigger("iconpickerUpdate", {
                iconpickerValue: this.iconpickerValue
            });
            if (a === true) {
                e = this.setValue(e);
            } else {
                e = this.setSourceValue(e);
                this._updateFormGroupStatus(e !== false);
            }
            if (e !== false) {
                this._updateComponents();
            }
            this._trigger("iconpickerUpdated", {
                iconpickerValue: this.iconpickerValue
            });
            return e;
        },
        destroy: function() {
            this._trigger("iconpickerDestroy", {
                iconpickerValue: this.iconpickerValue
            });
            this.element.removeData("iconpicker").removeData("iconpickerValue").removeClass("iconpicker-element");
            this._unbindElementEvents();
            this._unbindWindowEvents();
            c(this.popover).remove();
            this._trigger("iconpickerDestroyed", {
                iconpickerValue: this.iconpickerValue
            });
        },
        disable: function() {
            if (this.hasInput()) {
                this.input.prop("disabled", true);
                return true;
            }
            return false;
        },
        enable: function() {
            if (this.hasInput()) {
                this.input.prop("disabled", false);
                return true;
            }
            return false;
        },
        isDisabled: function() {
            if (this.hasInput()) {
                return this.input.prop("disabled") === true;
            }
            return false;
        },
        isInline: function() {
            return this.options.placement === "inline" || this.popover.hasClass("inline");
        }
    };
    c.iconpicker = t;
    c.fn.iconpicker = function(a) {
        return this.each(function() {
            var e = c(this);
            if (!e.data("iconpicker")) {
                e.data("iconpicker", new t(this, typeof a === "object" ? a : {}));
            }
        });
    };
    t.defaultOptions = c.extend(t.defaultOptions, {
        icons: [ {
            title: "fa fa-500px",
            searchTerms: []
        }, {
            title: "fa fa-accessible-icon",
            searchTerms: [ "accessibility", "handicap", "person", "wheelchair", "wheelchair-alt" ]
        }, {
            title: "fa fa-accusoft",
            searchTerms: []
        }, {
            title: "fa fa-acquisitions-incorporated",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "game", "gaming", "tabletop" ]
        }, {
            title: "fa fa-ad",
            searchTerms: []
        }, {
            title: "fa fa-address-book",
            searchTerms: []
        }, {
            title: "fa fa-address-book",
            searchTerms: []
        }, {
            title: "fa fa-address-card",
            searchTerms: []
        }, {
            title: "fa fa-address-card",
            searchTerms: []
        }, {
            title: "fa fa-adjust",
            searchTerms: [ "contrast" ]
        }, {
            title: "fa fa-adn",
            searchTerms: []
        }, {
            title: "fa fa-adversal",
            searchTerms: []
        }, {
            title: "fa fa-affiliatetheme",
            searchTerms: []
        }, {
            title: "fa fa-air-freshener",
            searchTerms: []
        }, {
            title: "fa fa-algolia",
            searchTerms: []
        }, {
            title: "fa fa-align-center",
            searchTerms: [ "middle", "text" ]
        }, {
            title: "fa fa-align-justify",
            searchTerms: [ "text" ]
        }, {
            title: "fa fa-align-left",
            searchTerms: [ "text" ]
        }, {
            title: "fa fa-align-right",
            searchTerms: [ "text" ]
        }, {
            title: "fa fa-alipay",
            searchTerms: []
        }, {
            title: "fa fa-allergies",
            searchTerms: [ "freckles", "hand", "intolerances", "pox", "spots" ]
        }, {
            title: "fa fa-amazon",
            searchTerms: []
        }, {
            title: "fa fa-amazon-pay",
            searchTerms: []
        }, {
            title: "fa fa-ambulance",
            searchTerms: [ "help", "machine", "support", "vehicle" ]
        }, {
            title: "fa fa-american-sign-language-interpreting",
            searchTerms: []
        }, {
            title: "fa fa-amilia",
            searchTerms: []
        }, {
            title: "fa fa-anchor",
            searchTerms: [ "link" ]
        }, {
            title: "fa fa-android",
            searchTerms: [ "robot" ]
        }, {
            title: "fa fa-angellist",
            searchTerms: []
        }, {
            title: "fa fa-angle-double-down",
            searchTerms: [ "arrows" ]
        }, {
            title: "fa fa-angle-double-left",
            searchTerms: [ "arrows", "back", "laquo", "previous", "quote" ]
        }, {
            title: "fa fa-angle-double-right",
            searchTerms: [ "arrows", "forward", "next", "quote", "raquo" ]
        }, {
            title: "fa fa-angle-double-up",
            searchTerms: [ "arrows" ]
        }, {
            title: "fa fa-angle-down",
            searchTerms: [ "arrow" ]
        }, {
            title: "fa fa-angle-left",
            searchTerms: [ "arrow", "back", "previous" ]
        }, {
            title: "fa fa-angle-right",
            searchTerms: [ "arrow", "forward", "next" ]
        }, {
            title: "fa fa-angle-up",
            searchTerms: [ "arrow" ]
        }, {
            title: "fa fa-angry",
            searchTerms: [ "disapprove", "emoticon", "face", "mad", "upset" ]
        }, {
            title: "fa fa-angry",
            searchTerms: [ "disapprove", "emoticon", "face", "mad", "upset" ]
        }, {
            title: "fa fa-angrycreative",
            searchTerms: []
        }, {
            title: "fa fa-angular",
            searchTerms: []
        }, {
            title: "fa fa-ankh",
            searchTerms: [ "amulet", "copper", "coptic christianity", "copts", "crux ansata", "egyptian", "venus" ]
        }, {
            title: "fa fa-app-store",
            searchTerms: []
        }, {
            title: "fa fa-app-store-ios",
            searchTerms: []
        }, {
            title: "fa fa-apper",
            searchTerms: []
        }, {
            title: "fa fa-apple",
            searchTerms: [ "food", "fruit", "mac", "osx" ]
        }, {
            title: "fa fa-apple-alt",
            searchTerms: [ "fall", "food", "fruit", "fuji", "macintosh", "seasonal" ]
        }, {
            title: "fa fa-apple-pay",
            searchTerms: []
        }, {
            title: "fa fa-archive",
            searchTerms: [ "box", "package", "storage" ]
        }, {
            title: "fa fa-archway",
            searchTerms: [ "arc", "monument", "road", "street" ]
        }, {
            title: "fa fa-arrow-alt-circle-down",
            searchTerms: [ "arrow-circle-o-down", "download" ]
        }, {
            title: "fa fa-arrow-alt-circle-down",
            searchTerms: [ "arrow-circle-o-down", "download" ]
        }, {
            title: "fa fa-arrow-alt-circle-left",
            searchTerms: [ "arrow-circle-o-left", "back", "previous" ]
        }, {
            title: "fa fa-arrow-alt-circle-left",
            searchTerms: [ "arrow-circle-o-left", "back", "previous" ]
        }, {
            title: "fa fa-arrow-alt-circle-right",
            searchTerms: [ "arrow-circle-o-right", "forward", "next" ]
        }, {
            title: "fa fa-arrow-alt-circle-right",
            searchTerms: [ "arrow-circle-o-right", "forward", "next" ]
        }, {
            title: "fa fa-arrow-alt-circle-up",
            searchTerms: [ "arrow-circle-o-up" ]
        }, {
            title: "fa fa-arrow-alt-circle-up",
            searchTerms: [ "arrow-circle-o-up" ]
        }, {
            title: "fa fa-arrow-circle-down",
            searchTerms: [ "download" ]
        }, {
            title: "fa fa-arrow-circle-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fa fa-arrow-circle-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fa fa-arrow-circle-up",
            searchTerms: []
        }, {
            title: "fa fa-arrow-down",
            searchTerms: [ "download" ]
        }, {
            title: "fa fa-arrow-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fa fa-arrow-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fa fa-arrow-up",
            searchTerms: []
        }, {
            title: "fa fa-arrows-alt",
            searchTerms: [ "arrow", "arrows", "bigger", "enlarge", "expand", "fullscreen", "move", "position", "reorder", "resize" ]
        }, {
            title: "fa fa-arrows-alt-h",
            searchTerms: [ "arrows-h", "resize" ]
        }, {
            title: "fa fa-arrows-alt-v",
            searchTerms: [ "arrows-v", "resize" ]
        }, {
            title: "fa fa-assistive-listening-systems",
            searchTerms: []
        }, {
            title: "fa fa-asterisk",
            searchTerms: [ "details" ]
        }, {
            title: "fa fa-asymmetrik",
            searchTerms: []
        }, {
            title: "fa fa-at",
            searchTerms: [ "e-mail", "email" ]
        }, {
            title: "fa fa-atlas",
            searchTerms: [ "book", "directions", "geography", "map", "wayfinding" ]
        }, {
            title: "fa fa-atom",
            searchTerms: [ "atheism", "chemistry", "science" ]
        }, {
            title: "fa fa-audible",
            searchTerms: []
        }, {
            title: "fa fa-audio-description",
            searchTerms: []
        }, {
            title: "fa fa-autoprefixer",
            searchTerms: []
        }, {
            title: "fa fa-avianex",
            searchTerms: []
        }, {
            title: "fa fa-aviato",
            searchTerms: []
        }, {
            title: "fa fa-award",
            searchTerms: [ "honor", "praise", "prize", "recognition", "ribbon" ]
        }, {
            title: "fa fa-aws",
            searchTerms: []
        }, {
            title: "fa fa-backspace",
            searchTerms: [ "command", "delete", "keyboard", "undo" ]
        }, {
            title: "fa fa-backward",
            searchTerms: [ "previous", "rewind" ]
        }, {
            title: "fa fa-balance-scale",
            searchTerms: [ "balanced", "justice", "legal", "measure", "weight" ]
        }, {
            title: "fa fa-ban",
            searchTerms: [ "abort", "ban", "block", "cancel", "delete", "hide", "prohibit", "remove", "stop", "trash" ]
        }, {
            title: "fa fa-band-aid",
            searchTerms: [ "bandage", "boo boo", "ouch" ]
        }, {
            title: "fa fa-bandcamp",
            searchTerms: []
        }, {
            title: "fa fa-barcode",
            searchTerms: [ "scan" ]
        }, {
            title: "fa fa-bars",
            searchTerms: [ "checklist", "drag", "hamburger", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "todo", "ul" ]
        }, {
            title: "fa fa-baseball-ball",
            searchTerms: []
        }, {
            title: "fa fa-basketball-ball",
            searchTerms: []
        }, {
            title: "fa fa-bath",
            searchTerms: []
        }, {
            title: "fa fa-battery-empty",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fa fa-battery-full",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fa fa-battery-half",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fa fa-battery-quarter",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fa fa-battery-three-quarters",
            searchTerms: [ "power", "status" ]
        }, {
            title: "fa fa-bed",
            searchTerms: [ "lodging", "sleep", "travel" ]
        }, {
            title: "fa fa-beer",
            searchTerms: [ "alcohol", "bar", "beverage", "drink", "liquor", "mug", "stein" ]
        }, {
            title: "fa fa-behance",
            searchTerms: []
        }, {
            title: "fa fa-behance-square",
            searchTerms: []
        }, {
            title: "fa fa-bell",
            searchTerms: [ "alert", "notification", "reminder" ]
        }, {
            title: "fa fa-bell",
            searchTerms: [ "alert", "notification", "reminder" ]
        }, {
            title: "fa fa-bell-slash",
            searchTerms: []
        }, {
            title: "fa fa-bell-slash",
            searchTerms: []
        }, {
            title: "fa fa-bezier-curve",
            searchTerms: [ "curves", "illustrator", "lines", "path", "vector" ]
        }, {
            title: "fa fa-bible",
            searchTerms: [ "book", "catholicism", "christianity" ]
        }, {
            title: "fa fa-bicycle",
            searchTerms: [ "bike", "gears", "transportation", "vehicle" ]
        }, {
            title: "fa fa-bimobject",
            searchTerms: []
        }, {
            title: "fa fa-binoculars",
            searchTerms: []
        }, {
            title: "fa fa-birthday-cake",
            searchTerms: []
        }, {
            title: "fa fa-bitbucket",
            searchTerms: [ "bitbucket-square", "git" ]
        }, {
            title: "fa fa-bitcoin",
            searchTerms: []
        }, {
            title: "fa fa-bity",
            searchTerms: []
        }, {
            title: "fa fa-black-tie",
            searchTerms: []
        }, {
            title: "fa fa-blackberry",
            searchTerms: []
        }, {
            title: "fa fa-blender",
            searchTerms: []
        }, {
            title: "fa fa-blender-phone",
            searchTerms: [ "appliance", "fantasy", "silly" ]
        }, {
            title: "fa fa-blind",
            searchTerms: []
        }, {
            title: "fa fa-blogger",
            searchTerms: []
        }, {
            title: "fa fa-blogger-b",
            searchTerms: []
        }, {
            title: "fa fa-bluetooth",
            searchTerms: []
        }, {
            title: "fa fa-bluetooth-b",
            searchTerms: []
        }, {
            title: "fa fa-bold",
            searchTerms: []
        }, {
            title: "fa fa-bolt",
            searchTerms: [ "electricity", "lightning", "weather", "zap" ]
        }, {
            title: "fa fa-bomb",
            searchTerms: []
        }, {
            title: "fa fa-bone",
            searchTerms: []
        }, {
            title: "fa fa-bong",
            searchTerms: [ "aparatus", "cannabis", "marijuana", "pipe", "smoke", "smoking" ]
        }, {
            title: "fa fa-book",
            searchTerms: [ "documentation", "read" ]
        }, {
            title: "fa fa-book-dead",
            searchTerms: [ "Dungeons & Dragons", "crossbones", "d&d", "dark arts", "death", "dnd", "documentation", "evil", "fantasy", "halloween", "holiday", "read", "skull", "spell" ]
        }, {
            title: "fa fa-book-open",
            searchTerms: [ "flyer", "notebook", "open book", "pamphlet", "reading" ]
        }, {
            title: "fa fa-book-reader",
            searchTerms: [ "library" ]
        }, {
            title: "fa fa-bookmark",
            searchTerms: [ "save" ]
        }, {
            title: "fa fa-bookmark",
            searchTerms: [ "save" ]
        }, {
            title: "fa fa-bowling-ball",
            searchTerms: []
        }, {
            title: "fa fa-box",
            searchTerms: [ "package" ]
        }, {
            title: "fa fa-box-open",
            searchTerms: []
        }, {
            title: "fa fa-boxes",
            searchTerms: []
        }, {
            title: "fa fa-braille",
            searchTerms: []
        }, {
            title: "fa fa-brain",
            searchTerms: [ "cerebellum", "gray matter", "intellect", "medulla oblongata", "mind", "noodle", "wit" ]
        }, {
            title: "fa fa-briefcase",
            searchTerms: [ "bag", "business", "luggage", "office", "work" ]
        }, {
            title: "fa fa-briefcase-medical",
            searchTerms: [ "health briefcase" ]
        }, {
            title: "fa fa-broadcast-tower",
            searchTerms: [ "airwaves", "radio", "waves" ]
        }, {
            title: "fa fa-broom",
            searchTerms: [ "clean", "firebolt", "fly", "halloween", "holiday", "nimbus 2000", "quidditch", "sweep", "witch" ]
        }, {
            title: "fa fa-brush",
            searchTerms: [ "bristles", "color", "handle", "painting" ]
        }, {
            title: "fa fa-btc",
            searchTerms: []
        }, {
            title: "fa fa-bug",
            searchTerms: [ "insect", "report" ]
        }, {
            title: "fa fa-building",
            searchTerms: [ "apartment", "business", "company", "office", "work" ]
        }, {
            title: "fa fa-building",
            searchTerms: [ "apartment", "business", "company", "office", "work" ]
        }, {
            title: "fa fa-bullhorn",
            searchTerms: [ "announcement", "broadcast", "louder", "megaphone", "share" ]
        }, {
            title: "fa fa-bullseye",
            searchTerms: [ "target" ]
        }, {
            title: "fa fa-burn",
            searchTerms: [ "energy" ]
        }, {
            title: "fa fa-buromobelexperte",
            searchTerms: []
        }, {
            title: "fa fa-bus",
            searchTerms: [ "machine", "public transportation", "transportation", "vehicle" ]
        }, {
            title: "fa fa-bus-alt",
            searchTerms: [ "machine", "public transportation", "transportation", "vehicle" ]
        }, {
            title: "fa fa-business-time",
            searchTerms: [ "briefcase", "business socks", "clock", "flight of the conchords", "wednesday" ]
        }, {
            title: "fa fa-buysellads",
            searchTerms: []
        }, {
            title: "fa fa-calculator",
            searchTerms: []
        }, {
            title: "fa fa-calendar",
            searchTerms: [ "calendar-o", "date", "event", "schedule", "time", "when" ]
        }, {
            title: "fa fa-calendar",
            searchTerms: [ "calendar-o", "date", "event", "schedule", "time", "when" ]
        }, {
            title: "fa fa-calendar-alt",
            searchTerms: [ "calendar", "date", "event", "schedule", "time", "when" ]
        }, {
            title: "fa fa-calendar-alt",
            searchTerms: [ "calendar", "date", "event", "schedule", "time", "when" ]
        }, {
            title: "fa fa-calendar-check",
            searchTerms: [ "accept", "agree", "appointment", "confirm", "correct", "done", "ok", "select", "success", "todo" ]
        }, {
            title: "fa fa-calendar-check",
            searchTerms: [ "accept", "agree", "appointment", "confirm", "correct", "done", "ok", "select", "success", "todo" ]
        }, {
            title: "fa fa-calendar-minus",
            searchTerms: [ "delete", "negative", "remove" ]
        }, {
            title: "fa fa-calendar-minus",
            searchTerms: [ "delete", "negative", "remove" ]
        }, {
            title: "fa fa-calendar-plus",
            searchTerms: [ "add", "create", "new", "positive" ]
        }, {
            title: "fa fa-calendar-plus",
            searchTerms: [ "add", "create", "new", "positive" ]
        }, {
            title: "fa fa-calendar-times",
            searchTerms: [ "archive", "delete", "remove", "x" ]
        }, {
            title: "fa fa-calendar-times",
            searchTerms: [ "archive", "delete", "remove", "x" ]
        }, {
            title: "fa fa-camera",
            searchTerms: [ "photo", "picture", "record" ]
        }, {
            title: "fa fa-camera-retro",
            searchTerms: [ "photo", "picture", "record" ]
        }, {
            title: "fa fa-campground",
            searchTerms: [ "camping", "fall", "outdoors", "seasonal", "tent" ]
        }, {
            title: "fa fa-cannabis",
            searchTerms: [ "bud", "chronic", "drugs", "endica", "endo", "ganja", "marijuana", "mary jane", "pot", "reefer", "sativa", "spliff", "weed", "whacky-tabacky" ]
        }, {
            title: "fa fa-capsules",
            searchTerms: [ "drugs", "medicine" ]
        }, {
            title: "fa fa-car",
            searchTerms: [ "machine", "transportation", "vehicle" ]
        }, {
            title: "fa fa-car-alt",
            searchTerms: []
        }, {
            title: "fa fa-car-battery",
            searchTerms: []
        }, {
            title: "fa fa-car-crash",
            searchTerms: []
        }, {
            title: "fa fa-car-side",
            searchTerms: []
        }, {
            title: "fa fa-caret-down",
            searchTerms: [ "arrow", "dropdown", "menu", "more", "triangle down" ]
        }, {
            title: "fa fa-caret-left",
            searchTerms: [ "arrow", "back", "previous", "triangle left" ]
        }, {
            title: "fa fa-caret-right",
            searchTerms: [ "arrow", "forward", "next", "triangle right" ]
        }, {
            title: "fa fa-caret-square-down",
            searchTerms: [ "caret-square-o-down", "dropdown", "menu", "more" ]
        }, {
            title: "fa fa-caret-square-down",
            searchTerms: [ "caret-square-o-down", "dropdown", "menu", "more" ]
        }, {
            title: "fa fa-caret-square-left",
            searchTerms: [ "back", "caret-square-o-left", "previous" ]
        }, {
            title: "fa fa-caret-square-left",
            searchTerms: [ "back", "caret-square-o-left", "previous" ]
        }, {
            title: "fa fa-caret-square-right",
            searchTerms: [ "caret-square-o-right", "forward", "next" ]
        }, {
            title: "fa fa-caret-square-right",
            searchTerms: [ "caret-square-o-right", "forward", "next" ]
        }, {
            title: "fa fa-caret-square-up",
            searchTerms: [ "caret-square-o-up" ]
        }, {
            title: "fa fa-caret-square-up",
            searchTerms: [ "caret-square-o-up" ]
        }, {
            title: "fa fa-caret-up",
            searchTerms: [ "arrow", "triangle up" ]
        }, {
            title: "fa fa-cart-arrow-down",
            searchTerms: [ "shopping" ]
        }, {
            title: "fa fa-cart-plus",
            searchTerms: [ "add", "create", "new", "positive", "shopping" ]
        }, {
            title: "fa fa-cat",
            searchTerms: [ "feline", "halloween", "holiday", "kitten", "kitty", "meow", "pet" ]
        }, {
            title: "fa fa-cc-amazon-pay",
            searchTerms: []
        }, {
            title: "fa fa-cc-amex",
            searchTerms: [ "amex" ]
        }, {
            title: "fa fa-cc-apple-pay",
            searchTerms: []
        }, {
            title: "fa fa-cc-diners-club",
            searchTerms: []
        }, {
            title: "fa fa-cc-discover",
            searchTerms: []
        }, {
            title: "fa fa-cc-jcb",
            searchTerms: []
        }, {
            title: "fa fa-cc-mastercard",
            searchTerms: []
        }, {
            title: "fa fa-cc-paypal",
            searchTerms: []
        }, {
            title: "fa fa-cc-stripe",
            searchTerms: []
        }, {
            title: "fa fa-cc-visa",
            searchTerms: []
        }, {
            title: "fa fa-centercode",
            searchTerms: []
        }, {
            title: "fa fa-certificate",
            searchTerms: [ "badge", "star" ]
        }, {
            title: "fa fa-chair",
            searchTerms: [ "furniture", "seat" ]
        }, {
            title: "fa fa-chalkboard",
            searchTerms: [ "blackboard", "learning", "school", "teaching", "whiteboard", "writing" ]
        }, {
            title: "fa fa-chalkboard-teacher",
            searchTerms: [ "blackboard", "instructor", "learning", "professor", "school", "whiteboard", "writing" ]
        }, {
            title: "fa fa-charging-station",
            searchTerms: []
        }, {
            title: "fa fa-chart-area",
            searchTerms: [ "analytics", "area-chart", "graph" ]
        }, {
            title: "fa fa-chart-bar",
            searchTerms: [ "analytics", "bar-chart", "graph" ]
        }, {
            title: "fa fa-chart-bar",
            searchTerms: [ "analytics", "bar-chart", "graph" ]
        }, {
            title: "fa fa-chart-line",
            searchTerms: [ "activity", "analytics", "dashboard", "graph", "line-chart" ]
        }, {
            title: "fa fa-chart-pie",
            searchTerms: [ "analytics", "graph", "pie-chart" ]
        }, {
            title: "fa fa-check",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "notice", "notification", "notify", "ok", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "fa fa-check-circle",
            searchTerms: [ "accept", "agree", "confirm", "correct", "done", "ok", "select", "success", "todo", "yes" ]
        }, {
            title: "fa fa-check-circle",
            searchTerms: [ "accept", "agree", "confirm", "correct", "done", "ok", "select", "success", "todo", "yes" ]
        }, {
            title: "fa fa-check-double",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "notice", "notification", "notify", "ok", "select", "success", "tick", "todo" ]
        }, {
            title: "fa fa-check-square",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "ok", "select", "success", "todo", "yes" ]
        }, {
            title: "fa fa-check-square",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "ok", "select", "success", "todo", "yes" ]
        }, {
            title: "fa fa-chess",
            searchTerms: []
        }, {
            title: "fa fa-chess-bishop",
            searchTerms: []
        }, {
            title: "fa fa-chess-board",
            searchTerms: []
        }, {
            title: "fa fa-chess-king",
            searchTerms: []
        }, {
            title: "fa fa-chess-knight",
            searchTerms: []
        }, {
            title: "fa fa-chess-pawn",
            searchTerms: []
        }, {
            title: "fa fa-chess-queen",
            searchTerms: []
        }, {
            title: "fa fa-chess-rook",
            searchTerms: []
        }, {
            title: "fa fa-chevron-circle-down",
            searchTerms: [ "arrow", "dropdown", "menu", "more" ]
        }, {
            title: "fa fa-chevron-circle-left",
            searchTerms: [ "arrow", "back", "previous" ]
        }, {
            title: "fa fa-chevron-circle-right",
            searchTerms: [ "arrow", "forward", "next" ]
        }, {
            title: "fa fa-chevron-circle-up",
            searchTerms: [ "arrow" ]
        }, {
            title: "fa fa-chevron-down",
            searchTerms: []
        }, {
            title: "fa fa-chevron-left",
            searchTerms: [ "back", "bracket", "previous" ]
        }, {
            title: "fa fa-chevron-right",
            searchTerms: [ "bracket", "forward", "next" ]
        }, {
            title: "fa fa-chevron-up",
            searchTerms: []
        }, {
            title: "fa fa-child",
            searchTerms: []
        }, {
            title: "fa fa-chrome",
            searchTerms: [ "browser" ]
        }, {
            title: "fa fa-church",
            searchTerms: [ "building", "community", "religion" ]
        }, {
            title: "fa fa-circle",
            searchTerms: [ "circle-thin", "dot", "notification" ]
        }, {
            title: "fa fa-circle",
            searchTerms: [ "circle-thin", "dot", "notification" ]
        }, {
            title: "fa fa-circle-notch",
            searchTerms: [ "circle-o-notch" ]
        }, {
            title: "fa fa-city",
            searchTerms: [ "buildings", "busy", "skyscrapers", "urban", "windows" ]
        }, {
            title: "fa fa-clipboard",
            searchTerms: [ "paste" ]
        }, {
            title: "fa fa-clipboard",
            searchTerms: [ "paste" ]
        }, {
            title: "fa fa-clipboard-check",
            searchTerms: [ "accept", "agree", "confirm", "done", "ok", "select", "success", "todo", "yes" ]
        }, {
            title: "fa fa-clipboard-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "intinerary", "ol", "schedule", "todo", "ul" ]
        }, {
            title: "fa fa-clock",
            searchTerms: [ "date", "late", "schedule", "timer", "timestamp", "watch" ]
        }, {
            title: "fa fa-clock",
            searchTerms: [ "date", "late", "schedule", "timer", "timestamp", "watch" ]
        }, {
            title: "fa fa-clone",
            searchTerms: [ "copy", "duplicate" ]
        }, {
            title: "fa fa-clone",
            searchTerms: [ "copy", "duplicate" ]
        }, {
            title: "fa fa-closed-captioning",
            searchTerms: [ "cc" ]
        }, {
            title: "fa fa-closed-captioning",
            searchTerms: [ "cc" ]
        }, {
            title: "fa fa-cloud",
            searchTerms: [ "save" ]
        }, {
            title: "fa fa-cloud-download-alt",
            searchTerms: [ "import" ]
        }, {
            title: "fa fa-cloud-meatball",
            searchTerms: []
        }, {
            title: "fa fa-cloud-moon",
            searchTerms: [ "crescent", "evening", "halloween", "holiday", "lunar", "night", "sky" ]
        }, {
            title: "fa fa-cloud-moon-rain",
            searchTerms: []
        }, {
            title: "fa fa-cloud-rain",
            searchTerms: [ "precipitation" ]
        }, {
            title: "fa fa-cloud-showers-heavy",
            searchTerms: [ "precipitation", "rain", "storm" ]
        }, {
            title: "fa fa-cloud-sun",
            searchTerms: [ "day", "daytime", "fall", "outdoors", "seasonal" ]
        }, {
            title: "fa fa-cloud-sun-rain",
            searchTerms: []
        }, {
            title: "fa fa-cloud-upload-alt",
            searchTerms: [ "cloud-upload" ]
        }, {
            title: "fa fa-cloudscale",
            searchTerms: []
        }, {
            title: "fa fa-cloudsmith",
            searchTerms: []
        }, {
            title: "fa fa-cloudversify",
            searchTerms: []
        }, {
            title: "fa fa-cocktail",
            searchTerms: [ "alcohol", "beverage", "drink" ]
        }, {
            title: "fa fa-code",
            searchTerms: [ "brackets", "html" ]
        }, {
            title: "fa fa-code-branch",
            searchTerms: [ "branch", "code-fork", "fork", "git", "github", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "fa fa-codepen",
            searchTerms: []
        }, {
            title: "fa fa-codiepie",
            searchTerms: []
        }, {
            title: "fa fa-coffee",
            searchTerms: [ "beverage", "breakfast", "cafe", "drink", "fall", "morning", "mug", "seasonal", "tea" ]
        }, {
            title: "fa fa-cog",
            searchTerms: [ "settings" ]
        }, {
            title: "fa fa-cogs",
            searchTerms: [ "gears", "settings" ]
        }, {
            title: "fa fa-coins",
            searchTerms: []
        }, {
            title: "fa fa-columns",
            searchTerms: [ "dashboard", "panes", "split" ]
        }, {
            title: "fa fa-comment",
            searchTerms: [ "bubble", "chat", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fa fa-comment",
            searchTerms: [ "bubble", "chat", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fa fa-comment-alt",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fa fa-comment-alt",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fa fa-comment-dollar",
            searchTerms: []
        }, {
            title: "fa fa-comment-dots",
            searchTerms: []
        }, {
            title: "fa fa-comment-dots",
            searchTerms: []
        }, {
            title: "fa fa-comment-slash",
            searchTerms: []
        }, {
            title: "fa fa-comments",
            searchTerms: [ "bubble", "chat", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fa fa-comments",
            searchTerms: [ "bubble", "chat", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fa fa-comments-dollar",
            searchTerms: []
        }, {
            title: "fa fa-compact-disc",
            searchTerms: [ "bluray", "cd", "disc", "media" ]
        }, {
            title: "fa fa-compass",
            searchTerms: [ "directory", "location", "menu", "safari" ]
        }, {
            title: "fa fa-compass",
            searchTerms: [ "directory", "location", "menu", "safari" ]
        }, {
            title: "fa fa-compress",
            searchTerms: [ "collapse", "combine", "contract", "merge", "smaller" ]
        }, {
            title: "fa fa-concierge-bell",
            searchTerms: [ "attention", "hotel", "service", "support" ]
        }, {
            title: "fa fa-connectdevelop",
            searchTerms: []
        }, {
            title: "fa fa-contao",
            searchTerms: []
        }, {
            title: "fa fa-cookie",
            searchTerms: [ "baked good", "chips", "food", "snack", "sweet", "treat" ]
        }, {
            title: "fa fa-cookie-bite",
            searchTerms: [ "baked good", "bitten", "chips", "eating", "food", "snack", "sweet", "treat" ]
        }, {
            title: "fa fa-copy",
            searchTerms: [ "clone", "duplicate", "file", "files-o" ]
        }, {
            title: "fa fa-copy",
            searchTerms: [ "clone", "duplicate", "file", "files-o" ]
        }, {
            title: "fa fa-copyright",
            searchTerms: []
        }, {
            title: "fa fa-copyright",
            searchTerms: []
        }, {
            title: "fa fa-couch",
            searchTerms: [ "furniture", "sofa" ]
        }, {
            title: "fa fa-cpanel",
            searchTerms: []
        }, {
            title: "fa fa-creative-commons",
            searchTerms: []
        }, {
            title: "fa fa-creative-commons-by",
            searchTerms: []
        }, {
            title: "fa fa-creative-commons-nc",
            searchTerms: []
        }, {
            title: "fa fa-creative-commons-nc-eu",
            searchTerms: []
        }, {
            title: "fa fa-creative-commons-nc-jp",
            searchTerms: []
        }, {
            title: "fa fa-creative-commons-nd",
            searchTerms: []
        }, {
            title: "fa fa-creative-commons-pd",
            searchTerms: []
        }, {
            title: "fa fa-creative-commons-pd-alt",
            searchTerms: []
        }, {
            title: "fa fa-creative-commons-remix",
            searchTerms: []
        }, {
            title: "fa fa-creative-commons-sa",
            searchTerms: []
        }, {
            title: "fa fa-creative-commons-sampling",
            searchTerms: []
        }, {
            title: "fa fa-creative-commons-sampling-plus",
            searchTerms: []
        }, {
            title: "fa fa-creative-commons-share",
            searchTerms: []
        }, {
            title: "fa fa-creative-commons-zero",
            searchTerms: []
        }, {
            title: "fa fa-credit-card",
            searchTerms: [ "buy", "checkout", "credit-card-alt", "debit", "money", "payment", "purchase" ]
        }, {
            title: "fa fa-credit-card",
            searchTerms: [ "buy", "checkout", "credit-card-alt", "debit", "money", "payment", "purchase" ]
        }, {
            title: "fa fa-critical-role",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "game", "gaming", "tabletop" ]
        }, {
            title: "fa fa-crop",
            searchTerms: [ "design" ]
        }, {
            title: "fa fa-crop-alt",
            searchTerms: []
        }, {
            title: "fa fa-cross",
            searchTerms: [ "catholicism", "christianity" ]
        }, {
            title: "fa fa-crosshairs",
            searchTerms: [ "gpd", "picker", "position" ]
        }, {
            title: "fa fa-crow",
            searchTerms: [ "bird", "bullfrog", "fauna", "halloween", "holiday", "toad" ]
        }, {
            title: "fa fa-crown",
            searchTerms: []
        }, {
            title: "fa fa-css3",
            searchTerms: [ "code" ]
        }, {
            title: "fa fa-css3-alt",
            searchTerms: []
        }, {
            title: "fa fa-cube",
            searchTerms: [ "package" ]
        }, {
            title: "fa fa-cubes",
            searchTerms: [ "packages" ]
        }, {
            title: "fa fa-cut",
            searchTerms: [ "scissors" ]
        }, {
            title: "fa fa-cuttlefish",
            searchTerms: []
        }, {
            title: "fa fa-d-and-d",
            searchTerms: []
        }, {
            title: "fa fa-d-and-d-beyond",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "gaming", "tabletop" ]
        }, {
            title: "fa fa-dashcube",
            searchTerms: []
        }, {
            title: "fa fa-database",
            searchTerms: []
        }, {
            title: "fa fa-deaf",
            searchTerms: []
        }, {
            title: "fa fa-delicious",
            searchTerms: []
        }, {
            title: "fa fa-democrat",
            searchTerms: [ "american", "democratic party", "donkey", "election", "left", "left-wing", "liberal", "politics", "usa" ]
        }, {
            title: "fa fa-deploydog",
            searchTerms: []
        }, {
            title: "fa fa-deskpro",
            searchTerms: []
        }, {
            title: "fa fa-desktop",
            searchTerms: [ "computer", "cpu", "demo", "desktop", "device", "machine", "monitor", "pc", "screen" ]
        }, {
            title: "fa fa-dev",
            searchTerms: []
        }, {
            title: "fa fa-deviantart",
            searchTerms: []
        }, {
            title: "fa fa-dharmachakra",
            searchTerms: [ "buddhism", "buddhist", "wheel of dharma" ]
        }, {
            title: "fa fa-diagnoses",
            searchTerms: []
        }, {
            title: "fa fa-dice",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fa fa-dice-d20",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "fa fa-dice-d6",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "fa fa-dice-five",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fa fa-dice-four",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fa fa-dice-one",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fa fa-dice-six",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fa fa-dice-three",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fa fa-dice-two",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fa fa-digg",
            searchTerms: []
        }, {
            title: "fa fa-digital-ocean",
            searchTerms: []
        }, {
            title: "fa fa-digital-tachograph",
            searchTerms: []
        }, {
            title: "fa fa-directions",
            searchTerms: []
        }, {
            title: "fa fa-discord",
            searchTerms: []
        }, {
            title: "fa fa-discourse",
            searchTerms: []
        }, {
            title: "fa fa-divide",
            searchTerms: []
        }, {
            title: "fa fa-dizzy",
            searchTerms: [ "dazed", "disapprove", "emoticon", "face" ]
        }, {
            title: "fa fa-dizzy",
            searchTerms: [ "dazed", "disapprove", "emoticon", "face" ]
        }, {
            title: "fa fa-dna",
            searchTerms: [ "double helix", "helix" ]
        }, {
            title: "fa fa-dochub",
            searchTerms: []
        }, {
            title: "fa fa-docker",
            searchTerms: []
        }, {
            title: "fa fa-dog",
            searchTerms: [ "canine", "fauna", "mammmal", "pet", "pooch", "puppy", "woof" ]
        }, {
            title: "fa fa-dollar-sign",
            searchTerms: [ "$", "dollar-sign", "money", "price", "usd" ]
        }, {
            title: "fa fa-dolly",
            searchTerms: []
        }, {
            title: "fa fa-dolly-flatbed",
            searchTerms: []
        }, {
            title: "fa fa-donate",
            searchTerms: [ "generosity", "give" ]
        }, {
            title: "fa fa-door-closed",
            searchTerms: []
        }, {
            title: "fa fa-door-open",
            searchTerms: []
        }, {
            title: "fa fa-dot-circle",
            searchTerms: [ "bullseye", "notification", "target" ]
        }, {
            title: "fa fa-dot-circle",
            searchTerms: [ "bullseye", "notification", "target" ]
        }, {
            title: "fa fa-dove",
            searchTerms: [ "bird", "fauna", "flying", "peace" ]
        }, {
            title: "fa fa-download",
            searchTerms: [ "import" ]
        }, {
            title: "fa fa-draft2digital",
            searchTerms: []
        }, {
            title: "fa fa-drafting-compass",
            searchTerms: [ "mechanical drawing", "plot", "plotting" ]
        }, {
            title: "fa fa-dragon",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy" ]
        }, {
            title: "fa fa-draw-polygon",
            searchTerms: []
        }, {
            title: "fa fa-dribbble",
            searchTerms: []
        }, {
            title: "fa fa-dribbble-square",
            searchTerms: []
        }, {
            title: "fa fa-dropbox",
            searchTerms: []
        }, {
            title: "fa fa-drum",
            searchTerms: [ "instrument", "music", "percussion", "snare", "sound" ]
        }, {
            title: "fa fa-drum-steelpan",
            searchTerms: [ "calypso", "instrument", "music", "percussion", "reggae", "snare", "sound", "steel", "tropical" ]
        }, {
            title: "fa fa-drumstick-bite",
            searchTerms: []
        }, {
            title: "fa fa-drupal",
            searchTerms: []
        }, {
            title: "fa fa-dumbbell",
            searchTerms: [ "exercise", "gym", "strength", "weight", "weight-lifting" ]
        }, {
            title: "fa fa-dungeon",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "door", "entrance", "fantasy", "gate" ]
        }, {
            title: "fa fa-dyalog",
            searchTerms: []
        }, {
            title: "fa fa-earlybirds",
            searchTerms: []
        }, {
            title: "fa fa-ebay",
            searchTerms: []
        }, {
            title: "fa fa-edge",
            searchTerms: [ "browser", "ie" ]
        }, {
            title: "fa fa-edit",
            searchTerms: [ "edit", "pen", "pencil", "update", "write" ]
        }, {
            title: "fa fa-edit",
            searchTerms: [ "edit", "pen", "pencil", "update", "write" ]
        }, {
            title: "fa fa-eject",
            searchTerms: []
        }, {
            title: "fa fa-elementor",
            searchTerms: []
        }, {
            title: "fa fa-ellipsis-h",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fa fa-ellipsis-v",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fa fa-ello",
            searchTerms: []
        }, {
            title: "fa fa-ember",
            searchTerms: []
        }, {
            title: "fa fa-empire",
            searchTerms: []
        }, {
            title: "fa fa-envelope",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fa fa-envelope",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fa fa-envelope-open",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fa fa-envelope-open",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fa fa-envelope-open-text",
            searchTerms: []
        }, {
            title: "fa fa-envelope-square",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fa fa-envira",
            searchTerms: [ "leaf" ]
        }, {
            title: "fa fa-equals",
            searchTerms: []
        }, {
            title: "fa fa-eraser",
            searchTerms: [ "delete", "remove" ]
        }, {
            title: "fa fa-erlang",
            searchTerms: []
        }, {
            title: "fa fa-ethereum",
            searchTerms: []
        }, {
            title: "fa fa-etsy",
            searchTerms: []
        }, {
            title: "fa fa-euro-sign",
            searchTerms: [ "eur" ]
        }, {
            title: "fa fa-exchange-alt",
            searchTerms: [ "arrow", "arrows", "exchange", "reciprocate", "return", "swap", "transfer" ]
        }, {
            title: "fa fa-exclamation",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fa fa-exclamation-circle",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fa fa-exclamation-triangle",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fa fa-expand",
            searchTerms: [ "bigger", "enlarge", "resize" ]
        }, {
            title: "fa fa-expand-arrows-alt",
            searchTerms: [ "arrows-alt", "bigger", "enlarge", "move", "resize" ]
        }, {
            title: "fa fa-expeditedssl",
            searchTerms: []
        }, {
            title: "fa fa-external-link-alt",
            searchTerms: [ "external-link", "new", "open" ]
        }, {
            title: "fa fa-external-link-square-alt",
            searchTerms: [ "external-link-square", "new", "open" ]
        }, {
            title: "fa fa-eye",
            searchTerms: [ "optic", "see", "seen", "show", "sight", "views", "visible" ]
        }, {
            title: "fa fa-eye",
            searchTerms: [ "optic", "see", "seen", "show", "sight", "views", "visible" ]
        }, {
            title: "fa fa-eye-dropper",
            searchTerms: [ "eyedropper" ]
        }, {
            title: "fa fa-eye-slash",
            searchTerms: [ "blind", "hide", "show", "toggle", "unseen", "views", "visible", "visiblity" ]
        }, {
            title: "fa fa-eye-slash",
            searchTerms: [ "blind", "hide", "show", "toggle", "unseen", "views", "visible", "visiblity" ]
        }, {
            title: "fa fa-facebook",
            searchTerms: [ "facebook-official", "social network" ]
        }, {
            title: "fa fa-facebook-f",
            searchTerms: [ "facebook" ]
        }, {
            title: "fa fa-facebook-messenger",
            searchTerms: []
        }, {
            title: "fa fa-facebook-square",
            searchTerms: [ "social network" ]
        }, {
            title: "fa fa-fantasy-flight-games",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "game", "gaming", "tabletop" ]
        }, {
            title: "fa fa-fast-backward",
            searchTerms: [ "beginning", "first", "previous", "rewind", "start" ]
        }, {
            title: "fa fa-fast-forward",
            searchTerms: [ "end", "last", "next" ]
        }, {
            title: "fa fa-fax",
            searchTerms: []
        }, {
            title: "fa fa-feather",
            searchTerms: [ "bird", "light", "plucked", "quill" ]
        }, {
            title: "fa fa-feather-alt",
            searchTerms: [ "bird", "light", "plucked", "quill" ]
        }, {
            title: "fa fa-female",
            searchTerms: [ "human", "person", "profile", "user", "woman" ]
        }, {
            title: "fa fa-fighter-jet",
            searchTerms: [ "airplane", "fast", "fly", "goose", "maverick", "plane", "quick", "top gun", "transportation", "travel" ]
        }, {
            title: "fa fa-file",
            searchTerms: [ "document", "new", "page", "pdf", "resume" ]
        }, {
            title: "fa fa-file",
            searchTerms: [ "document", "new", "page", "pdf", "resume" ]
        }, {
            title: "fa fa-file-alt",
            searchTerms: [ "document", "file-text", "invoice", "new", "page", "pdf" ]
        }, {
            title: "fa fa-file-alt",
            searchTerms: [ "document", "file-text", "invoice", "new", "page", "pdf" ]
        }, {
            title: "fa fa-file-archive",
            searchTerms: [ ".zip", "bundle", "compress", "compression", "download", "zip" ]
        }, {
            title: "fa fa-file-archive",
            searchTerms: [ ".zip", "bundle", "compress", "compression", "download", "zip" ]
        }, {
            title: "fa fa-file-audio",
            searchTerms: []
        }, {
            title: "fa fa-file-audio",
            searchTerms: []
        }, {
            title: "fa fa-file-code",
            searchTerms: []
        }, {
            title: "fa fa-file-code",
            searchTerms: []
        }, {
            title: "fa fa-file-contract",
            searchTerms: [ "agreement", "binding", "document", "legal", "signature" ]
        }, {
            title: "fa fa-file-csv",
            searchTerms: [ "spreadsheets" ]
        }, {
            title: "fa fa-file-download",
            searchTerms: []
        }, {
            title: "fa fa-file-excel",
            searchTerms: []
        }, {
            title: "fa fa-file-excel",
            searchTerms: []
        }, {
            title: "fa fa-file-export",
            searchTerms: []
        }, {
            title: "fa fa-file-image",
            searchTerms: []
        }, {
            title: "fa fa-file-image",
            searchTerms: []
        }, {
            title: "fa fa-file-import",
            searchTerms: []
        }, {
            title: "fa fa-file-invoice",
            searchTerms: [ "bill", "document", "receipt" ]
        }, {
            title: "fa fa-file-invoice-dollar",
            searchTerms: [ "$", "bill", "document", "dollar-sign", "money", "receipt", "usd" ]
        }, {
            title: "fa fa-file-medical",
            searchTerms: []
        }, {
            title: "fa fa-file-medical-alt",
            searchTerms: []
        }, {
            title: "fa fa-file-pdf",
            searchTerms: []
        }, {
            title: "fa fa-file-pdf",
            searchTerms: []
        }, {
            title: "fa fa-file-powerpoint",
            searchTerms: []
        }, {
            title: "fa fa-file-powerpoint",
            searchTerms: []
        }, {
            title: "fa fa-file-prescription",
            searchTerms: [ "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "fa fa-file-signature",
            searchTerms: [ "John Hancock", "contract", "document", "name" ]
        }, {
            title: "fa fa-file-upload",
            searchTerms: []
        }, {
            title: "fa fa-file-video",
            searchTerms: []
        }, {
            title: "fa fa-file-video",
            searchTerms: []
        }, {
            title: "fa fa-file-word",
            searchTerms: []
        }, {
            title: "fa fa-file-word",
            searchTerms: []
        }, {
            title: "fa fa-fill",
            searchTerms: [ "bucket", "color", "paint", "paint bucket" ]
        }, {
            title: "fa fa-fill-drip",
            searchTerms: [ "bucket", "color", "drop", "paint", "paint bucket", "spill" ]
        }, {
            title: "fa fa-film",
            searchTerms: [ "movie" ]
        }, {
            title: "fa fa-filter",
            searchTerms: [ "funnel", "options" ]
        }, {
            title: "fa fa-fingerprint",
            searchTerms: [ "human", "id", "identification", "lock", "smudge", "touch", "unique", "unlock" ]
        }, {
            title: "fa fa-fire",
            searchTerms: [ "caliente", "flame", "heat", "hot", "popular" ]
        }, {
            title: "fa fa-fire-extinguisher",
            searchTerms: []
        }, {
            title: "fa fa-firefox",
            searchTerms: [ "browser" ]
        }, {
            title: "fa fa-first-aid",
            searchTerms: []
        }, {
            title: "fa fa-first-order",
            searchTerms: []
        }, {
            title: "fa fa-first-order-alt",
            searchTerms: []
        }, {
            title: "fa fa-firstdraft",
            searchTerms: []
        }, {
            title: "fa fa-fish",
            searchTerms: [ "fauna", "gold", "swimming" ]
        }, {
            title: "fa fa-fist-raised",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "hand", "ki", "monk", "resist", "strength", "unarmed combat" ]
        }, {
            title: "fa fa-flag",
            searchTerms: [ "country", "notice", "notification", "notify", "pole", "report", "symbol" ]
        }, {
            title: "fa fa-flag",
            searchTerms: [ "country", "notice", "notification", "notify", "pole", "report", "symbol" ]
        }, {
            title: "fa fa-flag-checkered",
            searchTerms: [ "notice", "notification", "notify", "pole", "racing", "report", "symbol" ]
        }, {
            title: "fa fa-flag-usa",
            searchTerms: [ "betsy ross", "country", "old glory", "stars", "stripes", "symbol" ]
        }, {
            title: "fa fa-flask",
            searchTerms: [ "beaker", "experimental", "labs", "science" ]
        }, {
            title: "fa fa-flickr",
            searchTerms: []
        }, {
            title: "fa fa-flipboard",
            searchTerms: []
        }, {
            title: "fa fa-flushed",
            searchTerms: [ "embarrassed", "emoticon", "face" ]
        }, {
            title: "fa fa-flushed",
            searchTerms: [ "embarrassed", "emoticon", "face" ]
        }, {
            title: "fa fa-fly",
            searchTerms: []
        }, {
            title: "fa fa-folder",
            searchTerms: []
        }, {
            title: "fa fa-folder",
            searchTerms: []
        }, {
            title: "fa fa-folder-minus",
            searchTerms: [ "archive", "delete", "negative", "remove" ]
        }, {
            title: "fa fa-folder-open",
            searchTerms: []
        }, {
            title: "fa fa-folder-open",
            searchTerms: []
        }, {
            title: "fa fa-folder-plus",
            searchTerms: [ "add", "create", "new", "positive" ]
        }, {
            title: "fa fa-font",
            searchTerms: [ "text" ]
        }, {
            title: "fa fa-font-awesome",
            searchTerms: [ "meanpath" ]
        }, {
            title: "fa fa-font-awesome-alt",
            searchTerms: []
        }, {
            title: "fa fa-font-awesome-flag",
            searchTerms: []
        }, {
            title: "fa fa-font-awesome-logo-full",
            searchTerms: []
        }, {
            title: "fa fa-font-awesome-logo-full",
            searchTerms: []
        }, {
            title: "fa fa-font-awesome-logo-full",
            searchTerms: []
        }, {
            title: "fa fa-fonticons",
            searchTerms: []
        }, {
            title: "fa fa-fonticons-fi",
            searchTerms: []
        }, {
            title: "fa fa-football-ball",
            searchTerms: [ "fall", "pigskin", "seasonal" ]
        }, {
            title: "fa fa-fort-awesome",
            searchTerms: [ "castle" ]
        }, {
            title: "fa fa-fort-awesome-alt",
            searchTerms: [ "castle" ]
        }, {
            title: "fa fa-forumbee",
            searchTerms: []
        }, {
            title: "fa fa-forward",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fa fa-foursquare",
            searchTerms: []
        }, {
            title: "fa fa-free-code-camp",
            searchTerms: []
        }, {
            title: "fa fa-freebsd",
            searchTerms: []
        }, {
            title: "fa fa-frog",
            searchTerms: [ "amphibian", "bullfrog", "fauna", "hop", "kermit", "kiss", "prince", "ribbit", "toad", "wart" ]
        }, {
            title: "fa fa-frown",
            searchTerms: [ "disapprove", "emoticon", "face", "rating", "sad" ]
        }, {
            title: "fa fa-frown",
            searchTerms: [ "disapprove", "emoticon", "face", "rating", "sad" ]
        }, {
            title: "fa fa-frown-open",
            searchTerms: [ "disapprove", "emoticon", "face", "rating", "sad" ]
        }, {
            title: "fa fa-frown-open",
            searchTerms: [ "disapprove", "emoticon", "face", "rating", "sad" ]
        }, {
            title: "fa fa-fulcrum",
            searchTerms: []
        }, {
            title: "fa fa-funnel-dollar",
            searchTerms: []
        }, {
            title: "fa fa-futbol",
            searchTerms: [ "ball", "football", "soccer" ]
        }, {
            title: "fa fa-futbol",
            searchTerms: [ "ball", "football", "soccer" ]
        }, {
            title: "fa fa-galactic-republic",
            searchTerms: [ "politics", "star wars" ]
        }, {
            title: "fa fa-galactic-senate",
            searchTerms: [ "star wars" ]
        }, {
            title: "fa fa-gamepad",
            searchTerms: [ "controller" ]
        }, {
            title: "fa fa-gas-pump",
            searchTerms: []
        }, {
            title: "fa fa-gavel",
            searchTerms: [ "hammer", "judge", "lawyer", "opinion" ]
        }, {
            title: "fa fa-gem",
            searchTerms: [ "diamond" ]
        }, {
            title: "fa fa-gem",
            searchTerms: [ "diamond" ]
        }, {
            title: "fa fa-genderless",
            searchTerms: []
        }, {
            title: "fa fa-get-pocket",
            searchTerms: []
        }, {
            title: "fa fa-gg",
            searchTerms: []
        }, {
            title: "fa fa-gg-circle",
            searchTerms: []
        }, {
            title: "fa fa-ghost",
            searchTerms: [ "apparition", "blinky", "clyde", "floating", "halloween", "holiday", "inky", "pinky", "spirit" ]
        }, {
            title: "fa fa-gift",
            searchTerms: [ "generosity", "giving", "party", "present", "wrapped" ]
        }, {
            title: "fa fa-git",
            searchTerms: []
        }, {
            title: "fa fa-git-square",
            searchTerms: []
        }, {
            title: "fa fa-github",
            searchTerms: [ "octocat" ]
        }, {
            title: "fa fa-github-alt",
            searchTerms: [ "octocat" ]
        }, {
            title: "fa fa-github-square",
            searchTerms: [ "octocat" ]
        }, {
            title: "fa fa-gitkraken",
            searchTerms: []
        }, {
            title: "fa fa-gitlab",
            searchTerms: [ "Axosoft" ]
        }, {
            title: "fa fa-gitter",
            searchTerms: []
        }, {
            title: "fa fa-glass-martini",
            searchTerms: [ "alcohol", "bar", "beverage", "drink", "glass", "liquor", "martini" ]
        }, {
            title: "fa fa-glass-martini-alt",
            searchTerms: []
        }, {
            title: "fa fa-glasses",
            searchTerms: [ "foureyes", "hipster", "nerd", "reading", "sight", "spectacles" ]
        }, {
            title: "fa fa-glide",
            searchTerms: []
        }, {
            title: "fa fa-glide-g",
            searchTerms: []
        }, {
            title: "fa fa-globe",
            searchTerms: [ "all", "coordinates", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fa fa-globe-africa",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fa fa-globe-americas",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fa fa-globe-asia",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fa fa-gofore",
            searchTerms: []
        }, {
            title: "fa fa-golf-ball",
            searchTerms: []
        }, {
            title: "fa fa-goodreads",
            searchTerms: []
        }, {
            title: "fa fa-goodreads-g",
            searchTerms: []
        }, {
            title: "fa fa-google",
            searchTerms: []
        }, {
            title: "fa fa-google-drive",
            searchTerms: []
        }, {
            title: "fa fa-google-play",
            searchTerms: []
        }, {
            title: "fa fa-google-plus",
            searchTerms: [ "google-plus-circle", "google-plus-official" ]
        }, {
            title: "fa fa-google-plus-g",
            searchTerms: [ "google-plus", "social network" ]
        }, {
            title: "fa fa-google-plus-square",
            searchTerms: [ "social network" ]
        }, {
            title: "fa fa-google-wallet",
            searchTerms: []
        }, {
            title: "fa fa-gopuram",
            searchTerms: [ "building", "entrance", "hinduism", "temple", "tower" ]
        }, {
            title: "fa fa-graduation-cap",
            searchTerms: [ "learning", "school", "student" ]
        }, {
            title: "fa fa-gratipay",
            searchTerms: [ "favorite", "heart", "like", "love" ]
        }, {
            title: "fa fa-grav",
            searchTerms: []
        }, {
            title: "fa fa-greater-than",
            searchTerms: []
        }, {
            title: "fa fa-greater-than-equal",
            searchTerms: []
        }, {
            title: "fa fa-grimace",
            searchTerms: [ "cringe", "emoticon", "face" ]
        }, {
            title: "fa fa-grimace",
            searchTerms: [ "cringe", "emoticon", "face" ]
        }, {
            title: "fa fa-grin",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fa fa-grin",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fa fa-grin-alt",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fa fa-grin-alt",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fa fa-grin-beam",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fa fa-grin-beam",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fa fa-grin-beam-sweat",
            searchTerms: [ "emoticon", "face", "smile" ]
        }, {
            title: "fa fa-grin-beam-sweat",
            searchTerms: [ "emoticon", "face", "smile" ]
        }, {
            title: "fa fa-grin-hearts",
            searchTerms: [ "emoticon", "face", "love", "smile" ]
        }, {
            title: "fa fa-grin-hearts",
            searchTerms: [ "emoticon", "face", "love", "smile" ]
        }, {
            title: "fa fa-grin-squint",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fa fa-grin-squint",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fa fa-grin-squint-tears",
            searchTerms: [ "emoticon", "face", "happy", "smile" ]
        }, {
            title: "fa fa-grin-squint-tears",
            searchTerms: [ "emoticon", "face", "happy", "smile" ]
        }, {
            title: "fa fa-grin-stars",
            searchTerms: [ "emoticon", "face", "star-struck" ]
        }, {
            title: "fa fa-grin-stars",
            searchTerms: [ "emoticon", "face", "star-struck" ]
        }, {
            title: "fa fa-grin-tears",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fa fa-grin-tears",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fa fa-grin-tongue",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fa fa-grin-tongue",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fa fa-grin-tongue-squint",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fa fa-grin-tongue-squint",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fa fa-grin-tongue-wink",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fa fa-grin-tongue-wink",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fa fa-grin-wink",
            searchTerms: [ "emoticon", "face", "flirt", "laugh", "smile" ]
        }, {
            title: "fa fa-grin-wink",
            searchTerms: [ "emoticon", "face", "flirt", "laugh", "smile" ]
        }, {
            title: "fa fa-grip-horizontal",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "fa fa-grip-vertical",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "fa fa-gripfire",
            searchTerms: []
        }, {
            title: "fa fa-grunt",
            searchTerms: []
        }, {
            title: "fa fa-gulp",
            searchTerms: []
        }, {
            title: "fa fa-h-square",
            searchTerms: [ "hospital", "hotel" ]
        }, {
            title: "fa fa-hacker-news",
            searchTerms: []
        }, {
            title: "fa fa-hacker-news-square",
            searchTerms: []
        }, {
            title: "fa fa-hackerrank",
            searchTerms: []
        }, {
            title: "fa fa-hammer",
            searchTerms: [ "admin", "fix", "repair", "settings", "tool" ]
        }, {
            title: "fa fa-hamsa",
            searchTerms: [ "amulet", "christianity", "islam", "jewish", "judaism", "muslim", "protection" ]
        }, {
            title: "fa fa-hand-holding",
            searchTerms: []
        }, {
            title: "fa fa-hand-holding-heart",
            searchTerms: []
        }, {
            title: "fa fa-hand-holding-usd",
            searchTerms: [ "$", "dollar sign", "donation", "giving", "money", "price" ]
        }, {
            title: "fa fa-hand-lizard",
            searchTerms: []
        }, {
            title: "fa fa-hand-lizard",
            searchTerms: []
        }, {
            title: "fa fa-hand-paper",
            searchTerms: [ "stop" ]
        }, {
            title: "fa fa-hand-paper",
            searchTerms: [ "stop" ]
        }, {
            title: "fa fa-hand-peace",
            searchTerms: []
        }, {
            title: "fa fa-hand-peace",
            searchTerms: []
        }, {
            title: "fa fa-hand-point-down",
            searchTerms: [ "finger", "hand-o-down", "point" ]
        }, {
            title: "fa fa-hand-point-down",
            searchTerms: [ "finger", "hand-o-down", "point" ]
        }, {
            title: "fa fa-hand-point-left",
            searchTerms: [ "back", "finger", "hand-o-left", "left", "point", "previous" ]
        }, {
            title: "fa fa-hand-point-left",
            searchTerms: [ "back", "finger", "hand-o-left", "left", "point", "previous" ]
        }, {
            title: "fa fa-hand-point-right",
            searchTerms: [ "finger", "forward", "hand-o-right", "next", "point", "right" ]
        }, {
            title: "fa fa-hand-point-right",
            searchTerms: [ "finger", "forward", "hand-o-right", "next", "point", "right" ]
        }, {
            title: "fa fa-hand-point-up",
            searchTerms: [ "finger", "hand-o-up", "point" ]
        }, {
            title: "fa fa-hand-point-up",
            searchTerms: [ "finger", "hand-o-up", "point" ]
        }, {
            title: "fa fa-hand-pointer",
            searchTerms: [ "select" ]
        }, {
            title: "fa fa-hand-pointer",
            searchTerms: [ "select" ]
        }, {
            title: "fa fa-hand-rock",
            searchTerms: []
        }, {
            title: "fa fa-hand-rock",
            searchTerms: []
        }, {
            title: "fa fa-hand-scissors",
            searchTerms: []
        }, {
            title: "fa fa-hand-scissors",
            searchTerms: []
        }, {
            title: "fa fa-hand-spock",
            searchTerms: []
        }, {
            title: "fa fa-hand-spock",
            searchTerms: []
        }, {
            title: "fa fa-hands",
            searchTerms: []
        }, {
            title: "fa fa-hands-helping",
            searchTerms: [ "aid", "assistance", "partnership", "volunteering" ]
        }, {
            title: "fa fa-handshake",
            searchTerms: [ "greeting", "partnership" ]
        }, {
            title: "fa fa-handshake",
            searchTerms: [ "greeting", "partnership" ]
        }, {
            title: "fa fa-hanukiah",
            searchTerms: [ "candle", "hanukkah", "jewish", "judaism", "light" ]
        }, {
            title: "fa fa-hashtag",
            searchTerms: []
        }, {
            title: "fa fa-hat-wizard",
            searchTerms: [ "Dungeons & Dragons", "buckle", "cloth", "clothing", "d&d", "dnd", "fantasy", "halloween", "holiday", "mage", "magic", "pointy", "witch" ]
        }, {
            title: "fa fa-haykal",
            searchTerms: [ "bahai", "bahá'í", "star" ]
        }, {
            title: "fa fa-hdd",
            searchTerms: [ "cpu", "hard drive", "harddrive", "machine", "save", "storage" ]
        }, {
            title: "fa fa-hdd",
            searchTerms: [ "cpu", "hard drive", "harddrive", "machine", "save", "storage" ]
        }, {
            title: "fa fa-heading",
            searchTerms: [ "header" ]
        }, {
            title: "fa fa-headphones",
            searchTerms: [ "audio", "listen", "music", "sound", "speaker" ]
        }, {
            title: "fa fa-headphones-alt",
            searchTerms: [ "audio", "listen", "music", "sound", "speaker" ]
        }, {
            title: "fa fa-headset",
            searchTerms: [ "audio", "gamer", "gaming", "listen", "live chat", "microphone", "shot caller", "sound", "support", "telemarketer" ]
        }, {
            title: "fa fa-heart",
            searchTerms: [ "favorite", "like", "love" ]
        }, {
            title: "fa fa-heart",
            searchTerms: [ "favorite", "like", "love" ]
        }, {
            title: "fa fa-heartbeat",
            searchTerms: [ "ekg", "lifeline", "vital signs" ]
        }, {
            title: "fa fa-helicopter",
            searchTerms: [ "airwolf", "apache", "chopper", "flight", "fly" ]
        }, {
            title: "fa fa-highlighter",
            searchTerms: [ "edit", "marker", "sharpie", "update", "write" ]
        }, {
            title: "fa fa-hiking",
            searchTerms: [ "activity", "backpack", "fall", "fitness", "outdoors", "seasonal", "walking" ]
        }, {
            title: "fa fa-hippo",
            searchTerms: [ "fauna", "hungry", "mammmal" ]
        }, {
            title: "fa fa-hips",
            searchTerms: []
        }, {
            title: "fa fa-hire-a-helper",
            searchTerms: []
        }, {
            title: "fa fa-history",
            searchTerms: []
        }, {
            title: "fa fa-hockey-puck",
            searchTerms: []
        }, {
            title: "fa fa-home",
            searchTerms: [ "house", "main" ]
        }, {
            title: "fa fa-hooli",
            searchTerms: []
        }, {
            title: "fa fa-hornbill",
            searchTerms: []
        }, {
            title: "fa fa-horse",
            searchTerms: [ "equus", "fauna", "mammmal", "neigh" ]
        }, {
            title: "fa fa-hospital",
            searchTerms: [ "building", "emergency room", "medical center" ]
        }, {
            title: "fa fa-hospital",
            searchTerms: [ "building", "emergency room", "medical center" ]
        }, {
            title: "fa fa-hospital-alt",
            searchTerms: [ "building", "emergency room", "medical center" ]
        }, {
            title: "fa fa-hospital-symbol",
            searchTerms: []
        }, {
            title: "fa fa-hot-tub",
            searchTerms: []
        }, {
            title: "fa fa-hotel",
            searchTerms: [ "building", "lodging" ]
        }, {
            title: "fa fa-hotjar",
            searchTerms: []
        }, {
            title: "fa fa-hourglass",
            searchTerms: []
        }, {
            title: "fa fa-hourglass",
            searchTerms: []
        }, {
            title: "fa fa-hourglass-end",
            searchTerms: []
        }, {
            title: "fa fa-hourglass-half",
            searchTerms: []
        }, {
            title: "fa fa-hourglass-start",
            searchTerms: []
        }, {
            title: "fa fa-house-damage",
            searchTerms: [ "devastation", "home" ]
        }, {
            title: "fa fa-houzz",
            searchTerms: []
        }, {
            title: "fa fa-hryvnia",
            searchTerms: [ "money" ]
        }, {
            title: "fa fa-html5",
            searchTerms: []
        }, {
            title: "fa fa-hubspot",
            searchTerms: []
        }, {
            title: "fa fa-i-cursor",
            searchTerms: []
        }, {
            title: "fa fa-id-badge",
            searchTerms: []
        }, {
            title: "fa fa-id-badge",
            searchTerms: []
        }, {
            title: "fa fa-id-card",
            searchTerms: [ "document", "identification", "issued" ]
        }, {
            title: "fa fa-id-card",
            searchTerms: [ "document", "identification", "issued" ]
        }, {
            title: "fa fa-id-card-alt",
            searchTerms: [ "demographics" ]
        }, {
            title: "fa fa-image",
            searchTerms: [ "album", "photo", "picture" ]
        }, {
            title: "fa fa-image",
            searchTerms: [ "album", "photo", "picture" ]
        }, {
            title: "fa fa-images",
            searchTerms: [ "album", "photo", "picture" ]
        }, {
            title: "fa fa-images",
            searchTerms: [ "album", "photo", "picture" ]
        }, {
            title: "fa fa-imdb",
            searchTerms: []
        }, {
            title: "fa fa-inbox",
            searchTerms: []
        }, {
            title: "fa fa-indent",
            searchTerms: []
        }, {
            title: "fa fa-industry",
            searchTerms: [ "factory", "manufacturing" ]
        }, {
            title: "fa fa-infinity",
            searchTerms: []
        }, {
            title: "fa fa-info",
            searchTerms: [ "details", "help", "information", "more" ]
        }, {
            title: "fa fa-info-circle",
            searchTerms: [ "details", "help", "information", "more" ]
        }, {
            title: "fa fa-instagram",
            searchTerms: []
        }, {
            title: "fa fa-internet-explorer",
            searchTerms: [ "browser", "ie" ]
        }, {
            title: "fa fa-ioxhost",
            searchTerms: []
        }, {
            title: "fa fa-italic",
            searchTerms: [ "italics" ]
        }, {
            title: "fa fa-itunes",
            searchTerms: []
        }, {
            title: "fa fa-itunes-note",
            searchTerms: []
        }, {
            title: "fa fa-java",
            searchTerms: []
        }, {
            title: "fa fa-jedi",
            searchTerms: [ "star wars" ]
        }, {
            title: "fa fa-jedi-order",
            searchTerms: [ "star wars" ]
        }, {
            title: "fa fa-jenkins",
            searchTerms: []
        }, {
            title: "fa fa-joget",
            searchTerms: []
        }, {
            title: "fa fa-joint",
            searchTerms: [ "blunt", "cannabis", "doobie", "drugs", "marijuana", "roach", "smoke", "smoking", "spliff" ]
        }, {
            title: "fa fa-joomla",
            searchTerms: []
        }, {
            title: "fa fa-journal-whills",
            searchTerms: [ "book", "jedi", "star wars", "the force" ]
        }, {
            title: "fa fa-js",
            searchTerms: []
        }, {
            title: "fa fa-js-square",
            searchTerms: []
        }, {
            title: "fa fa-jsfiddle",
            searchTerms: []
        }, {
            title: "fa fa-kaaba",
            searchTerms: [ "building", "cube", "islam", "muslim" ]
        }, {
            title: "fa fa-kaggle",
            searchTerms: []
        }, {
            title: "fa fa-key",
            searchTerms: [ "password", "unlock" ]
        }, {
            title: "fa fa-keybase",
            searchTerms: []
        }, {
            title: "fa fa-keyboard",
            searchTerms: [ "input", "type" ]
        }, {
            title: "fa fa-keyboard",
            searchTerms: [ "input", "type" ]
        }, {
            title: "fa fa-keycdn",
            searchTerms: []
        }, {
            title: "fa fa-khanda",
            searchTerms: [ "chakkar", "sikh", "sikhism", "sword" ]
        }, {
            title: "fa fa-kickstarter",
            searchTerms: []
        }, {
            title: "fa fa-kickstarter-k",
            searchTerms: []
        }, {
            title: "fa fa-kiss",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fa fa-kiss",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fa fa-kiss-beam",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fa fa-kiss-beam",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fa fa-kiss-wink-heart",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fa fa-kiss-wink-heart",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fa fa-kiwi-bird",
            searchTerms: [ "bird", "fauna" ]
        }, {
            title: "fa fa-korvue",
            searchTerms: []
        }, {
            title: "fa fa-landmark",
            searchTerms: [ "building", "historic", "memoroable", "politics" ]
        }, {
            title: "fa fa-language",
            searchTerms: [ "dialect", "idiom", "localize", "speech", "translate", "vernacular" ]
        }, {
            title: "fa fa-laptop",
            searchTerms: [ "computer", "cpu", "dell", "demo", "device", "dude you're getting", "mac", "macbook", "machine", "pc" ]
        }, {
            title: "fa fa-laptop-code",
            searchTerms: []
        }, {
            title: "fa fa-laravel",
            searchTerms: []
        }, {
            title: "fa fa-lastfm",
            searchTerms: []
        }, {
            title: "fa fa-lastfm-square",
            searchTerms: []
        }, {
            title: "fa fa-laugh",
            searchTerms: [ "LOL", "emoticon", "face", "laugh" ]
        }, {
            title: "fa fa-laugh",
            searchTerms: [ "LOL", "emoticon", "face", "laugh" ]
        }, {
            title: "fa fa-laugh-beam",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fa fa-laugh-beam",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fa fa-laugh-squint",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fa fa-laugh-squint",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fa fa-laugh-wink",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fa fa-laugh-wink",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fa fa-layer-group",
            searchTerms: [ "layers" ]
        }, {
            title: "fa fa-leaf",
            searchTerms: [ "eco", "flora", "nature", "plant" ]
        }, {
            title: "fa fa-leanpub",
            searchTerms: []
        }, {
            title: "fa fa-lemon",
            searchTerms: [ "food" ]
        }, {
            title: "fa fa-lemon",
            searchTerms: [ "food" ]
        }, {
            title: "fa fa-less",
            searchTerms: []
        }, {
            title: "fa fa-less-than",
            searchTerms: []
        }, {
            title: "fa fa-less-than-equal",
            searchTerms: []
        }, {
            title: "fa fa-level-down-alt",
            searchTerms: [ "level-down" ]
        }, {
            title: "fa fa-level-up-alt",
            searchTerms: [ "level-up" ]
        }, {
            title: "fa fa-life-ring",
            searchTerms: [ "support" ]
        }, {
            title: "fa fa-life-ring",
            searchTerms: [ "support" ]
        }, {
            title: "fa fa-lightbulb",
            searchTerms: [ "idea", "inspiration" ]
        }, {
            title: "fa fa-lightbulb",
            searchTerms: [ "idea", "inspiration" ]
        }, {
            title: "fa fa-line",
            searchTerms: []
        }, {
            title: "fa fa-link",
            searchTerms: [ "chain" ]
        }, {
            title: "fa fa-linkedin",
            searchTerms: [ "linkedin-square" ]
        }, {
            title: "fa fa-linkedin-in",
            searchTerms: [ "linkedin" ]
        }, {
            title: "fa fa-linode",
            searchTerms: []
        }, {
            title: "fa fa-linux",
            searchTerms: [ "tux" ]
        }, {
            title: "fa fa-lira-sign",
            searchTerms: [ "try", "turkish" ]
        }, {
            title: "fa fa-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fa fa-list-alt",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fa fa-list-alt",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fa fa-list-ol",
            searchTerms: [ "checklist", "list", "numbers", "ol", "todo", "ul" ]
        }, {
            title: "fa fa-list-ul",
            searchTerms: [ "checklist", "list", "ol", "todo", "ul" ]
        }, {
            title: "fa fa-location-arrow",
            searchTerms: [ "address", "coordinates", "gps", "location", "map", "place", "where" ]
        }, {
            title: "fa fa-lock",
            searchTerms: [ "admin", "protect", "security" ]
        }, {
            title: "fa fa-lock-open",
            searchTerms: [ "admin", "lock", "open", "password", "protect" ]
        }, {
            title: "fa fa-long-arrow-alt-down",
            searchTerms: [ "long-arrow-down" ]
        }, {
            title: "fa fa-long-arrow-alt-left",
            searchTerms: [ "back", "long-arrow-left", "previous" ]
        }, {
            title: "fa fa-long-arrow-alt-right",
            searchTerms: [ "long-arrow-right" ]
        }, {
            title: "fa fa-long-arrow-alt-up",
            searchTerms: [ "long-arrow-up" ]
        }, {
            title: "fa fa-low-vision",
            searchTerms: []
        }, {
            title: "fa fa-luggage-cart",
            searchTerms: []
        }, {
            title: "fa fa-lyft",
            searchTerms: []
        }, {
            title: "fa fa-magento",
            searchTerms: []
        }, {
            title: "fa fa-magic",
            searchTerms: [ "autocomplete", "automatic", "mage", "magic", "spell", "witch", "wizard" ]
        }, {
            title: "fa fa-magnet",
            searchTerms: []
        }, {
            title: "fa fa-mail-bulk",
            searchTerms: []
        }, {
            title: "fa fa-mailchimp",
            searchTerms: []
        }, {
            title: "fa fa-male",
            searchTerms: [ "human", "man", "person", "profile", "user" ]
        }, {
            title: "fa fa-mandalorian",
            searchTerms: []
        }, {
            title: "fa fa-map",
            searchTerms: [ "coordinates", "location", "paper", "place", "travel" ]
        }, {
            title: "fa fa-map",
            searchTerms: [ "coordinates", "location", "paper", "place", "travel" ]
        }, {
            title: "fa fa-map-marked",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "paper", "pin", "place", "point of interest", "position", "route", "travel", "where" ]
        }, {
            title: "fa fa-map-marked-alt",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "paper", "pin", "place", "point of interest", "position", "route", "travel", "where" ]
        }, {
            title: "fa fa-map-marker",
            searchTerms: [ "address", "coordinates", "gps", "localize", "location", "map", "pin", "place", "position", "travel", "where" ]
        }, {
            title: "fa fa-map-marker-alt",
            searchTerms: [ "address", "coordinates", "gps", "localize", "location", "map", "pin", "place", "position", "travel", "where" ]
        }, {
            title: "fa fa-map-pin",
            searchTerms: [ "address", "coordinates", "gps", "localize", "location", "map", "marker", "place", "position", "travel", "where" ]
        }, {
            title: "fa fa-map-signs",
            searchTerms: []
        }, {
            title: "fa fa-markdown",
            searchTerms: []
        }, {
            title: "fa fa-marker",
            searchTerms: [ "edit", "sharpie", "update", "write" ]
        }, {
            title: "fa fa-mars",
            searchTerms: [ "male" ]
        }, {
            title: "fa fa-mars-double",
            searchTerms: []
        }, {
            title: "fa fa-mars-stroke",
            searchTerms: []
        }, {
            title: "fa fa-mars-stroke-h",
            searchTerms: []
        }, {
            title: "fa fa-mars-stroke-v",
            searchTerms: []
        }, {
            title: "fa fa-mask",
            searchTerms: [ "costume", "disguise", "halloween", "holiday", "secret", "super hero" ]
        }, {
            title: "fa fa-mastodon",
            searchTerms: []
        }, {
            title: "fa fa-maxcdn",
            searchTerms: []
        }, {
            title: "fa fa-medal",
            searchTerms: []
        }, {
            title: "fa fa-medapps",
            searchTerms: []
        }, {
            title: "fa fa-medium",
            searchTerms: []
        }, {
            title: "fa fa-medium-m",
            searchTerms: []
        }, {
            title: "fa fa-medkit",
            searchTerms: [ "first aid", "firstaid", "health", "help", "support" ]
        }, {
            title: "fa fa-medrt",
            searchTerms: []
        }, {
            title: "fa fa-meetup",
            searchTerms: []
        }, {
            title: "fa fa-megaport",
            searchTerms: []
        }, {
            title: "fa fa-meh",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fa fa-meh",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fa fa-meh-blank",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fa fa-meh-blank",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fa fa-meh-rolling-eyes",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fa fa-meh-rolling-eyes",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fa fa-memory",
            searchTerms: [ "DIMM", "RAM" ]
        }, {
            title: "fa fa-menorah",
            searchTerms: [ "candle", "hanukkah", "jewish", "judaism", "light" ]
        }, {
            title: "fa fa-mercury",
            searchTerms: [ "transgender" ]
        }, {
            title: "fa fa-meteor",
            searchTerms: []
        }, {
            title: "fa fa-microchip",
            searchTerms: [ "cpu", "processor" ]
        }, {
            title: "fa fa-microphone",
            searchTerms: [ "record", "sound", "voice" ]
        }, {
            title: "fa fa-microphone-alt",
            searchTerms: [ "record", "sound", "voice" ]
        }, {
            title: "fa fa-microphone-alt-slash",
            searchTerms: [ "disable", "mute", "record", "sound", "voice" ]
        }, {
            title: "fa fa-microphone-slash",
            searchTerms: [ "disable", "mute", "record", "sound", "voice" ]
        }, {
            title: "fa fa-microscope",
            searchTerms: []
        }, {
            title: "fa fa-microsoft",
            searchTerms: []
        }, {
            title: "fa fa-minus",
            searchTerms: [ "collapse", "delete", "hide", "minify", "negative", "remove", "trash" ]
        }, {
            title: "fa fa-minus-circle",
            searchTerms: [ "delete", "hide", "negative", "remove", "trash" ]
        }, {
            title: "fa fa-minus-square",
            searchTerms: [ "collapse", "delete", "hide", "minify", "negative", "remove", "trash" ]
        }, {
            title: "fa fa-minus-square",
            searchTerms: [ "collapse", "delete", "hide", "minify", "negative", "remove", "trash" ]
        }, {
            title: "fa fa-mix",
            searchTerms: []
        }, {
            title: "fa fa-mixcloud",
            searchTerms: []
        }, {
            title: "fa fa-mizuni",
            searchTerms: []
        }, {
            title: "fa fa-mobile",
            searchTerms: [ "apple", "call", "cell phone", "cellphone", "device", "iphone", "number", "screen", "telephone", "text" ]
        }, {
            title: "fa fa-mobile-alt",
            searchTerms: [ "apple", "call", "cell phone", "cellphone", "device", "iphone", "number", "screen", "telephone", "text" ]
        }, {
            title: "fa fa-modx",
            searchTerms: []
        }, {
            title: "fa fa-monero",
            searchTerms: []
        }, {
            title: "fa fa-money-bill",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "fa fa-money-bill-alt",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "fa fa-money-bill-alt",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "fa fa-money-bill-wave",
            searchTerms: []
        }, {
            title: "fa fa-money-bill-wave-alt",
            searchTerms: []
        }, {
            title: "fa fa-money-check",
            searchTerms: [ "bank check", "cheque" ]
        }, {
            title: "fa fa-money-check-alt",
            searchTerms: [ "bank check", "cheque" ]
        }, {
            title: "fa fa-monument",
            searchTerms: [ "building", "historic", "memoroable" ]
        }, {
            title: "fa fa-moon",
            searchTerms: [ "contrast", "crescent", "darker", "lunar", "night" ]
        }, {
            title: "fa fa-moon",
            searchTerms: [ "contrast", "crescent", "darker", "lunar", "night" ]
        }, {
            title: "fa fa-mortar-pestle",
            searchTerms: [ "crush", "culinary", "grind", "medical", "mix", "spices" ]
        }, {
            title: "fa fa-mosque",
            searchTerms: [ "building", "islam", "muslim" ]
        }, {
            title: "fa fa-motorcycle",
            searchTerms: [ "bike", "machine", "transportation", "vehicle" ]
        }, {
            title: "fa fa-mountain",
            searchTerms: []
        }, {
            title: "fa fa-mouse-pointer",
            searchTerms: [ "select" ]
        }, {
            title: "fa fa-music",
            searchTerms: [ "note", "sound" ]
        }, {
            title: "fa fa-napster",
            searchTerms: []
        }, {
            title: "fa fa-neos",
            searchTerms: []
        }, {
            title: "fa fa-network-wired",
            searchTerms: []
        }, {
            title: "fa fa-neuter",
            searchTerms: []
        }, {
            title: "fa fa-newspaper",
            searchTerms: [ "article", "press" ]
        }, {
            title: "fa fa-newspaper",
            searchTerms: [ "article", "press" ]
        }, {
            title: "fa fa-nimblr",
            searchTerms: []
        }, {
            title: "fa fa-nintendo-switch",
            searchTerms: []
        }, {
            title: "fa fa-node",
            searchTerms: []
        }, {
            title: "fa fa-node-js",
            searchTerms: []
        }, {
            title: "fa fa-not-equal",
            searchTerms: []
        }, {
            title: "fa fa-notes-medical",
            searchTerms: []
        }, {
            title: "fa fa-npm",
            searchTerms: []
        }, {
            title: "fa fa-ns8",
            searchTerms: []
        }, {
            title: "fa fa-nutritionix",
            searchTerms: []
        }, {
            title: "fa fa-object-group",
            searchTerms: [ "design" ]
        }, {
            title: "fa fa-object-group",
            searchTerms: [ "design" ]
        }, {
            title: "fa fa-object-ungroup",
            searchTerms: [ "design" ]
        }, {
            title: "fa fa-object-ungroup",
            searchTerms: [ "design" ]
        }, {
            title: "fa fa-odnoklassniki",
            searchTerms: []
        }, {
            title: "fa fa-odnoklassniki-square",
            searchTerms: []
        }, {
            title: "fa fa-oil-can",
            searchTerms: []
        }, {
            title: "fa fa-old-republic",
            searchTerms: [ "politics", "star wars" ]
        }, {
            title: "fa fa-om",
            searchTerms: [ "buddhism", "hinduism", "jainism", "mantra" ]
        }, {
            title: "fa fa-opencart",
            searchTerms: []
        }, {
            title: "fa fa-openid",
            searchTerms: []
        }, {
            title: "fa fa-opera",
            searchTerms: []
        }, {
            title: "fa fa-optin-monster",
            searchTerms: []
        }, {
            title: "fa fa-osi",
            searchTerms: []
        }, {
            title: "fa fa-otter",
            searchTerms: [ "fauna", "mammmal" ]
        }, {
            title: "fa fa-outdent",
            searchTerms: []
        }, {
            title: "fa fa-page4",
            searchTerms: []
        }, {
            title: "fa fa-pagelines",
            searchTerms: [ "eco", "flora", "leaf", "leaves", "nature", "plant", "tree" ]
        }, {
            title: "fa fa-paint-brush",
            searchTerms: []
        }, {
            title: "fa fa-paint-roller",
            searchTerms: [ "brush", "painting", "tool" ]
        }, {
            title: "fa fa-palette",
            searchTerms: [ "colors", "painting" ]
        }, {
            title: "fa fa-palfed",
            searchTerms: []
        }, {
            title: "fa fa-pallet",
            searchTerms: []
        }, {
            title: "fa fa-paper-plane",
            searchTerms: []
        }, {
            title: "fa fa-paper-plane",
            searchTerms: []
        }, {
            title: "fa fa-paperclip",
            searchTerms: [ "attachment" ]
        }, {
            title: "fa fa-parachute-box",
            searchTerms: [ "aid", "assistance", "rescue", "supplies" ]
        }, {
            title: "fa fa-paragraph",
            searchTerms: []
        }, {
            title: "fa fa-parking",
            searchTerms: []
        }, {
            title: "fa fa-passport",
            searchTerms: [ "document", "identification", "issued" ]
        }, {
            title: "fa fa-pastafarianism",
            searchTerms: [ "agnosticism", "atheism", "flying spaghetti monster", "fsm" ]
        }, {
            title: "fa fa-paste",
            searchTerms: [ "clipboard", "copy" ]
        }, {
            title: "fa fa-patreon",
            searchTerms: []
        }, {
            title: "fa fa-pause",
            searchTerms: [ "wait" ]
        }, {
            title: "fa fa-pause-circle",
            searchTerms: []
        }, {
            title: "fa fa-pause-circle",
            searchTerms: []
        }, {
            title: "fa fa-paw",
            searchTerms: [ "animal", "pet" ]
        }, {
            title: "fa fa-paypal",
            searchTerms: []
        }, {
            title: "fa fa-peace",
            searchTerms: []
        }, {
            title: "fa fa-pen",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "fa fa-pen-alt",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "fa fa-pen-fancy",
            searchTerms: [ "design", "edit", "fountain pen", "update", "write" ]
        }, {
            title: "fa fa-pen-nib",
            searchTerms: [ "design", "edit", "fountain pen", "update", "write" ]
        }, {
            title: "fa fa-pen-square",
            searchTerms: [ "edit", "pencil-square", "update", "write" ]
        }, {
            title: "fa fa-pencil-alt",
            searchTerms: [ "design", "edit", "pencil", "update", "write" ]
        }, {
            title: "fa fa-pencil-ruler",
            searchTerms: []
        }, {
            title: "fa fa-penny-arcade",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "game", "gaming", "pax", "tabletop" ]
        }, {
            title: "fa fa-people-carry",
            searchTerms: [ "movers" ]
        }, {
            title: "fa fa-percent",
            searchTerms: []
        }, {
            title: "fa fa-percentage",
            searchTerms: []
        }, {
            title: "fa fa-periscope",
            searchTerms: []
        }, {
            title: "fa fa-person-booth",
            searchTerms: [ "changing", "changing room", "election", "human", "person", "vote", "voting" ]
        }, {
            title: "fa fa-phabricator",
            searchTerms: []
        }, {
            title: "fa fa-phoenix-framework",
            searchTerms: []
        }, {
            title: "fa fa-phoenix-squadron",
            searchTerms: []
        }, {
            title: "fa fa-phone",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "fa fa-phone-slash",
            searchTerms: []
        }, {
            title: "fa fa-phone-square",
            searchTerms: [ "call", "number", "support", "telephone", "voice" ]
        }, {
            title: "fa fa-phone-volume",
            searchTerms: [ "telephone", "volume-control-phone" ]
        }, {
            title: "fa fa-php",
            searchTerms: []
        }, {
            title: "fa fa-pied-piper",
            searchTerms: []
        }, {
            title: "fa fa-pied-piper-alt",
            searchTerms: []
        }, {
            title: "fa fa-pied-piper-hat",
            searchTerms: [ "clothing" ]
        }, {
            title: "fa fa-pied-piper-pp",
            searchTerms: []
        }, {
            title: "fa fa-piggy-bank",
            searchTerms: [ "save", "savings" ]
        }, {
            title: "fa fa-pills",
            searchTerms: [ "drugs", "medicine" ]
        }, {
            title: "fa fa-pinterest",
            searchTerms: []
        }, {
            title: "fa fa-pinterest-p",
            searchTerms: []
        }, {
            title: "fa fa-pinterest-square",
            searchTerms: []
        }, {
            title: "fa fa-place-of-worship",
            searchTerms: []
        }, {
            title: "fa fa-plane",
            searchTerms: [ "airplane", "destination", "fly", "location", "mode", "travel", "trip" ]
        }, {
            title: "fa fa-plane-arrival",
            searchTerms: [ "airplane", "arriving", "destination", "fly", "land", "landing", "location", "mode", "travel", "trip" ]
        }, {
            title: "fa fa-plane-departure",
            searchTerms: [ "airplane", "departing", "destination", "fly", "location", "mode", "take off", "taking off", "travel", "trip" ]
        }, {
            title: "fa fa-play",
            searchTerms: [ "music", "playing", "sound", "start" ]
        }, {
            title: "fa fa-play-circle",
            searchTerms: [ "playing", "start" ]
        }, {
            title: "fa fa-play-circle",
            searchTerms: [ "playing", "start" ]
        }, {
            title: "fa fa-playstation",
            searchTerms: []
        }, {
            title: "fa fa-plug",
            searchTerms: [ "connect", "online", "power" ]
        }, {
            title: "fa fa-plus",
            searchTerms: [ "add", "create", "expand", "new", "positive" ]
        }, {
            title: "fa fa-plus-circle",
            searchTerms: [ "add", "create", "expand", "new", "positive" ]
        }, {
            title: "fa fa-plus-square",
            searchTerms: [ "add", "create", "expand", "new", "positive" ]
        }, {
            title: "fa fa-plus-square",
            searchTerms: [ "add", "create", "expand", "new", "positive" ]
        }, {
            title: "fa fa-podcast",
            searchTerms: []
        }, {
            title: "fa fa-poll",
            searchTerms: [ "results", "survey", "vote", "voting" ]
        }, {
            title: "fa fa-poll-h",
            searchTerms: [ "results", "survey", "vote", "voting" ]
        }, {
            title: "fa fa-poo",
            searchTerms: []
        }, {
            title: "fa fa-poo-storm",
            searchTerms: [ "mess", "poop", "shit" ]
        }, {
            title: "fa fa-poop",
            searchTerms: []
        }, {
            title: "fa fa-portrait",
            searchTerms: []
        }, {
            title: "fa fa-pound-sign",
            searchTerms: [ "gbp" ]
        }, {
            title: "fa fa-power-off",
            searchTerms: [ "on", "reboot", "restart" ]
        }, {
            title: "fa fa-pray",
            searchTerms: []
        }, {
            title: "fa fa-praying-hands",
            searchTerms: []
        }, {
            title: "fa fa-prescription",
            searchTerms: [ "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "fa fa-prescription-bottle",
            searchTerms: [ "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "fa fa-prescription-bottle-alt",
            searchTerms: [ "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "fa fa-print",
            searchTerms: []
        }, {
            title: "fa fa-procedures",
            searchTerms: []
        }, {
            title: "fa fa-product-hunt",
            searchTerms: []
        }, {
            title: "fa fa-project-diagram",
            searchTerms: []
        }, {
            title: "fa fa-pushed",
            searchTerms: []
        }, {
            title: "fa fa-puzzle-piece",
            searchTerms: [ "add-on", "addon", "section" ]
        }, {
            title: "fa fa-python",
            searchTerms: []
        }, {
            title: "fa fa-qq",
            searchTerms: []
        }, {
            title: "fa fa-qrcode",
            searchTerms: [ "scan" ]
        }, {
            title: "fa fa-question",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "fa fa-question-circle",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "fa fa-question-circle",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "fa fa-quidditch",
            searchTerms: []
        }, {
            title: "fa fa-quinscape",
            searchTerms: []
        }, {
            title: "fa fa-quora",
            searchTerms: []
        }, {
            title: "fa fa-quote-left",
            searchTerms: []
        }, {
            title: "fa fa-quote-right",
            searchTerms: []
        }, {
            title: "fa fa-quran",
            searchTerms: [ "book", "islam", "muslim" ]
        }, {
            title: "fa fa-r-project",
            searchTerms: []
        }, {
            title: "fa fa-rainbow",
            searchTerms: []
        }, {
            title: "fa fa-random",
            searchTerms: [ "shuffle", "sort" ]
        }, {
            title: "fa fa-ravelry",
            searchTerms: []
        }, {
            title: "fa fa-react",
            searchTerms: []
        }, {
            title: "fa fa-reacteurope",
            searchTerms: []
        }, {
            title: "fa fa-readme",
            searchTerms: []
        }, {
            title: "fa fa-rebel",
            searchTerms: []
        }, {
            title: "fa fa-receipt",
            searchTerms: [ "check", "invoice", "table" ]
        }, {
            title: "fa fa-recycle",
            searchTerms: []
        }, {
            title: "fa fa-red-river",
            searchTerms: []
        }, {
            title: "fa fa-reddit",
            searchTerms: []
        }, {
            title: "fa fa-reddit-alien",
            searchTerms: []
        }, {
            title: "fa fa-reddit-square",
            searchTerms: []
        }, {
            title: "fa fa-redo",
            searchTerms: [ "forward", "refresh", "reload", "repeat" ]
        }, {
            title: "fa fa-redo-alt",
            searchTerms: [ "forward", "refresh", "reload", "repeat" ]
        }, {
            title: "fa fa-registered",
            searchTerms: []
        }, {
            title: "fa fa-registered",
            searchTerms: []
        }, {
            title: "fa fa-renren",
            searchTerms: []
        }, {
            title: "fa fa-reply",
            searchTerms: []
        }, {
            title: "fa fa-reply-all",
            searchTerms: []
        }, {
            title: "fa fa-replyd",
            searchTerms: []
        }, {
            title: "fa fa-republican",
            searchTerms: [ "american", "conservative", "election", "elephant", "politics", "republican party", "right", "right-wing", "usa" ]
        }, {
            title: "fa fa-researchgate",
            searchTerms: []
        }, {
            title: "fa fa-resolving",
            searchTerms: []
        }, {
            title: "fa fa-retweet",
            searchTerms: [ "refresh", "reload", "share", "swap" ]
        }, {
            title: "fa fa-rev",
            searchTerms: []
        }, {
            title: "fa fa-ribbon",
            searchTerms: [ "badge", "cause", "lapel", "pin" ]
        }, {
            title: "fa fa-ring",
            searchTerms: [ "Dungeons & Dragons", "Gollum", "band", "binding", "d&d", "dnd", "fantasy", "jewelry", "precious" ]
        }, {
            title: "fa fa-road",
            searchTerms: [ "street" ]
        }, {
            title: "fa fa-robot",
            searchTerms: []
        }, {
            title: "fa fa-rocket",
            searchTerms: [ "app" ]
        }, {
            title: "fa fa-rocketchat",
            searchTerms: []
        }, {
            title: "fa fa-rockrms",
            searchTerms: []
        }, {
            title: "fa fa-route",
            searchTerms: []
        }, {
            title: "fa fa-rss",
            searchTerms: [ "blog" ]
        }, {
            title: "fa fa-rss-square",
            searchTerms: [ "blog", "feed" ]
        }, {
            title: "fa fa-ruble-sign",
            searchTerms: [ "rub" ]
        }, {
            title: "fa fa-ruler",
            searchTerms: []
        }, {
            title: "fa fa-ruler-combined",
            searchTerms: []
        }, {
            title: "fa fa-ruler-horizontal",
            searchTerms: []
        }, {
            title: "fa fa-ruler-vertical",
            searchTerms: []
        }, {
            title: "fa fa-running",
            searchTerms: [ "jog", "sprint" ]
        }, {
            title: "fa fa-rupee-sign",
            searchTerms: [ "indian", "inr" ]
        }, {
            title: "fa fa-sad-cry",
            searchTerms: [ "emoticon", "face", "tear", "tears" ]
        }, {
            title: "fa fa-sad-cry",
            searchTerms: [ "emoticon", "face", "tear", "tears" ]
        }, {
            title: "fa fa-sad-tear",
            searchTerms: [ "emoticon", "face", "tear", "tears" ]
        }, {
            title: "fa fa-sad-tear",
            searchTerms: [ "emoticon", "face", "tear", "tears" ]
        }, {
            title: "fa fa-safari",
            searchTerms: [ "browser" ]
        }, {
            title: "fa fa-sass",
            searchTerms: []
        }, {
            title: "fa fa-save",
            searchTerms: [ "floppy", "floppy-o" ]
        }, {
            title: "fa fa-save",
            searchTerms: [ "floppy", "floppy-o" ]
        }, {
            title: "fa fa-schlix",
            searchTerms: []
        }, {
            title: "fa fa-school",
            searchTerms: []
        }, {
            title: "fa fa-screwdriver",
            searchTerms: [ "admin", "fix", "repair", "settings", "tool" ]
        }, {
            title: "fa fa-scribd",
            searchTerms: []
        }, {
            title: "fa fa-scroll",
            searchTerms: [ "Dungeons & Dragons", "announcement", "d&d", "dnd", "fantasy", "paper" ]
        }, {
            title: "fa fa-search",
            searchTerms: [ "bigger", "enlarge", "magnify", "preview", "zoom" ]
        }, {
            title: "fa fa-search-dollar",
            searchTerms: []
        }, {
            title: "fa fa-search-location",
            searchTerms: []
        }, {
            title: "fa fa-search-minus",
            searchTerms: [ "minify", "negative", "smaller", "zoom", "zoom out" ]
        }, {
            title: "fa fa-search-plus",
            searchTerms: [ "bigger", "enlarge", "magnify", "positive", "zoom", "zoom in" ]
        }, {
            title: "fa fa-searchengin",
            searchTerms: []
        }, {
            title: "fa fa-seedling",
            searchTerms: []
        }, {
            title: "fa fa-sellcast",
            searchTerms: [ "eercast" ]
        }, {
            title: "fa fa-sellsy",
            searchTerms: []
        }, {
            title: "fa fa-server",
            searchTerms: [ "cpu" ]
        }, {
            title: "fa fa-servicestack",
            searchTerms: []
        }, {
            title: "fa fa-shapes",
            searchTerms: [ "circle", "square", "triangle" ]
        }, {
            title: "fa fa-share",
            searchTerms: []
        }, {
            title: "fa fa-share-alt",
            searchTerms: []
        }, {
            title: "fa fa-share-alt-square",
            searchTerms: []
        }, {
            title: "fa fa-share-square",
            searchTerms: [ "send", "social" ]
        }, {
            title: "fa fa-share-square",
            searchTerms: [ "send", "social" ]
        }, {
            title: "fa fa-shekel-sign",
            searchTerms: [ "ils" ]
        }, {
            title: "fa fa-shield-alt",
            searchTerms: [ "achievement", "award", "block", "defend", "security", "winner" ]
        }, {
            title: "fa fa-ship",
            searchTerms: [ "boat", "sea" ]
        }, {
            title: "fa fa-shipping-fast",
            searchTerms: []
        }, {
            title: "fa fa-shirtsinbulk",
            searchTerms: []
        }, {
            title: "fa fa-shoe-prints",
            searchTerms: [ "feet", "footprints", "steps" ]
        }, {
            title: "fa fa-shopping-bag",
            searchTerms: []
        }, {
            title: "fa fa-shopping-basket",
            searchTerms: []
        }, {
            title: "fa fa-shopping-cart",
            searchTerms: [ "buy", "checkout", "payment", "purchase" ]
        }, {
            title: "fa fa-shopware",
            searchTerms: []
        }, {
            title: "fa fa-shower",
            searchTerms: []
        }, {
            title: "fa fa-shuttle-van",
            searchTerms: [ "machine", "public-transportation", "transportation", "vehicle" ]
        }, {
            title: "fa fa-sign",
            searchTerms: []
        }, {
            title: "fa fa-sign-in-alt",
            searchTerms: [ "arrow", "enter", "join", "log in", "login", "sign in", "sign up", "sign-in", "signin", "signup" ]
        }, {
            title: "fa fa-sign-language",
            searchTerms: []
        }, {
            title: "fa fa-sign-out-alt",
            searchTerms: [ "arrow", "exit", "leave", "log out", "logout", "sign-out" ]
        }, {
            title: "fa fa-signal",
            searchTerms: [ "bars", "graph", "online", "status" ]
        }, {
            title: "fa fa-signature",
            searchTerms: [ "John Hancock", "cursive", "name", "writing" ]
        }, {
            title: "fa fa-simplybuilt",
            searchTerms: []
        }, {
            title: "fa fa-sistrix",
            searchTerms: []
        }, {
            title: "fa fa-sitemap",
            searchTerms: [ "directory", "hierarchy", "ia", "information architecture", "organization" ]
        }, {
            title: "fa fa-sith",
            searchTerms: []
        }, {
            title: "fa fa-skull",
            searchTerms: [ "bones", "skeleton", "yorick" ]
        }, {
            title: "fa fa-skull-crossbones",
            searchTerms: [ "Dungeons & Dragons", "alert", "bones", "d&d", "danger", "dead", "deadly", "death", "dnd", "fantasy", "halloween", "holiday", "jolly-roger", "pirate", "poison", "skeleton", "warning" ]
        }, {
            title: "fa fa-skyatlas",
            searchTerms: []
        }, {
            title: "fa fa-skype",
            searchTerms: []
        }, {
            title: "fa fa-slack",
            searchTerms: [ "anchor", "hash", "hashtag" ]
        }, {
            title: "fa fa-slack-hash",
            searchTerms: [ "anchor", "hash", "hashtag" ]
        }, {
            title: "fa fa-slash",
            searchTerms: []
        }, {
            title: "fa fa-sliders-h",
            searchTerms: [ "settings", "sliders" ]
        }, {
            title: "fa fa-slideshare",
            searchTerms: []
        }, {
            title: "fa fa-smile",
            searchTerms: [ "approve", "emoticon", "face", "happy", "rating", "satisfied" ]
        }, {
            title: "fa fa-smile",
            searchTerms: [ "approve", "emoticon", "face", "happy", "rating", "satisfied" ]
        }, {
            title: "fa fa-smile-beam",
            searchTerms: [ "emoticon", "face", "happy", "positive" ]
        }, {
            title: "fa fa-smile-beam",
            searchTerms: [ "emoticon", "face", "happy", "positive" ]
        }, {
            title: "fa fa-smile-wink",
            searchTerms: [ "emoticon", "face", "happy" ]
        }, {
            title: "fa fa-smile-wink",
            searchTerms: [ "emoticon", "face", "happy" ]
        }, {
            title: "fa fa-smog",
            searchTerms: [ "dragon" ]
        }, {
            title: "fa fa-smoking",
            searchTerms: [ "cigarette", "nicotine", "smoking status" ]
        }, {
            title: "fa fa-smoking-ban",
            searchTerms: [ "no smoking", "non-smoking" ]
        }, {
            title: "fa fa-snapchat",
            searchTerms: []
        }, {
            title: "fa fa-snapchat-ghost",
            searchTerms: []
        }, {
            title: "fa fa-snapchat-square",
            searchTerms: []
        }, {
            title: "fa fa-snowflake",
            searchTerms: [ "precipitation", "seasonal", "winter" ]
        }, {
            title: "fa fa-snowflake",
            searchTerms: [ "precipitation", "seasonal", "winter" ]
        }, {
            title: "fa fa-socks",
            searchTerms: [ "business socks", "business time", "flight of the conchords", "wednesday" ]
        }, {
            title: "fa fa-solar-panel",
            searchTerms: [ "clean", "eco-friendly", "energy", "green", "sun" ]
        }, {
            title: "fa fa-sort",
            searchTerms: [ "order" ]
        }, {
            title: "fa fa-sort-alpha-down",
            searchTerms: [ "sort-alpha-asc" ]
        }, {
            title: "fa fa-sort-alpha-up",
            searchTerms: [ "sort-alpha-desc" ]
        }, {
            title: "fa fa-sort-amount-down",
            searchTerms: [ "sort-amount-asc" ]
        }, {
            title: "fa fa-sort-amount-up",
            searchTerms: [ "sort-amount-desc" ]
        }, {
            title: "fa fa-sort-down",
            searchTerms: [ "arrow", "descending", "sort-desc" ]
        }, {
            title: "fa fa-sort-numeric-down",
            searchTerms: [ "numbers", "sort-numeric-asc" ]
        }, {
            title: "fa fa-sort-numeric-up",
            searchTerms: [ "numbers", "sort-numeric-desc" ]
        }, {
            title: "fa fa-sort-up",
            searchTerms: [ "arrow", "ascending", "sort-asc" ]
        }, {
            title: "fa fa-soundcloud",
            searchTerms: []
        }, {
            title: "fa fa-spa",
            searchTerms: [ "flora", "mindfullness", "plant", "wellness" ]
        }, {
            title: "fa fa-space-shuttle",
            searchTerms: [ "astronaut", "machine", "nasa", "rocket", "transportation" ]
        }, {
            title: "fa fa-speakap",
            searchTerms: []
        }, {
            title: "fa fa-spider",
            searchTerms: [ "arachnid", "bug", "charlotte", "crawl", "eight", "halloween", "holiday" ]
        }, {
            title: "fa fa-spinner",
            searchTerms: [ "loading", "progress" ]
        }, {
            title: "fa fa-splotch",
            searchTerms: []
        }, {
            title: "fa fa-spotify",
            searchTerms: []
        }, {
            title: "fa fa-spray-can",
            searchTerms: []
        }, {
            title: "fa fa-square",
            searchTerms: [ "block", "box" ]
        }, {
            title: "fa fa-square",
            searchTerms: [ "block", "box" ]
        }, {
            title: "fa fa-square-full",
            searchTerms: []
        }, {
            title: "fa fa-square-root-alt",
            searchTerms: []
        }, {
            title: "fa fa-squarespace",
            searchTerms: []
        }, {
            title: "fa fa-stack-exchange",
            searchTerms: []
        }, {
            title: "fa fa-stack-overflow",
            searchTerms: []
        }, {
            title: "fa fa-stamp",
            searchTerms: []
        }, {
            title: "fa fa-star",
            searchTerms: [ "achievement", "award", "favorite", "important", "night", "rating", "score" ]
        }, {
            title: "fa fa-star",
            searchTerms: [ "achievement", "award", "favorite", "important", "night", "rating", "score" ]
        }, {
            title: "fa fa-star-and-crescent",
            searchTerms: [ "islam", "muslim" ]
        }, {
            title: "fa fa-star-half",
            searchTerms: [ "achievement", "award", "rating", "score", "star-half-empty", "star-half-full" ]
        }, {
            title: "fa fa-star-half",
            searchTerms: [ "achievement", "award", "rating", "score", "star-half-empty", "star-half-full" ]
        }, {
            title: "fa fa-star-half-alt",
            searchTerms: [ "achievement", "award", "rating", "score", "star-half-empty", "star-half-full" ]
        }, {
            title: "fa fa-star-of-david",
            searchTerms: [ "jewish", "judaism" ]
        }, {
            title: "fa fa-star-of-life",
            searchTerms: []
        }, {
            title: "fa fa-staylinked",
            searchTerms: []
        }, {
            title: "fa fa-steam",
            searchTerms: []
        }, {
            title: "fa fa-steam-square",
            searchTerms: []
        }, {
            title: "fa fa-steam-symbol",
            searchTerms: []
        }, {
            title: "fa fa-step-backward",
            searchTerms: [ "beginning", "first", "previous", "rewind", "start" ]
        }, {
            title: "fa fa-step-forward",
            searchTerms: [ "end", "last", "next" ]
        }, {
            title: "fa fa-stethoscope",
            searchTerms: []
        }, {
            title: "fa fa-sticker-mule",
            searchTerms: []
        }, {
            title: "fa fa-sticky-note",
            searchTerms: []
        }, {
            title: "fa fa-sticky-note",
            searchTerms: []
        }, {
            title: "fa fa-stop",
            searchTerms: [ "block", "box", "square" ]
        }, {
            title: "fa fa-stop-circle",
            searchTerms: []
        }, {
            title: "fa fa-stop-circle",
            searchTerms: []
        }, {
            title: "fa fa-stopwatch",
            searchTerms: [ "time" ]
        }, {
            title: "fa fa-store",
            searchTerms: []
        }, {
            title: "fa fa-store-alt",
            searchTerms: []
        }, {
            title: "fa fa-strava",
            searchTerms: []
        }, {
            title: "fa fa-stream",
            searchTerms: []
        }, {
            title: "fa fa-street-view",
            searchTerms: [ "map" ]
        }, {
            title: "fa fa-strikethrough",
            searchTerms: []
        }, {
            title: "fa fa-stripe",
            searchTerms: []
        }, {
            title: "fa fa-stripe-s",
            searchTerms: []
        }, {
            title: "fa fa-stroopwafel",
            searchTerms: [ "dessert", "food", "sweets", "waffle" ]
        }, {
            title: "fa fa-studiovinari",
            searchTerms: []
        }, {
            title: "fa fa-stumbleupon",
            searchTerms: []
        }, {
            title: "fa fa-stumbleupon-circle",
            searchTerms: []
        }, {
            title: "fa fa-subscript",
            searchTerms: []
        }, {
            title: "fa fa-subway",
            searchTerms: [ "machine", "railway", "train", "transportation", "vehicle" ]
        }, {
            title: "fa fa-suitcase",
            searchTerms: [ "baggage", "luggage", "move", "suitcase", "travel", "trip" ]
        }, {
            title: "fa fa-suitcase-rolling",
            searchTerms: []
        }, {
            title: "fa fa-sun",
            searchTerms: [ "brighten", "contrast", "day", "lighter", "sol", "solar", "star", "weather" ]
        }, {
            title: "fa fa-sun",
            searchTerms: [ "brighten", "contrast", "day", "lighter", "sol", "solar", "star", "weather" ]
        }, {
            title: "fa fa-superpowers",
            searchTerms: []
        }, {
            title: "fa fa-superscript",
            searchTerms: [ "exponential" ]
        }, {
            title: "fa fa-supple",
            searchTerms: []
        }, {
            title: "fa fa-surprise",
            searchTerms: [ "emoticon", "face", "shocked" ]
        }, {
            title: "fa fa-surprise",
            searchTerms: [ "emoticon", "face", "shocked" ]
        }, {
            title: "fa fa-swatchbook",
            searchTerms: []
        }, {
            title: "fa fa-swimmer",
            searchTerms: [ "athlete", "head", "man", "person", "water" ]
        }, {
            title: "fa fa-swimming-pool",
            searchTerms: [ "ladder", "recreation", "water" ]
        }, {
            title: "fa fa-synagogue",
            searchTerms: [ "building", "jewish", "judaism", "star of david", "temple" ]
        }, {
            title: "fa fa-sync",
            searchTerms: [ "exchange", "refresh", "reload", "rotate", "swap" ]
        }, {
            title: "fa fa-sync-alt",
            searchTerms: [ "refresh", "reload", "rotate" ]
        }, {
            title: "fa fa-syringe",
            searchTerms: [ "immunizations", "needle" ]
        }, {
            title: "fa fa-table",
            searchTerms: [ "data", "excel", "spreadsheet" ]
        }, {
            title: "fa fa-table-tennis",
            searchTerms: []
        }, {
            title: "fa fa-tablet",
            searchTerms: [ "apple", "device", "ipad", "kindle", "screen" ]
        }, {
            title: "fa fa-tablet-alt",
            searchTerms: [ "apple", "device", "ipad", "kindle", "screen" ]
        }, {
            title: "fa fa-tablets",
            searchTerms: [ "drugs", "medicine" ]
        }, {
            title: "fa fa-tachometer-alt",
            searchTerms: [ "dashboard", "tachometer" ]
        }, {
            title: "fa fa-tag",
            searchTerms: [ "label" ]
        }, {
            title: "fa fa-tags",
            searchTerms: [ "labels" ]
        }, {
            title: "fa fa-tape",
            searchTerms: []
        }, {
            title: "fa fa-tasks",
            searchTerms: [ "downloading", "downloads", "loading", "progress", "settings" ]
        }, {
            title: "fa fa-taxi",
            searchTerms: [ "cab", "cabbie", "car", "car service", "lyft", "machine", "transportation", "uber", "vehicle" ]
        }, {
            title: "fa fa-teamspeak",
            searchTerms: []
        }, {
            title: "fa fa-teeth",
            searchTerms: []
        }, {
            title: "fa fa-teeth-open",
            searchTerms: []
        }, {
            title: "fa fa-telegram",
            searchTerms: []
        }, {
            title: "fa fa-telegram-plane",
            searchTerms: []
        }, {
            title: "fa fa-temperature-high",
            searchTerms: [ "mercury", "thermometer", "warm" ]
        }, {
            title: "fa fa-temperature-low",
            searchTerms: [ "cool", "mercury", "thermometer" ]
        }, {
            title: "fa fa-tencent-weibo",
            searchTerms: []
        }, {
            title: "fa fa-terminal",
            searchTerms: [ "code", "command", "console", "prompt" ]
        }, {
            title: "fa fa-text-height",
            searchTerms: []
        }, {
            title: "fa fa-text-width",
            searchTerms: []
        }, {
            title: "fa fa-th",
            searchTerms: [ "blocks", "boxes", "grid", "squares" ]
        }, {
            title: "fa fa-th-large",
            searchTerms: [ "blocks", "boxes", "grid", "squares" ]
        }, {
            title: "fa fa-th-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fa fa-the-red-yeti",
            searchTerms: []
        }, {
            title: "fa fa-theater-masks",
            searchTerms: []
        }, {
            title: "fa fa-themeco",
            searchTerms: []
        }, {
            title: "fa fa-themeisle",
            searchTerms: []
        }, {
            title: "fa fa-thermometer",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "fa fa-thermometer-empty",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "fa fa-thermometer-full",
            searchTerms: [ "fever", "mercury", "status", "temperature" ]
        }, {
            title: "fa fa-thermometer-half",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "fa fa-thermometer-quarter",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "fa fa-thermometer-three-quarters",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "fa fa-think-peaks",
            searchTerms: []
        }, {
            title: "fa fa-thumbs-down",
            searchTerms: [ "disagree", "disapprove", "dislike", "hand", "thumbs-o-down" ]
        }, {
            title: "fa fa-thumbs-down",
            searchTerms: [ "disagree", "disapprove", "dislike", "hand", "thumbs-o-down" ]
        }, {
            title: "fa fa-thumbs-up",
            searchTerms: [ "agree", "approve", "favorite", "hand", "like", "ok", "okay", "success", "thumbs-o-up", "yes", "you got it dude" ]
        }, {
            title: "fa fa-thumbs-up",
            searchTerms: [ "agree", "approve", "favorite", "hand", "like", "ok", "okay", "success", "thumbs-o-up", "yes", "you got it dude" ]
        }, {
            title: "fa fa-thumbtack",
            searchTerms: [ "coordinates", "location", "marker", "pin", "thumb-tack" ]
        }, {
            title: "fa fa-ticket-alt",
            searchTerms: [ "ticket" ]
        }, {
            title: "fa fa-times",
            searchTerms: [ "close", "cross", "error", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fa fa-times-circle",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fa fa-times-circle",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fa fa-tint",
            searchTerms: [ "drop", "droplet", "raindrop", "waterdrop" ]
        }, {
            title: "fa fa-tint-slash",
            searchTerms: []
        }, {
            title: "fa fa-tired",
            searchTerms: [ "emoticon", "face", "grumpy" ]
        }, {
            title: "fa fa-tired",
            searchTerms: [ "emoticon", "face", "grumpy" ]
        }, {
            title: "fa fa-toggle-off",
            searchTerms: [ "switch" ]
        }, {
            title: "fa fa-toggle-on",
            searchTerms: [ "switch" ]
        }, {
            title: "fa fa-toilet-paper",
            searchTerms: [ "bathroom", "halloween", "holiday", "lavatory", "prank", "restroom", "roll" ]
        }, {
            title: "fa fa-toolbox",
            searchTerms: [ "admin", "container", "fix", "repair", "settings", "tools" ]
        }, {
            title: "fa fa-tooth",
            searchTerms: [ "bicuspid", "dental", "molar", "mouth", "teeth" ]
        }, {
            title: "fa fa-torah",
            searchTerms: [ "book", "jewish", "judaism" ]
        }, {
            title: "fa fa-torii-gate",
            searchTerms: [ "building", "shintoism" ]
        }, {
            title: "fa fa-tractor",
            searchTerms: []
        }, {
            title: "fa fa-trade-federation",
            searchTerms: []
        }, {
            title: "fa fa-trademark",
            searchTerms: []
        }, {
            title: "fa fa-traffic-light",
            searchTerms: []
        }, {
            title: "fa fa-train",
            searchTerms: [ "bullet", "locomotive", "railway" ]
        }, {
            title: "fa fa-transgender",
            searchTerms: [ "intersex" ]
        }, {
            title: "fa fa-transgender-alt",
            searchTerms: []
        }, {
            title: "fa fa-trash",
            searchTerms: [ "delete", "garbage", "hide", "remove" ]
        }, {
            title: "fa fa-trash-alt",
            searchTerms: [ "delete", "garbage", "hide", "remove", "trash", "trash-o" ]
        }, {
            title: "fa fa-trash-alt",
            searchTerms: [ "delete", "garbage", "hide", "remove", "trash", "trash-o" ]
        }, {
            title: "fa fa-tree",
            searchTerms: [ "bark", "fall", "flora", "forest", "nature", "plant", "seasonal" ]
        }, {
            title: "fa fa-trello",
            searchTerms: []
        }, {
            title: "fa fa-tripadvisor",
            searchTerms: []
        }, {
            title: "fa fa-trophy",
            searchTerms: [ "achievement", "award", "cup", "game", "winner" ]
        }, {
            title: "fa fa-truck",
            searchTerms: [ "delivery", "shipping" ]
        }, {
            title: "fa fa-truck-loading",
            searchTerms: []
        }, {
            title: "fa fa-truck-monster",
            searchTerms: []
        }, {
            title: "fa fa-truck-moving",
            searchTerms: []
        }, {
            title: "fa fa-truck-pickup",
            searchTerms: []
        }, {
            title: "fa fa-tshirt",
            searchTerms: [ "cloth", "clothing" ]
        }, {
            title: "fa fa-tty",
            searchTerms: []
        }, {
            title: "fa fa-tumblr",
            searchTerms: []
        }, {
            title: "fa fa-tumblr-square",
            searchTerms: []
        }, {
            title: "fa fa-tv",
            searchTerms: [ "computer", "display", "monitor", "television" ]
        }, {
            title: "fa fa-twitch",
            searchTerms: []
        }, {
            title: "fa fa-twitter",
            searchTerms: [ "social network", "tweet" ]
        }, {
            title: "fa fa-twitter-square",
            searchTerms: [ "social network", "tweet" ]
        }, {
            title: "fa fa-typo3",
            searchTerms: []
        }, {
            title: "fa fa-uber",
            searchTerms: []
        }, {
            title: "fa fa-uikit",
            searchTerms: []
        }, {
            title: "fa fa-umbrella",
            searchTerms: [ "protection", "rain" ]
        }, {
            title: "fa fa-umbrella-beach",
            searchTerms: [ "protection", "recreation", "sun" ]
        }, {
            title: "fa fa-underline",
            searchTerms: []
        }, {
            title: "fa fa-undo",
            searchTerms: [ "back", "control z", "exchange", "oops", "return", "rotate", "swap" ]
        }, {
            title: "fa fa-undo-alt",
            searchTerms: [ "back", "control z", "exchange", "oops", "return", "swap" ]
        }, {
            title: "fa fa-uniregistry",
            searchTerms: []
        }, {
            title: "fa fa-universal-access",
            searchTerms: []
        }, {
            title: "fa fa-university",
            searchTerms: [ "bank", "institution" ]
        }, {
            title: "fa fa-unlink",
            searchTerms: [ "chain", "chain-broken", "remove" ]
        }, {
            title: "fa fa-unlock",
            searchTerms: [ "admin", "lock", "password", "protect" ]
        }, {
            title: "fa fa-unlock-alt",
            searchTerms: [ "admin", "lock", "password", "protect" ]
        }, {
            title: "fa fa-untappd",
            searchTerms: []
        }, {
            title: "fa fa-upload",
            searchTerms: [ "export", "publish" ]
        }, {
            title: "fa fa-usb",
            searchTerms: []
        }, {
            title: "fa fa-user",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "fa fa-user",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "fa fa-user-alt",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "fa fa-user-alt-slash",
            searchTerms: []
        }, {
            title: "fa fa-user-astronaut",
            searchTerms: [ "avatar", "clothing", "cosmonaut", "space", "suit" ]
        }, {
            title: "fa fa-user-check",
            searchTerms: []
        }, {
            title: "fa fa-user-circle",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "fa fa-user-circle",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "fa fa-user-clock",
            searchTerms: []
        }, {
            title: "fa fa-user-cog",
            searchTerms: []
        }, {
            title: "fa fa-user-edit",
            searchTerms: []
        }, {
            title: "fa fa-user-friends",
            searchTerms: []
        }, {
            title: "fa fa-user-graduate",
            searchTerms: [ "cap", "clothing", "commencement", "gown", "graduation", "student" ]
        }, {
            title: "fa fa-user-injured",
            searchTerms: [ "cast", "ouch", "sling" ]
        }, {
            title: "fa fa-user-lock",
            searchTerms: []
        }, {
            title: "fa fa-user-md",
            searchTerms: [ "doctor", "job", "medical", "nurse", "occupation", "profile" ]
        }, {
            title: "fa fa-user-minus",
            searchTerms: [ "delete", "negative", "remove" ]
        }, {
            title: "fa fa-user-ninja",
            searchTerms: [ "assassin", "avatar", "dangerous", "deadly", "sneaky" ]
        }, {
            title: "fa fa-user-plus",
            searchTerms: [ "positive", "sign up", "signup" ]
        }, {
            title: "fa fa-user-secret",
            searchTerms: [ "clothing", "coat", "hat", "incognito", "privacy", "spy", "whisper" ]
        }, {
            title: "fa fa-user-shield",
            searchTerms: []
        }, {
            title: "fa fa-user-slash",
            searchTerms: [ "ban", "remove" ]
        }, {
            title: "fa fa-user-tag",
            searchTerms: []
        }, {
            title: "fa fa-user-tie",
            searchTerms: [ "avatar", "business", "clothing", "formal" ]
        }, {
            title: "fa fa-user-times",
            searchTerms: [ "archive", "delete", "remove", "x" ]
        }, {
            title: "fa fa-users",
            searchTerms: [ "people", "persons", "profiles" ]
        }, {
            title: "fa fa-users-cog",
            searchTerms: []
        }, {
            title: "fa fa-ussunnah",
            searchTerms: []
        }, {
            title: "fa fa-utensil-spoon",
            searchTerms: [ "spoon" ]
        }, {
            title: "fa fa-utensils",
            searchTerms: [ "cutlery", "dinner", "eat", "food", "knife", "restaurant", "spoon" ]
        }, {
            title: "fa fa-vaadin",
            searchTerms: []
        }, {
            title: "fa fa-vector-square",
            searchTerms: [ "anchors", "lines", "object" ]
        }, {
            title: "fa fa-venus",
            searchTerms: [ "female" ]
        }, {
            title: "fa fa-venus-double",
            searchTerms: []
        }, {
            title: "fa fa-venus-mars",
            searchTerms: []
        }, {
            title: "fa fa-viacoin",
            searchTerms: []
        }, {
            title: "fa fa-viadeo",
            searchTerms: []
        }, {
            title: "fa fa-viadeo-square",
            searchTerms: []
        }, {
            title: "fa fa-vial",
            searchTerms: [ "test tube" ]
        }, {
            title: "fa fa-vials",
            searchTerms: [ "lab results", "test tubes" ]
        }, {
            title: "fa fa-viber",
            searchTerms: []
        }, {
            title: "fa fa-video",
            searchTerms: [ "camera", "film", "movie", "record", "video-camera" ]
        }, {
            title: "fa fa-video-slash",
            searchTerms: []
        }, {
            title: "fa fa-vihara",
            searchTerms: [ "buddhism", "buddhist", "building", "monastery" ]
        }, {
            title: "fa fa-vimeo",
            searchTerms: []
        }, {
            title: "fa fa-vimeo-square",
            searchTerms: []
        }, {
            title: "fa fa-vimeo-v",
            searchTerms: [ "vimeo" ]
        }, {
            title: "fa fa-vine",
            searchTerms: []
        }, {
            title: "fa fa-vk",
            searchTerms: []
        }, {
            title: "fa fa-vnv",
            searchTerms: []
        }, {
            title: "fa fa-volleyball-ball",
            searchTerms: []
        }, {
            title: "fa fa-volume-down",
            searchTerms: [ "audio", "lower", "music", "quieter", "sound", "speaker" ]
        }, {
            title: "fa fa-volume-mute",
            searchTerms: []
        }, {
            title: "fa fa-volume-off",
            searchTerms: [ "audio", "music", "mute", "sound" ]
        }, {
            title: "fa fa-volume-up",
            searchTerms: [ "audio", "higher", "louder", "music", "sound", "speaker" ]
        }, {
            title: "fa fa-vote-yea",
            searchTerms: [ "accept", "cast", "election", "politics", "positive", "yes" ]
        }, {
            title: "fa fa-vr-cardboard",
            searchTerms: [ "google", "reality", "virtual" ]
        }, {
            title: "fa fa-vuejs",
            searchTerms: []
        }, {
            title: "fa fa-walking",
            searchTerms: []
        }, {
            title: "fa fa-wallet",
            searchTerms: []
        }, {
            title: "fa fa-warehouse",
            searchTerms: []
        }, {
            title: "fa fa-water",
            searchTerms: []
        }, {
            title: "fa fa-weebly",
            searchTerms: []
        }, {
            title: "fa fa-weibo",
            searchTerms: []
        }, {
            title: "fa fa-weight",
            searchTerms: [ "measurement", "scale", "weight" ]
        }, {
            title: "fa fa-weight-hanging",
            searchTerms: [ "anvil", "heavy", "measurement" ]
        }, {
            title: "fa fa-weixin",
            searchTerms: []
        }, {
            title: "fa fa-whatsapp",
            searchTerms: []
        }, {
            title: "fa fa-whatsapp-square",
            searchTerms: []
        }, {
            title: "fa fa-wheelchair",
            searchTerms: [ "handicap", "person" ]
        }, {
            title: "fa fa-whmcs",
            searchTerms: []
        }, {
            title: "fa fa-wifi",
            searchTerms: []
        }, {
            title: "fa fa-wikipedia-w",
            searchTerms: []
        }, {
            title: "fa fa-wind",
            searchTerms: [ "air", "blow", "breeze", "fall", "seasonal" ]
        }, {
            title: "fa fa-window-close",
            searchTerms: []
        }, {
            title: "fa fa-window-close",
            searchTerms: []
        }, {
            title: "fa fa-window-maximize",
            searchTerms: []
        }, {
            title: "fa fa-window-maximize",
            searchTerms: []
        }, {
            title: "fa fa-window-minimize",
            searchTerms: []
        }, {
            title: "fa fa-window-minimize",
            searchTerms: []
        }, {
            title: "fa fa-window-restore",
            searchTerms: []
        }, {
            title: "fa fa-window-restore",
            searchTerms: []
        }, {
            title: "fa fa-windows",
            searchTerms: [ "microsoft" ]
        }, {
            title: "fa fa-wine-bottle",
            searchTerms: [ "alcohol", "beverage", "drink", "glass", "grapes" ]
        }, {
            title: "fa fa-wine-glass",
            searchTerms: [ "alcohol", "beverage", "drink", "grapes" ]
        }, {
            title: "fa fa-wine-glass-alt",
            searchTerms: [ "alcohol", "beverage", "drink", "grapes" ]
        }, {
            title: "fa fa-wix",
            searchTerms: []
        }, {
            title: "fa fa-wizards-of-the-coast",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "game", "gaming", "tabletop" ]
        }, {
            title: "fa fa-wolf-pack-battalion",
            searchTerms: []
        }, {
            title: "fa fa-won-sign",
            searchTerms: [ "krw" ]
        }, {
            title: "fa fa-wordpress",
            searchTerms: []
        }, {
            title: "fa fa-wordpress-simple",
            searchTerms: []
        }, {
            title: "fa fa-wpbeginner",
            searchTerms: []
        }, {
            title: "fa fa-wpexplorer",
            searchTerms: []
        }, {
            title: "fa fa-wpforms",
            searchTerms: []
        }, {
            title: "fa fa-wpressr",
            searchTerms: [ "rendact" ]
        }, {
            title: "fa fa-wrench",
            searchTerms: [ "fix", "settings", "spanner", "tool", "update" ]
        }, {
            title: "fa fa-x-ray",
            searchTerms: [ "radiological images", "radiology" ]
        }, {
            title: "fa fa-xbox",
            searchTerms: []
        }, {
            title: "fa fa-xing",
            searchTerms: []
        }, {
            title: "fa fa-xing-square",
            searchTerms: []
        }, {
            title: "fa fa-y-combinator",
            searchTerms: []
        }, {
            title: "fa fa-yahoo",
            searchTerms: []
        }, {
            title: "fa fa-yandex",
            searchTerms: []
        }, {
            title: "fa fa-yandex-international",
            searchTerms: []
        }, {
            title: "fa fa-yelp",
            searchTerms: []
        }, {
            title: "fa fa-yen-sign",
            searchTerms: [ "jpy", "money" ]
        }, {
            title: "fa fa-yin-yang",
            searchTerms: [ "daoism", "opposites", "taoism" ]
        }, {
            title: "fa fa-yoast",
            searchTerms: []
        }, {
            title: "fa fa-youtube",
            searchTerms: [ "film", "video", "youtube-play", "youtube-square" ]
        }, {
            title: "fa fa-youtube-square",
            searchTerms: []
        }, {
            title: "fa fa-zhihu",
            searchTerms: []
        } ]
    });
});