// https://crlcu.github.io/multiselect/
if ("undefined" == typeof jQuery) throw new Error("multiselect requires jQuery");
! function(t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 7) throw new Error("multiselect requires jQuery version 1.7 or higher")
}(jQuery),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function(t) {
   // "use strict";
    var e = function(t) {
        function e(e, o) {
            var i = e.prop("id");
            this.$left = e, this.$right = t(t(o.right).length ? o.right : "#" + i + "_to"), this.actions = {
                $leftAll: t(t(o.leftAll).length ? o.leftAll : "#" + i + "_leftAll"),
                $rightAll: t(t(o.rightAll).length ? o.rightAll : "#" + i + "_rightAll"),
                $leftSelected: t(t(o.leftSelected).length ? o.leftSelected : "#" + i + "_leftSelected"),
                $rightSelected: t(t(o.rightSelected).length ? o.rightSelected : "#" + i + "_rightSelected"),
                $undo: t(t(o.undo).length ? o.undo : "#" + i + "_undo"),
                $redo: t(t(o.redo).length ? o.redo : "#" + i + "_redo")
            }, delete o.leftAll, delete o.leftSelected, delete o.right, delete o.rightAll, delete o.rightSelected, this.options = {
                keepRenderingSort: o.keepRenderingSort,
                submitAllLeft: void 0 !== o.submitAllLeft ? o.submitAllLeft : !0,
                submitAllRight: void 0 !== o.submitAllRight ? o.submitAllRight : !0,
                search: o.search,
                ignoreDisabled: void 0 !== o.ignoreDisabled ? o.ignoreDisabled : !1
            }, delete o.keepRenderingSort, o.submitAllLeft, o.submitAllRight, o.search, o.ignoreDisabled, this.callbacks = o, this.init()
        }
        return e.prototype = {
            init: function() {
                var e = this;
                e.undoStack = [], e.redoStack = [], (e.$left.find("optgroup").length || e.$right.find("optgroup").length) && (e.callbacks.sort = !1, e.options.search = !1), e.options.keepRenderingSort && (e.skipInitSort = !0, e.callbacks.sort !== !1 && (e.callbacks.sort = function(e, o) {
                    return t(e).data("position") > t(o).data("position") ? 1 : -1
                }), e.$left.find("option").each(function(e, o) {
                    t(o).data("position", e)
                }), e.$right.find("option").each(function(e, o) {
                    t(o).data("position", e)
                })), "function" == typeof e.callbacks.startUp && e.callbacks.startUp(e.$left, e.$right), e.skipInitSort || "function" != typeof e.callbacks.sort || (e.$left.mSort(e.callbacks.sort), e.$right.each(function(o, i) {
                    t(i).mSort(e.callbacks.sort)
                })), e.options.search && e.options.search.left && (e.options.search.$left = t(e.options.search.left), e.$left.before(e.options.search.$left)), e.options.search && e.options.search.right && (e.options.search.$right = t(e.options.search.right), e.$right.before(t(e.options.search.$right))), e.events()
            },
            events: function() {
                var e = this;
                e.options.search && e.options.search.$left && e.options.search.$left.on("keyup", function(t) {
                    if (this.value) {
                        e.$left.find('option:search("' + this.value + '")').mShow(), e.$left.find('option:not(:search("' + this.value + '"))').mHide()
                    } else e.$left.find("option").mShow()
                }), e.options.search && e.options.search.$right && e.options.search.$right.on("keyup", function(t) {
                    if (this.value) {
                        e.$right.find('option:search("' + this.value + '")').mShow(), e.$right.find('option:not(:search("' + this.value + '"))').mHide()
                    } else e.$right.find("option").mShow()
                }), e.$right.closest("form").on("submit", function(t) {
                    e.$left.find("option").prop("selected", e.options.submitAllLeft), e.$right.find("option").prop("selected", e.options.submitAllRight)
                }), e.$left.on("dblclick", "option", function(t) {
                    t.preventDefault();
                    var o = e.$left.find("option:selected");
                    o.length && e.moveToRight(o, t)
                }), e.$left.on("keypress", function(t) {
                    if (13 === t.keyCode) {
                        t.preventDefault();
                        var o = e.$left.find("option:selected");
                        o.length && e.moveToRight(o, t)
                    }
                }), e.$right.on("dblclick", "option", function(t) {
                    t.preventDefault();
                    var o = e.$right.find("option:selected");
                    o.length && e.moveToLeft(o, t)
                }), e.$right.on("keydown", function(t) {
                    if (8 === t.keyCode || 46 === t.keyCode) {
                        t.preventDefault();
                        var o = e.$right.find("option:selected");
                        o.length && e.moveToLeft(o, t)
                    }
                }), (navigator.userAgent.match(/MSIE/i) || navigator.userAgent.indexOf("Trident/") > 0 || navigator.userAgent.indexOf("Edge/") > 0) && (e.$left.dblclick(function(t) {
                    e.actions.$rightSelected.trigger("click")
                }), e.$right.dblclick(function(t) {
                    e.actions.$leftSelected.trigger("click")
                })), e.actions.$rightSelected.on("click", function(o) {
                    o.preventDefault();
                    var i = e.$left.find("option:selected");
                    i.length && e.moveToRight(i, o), t(this).blur()
                }), e.actions.$leftSelected.on("click", function(o) {
                    o.preventDefault();
                    var i = e.$right.find("option:selected");
                    i.length && e.moveToLeft(i, o), t(this).blur()
                }), e.actions.$rightAll.on("click", function(o) {
                    o.preventDefault();
                    var i = e.$left.children(":not(span):not(.hidden)");
                    i.length && e.moveToRight(i, o), t(this).blur()
                }), e.actions.$leftAll.on("click", function(o) {
                    o.preventDefault();
                    var i = e.$right.children(":not(span):not(.hidden)");
                    i.length && e.moveToLeft(i, o), t(this).blur()
                }), e.actions.$undo.on("click", function(t) {
                    t.preventDefault(), e.undo(t)
                }), e.actions.$redo.on("click", function(t) {
                    t.preventDefault(), e.redo(t)
                })
            },
            moveToRight: function(e, o, i, n) {
                var r = this;
                return "function" == typeof r.callbacks.moveToRight ? r.callbacks.moveToRight(r, e, o, i, n) : "function" != typeof r.callbacks.beforeMoveToRight || i || r.callbacks.beforeMoveToRight(r.$left, r.$right, e) ? (e.each(function(e, o) {
                    var i = t(o);
                    if (r.options.ignoreDisabled && i.is(":disabled")) return !0;
                    if (i.parent().is("optgroup")) {
                        var n = i.parent(),
                            l = r.$right.find('optgroup[label="' + n.prop("label") + '"]');
                        l.length || (l = n.clone(), l.children().remove()), i = l.append(i), n.removeIfEmpty()
                    }
                    r.$right.move(i)
                }), n || (r.undoStack.push(["right", e]), r.redoStack = []), "function" != typeof r.callbacks.sort || i || r.$right.mSort(r.callbacks.sort), "function" != typeof r.callbacks.afterMoveToRight || i || r.callbacks.afterMoveToRight(r.$left, r.$right, e), r) : !1
            },
            moveToLeft: function(e, o, i, n) {
                var r = this;
                return "function" == typeof r.callbacks.moveToLeft ? r.callbacks.moveToLeft(r, e, o, i, n) : "function" != typeof r.callbacks.beforeMoveToLeft || i || r.callbacks.beforeMoveToLeft(r.$left, r.$right, e) ? (e.each(function(e, o) {
                    var i = t(o);
                    if (i.is("optgroup") || i.parent().is("optgroup")) {
                        var n = i.is("optgroup") ? i : i.parent(),
                            l = r.$left.find('optgroup[label="' + n.prop("label") + '"]');
                        l.length || (l = n.clone(), l.children().remove()), i = l.append(i.is("optgroup") ? i.children() : i), n.removeIfEmpty()
                    }
                    r.$left.move(i)
                }), n || (r.undoStack.push(["left", e]), r.redoStack = []), "function" != typeof r.callbacks.sort || i || r.$left.mSort(r.callbacks.sort), "function" != typeof r.callbacks.afterMoveToLeft || i || r.callbacks.afterMoveToLeft(r.$left, r.$right, e), r) : !1
            },
            undo: function(t) {
                var e = this,
                    o = e.undoStack.pop();
                if (o) switch (e.redoStack.push(o), o[0]) {
                    case "left":
                        e.moveToRight(o[1], t, !1, !0);
                        break;
                    case "right":
                        e.moveToLeft(o[1], t, !1, !0)
                }
            },
            redo: function(t) {
                var e = this,
                    o = e.redoStack.pop();
                if (o) switch (e.undoStack.push(o), o[0]) {
                    case "left":
                        e.moveToLeft(o[1], t, !1, !0);
                        break;
                    case "right":
                        e.moveToRight(o[1], t, !1, !0)
                }
            }
        }, e
    }(t);
    t.multiselect = {
        defaults: {
            startUp: function(t, e) {
                e.find("option").each(function(e, o) {
                    var i = t.find('option[value="' + o.value + '"]'),
                        n = i.parent();
                    i.remove(), "OPTGROUP" == n.prop("tagName") && n.removeIfEmpty()
                })
            },
            beforeMoveToRight: function(t, e, o) {
                return !0
            },
            afterMoveToRight: function(t, e, o) {},
            beforeMoveToLeft: function(t, e, o) {
                return !0
            },
            afterMoveToLeft: function(t, e, o) {},
            sort: function(t, e) {
                return "NA" == t.innerHTML ? 1 : "NA" == e.innerHTML ? -1 : t.innerHTML > e.innerHTML ? 1 : -1
            }
        }
    };
    var o = window.navigator.userAgent,
        i = o.indexOf("MSIE ") + o.indexOf("Trident/") + o.indexOf("Edge/") > -3;
    t.fn.multiselect = function(o) {
        return this.each(function() {
            var i = t(this),
                n = i.data("crlcu.multiselect"),
                r = t.extend({}, t.multiselect.defaults, i.data(), "object" == typeof o && o);
            n || i.data("crlcu.multiselect", n = new e(i, r))
        })
    }, t.fn.move = function(t) {
        return this.append(t).find("option").prop("selected", !1), this
    }, t.fn.removeIfEmpty = function() {
        return this.children().length || this.remove(), this
    }, t.fn.mShow = function() {
        return this.removeClass("hidden").show(), i && this.each(function(e, o) {
            t(o).parent().is("span") && t(o).parent().replaceWith(o), t(o).show()
        }), this
    }, t.fn.mHide = function() {
        return this.addClass("hidden").hide(), i && this.each(function(e, o) {
            t(o).parent().is("span") || t(o).wrap("<span>").hide()
        }), this
    }, t.fn.mSort = function(t) {
        return this.find("option").sort(t).appendTo(this), this
    }, t.expr[":"].search = function(e, o, i) {
        return t(e).text().toUpperCase().indexOf(i[3].toUpperCase()) >= 0
    }
});

jQuery(document).ready(function($) {
    $('#multiselect').multiselect();
    $('#multiselect2').multiselect();
});