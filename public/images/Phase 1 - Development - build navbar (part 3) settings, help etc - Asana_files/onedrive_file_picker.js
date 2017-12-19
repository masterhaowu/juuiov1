/**
 * Copied from https://js.live.net/v7.0/OneDrive.js, unminified through unminify.com.
 *
 * Changed the logic in the following ways:
 * - Sets API object to always set it to window.OneDrive (see commented out
 *   block on line 17). Did this because we don't support the signature of the
 *   define function used in the commented out block, and we were getting the
 *   API object assigned to different places in sand vs. beta/prod. Seems like
 *   the best solution is to consistently set it in one way (i.e. window.OneDrive).
 *
 * - Add a check for the popup failing to open line 1010, and return !1 so that
 *   our supplied error callback gets called.
 *
 * In each case, changes are between // ASANA BEGIN and // END markers.
 * Commented out code is library code, and all other code was added.
 */

//! Copyright (c) Microsoft Corporation. All rights reserved.
var __extends = this && this.__extends || function(e, t) {
      function r() {
        this.constructor = e
      }
      for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
      r.prototype = t.prototype;
      e.prototype = new r
    };
! function(e) {
  // ASANA BEGIN
  // if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
  // else if ("function" == typeof define && define.amd) define([], e);
  // else {
  //   var t;
  //   t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this;
  //   t.OneDrive = e()
  // }
  var t;
  t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this;
  t.OneDrive = e()
  // END
}(function() {
  return function e(t, r, i) {
    function n(s, a) {
      if (!r[s]) {
        if (!t[s]) {
          var l = "function" == typeof require && require;
          if (!a && l) return l(s, !0);
          if (o) return o(s, !0);
          var c = new Error("Cannot find module '" + s + "'");
          throw c.code = "MODULE_NOT_FOUND", c
        }
        var u = r[s] = {
          exports: {}
        };
        t[s][0].call(u.exports, function(e) {
          var r = t[s][1][e];
          return n(r ? r : e)
        }, u, u.exports, e, t, r, i)
      }
      return r[s].exports
    }
    for (var o = "function" == typeof require && require, s = 0; s < i.length; s++) n(i[s]);
    return n
  }({
    1: [function(e, t, r) {
      t.exports = function(e, t, r) {
        "use strict";
        var i = function() {
          function e() {}
          e.ERROR_ACCESS_DENIED = "access_denied";
          e.ERROR_AUTH_REQUIRED = "user_authentication_required";
          e.ERROR_LOGIN_REQUIRED = "login_required";
          e.ERROR_POPUP_OPEN = {
            errorCode: r.popupOpen,
            message: "popup window is already open"
          };
          e.ERROR_WEB_REQUEST = {
            errorCode: r.webRequestFailure,
            message: "web request failed, see console logs for details"
          };
          e.PROTOCOL_HTTP = "HTTP";
          e.PROTOCOL_HTTPS = "HTTPS";
          e.HTTP_GET = "GET";
          e.HTTP_POST = "POST";
          e.HTTP_PUT = "PUT";
          e.LINKTYPE_WEB = "webLink";
          e.LINKTYPE_DOWNLOAD = "downloadLink";
          e.PARAM_ACCESS_TOKEN = "access_token";
          e.PARAM_ERROR = "error";
          e.PARAM_STATE = "state";
          e.PARAM_SDK_STATE = "sdk_state";
          e.PARAM_ID_TOKEN = "id_token";
          e.SDK_VERSION = "js-v2.1";
          e.STATE_AAD_LOGIN = "aad_login";
          e.STATE_AAD_PICKER = "aad_picker";
          e.STATE_MSA_PICKER = "msa_picker";
          e.STATE_OPEN_POPUP = "open_popup";
          e.STATE_GRAPH = "graph";
          e.TYPE_BOOLEAN = "boolean";
          e.TYPE_FUNCTION = "function";
          e.TYPE_OBJECT = "object";
          e.TYPE_STRING = "string";
          e.TYPE_NUMBER = "number";
          e.VROOM_URL = "https://api.onedrive.com/v1.0/";
          e.VROOM_INT_URL = "https://newapi.storage.live-int.com/v1.0/";
          e.GRAPH_URL = "https://graph.microsoft.com/v1.0/";
          e.NONCE_LENGTH = 5;
          e.CUSTOMER_TID = "9188040d-6c67-4c5b-b112-36a304b66dad";
          e.DEFAULT_QUERY_ITEM_PARAMETER = "expand=thumbnails&select=id,name,size,webUrl,folder";
          e.GLOBAL_FUNCTION_PREFIX = "oneDriveFilePicker";
          e.LOGIN_HINT_KEY = "odsdkLoginHint";
          e.LOGIN_HINT_LIFE_SPAN = 864e5;
          e.DOMAIN_HINT_COMMON = "common";
          e.DOMAIN_HINT_AAD = "organizations";
          e.DOMAIN_HINT_MSA = "consumers";
          return e
        }();
        return i
      }(e, r, e("./models/ErrorType"))
    }, {
      "./models/ErrorType": 6
    }],
    2: [function(e, t, r) {
      t.exports = function(e, t, r, i) {
        "use strict";
        var n = function() {
          function e() {}
          e.open = function(e) {
            i.open(e)
          };
          e.save = function(e) {
            i.save(e)
          };
          e.webLink = r.LINKTYPE_WEB;
          e.downloadLink = r.LINKTYPE_DOWNLOAD;
          return e
        }();
        i.onloadInit();
        return n
      }(e, r, e("./Constants"), e("./OneDriveApp"))
    }, {
      "./Constants": 1,
      "./OneDriveApp": 3
    }],
    3: [function(e, t, r) {
      t.exports = function(e, t, r, i, n, o, s, a, l, c, u) {
        "use strict";
        var d = function() {
          function e() {}
          e.onloadInit = function() {
            i.registerErrorObserver(o.clearState);
            r.getScriptInput();
            n.logMessage("initialized");
            var e = l.handleRedirect();
            if (e) {
              var t = c.parsePickerResponse(e),
                  d = e.windowState.options,
                  p = e.windowState.optionsMode;
              d.clientId ? o.clientId = d.clientId : i.throwError("client id is missing in options");
              switch (p) {
                case a[a.open]:
                  var f = new s(d);
                  t.error ? f.handlePickerError(t) : f.handlePickerSuccess(t);
                  break;
                case a[a.save]:
                  var h = new u(d);
                  t.error ? h.handleSaverError(t) : h.handleSaverSuccess(t);
                  break;
                default:
                  i.throwError("invalid value for options.mode: " + p)
              }
            }
          };
          e.open = function(e) {
            if (o.readyCheck()) {
              e || i.throwError("missing picker options");
              n.logMessage("open started");
              var t = new s(e);
              t.launchPicker()
            }
          };
          e.save = function(e) {
            if (o.readyCheck()) {
              e || i.throwError("missing saver options");
              n.logMessage("save started");
              var t = new u(e);
              t.launchSaver()
            }
          };
          return e
        }();
        return d
      }(e, r, e("./utilities/DomUtilities"), e("./utilities/ErrorHandler"), e("./utilities/Logging"), e("./OneDriveState"), e("./utilities/Picker"), e("./models/PickerMode"), e("./utilities/RedirectUtilities"), e("./utilities/ResponseParser"), e("./utilities/Saver"))
    }, {
      "./OneDriveState": 4,
      "./models/PickerMode": 9,
      "./utilities/DomUtilities": 15,
      "./utilities/ErrorHandler": 16,
      "./utilities/Logging": 18,
      "./utilities/Picker": 20,
      "./utilities/RedirectUtilities": 22,
      "./utilities/ResponseParser": 23,
      "./utilities/Saver": 24
    }],
    4: [function(e, t, r) {
      t.exports = function(e, t, r, i) {
        "use strict";
        var n = function() {
          function e() {}
          e.clearState = function() {
            window.name = "";
            e._isSdkReady = !0
          };
          e.readyCheck = function() {
            if (!e._isSdkReady) return !1;
            e._isSdkReady = !1;
            return !0
          };
          e.getODCHost = function() {
            return (e.debug ? "live-int" : "live") + ".com"
          };
          e.getLoginHint = function(t) {
            if (localStorage) {
              var n = JSON.parse(localStorage.getItem(r.LOGIN_HINT_KEY));
              null != n && n[t] && (e.loginHint = n[t])
            } else i.logError("the browser does not support local storage")
          };
          e.updateLoginHint = function(t) {
            if (localStorage) {
              var n = JSON.parse(localStorage.getItem(r.LOGIN_HINT_KEY));
              null == n && (n = {});
              n[t] = e.loginHint;
              localStorage.setItem(r.LOGIN_HINT_KEY, JSON.stringify(n))
            } else i.logError("the browser does not support local storage")
          };
          e.deleteLoghinHint = function(e) {
            if (localStorage) {
              var t = JSON.parse(localStorage.getItem(r.LOGIN_HINT_KEY));
              if (null != t && t[e]) {
                delete t[e];
                localStorage.setItem(r.LOGIN_HINT_KEY, JSON.stringify(t))
              }
            } else i.logError("the browser does not support local storage")
          };
          e.debug = !1;
          e._isSdkReady = !0;
          return e
        }();
        return n
      }(e, r, e("./Constants"), e("./utilities/Logging"))
    }, {
      "./Constants": 1,
      "./utilities/Logging": 18
    }],
    5: [function(e, t, r) {
      t.exports = function(e, t) {
        "use strict";
        var r;
        ! function(e) {
          e[e.filesV2 = 0] = "filesV2";
          e[e.graph_odc = 1] = "graph_odc";
          e[e.graph_odb = 2] = "graph_odb";
          e[e.other = 3] = "other"
        }(r || (r = {}));
        return r
      }(e, r)
    }, {}],
    6: [function(e, t, r) {
      t.exports = function(e, t) {
        "use strict";
        var r;
        ! function(e) {
          e[e.badResponse = 0] = "badResponse";
          e[e.fileReaderFailure = 1] = "fileReaderFailure";
          e[e.popupOpen = 2] = "popupOpen";
          e[e.unknown = 3] = "unknown";
          e[e.unsupportedFeature = 4] = "unsupportedFeature";
          e[e.webRequestFailure = 5] = "webRequestFailure"
        }(r || (r = {}));
        return r
      }(e, r)
    }, {}],
    7: [function(e, t, r) {
      t.exports = function(e, t, r, i, n, o, s, a, l, c) {
        "use strict";
        var u = new RegExp("^[a-fA-F\\d]{8}-([a-fA-F\\d]{4}-){3}[a-fA-F\\d]{12}$"),
            d = function() {
              function e(t) {
                this.openInNewWindow = l.validateType(t.openInNewWindow, i.TYPE_BOOLEAN, !0, !0);
                this.expectGlobalFunction = !this.openInNewWindow;
                if (this.expectGlobalFunction) {
                  this.cancelName = t.cancel;
                  this.errorName = t.error
                }
                var n = l.validateCallback(t.cancel, !0, this.expectGlobalFunction);
                this.cancel = function() {
                  o.logMessage("user cancelled operation");
                  r.invokeAppCallback(n, !0)
                };
                var s = l.validateCallback(t.error, !0, this.expectGlobalFunction);
                this.error = function(e) {
                  o.logError(a.format("error occured - code: '{0}', message: '{1}'", e.errorCode, e.message));
                  r.invokeAppCallback(s, !0, e)
                };
                this.advanced = l.validateType(t.advanced, i.TYPE_OBJECT, !0, {
                  redirectUri: c.trimUrlQuery(window.location.href)
                });
                this.advanced.redirectUri || (this.advanced.redirectUri = c.trimUrlQuery(window.location.href));
                this.advanced.sharePointDoclibUrl && (this.advanced.sharePointDoclibUrl = e.setProtectedInfo(this.advanced.sharePointDoclibUrl));
                this.clientId = l.validateType(t.clientId, i.TYPE_STRING);
                this.isSharePointRedirect = !!this.advanced.sharePointDoclibUrl;
                e.checkClientId(this.clientId)
              }
              e.getProtectedInfo = function(e) {
                if (e) return window.localStorage.getItem(e)
              };
              e.setProtectedInfo = function(e) {
                var t = c.generateNonce();
                window.localStorage.setItem(t, e);
                return t
              };
              e.checkClientId = function(e) {
                if (e) {
                  u.test(e) ? o.logMessage("parsed AAD client id: " + e) : n.throwError(a.format("invalid format for client id '{0}' - AAD: 32 characters (HEX) GUID", e));
                  s.clientId = e
                } else n.throwError("client id is missing in options")
              };
              return e
            }();
        return d
      }(e, r, e("../utilities/CallbackInvoker"), e("../Constants"), e("../utilities/ErrorHandler"), e("../utilities/Logging"), e("../OneDriveState"), e("../utilities/StringUtilities"), e("../utilities/TypeValidators"), e("../utilities/UrlUtilities"))
    }, {
      "../Constants": 1,
      "../OneDriveState": 4,
      "../utilities/CallbackInvoker": 14,
      "../utilities/ErrorHandler": 16,
      "../utilities/Logging": 18,
      "../utilities/StringUtilities": 25,
      "../utilities/TypeValidators": 26,
      "../utilities/UrlUtilities": 27
    }],
    8: [function(e, t, r) {
      t.exports = function(e, t) {
        "use strict";
        var r;
        ! function(e) {
          e[e.download = 0] = "download";
          e[e.query = 1] = "query";
          e[e.share = 2] = "share"
        }(r || (r = {}));
        return r
      }(e, r)
    }, {}],
    9: [function(e, t, r) {
      t.exports = function(e, t) {
        "use strict";
        var r;
        ! function(e) {
          e[e.open = 0] = "open";
          e[e.save = 1] = "save"
        }(r || (r = {}));
        return r
      }(e, r)
    }, {}],
    10: [function(e, t, r) {
      t.exports = function(e, t, r, i, n, o, s, a, l) {
        "use strict";
        var c = function(e) {
          function t(t) {
            e.call(this, t);
            this.expectGlobalFunction && (this.successName = t.success);
            var o = l.validateCallback(t.success, !1, this.expectGlobalFunction);
            this.success = function(e) {
              s.logMessage("picker operation succeeded");
              i.invokeAppCallback(o, !0, e)
            };
            this.multiSelect = l.validateType(t.multiSelect, n.TYPE_BOOLEAN, !0, !1);
            var a = l.validateType(t.action, n.TYPE_STRING);
            this.action = r[a]
          }
          __extends(t, e);
          t.prototype.isSharing = function() {
            return this.action === r.share
          };
          t.prototype.serializeState = function() {
            return {
              optionsMode: a[a.open],
              options: {
                action: r[this.action],
                advanced: this.advanced,
                clientId: this.clientId,
                isSharePointRedirect: this.isSharePointRedirect,
                success: this.successName,
                cancel: this.cancelName,
                error: this.errorName,
                multiSelect: this.multiSelect,
                openInNewWindow: this.openInNewWindow
              }
            }
          };
          return t
        }(o);
        return c
      }(e, r, e("./PickerActionType"), e("../utilities/CallbackInvoker"), e("../Constants"), e("./InvokerOptions"), e("../utilities/Logging"), e("./PickerMode"), e("../utilities/TypeValidators"))
    }, {
      "../Constants": 1,
      "../utilities/CallbackInvoker": 14,
      "../utilities/Logging": 18,
      "../utilities/TypeValidators": 26,
      "./InvokerOptions": 7,
      "./PickerActionType": 8,
      "./PickerMode": 9
    }],
    11: [function(e, t, r) {
      t.exports = function(e, t) {
        "use strict";
        var r;
        ! function(e) {
          e[e.save = 0] = "save";
          e[e.query = 1] = "query"
        }(r || (r = {}));
        return r
      }(e, r)
    }, {}],
    12: [function(e, t, r) {
      t.exports = function(e, t, r, i, n, o, s, a, l, c, u, d, p, f) {
        "use strict";
        var h = 104857600,
            g = "100 MB",
            _ = function(e) {
              function t(t) {
                e.call(this, t);
                this.invalidFile = !1;
                if (this.expectGlobalFunction) {
                  this.successName = t.success;
                  this.progressName = t.progress
                }
                var n = d.validateCallback(t.success, !1, this.expectGlobalFunction);
                this.success = function(e) {
                  a.logMessage("saver operation succeeded");
                  r.invokeAppCallback(n, !0, e)
                };
                var o = d.validateCallback(t.progress, !0, this.expectGlobalFunction);
                this.progress = function(e) {
                  a.logMessage(u.format("upload progress: {0}%", e));
                  r.invokeAppCallback(o, !1, e)
                };
                var s = d.validateType(t.action, i.TYPE_STRING, !0, "query");
                this.action = c[s];
                this.action === c.save && this._setFileInfo(t)
              }
              __extends(t, e);
              t.prototype.serializeState = function() {
                return {
                  optionsMode: l[l.save],
                  options: {
                    action: c[this.action],
                    advanced: this.advanced,
                    cancel: this.cancelName,
                    clientId: this.clientId,
                    error: this.errorName,
                    fileName: this.fileName,
                    isSharePointRedirect: this.isSharePointRedirect,
                    openInNewWindow: this.openInNewWindow,
                    progress: this.progressName,
                    sourceInputElementId: this.sourceInputElementId,
                    sourceUri: this.sourceUri,
                    success: this.successName
                  }
                }
              };
              t.prototype._setFileInfo = function(e) {
                e.sourceInputElementId && e.sourceUri && o.throwError("Only one type of file to save.");
                this.sourceInputElementId = e.sourceInputElementId;
                this.sourceUri = e.sourceUri;
                var t = d.validateType(e.fileName, i.TYPE_STRING, !0, null);
                if (this.sourceUri) {
                  if (f.isPathFullUrl(this.sourceUri)) {
                    this.uploadType = p.url;
                    this.fileName = t || f.getFileNameFromUrl(this.sourceUri);
                    this.fileName || o.throwError("must supply a file name or a URL that ends with a file name")
                  } else if (f.isPathDataUrl(this.sourceUri)) {
                    this.uploadType = p.dataUrl;
                    this.fileName = t;
                    this.fileName || o.throwError("must supply a file name for data URL uploads")
                  }
                } else if (this.sourceInputElementId) {
                  this.uploadType = p.form;
                  var r = n.getElementById(this.sourceInputElementId);
                  if (r instanceof HTMLInputElement) {
                    "file" !== r.type && o.throwError("input elemenet must be of type 'file'");
                    if (!r.value) {
                      this.error({
                        errorCode: 0,
                        message: "user has not supplied a file to upload"
                      });
                      this.invalidFile = !0;
                      return
                    }
                    var s = r.files;
                    s && window.FileReader || o.throwError("browser does not support Files API");
                    1 !== s.length && o.throwError("can not upload more than one file at a time");
                    var a = s[0];
                    a || o.throwError("missing file input");
                    if (a.size > h) {
                      this.error({
                        errorCode: 1,
                        message: "the user has selected a file larger than " + g
                      });
                      this.invalidFile = !0;
                      return
                    }
                    this.fileName = t || a.name;
                    this.fileInput = a
                  } else o.throwError("element was not an instance of an HTMLInputElement")
                } else o.throwError("please specified one type of resource to save")
              };
              return t
            }(s);
        return _
      }(e, r, e("../utilities/CallbackInvoker"), e("../Constants"), e("../utilities/DomUtilities"), e("../utilities/ErrorHandler"), e("./InvokerOptions"), e("../utilities/Logging"), e("./PickerMode"), e("./SaverActionType"), e("../utilities/StringUtilities"), e("../utilities/TypeValidators"), e("./UploadType"), e("../utilities/UrlUtilities"))
    }, {
      "../Constants": 1,
      "../utilities/CallbackInvoker": 14,
      "../utilities/DomUtilities": 15,
      "../utilities/ErrorHandler": 16,
      "../utilities/Logging": 18,
      "../utilities/StringUtilities": 25,
      "../utilities/TypeValidators": 26,
      "../utilities/UrlUtilities": 27,
      "./InvokerOptions": 7,
      "./PickerMode": 9,
      "./SaverActionType": 11,
      "./UploadType": 13
    }],
    13: [function(e, t, r) {
      t.exports = function(e, t) {
        "use strict";
        var r;
        ! function(e) {
          e[e.dataUrl = 0] = "dataUrl";
          e[e.form = 1] = "form";
          e[e.url = 2] = "url"
        }(r || (r = {}));
        return r
      }(e, r)
    }, {}],
    14: [function(e, t, r) {
      t.exports = function(e, t, r, i) {
        "use strict";
        var n = function() {
          function e() {}
          e.invokeAppCallback = function(e, t) {
            for (var n = [], o = 2; o < arguments.length; o++) n[o - 2] = arguments[o];
            t && i.clearState();
            typeof e === r.TYPE_FUNCTION && e.apply(null, n)
          };
          e.invokeCallbackAsynchronous = function(e) {
            for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
            window.setTimeout(function() {
              e.apply(null, t)
            }, 0)
          };
          return e
        }();
        return n
      }(e, r, e("../Constants"), e("../OneDriveState"))
    }, {
      "../Constants": 1,
      "../OneDriveState": 4
    }],
    15: [function(e, t, r) {
      t.exports = function(e, t, r, i, n) {
        "use strict";
        var o = "debug",
            s = "enable-logging",
            a = "onedrive-js",
            l = function() {
              function e() {}
              e.getScriptInput = function() {
                var t = e.getElementById(a);
                if (t) {
                  var l = t.getAttribute(s);
                  "true" === l && (r.loggingEnabled = !0);
                  var c = t.getAttribute(o);
                  "true" === c && (i.debug = !0)
                }
                window.localStorage || n.throwError("current browser is not compatible with OneDriveSDK.")
              };
              e.getElementById = function(e) {
                return document.getElementById(e)
              };
              e.onDocumentReady = function(e) {
                "interactive" === document.readyState || "complete" === document.readyState ? e() : document.addEventListener("DOMContentLoaded", e, !1)
              };
              return e
            }();
        return l
      }(e, r, e("./Logging"), e("../OneDriveState"), e("../../onedrive-sdk/utilities/ErrorHandler"))
    }, {
      "../../onedrive-sdk/utilities/ErrorHandler": 16,
      "../OneDriveState": 4,
      "./Logging": 18
    }],
    16: [function(e, t, r) {
      t.exports = function(e, t, r) {
        "use strict";
        var i = "[OneDriveSDK Error] ",
            n = function() {
              function e() {}
              e.registerErrorObserver = function(t) {
                e._errorObservers.push(t)
              };
              e.throwError = function(t) {
                var n = e._errorObservers;
                for (var o in n) try {
                  n[o]()
                } catch (s) {
                  r.logError("exception thrown invoking error observer", s)
                }
                throw new Error(i + t)
              };
              e._errorObservers = [];
              return e
            }();
        return n
      }(e, r, e("./Logging"))
    }, {
      "./Logging": 18
    }],
    17: [function(e, t, r) {
      t.exports = function(e, t, r, i, n, o, s, a, l, c) {
        "use strict";
        var u = 10,
            d = function() {
              function e() {}
              e.callGraphShareBatch = function(t, r, i, o) {
                var s, a = [],
                    l = 0,
                    d = [],
                    p = function(n, o) {
                      for (var l = n; l < o; l++) {
                        var c = function(e, t) {
                              e.permissions = [t];
                              d.push(e);
                              s()
                            },
                            u = function(e) {
                              a.push(e.id);
                              s()
                            };
                        e._callGraphShare(t, r[l], i, c, u)
                      }
                    };
                s = function() {
                  if (++l === r.length) {
                    a.length && n.logMessage(c.format("Create sharing link failed for {0} items", a.length));
                    o(d, a)
                  } else l % u === 0 && p(l, Math.min(r.length, l + u))
                };
                p(0, Math.min(r.length, u))
              };
              e.callGraphGetODC = function(t, u, d, p, f) {
                var h = t.apiEndpoint,
                    g = t.accessToken,
                    _ = t.itemId,
                    v = {
                      Authorization: "bearer " + g
                    };
                switch (h) {
                  case r.graph_odc:
                    break;
                  case r.graph_odb:
                }
                var m = a.appendToPath(t.apiEndpointUrl, "drive/items/" + _),
                    E = new l({
                      url: a.appendQueryStrings(m, u),
                      clientId: s.clientId,
                      method: i.HTTP_GET,
                      apiEndpoint: h,
                      headers: v
                    });
                n.logMessage("performing GET on item with id: " + _);
                E.start(function(r, i) {
                  var s = o.deserializeJSON(r.responseText);
                  "share" === t.action ? e._callGraphShare(t, s, f, function(e, t) {
                    e.webUrl = t.link.webUrl;
                    d(e)
                  }, function() {
                    n.logError(c.format("Create link failed for bundle with id {0}:", s.id));
                    p()
                  }) : d(s)
                }, function(e, t, r) {
                  p()
                })
              };
              e.callGraphGetODB = function(e, t, r, d) {
                var p = e.apiEndpointUrl;
                p += e.sharePointDriveId ? "drives/" + e.sharePointDriveId + "/items" : "drive/items/";
                var f, h = e.apiEndpoint,
                    g = e.accessToken,
                    _ = e.itemIds,
                    v = {
                      Authorization: "bearer " + g,
                      "Cache-Control": "no-cache, no-store, must-revalidate"
                    },
                    m = [],
                    E = 0,
                    T = 0,
                    w = _.length,
                    S = function(e, r) {
                      n.logMessage(c.format("running batch for items {0} - {1}", e + 1, r + 1));
                      for (var u = e; u < r; u++) {
                        var d = _[u],
                            g = a.appendToPath(p, d + "/?" + t),
                            T = new l({
                              url: g,
                              clientId: s.clientId,
                              method: i.HTTP_GET,
                              apiEndpoint: h,
                              headers: v
                            });
                        n.logMessage("performing GET on item with id: " + d);
                        T.start(function(e, t, r) {
                          var i = o.deserializeJSON(e.responseText);
                          m.push(i);
                          f()
                        }, function(e, t, r) {
                          E++;
                          f()
                        })
                      }
                    };
                f = function() {
                  if (++T === w) {
                    if (m.length) {
                      n.logMessage(c.format("GET metadata succeeded for '{0}' items", m.length));
                      r(m)
                    }
                    if (E) {
                      n.logMessage(c.format("GET metadata failed for '{0}' items", E));
                      d(E)
                    }
                  } else T % u === 0 && S(T, Math.min(w, T + u))
                };
                S(0, Math.min(w, u))
              };
              e._callGraphShare = function(e, t, r, a, u) {
                var d = e.apiEndpointUrl + "drive/items/" + t.id + "/" + e.apiActionNamingSpace + ".createLink",
                    p = new l({
                      url: d,
                      clientId: s.clientId,
                      method: i.HTTP_POST,
                      apiEndpoint: e.apiEndpoint,
                      headers: {
                        Authorization: "bearer " + e.accessToken
                      },
                      json: JSON.stringify(r)
                    });
                p.start(function(e, r, i) {
                  n.logMessage(c.format("POST createLink succeeded via path {0}", d));
                  a(t, o.deserializeJSON(e.responseText))
                }, function(e, r, i) {
                  n.logMessage(c.format("POST createLink failed via path {0}", d));
                  u(t)
                })
              };
              return e
            }();
        return d
      }(e, r, e("../models/ApiEndpoint"), e("../Constants"), e("./Logging"), e("./ObjectUtilities"), e("../OneDriveState"), e("./UrlUtilities"), e("./XHR"), e("./StringUtilities"))
    }, {
      "../Constants": 1,
      "../OneDriveState": 4,
      "../models/ApiEndpoint": 5,
      "./Logging": 18,
      "./ObjectUtilities": 19,
      "./StringUtilities": 25,
      "./UrlUtilities": 27,
      "./XHR": 29
    }],
    18: [function(e, t, r) {
      t.exports = function(e, t) {
        "use strict";
        var r = "onedrive_enable_logging",
            i = "[OneDriveSDK] ",
            n = function() {
              function e() {}
              e.logError = function(t) {
                for (var r = [], i = 1; i < arguments.length; i++) r[i - 1] = arguments[i];
                e._log(t, !0, r)
              };
              e.logMessage = function(t) {
                e._log(t, !1)
              };
              e._log = function(t, n) {
                for (var o = [], s = 2; s < arguments.length; s++) o[s - 2] = arguments[s];
                (n || e.loggingEnabled || window[r]) && console.log(i + t, o)
              };
              e.loggingEnabled = !1;
              return e
            }();
        return n
      }(e, r)
    }, {}],
    19: [function(e, t, r) {
      t.exports = function(e, t, r, i) {
        "use strict";
        var n = function() {
          function e() {}
          e.shallowClone = function(e) {
            if (typeof e !== r.TYPE_OBJECT || !e) return null;
            var t = {};
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            return t
          };
          e.deserializeJSON = function(e) {
            var t = null;
            try {
              t = JSON.parse(e)
            } catch (n) {
              i.logError("deserialization error" + n)
            }
            typeof t === r.TYPE_OBJECT && null !== t || (t = {});
            return t
          };
          e.serializeJSON = function(e) {
            return JSON.stringify(e)
          };
          return e
        }();
        return n
      }(e, r, e("../Constants"), e("./Logging"))
    }, {
      "../Constants": 1,
      "./Logging": 18
    }],
    20: [function(e, t, r) {
      t.exports = function(e, t, r, i, n, o, s, a, l, c, u, d, p, f) {
        "use strict";
        var h = function() {
          function e(e) {
            var t = a.shallowClone(e);
            this._pickerOptions = new u(t)
          }
          e.prototype.launchPicker = function() {
            var e = this,
                t = this._pickerOptions,
                i = t.serializeState();
            if (t.openInNewWindow) {
              var n = f.appendQueryStrings(t.advanced.redirectUri, {
                    sdk_state: JSON.stringify(i),
                    state: r.STATE_OPEN_POPUP
                  }),
                  o = new l(n, function(t) {
                    e.handlePickerSuccess(t)
                  }, function(t) {
                    e.handlePickerError(t)
                  });
              o.openPopup() || t.error(r.ERROR_POPUP_OPEN)
            } else d.redirectToAADLogin(t, i)
          };
          e.prototype.handlePickerSuccess = function(e) {
            var t = e.pickerType,
                n = this._pickerOptions,
                o = r.DEFAULT_QUERY_ITEM_PARAMETER;
            n.action === c.query && n.advanced.queryParameters ? o = n.advanced.queryParameters : n.action === c.download && (o += ",@content.downloadUrl");
            switch (t) {
              case r.STATE_MSA_PICKER:
                this._handleMSAOpenResponse(e, o);
                break;
              case r.STATE_AAD_PICKER:
                this._handleAADOpenResponse(e, o);
                break;
              default:
                i.throwError("invalid value for picker type: " + t)
            }
          };
          e.prototype.handlePickerError = function(e) {
            e.error === r.ERROR_ACCESS_DENIED ? this._pickerOptions.cancel() : this._pickerOptions.error({
              errorCode: n.unknown,
              message: "something went wrong: " + e.error
            })
          };
          e.prototype._handleMSAOpenResponse = function(e, t) {
            var i, n, s = this,
                a = this._pickerOptions;
            if (a.action === c.share) {
              i = a.advanced.createLinkParameters || {
                    type: "view"
                  };
              n = function(t) {
                o.callGraphShareBatch(e, t.children, i, function(e, r) {
                  var i = null;
                  a.action === c.share && (a.multiSelect ? i = t.webUrl : e && e[0] && e[0].permissions && e[0].permissions[0] && (i = e[0].permissions[0].link.webUrl));
                  s._handleSuccessResponse({
                    webUrl: i,
                    files: e
                  })
                })
              }
            } else n = function(e) {
              s._handleSuccessResponse({
                webUrl: e.webUrl,
                files: e.children
              }, !0)
            };
            var l = {
              select: "id,webUrl",
              expand: "children(" + t.replace("&", ";") + ")"
            };
            o.callGraphGetODC(e, l, n, function() {
              a.error(r.ERROR_WEB_REQUEST)
            }, i)
          };
          e.prototype._handleAADOpenResponse = function(e, t) {
            var i, n, s = this,
                a = this._pickerOptions;
            if (a.action === c.share) {
              i = a.advanced.createLinkParameters || {
                    type: "view",
                    scope: "organization"
                  };
              n = function(t) {
                o.callGraphShareBatch(e, t, i, function(e, t) {
                  s._handleSuccessResponse({
                    webUrl: null,
                    files: e
                  })
                })
              }
            } else n = function(e) {
              s._handleSuccessResponse({
                webUrl: null,
                files: e
              }, !0)
            };
            o.callGraphGetODB(e, t, n, function() {
              a.error(r.ERROR_WEB_REQUEST)
            })
          };
          e.prototype._handleSuccessResponse = function(e, t) {
            var r = this._pickerOptions,
                i = {
                  webUrl: r.action === c.share ? e.webUrl : null,
                  value: []
                },
                o = e.files;
            o && o.length || r.error({
              errorCode: n.badResponse,
              message: "no files returned"
            });
            s.logMessage(p.format("returning '{0}' files picked", o.length));
            for (var a = 0; a < o.length; a++) {
              var l = o[a];
              i.value.push(l)
            }
            r.success(i)
          };
          return e
        }();
        return h
      }(e, r, e("../Constants"), e("./ErrorHandler"), e("../models/ErrorType"), e("./GraphWrapper"), e("./Logging"), e("./ObjectUtilities"), e("./Popup"), e("../models/PickerActionType"), e("../models/PickerOptions"), e("./RedirectUtilities"), e("./StringUtilities"), e("./UrlUtilities"))
    }, {
      "../Constants": 1,
      "../models/ErrorType": 6,
      "../models/PickerActionType": 8,
      "../models/PickerOptions": 10,
      "./ErrorHandler": 16,
      "./GraphWrapper": 17,
      "./Logging": 18,
      "./ObjectUtilities": 19,
      "./Popup": 21,
      "./RedirectUtilities": 22,
      "./StringUtilities": 25,
      "./UrlUtilities": 27
    }],
    21: [function(e, t, r) {
      t.exports = function(e, t, r, i, n, o) {
        "use strict";
        var s = 800,
            a = 650,
            l = 500,
            c = function() {
              function e(e, t, r) {
                this._messageCallbackInvoked = !1;
                this._url = e;
                this._successCallback = t;
                this._failureCallback = r
              }
              e.canReceiveMessage = function(e) {
                return e.origin === window.location.origin
              };
              e._createPopupFeatures = function() {
                var e = window.screenX + Math.max(window.outerWidth - s, 0) / 2,
                    t = window.screenY + Math.max(window.outerHeight - a, 0) / 2,
                    r = ["width=" + s, "height=" + a, "top=" + t, "left=" + e, "status=no", "resizable=yes", "toolbar=no", "menubar=no", "scrollbars=yes"];
                return r.join(",")
              };
              e.prototype.openPopup = function() {
                if (e._currentPopup && e._currentPopup._isPopupOpen()) return !1;
                window.onedriveReceiveMessage || (window.onedriveReceiveMessage = function(t) {
                  var i = e._currentPopup;
                  if (i && i._isPopupOpen()) {
                    e._currentPopup = null;
                    var n = o.parsePickerResponse(t);
                    i._messageCallbackInvoked = !0;
                    void 0 === n.error ? r.invokeCallbackAsynchronous(i._successCallback, n) : r.invokeCallbackAsynchronous(i._failureCallback, n)
                  }
                });
                this._popup = window.open(this._url, "_blank", e._createPopupFeatures());
                // ASANA BEGIN
                if (null === this._popup) return !1;
                // END
                this._popup.focus();
                this._createPopupPinger();
                e._currentPopup = this;
                return !0
              };
              e.prototype._createPopupPinger = function() {
                var t = this,
                    r = window.setInterval(function() {
                      if (t._isPopupOpen()) t._popup.postMessage("ping", "*");
                      else {
                        window.clearInterval(r);
                        e._currentPopup = null;
                        if (!t._messageCallbackInvoked) {
                          n.logMessage("closed callback");
                          t._failureCallback({
                            error: i.ERROR_ACCESS_DENIED
                          })
                        }
                      }
                    }, l)
              };
              e.prototype._isPopupOpen = function() {
                return null !== this._popup && !this._popup.closed
              };
              return e
            }();
        return c
      }(e, r, e("./CallbackInvoker"), e("../Constants"), e("./Logging"), e("./ResponseParser"))
    }, {
      "../Constants": 1,
      "./CallbackInvoker": 14,
      "./Logging": 18,
      "./ResponseParser": 23
    }],
    22: [function(e, t, r) {
      t.exports = function(e, t, r, i, n, o, s, a, l, c, u, d, p, f, h) {
        "use strict";
        var g = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
            _ = function() {
              function e() {}
              e.redirect = function(e, t, r) {
                void 0 === t && (t = null);
                void 0 === r && (r = null);
                t && p.setWindowState(t, r);
                d.validateUrlProtocol(e);
                window.location.replace(e)
              };
              e.handleRedirect = function() {
                var t = d.readCurrentUrlParameters(),
                    i = p.getWindowState(),
                    s = t[r.PARAM_STATE];
                if (!s) return null;
                o.logMessage("current state: " + s);
                s !== r.STATE_OPEN_POPUP || i.options || (i = JSON.parse(t[r.PARAM_SDK_STATE]));
                var c = i.options,
                    f = i.optionsMode,
                    h = l[f];
                c || n.throwError("missing options from serialized state");
                if (t[r.PARAM_ERROR] === r.ERROR_LOGIN_REQUIRED || t[r.PARAM_ERROR] === r.ERROR_AUTH_REQUIRED) {
                  a.deleteLoghinHint(c.clientId);
                  a.loginHint = null;
                  e.redirectToAADLogin(c, i, !0);
                  return null
                }
                var g = u.validateType(c.openInNewWindow, r.TYPE_BOOLEAN);
                g && e._displayOverlay();
                c.advanced && c.advanced.redirectUri || n.throwError("advanced options is missing");
                d.validateRedirectUrlHost(c.advanced.redirectUri);
                switch (s) {
                  case r.STATE_OPEN_POPUP:
                    e.redirectToAADLogin(c, i);
                    break;
                  case r.STATE_AAD_LOGIN:
                    e._handleAADLogin(t, c, h);
                    break;
                  case r.STATE_MSA_PICKER:
                  case r.STATE_AAD_PICKER:
                    var _ = {
                      windowState: i,
                      queryParameters: t
                    };
                    o.logMessage("sending invoker response");
                    if (!g) return _;
                    e._sendResponse(_);
                    break;
                  default:
                    n.throwError("invalid value for redirect state: " + s)
                }
                return null
              };
              e.redirectToAADLogin = function(t, i, n) {
                t.openInNewWindow || e._displayOverlay();
                var o;
                if (t.isSharePointRedirect) {
                  o = d.appendQueryStrings("https://login.microsoftonline.com/common/oauth2/authorize", {
                    redirect_uri: t.advanced.redirectUri,
                    client_id: t.clientId,
                    response_type: "token",
                    state: r.STATE_AAD_LOGIN,
                    resource: d.getOrigin(h.getProtectedInfo(t.advanced.sharePointDoclibUrl))
                  });
                  t.advanced.loginHint && (o = d.appendQueryString(o, "login_hint", t.advanced.loginHint));
                  e.redirect(o, i)
                } else {
                  t.advanced && t.advanced.loginHint ? a.loginHint = {
                    loginHint: t.advanced.loginHint,
                    timeStamp: (new Date).getTime()
                  } : a.getLoginHint(t.clientId);
                  o = g;
                  !n && a.loginHint && (new Date).getTime() - r.LOGIN_HINT_LIFE_SPAN < a.loginHint.timeStamp && (o = d.appendQueryStrings(o, {
                    login_hint: a.loginHint.loginHint
                  }));
                  o = d.appendQueryStrings(o, {
                    redirect_uri: t.advanced.redirectUri,
                    client_id: t.clientId,
                    scope: "profile openid https://graph.microsoft.com/Files.ReadWrite https://graph.microsoft.com/User.Read",
                    response_mode: "fragment",
                    state: r.STATE_AAD_LOGIN,
                    nonce: d.generateNonce()
                  });
                  o += "&response_type=id_token+token";
                  e.redirect(o, i)
                }
              };
              e._handleAADLogin = function(t, i, o) {
                i.openInNewWindow || e._displayOverlay();
                i.advanced.accessToken && window.localStorage.removeItem(i.advanced.accessToken);
                i.advanced.accessToken = h.setProtectedInfo(t[r.PARAM_ACCESS_TOKEN]);
                if (i.isSharePointRedirect) e._redirectToTenant(i, o, i.openInNewWindow);
                else {
                  var s = t[r.PARAM_ID_TOKEN];
                  s || n.throwError("id_toekn is missing in returned parameters");
                  var l = e._parseTenantId(s);
                  if (l.tid === r.CUSTOMER_TID) {
                    if (l.preferred_username) {
                      a.loginHint = {
                        loginHint: l.preferred_username,
                        timeStamp: (new Date).getTime()
                      };
                      a.updateLoginHint(i.clientId)
                    }
                    e._redirectToODCPicker(i, o)
                  } else {
                    if (l.preferred_username) {
                      a.loginHint = {
                        loginHint: l.preferred_username,
                        timeStamp: (new Date).getTime()
                      };
                      a.updateLoginHint(i.clientId)
                    }
                    e._redirectToTenant(i, o, i.openInNewWindow)
                  }
                }
              };
              e._redirectToODCPicker = function(t, i) {
                var n, o, s;
                switch (i) {
                  case l.open:
                    n = "read";
                    o = "files";
                    s = t.multiSelect ? "multiple" : "single";
                    break;
                  case l.save:
                    n = "readwrite";
                    o = "folders";
                    s = "single"
                }
                var c = "https://login." + a.getODCHost() + "/oauth20_authorize.srf",
                    u = d.appendQueryStrings(c, {
                      client_id: t.clientId,
                      redirect_uri: t.advanced.redirectUri,
                      response_type: "token",
                      scope: "onedrive_onetime.access:" + n + o + "|" + s + "|downloadLink",
                      state: r.STATE_MSA_PICKER
                    });
                e.redirect(u, {
                  options: t,
                  picker: {
                    accessLevel: n,
                    selectionMode: s,
                    viewType: o,
                    filter: t.advanced.filter,
                    linkType: "download"
                  }
                })
              };
              e._redirectToTenant = function(t, i, o) {
                var a = function(r) {
                  var n, o, s;
                  switch (i) {
                    case l.open:
                      n = "read";
                      o = "files";
                      s = t.multiSelect ? "multiple" : "single";
                      break;
                    case l.save:
                      n = "readwrite";
                      o = "folders";
                      s = "single"
                  }
                  e.redirect(r, {
                    picker: {
                      accessLevel: n,
                      selectionMode: s,
                      viewType: o,
                      filter: t.advanced.filter
                    },
                    options: t,
                    ODBParams: {
                      p: "2"
                    }
                  })
                };
                if (t.isSharePointRedirect) {
                  var u = h.getProtectedInfo(t.advanced.sharePointDoclibUrl);
                  u.indexOf("-my") > -1 && (u += "_layouts/onedrive.aspx");
                  d.validateUrlProtocol(u, [r.PROTOCOL_HTTPS]);
                  a(u)
                } else {
                  var p = new f({
                    url: d.appendQueryString(r.GRAPH_URL + "me", "$select", "mySite"),
                    method: r.HTTP_GET,
                    headers: {
                      Authorization: "bearer " + h.getProtectedInfo(t.advanced.accessToken),
                      Accept: "application/json"
                    }
                  });
                  p.start(function(e, t) {
                    var r = s.deserializeJSON(e.responseText);
                    r.mySite ? a(r.mySite + "_layouts/onedrive.aspx") : n.throwError(c.format("Cannot find the personal tenant url, response text: {0}", e.responseText))
                  }, function(t, r, i) {
                    e._handleError(c.format("graph/me request failed, status code: '{0}', response text: '{1}'", f.statusCodeToString(r), t.responseText), o)
                  })
                }
              };
              e._sendResponse = function(t) {
                var r = window.opener;
                if (r.onedriveReceiveMessage) r.onedriveReceiveMessage(t);
                else {
                  o.logError("error in window's opener, pop up will close.");
                  e._handleError("SDK message receiver is undefined.", !0)
                }
                window.close()
              };
              e._handleError = function(t, i) {
                var n = {};
                n[r.PARAM_ERROR] = t;
                if (i) e._sendResponse({
                  queryParameters: n
                });
                else {
                  o.logMessage("error in picker flow, redirecting back to app");
                  n[r.PARAM_STATE] = r.STATE_AAD_PICKER;
                  var s = d.trimUrlQuery(window.location.href);
                  e.redirect(d.appendQueryStrings(s, n))
                }
              };
              e._parseTenantId = function(e) {
                var t = e.split(".")[1];
                if (t) {
                  var r = t.replace("-", "+").replace("_", "/");
                  try {
                    var i = JSON.parse(atob(r));
                    i.tid || n.throwError("tid is missing in parsed open id");
                    i.preferred_username || n.throwError("preferred_username is missing in parsed open id");
                    return i
                  } catch (o) {
                    n.throwError("Base64URL decode and JSON parse of JWT segment failed")
                  }
                }
                n.throwError("Received invalid JWT format token")
              };
              e._displayOverlay = function() {
                var e = document.createElement("div"),
                    t = ["position: fixed", "width: 100%", "height: 100%", "top: 0px", "left: 0px", "background-color: white", "opacity: 1", "z-index: 10000"];
                e.id = "od-overlay";
                e.style.cssText = t.join(";");
                var r = document.createElement("img"),
                    n = ["position: absolute", "top: calc(50% - 40px)", "left: calc(50% - 40px)"];
                r.id = "od-spinner";
                r.src = "https://p.sfx.ms/common/spinner_grey_40_transparent.gif";
                r.style.cssText = n.join(";");
                e.appendChild(r);
                var o = document.createElement("style");
                o.type = "text/css";
                o.innerHTML = "body { visibility: hidden !important; }";
                document.head.appendChild(o);
                i.onDocumentReady(function() {
                  var t = document.body;
                  null !== t ? t.insertBefore(e, t.firstChild) : document.createElement("body").appendChild(e);
                  document.head.removeChild(o)
                })
              };
              return e
            }();
        return _
      }(e, r, e("../Constants"), e("./DomUtilities"), e("./ErrorHandler"), e("./Logging"), e("./ObjectUtilities"), e("../OneDriveState"), e("../models/PickerMode"), e("./StringUtilities"), e("./TypeValidators"), e("./UrlUtilities"), e("./WindowState"), e("./XHR"), e("../models/InvokerOptions"))
    }, {
      "../Constants": 1,
      "../OneDriveState": 4,
      "../models/InvokerOptions": 7,
      "../models/PickerMode": 9,
      "./DomUtilities": 15,
      "./ErrorHandler": 16,
      "./Logging": 18,
      "./ObjectUtilities": 19,
      "./StringUtilities": 25,
      "./TypeValidators": 26,
      "./UrlUtilities": 27,
      "./WindowState": 28,
      "./XHR": 29
    }],
    23: [function(e, t, r) {
      t.exports = function(e, t, r, i, n, o, s, a) {
        "use strict";
        var l = "0000000000000000",
            c = l.length,
            u = new RegExp("^\\w+\\.\\w+:\\w+[\\|\\w+]+:([\\w]+\\!\\d+)(?:\\!(.+))*$"),
            d = function() {
              function e() {}
              e.parsePickerResponse = function(t) {
                o.logMessage("parsing picker response");
                var r = t.windowState;
                r || n.throwError("missing windowState from picker response");
                var s = t.queryParameters;
                s || n.throwError("missing queryParameters from picker response");
                var l = s[i.PARAM_ERROR];
                if (l) return {
                  error: l
                };
                var c, u = s[i.PARAM_STATE];
                if (r.options.advanced.accessToken) {
                  c = a.getProtectedInfo(r.options.advanced.accessToken);
                  window.localStorage.removeItem(r.options.advanced.accessToken)
                }
                var d = {
                  pickerType: u,
                  accessToken: c
                };
                d.action = r.options.action;
                switch (u) {
                  case i.STATE_MSA_PICKER:
                    e._parseMSAResponse(d, s);
                    break;
                  case i.STATE_AAD_PICKER:
                    e._parseAADResponse(d, s, r);
                    break;
                  default:
                    n.throwError("invalid value for picker type: " + u)
                }
                d.accessToken || n.throwError("missing access token");
                d.apiEndpointUrl || n.throwError("missing API endpoint URL");
                return d
              };
              e._parseMSAResponse = function(t, o) {
                t.apiEndpoint = r.graph_odc;
                t.apiEndpointUrl = i.GRAPH_URL;
                t.apiActionNamingSpace = "microsoft.graph";
                var s = o.scope;
                s || n.throwError("missing 'scope' paramter from MSA picker response");
                for (var a, l = s.split(" "), c = 0; c < l.length && !a; c++) a = u.exec(l[c]);
                a || n.throwError("scope was not formatted correctly");
                var d = a[1].split("_"),
                    p = d[1],
                    f = p.indexOf("!"),
                    h = p.substring(0, f),
                    g = p.substring(f),
                    _ = e._leftPadCid(h),
                    v = _ + g;
                t.ownerCid = _;
                t.itemId = v;
                t.authKey = a[2]
              };
              e._parseAADResponse = function(e, t, o) {
                if (o.options.isSharePointRedirect) {
                  e.apiEndpointUrl = s.getOrigin(a.getProtectedInfo(o.options.advanced.sharePointDoclibUrl)) + "_api/v2.0/";
                  e.sharePointDriveId = o.options.advanced.sharePointDriveId;
                  e.apiEndpoint = r.filesV2;
                  e.apiActionNamingSpace = "action";
                  window.localStorage.removeItem(o.options.advanced.sharePointDoclibUrl)
                } else {
                  e.apiEndpoint = r.graph_odb;
                  e.apiEndpointUrl = i.GRAPH_URL + "me/";
                  e.apiActionNamingSpace = "microsoft.graph"
                }
                var l = t["item-id"].split(",");
                l.length || n.throwError("missing item id(s)");
                e.itemIds = l
              };
              e._leftPadCid = function(e) {
                return e.length === c ? e : l.substring(0, c - e.length) + e
              };
              return e
            }();
        return d
      }(e, r, e("../models/ApiEndpoint"), e("../Constants"), e("./ErrorHandler"), e("./Logging"), e("./UrlUtilities"), e("../models/InvokerOptions"))
    }, {
      "../Constants": 1,
      "../models/ApiEndpoint": 5,
      "../models/InvokerOptions": 7,
      "./ErrorHandler": 16,
      "./Logging": 18,
      "./UrlUtilities": 27
    }],
    24: [function(e, t, r) {
      t.exports = function(e, t, r, i, n, o, s, a, l, c, u, d, p, f, h, g, _, v, m) {
        "use strict";
        var E = 1e3,
            T = 5,
            w = function() {
              function e(e) {
                var t = c.shallowClone(e);
                this._saverOptions = new h(t)
              }
              e.prototype.launchSaver = function() {
                var e = this,
                    t = this._saverOptions;
                if (!t.invalidFile) {
                  var r = t.serializeState();
                  if (t.openInNewWindow) {
                    var i = v.appendQueryStrings(t.advanced.redirectUri, {
                          sdk_state: JSON.stringify(r),
                          state: n.STATE_OPEN_POPUP
                        }),
                        o = new d(i, function(t) {
                          e.handleSaverSuccess(t)
                        }, function(t) {
                          e.handleSaverError(t)
                        });
                    o.openPopup() || t.error(n.ERROR_POPUP_OPEN)
                  } else p.redirectToAADLogin(t, r)
                }
              };
              e.prototype.handleSaverSuccess = function(e) {
                var t = this,
                    r = e.pickerType,
                    i = n.DEFAULT_QUERY_ITEM_PARAMETER,
                    s = this._saverOptions;
                s.action === f.query && s.advanced.queryParameters && (i = s.advanced.queryParameters);
                switch (r) {
                  case n.STATE_MSA_PICKER:
                    a.callGraphGetODC(e, {
                      select: "id, webUrl",
                      expand: "children(" + i.replace("&", ";") + ")"
                    }, function(r) {
                      var i = r.children;
                      i || o.throwError("empty API response");
                      var n = i[0];
                      n && 1 === i.length || o.throwError("incorrect number of folders returned");
                      s.action === f.query ? s.success({
                        webUrl: null,
                        value: [n]
                      }) : s.action === f.save && t._executeUpload(e, n)
                    }, function() {
                      s.error(n.ERROR_WEB_REQUEST)
                    });
                    break;
                  case n.STATE_AAD_PICKER:
                    var l = e.itemIds;
                    1 !== l.length && o.throwError("incorrect number of folders returned");
                    var c = l[0];
                    c || (c = "root");
                    u.debug && OneDriveDebug && (OneDriveDebug.accessToken = e.accessToken);
                    s.action === f.query ? a.callGraphGetODB(e, i, function(e) {
                      s.success({
                        webUrl: null,
                        value: [e]
                      })
                    }, function() {
                      s.error(n.ERROR_WEB_REQUEST)
                    }) : this._executeUpload(e, {
                      id: c
                    });
                    break;
                  default:
                    o.throwError("invalid value for picker type: " + r)
                }
              };
              e.prototype.handleSaverError = function(e) {
                e.error === n.ERROR_ACCESS_DENIED ? this._saverOptions.cancel() : this._saverOptions.error({
                  errorCode: s.unknown,
                  message: "something went wrong: " + e.error
                })
              };
              e.prototype._executeUpload = function(e, t) {
                var r = this._saverOptions.uploadType;
                l.logMessage(g.format("beginning '{0}' upload", _[r]));
                var i = e.accessToken;
                switch (r) {
                  case _.dataUrl:
                  case _.url:
                    this._executeUrlUpload(e, t, i, r);
                    break;
                  case _.form:
                    this._executeFormUpload(e, t, i);
                    break;
                  default:
                    o.throwError("invalid value for upload type: " + r)
                }
              };
              e.prototype._executeUrlUpload = function(e, t, r, i) {
                var o = this,
                    a = this._saverOptions;
                if (i !== _.url || e.pickerType !== n.STATE_AAD_PICKER) {
                  var l = v.appendToPath(e.apiEndpointUrl, "drive/items/" + t.id + "/children"),
                      d = {};
                  d.Prefer = "respond-async";
                  d.Authorization = "bearer " + r;
                  var p = {
                    "@microsoft.graph.sourceUrl": a.sourceUri,
                    name: a.fileName,
                    file: {}
                  };
                  p[this._getContentSourceUrl(e.apiEndpoint)] = a.sourceUri;
                  var f = new m({
                    url: l,
                    clientId: u.clientId,
                    method: n.HTTP_POST,
                    headers: d,
                    json: c.serializeJSON(p),
                    apiEndpoint: e.apiEndpoint
                  });
                  f.start(function(t, r) {
                    if (i !== _.dataUrl || 200 !== r && 201 !== r)
                      if (i === _.url && 202 === r) {
                        var l = t.getResponseHeader("Location");
                        l || a.error({
                          errorCode: s.badResponse,
                          message: "missing 'Location' header on response"
                        });
                        o._beginPolling(l, function(t) {
                          o._getCreatedItem(e, t)
                        })
                      } else a.error(n.ERROR_WEB_REQUEST);
                    else {
                      u.debug && OneDriveDebug && (OneDriveDebug.itemUrl = c.deserializeJSON(t.responseText)["@odata.id"]);
                      a.success(c.deserializeJSON(t.responseText))
                    }
                  }, function(e, t, r) {
                    a.error(n.ERROR_WEB_REQUEST)
                  })
                } else a.error({
                  errorCode: s.unsupportedFeature,
                  message: "URL upload not supported for AAD"
                })
              };
              e.prototype._executeFormUpload = function(e, t, r) {
                var i = this._saverOptions,
                    a = i.fileInput,
                    c = null;
                window.File && a instanceof window.File ? c = new FileReader : o.throwError("file reader not supported");
                c.onerror = function(e) {
                  l.logError("failed to read or upload the file", e);
                  i.error({
                    errorCode: s.fileReaderFailure,
                    message: "failed to read or upload the file, see console log for details"
                  })
                };
                c.onload = function(o) {
                  var s = v.appendToPath(e.apiEndpointUrl, "drive/items/" + t.id + "/children('" + i.fileName + "')/content"),
                      a = {};
                  a["@name.conflictBehavior"] = e.pickerType === n.STATE_AAD_PICKER ? "fail" : "rename";
                  var l = {};
                  l.Authorization = "bearer " + r;
                  l["Content-Type"] = "multipart/form-data";
                  var c = new m({
                        url: v.appendQueryStrings(s, a),
                        clientId: u.clientId,
                        headers: l,
                        apiEndpoint: e.apiEndpoint
                      }),
                      d = o.target.result;
                  c.upload(d, function(e, t) {
                    i.success({
                      webUrl: null,
                      value: [JSON.parse(e.responseText)]
                    })
                  }, function(e, t, r) {
                    i.error(n.ERROR_WEB_REQUEST)
                  }, function(e, t) {
                    i.progress(t.progressPercentage)
                  })
                };
                c.readAsArrayBuffer(a)
              };
              e.prototype._beginPolling = function(e, t) {
                l.logMessage("polling for URL upload completion");
                var r = E,
                    o = T,
                    a = {
                      url: e,
                      method: n.HTTP_GET
                    },
                    u = this._saverOptions,
                    d = function() {
                      var e = new m(a);
                      e.start(function(e, a) {
                        switch (a) {
                          case 202:
                            var l = c.deserializeJSON(e.responseText);
                            u.progress(l.percentageComplete);
                            if (!o--) {
                              r *= 2;
                              o = T
                            }
                            i.invokeCallbackAsynchronous(d, r);
                            break;
                          case 200:
                            var p = c.deserializeJSON(e.responseText);
                            u.progress(p.percentageComplete);
                            p.resourceId ? t(p.resourceId) : u.error({
                              errorCode: s.badResponse,
                              message: "missing resourceId in return value: " + p
                            });
                            break;
                          default:
                            u.error(n.ERROR_WEB_REQUEST)
                        }
                      }, function(e, t, r) {
                        u.error(n.ERROR_WEB_REQUEST)
                      })
                    };
                i.invokeCallbackAsynchronous(d, r)
              };
              e.prototype._getContentSourceUrl = function(e) {
                return e === r.graph_odb || r.graph_odc ? "@microsoft.graph.sourceUrl" : "@content.sourceUrl"
              };
              e.prototype._getCreatedItem = function(e, t) {
                var r = this._saverOptions;
                e.itemId = t;
                a.callGraphGetODC(e, {}, function(e) {
                  r.success({
                    webUrl: null,
                    value: [e]
                  })
                }, function() {
                  r.error(n.ERROR_WEB_REQUEST)
                })
              };
              return e
            }();
        return w
      }(e, r, e("../models/ApiEndpoint"), e("./CallbackInvoker"), e("../Constants"), e("./ErrorHandler"), e("../models/ErrorType"), e("./GraphWrapper"), e("./Logging"), e("./ObjectUtilities"), e("../OneDriveState"), e("./Popup"), e("./RedirectUtilities"), e("../models/SaverActionType"), e("../models/SaverOptions"), e("./StringUtilities"), e("../models/UploadType"), e("./UrlUtilities"), e("./XHR"))
    }, {
      "../Constants": 1,
      "../OneDriveState": 4,
      "../models/ApiEndpoint": 5,
      "../models/ErrorType": 6,
      "../models/SaverActionType": 11,
      "../models/SaverOptions": 12,
      "../models/UploadType": 13,
      "./CallbackInvoker": 14,
      "./ErrorHandler": 16,
      "./GraphWrapper": 17,
      "./Logging": 18,
      "./ObjectUtilities": 19,
      "./Popup": 21,
      "./RedirectUtilities": 22,
      "./StringUtilities": 25,
      "./UrlUtilities": 27,
      "./XHR": 29
    }],
    25: [function(e, t, r) {
      t.exports = function(e, t) {
        "use strict";
        var r = /[\{\}]/g,
            i = /\{\d+\}/g,
            n = function() {
              function e() {}
              e.format = function(e) {
                for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                var o = function(e) {
                  var i = t[e.replace(r, "")];
                  null === i && (i = "");
                  return i
                };
                return e.replace(i, o)
              };
              return e
            }();
        return n
      }(e, r)
    }, {}],
    26: [function(e, t, r) {
      t.exports = function(e, t, r, i, n, o, s) {
        "use strict";
        var a = function() {
          function e() {}
          e.validateType = function(t, r, a, l, c) {
            void 0 === a && (a = !1);
            if (void 0 === t) {
              if (a) {
                void 0 === l && i.throwError("default value missing");
                n.logMessage("applying default value: " + l);
                return l
              }
              i.throwError("object was missing and not optional")
            }
            var u = typeof t;
            u !== r && i.throwError(s.format("expected object type: '{0}', actual object type: '{1}'", r, u));
            e._isValidValue(t, c) || i.throwError(s.format("object does not match any valid values: '{0}'", o.serializeJSON(c)));
            return t
          };
          e.validateCallback = function(e, t, n) {
            void 0 === t && (t = !1);
            void 0 === n && (n = !1);
            if (void 0 === e) {
              if (t) return null;
              i.throwError("function was missing and not optional")
            }
            var o = typeof e;
            o !== r.TYPE_STRING && o !== r.TYPE_FUNCTION && i.throwError(s.format("expected function type: 'function | string', actual type: '{0}'", o));
            var a = null;
            if (o === r.TYPE_STRING) {
              var l = window[e];
              typeof l === r.TYPE_FUNCTION ? a = l : i.throwError(s.format("could not find a function with name '{0}' on the window object", e))
            } else n ? i.throwError("expected a global function") : a = e;
            return a
          };
          e._isValidValue = function(e, t) {
            if (!Array.isArray(t)) return !0;
            for (var r in t)
              if (e === t[r]) return !0;
            return !1
          };
          return e
        }();
        return a
      }(e, r, e("../Constants"), e("./ErrorHandler"), e("./Logging"), e("./ObjectUtilities"), e("./StringUtilities"))
    }, {
      "../Constants": 1,
      "./ErrorHandler": 16,
      "./Logging": 18,
      "./ObjectUtilities": 19,
      "./StringUtilities": 25
    }],
    27: [function(e, t, r) {
      t.exports = function(e, t, r, i, n) {
        "use strict";
        var o = function() {
          function e() {}
          e.appendToPath = function(e, t) {
            return e + ("/" !== e.charAt(e.length - 1) ? "/" : "") + t
          };
          e.appendQueryString = function(t, r, i) {
            return e.appendQueryStrings(t, (n = {}, n[r] = i, n));
            var n
          };
          e.appendQueryStrings = function(e, t, r) {
            if (!t || 0 === Object.keys(t).length) return e;
            r ? e += "#" : e.indexOf("?") === -1 ? e += "?" : "&" !== e.charAt(e.length - 1) && (e += "&");
            var i = "";
            for (var o in t) i += (i.length ? "&" : "") + n.format("{0}={1}", encodeURIComponent(o), encodeURIComponent(t[o]));
            return e + i
          };
          e.readCurrentUrlParameters = function() {
            return e.readUrlParameters(window.location.href)
          };
          e.readUrlParameters = function(t) {
            var r = {},
                i = t.indexOf("?") + 1,
                n = t.indexOf("#") + 1;
            if (i > 0) {
              var o = n > i ? n - 1 : t.length;
              e._deserializeParameters(t.substring(i, o), r)
            }
            n > 0 && e._deserializeParameters(t.substring(n), r);
            return r
          };
          e.trimUrlQuery = function(e) {
            var t = ["?", "#"];
            for (var r in t) {
              var i = e.indexOf(t[r]);
              i > 0 && (e = e.substring(0, i))
            }
            return e
          };
          e.getFileNameFromUrl = function(t) {
            var r = e.trimUrlQuery(t);
            return r.substr(r.lastIndexOf("/") + 1)
          };
          e.getOrigin = function(t) {
            return e.appendToPath(t.replace(/^((\w+:)?\/\/[^\/]+\/?).*$/, "$1"), "")
          };
          e.isPathFullUrl = function(e) {
            return 0 === e.indexOf("https://") || 0 === e.indexOf("http://")
          };
          e.isPathDataUrl = function(e) {
            return 0 === e.indexOf("data:")
          };
          e.generateNonce = function() {
            for (var e = "", t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", i = 0; i < r.NONCE_LENGTH; i++) e += t.charAt(Math.floor(Math.random() * t.length));
            return e
          };
          e.validateUrlProtocol = function(e, t) {
            t = t ? t : [r.PROTOCOL_HTTP, r.PROTOCOL_HTTPS];
            for (var n = 0, o = t; n < o.length; n++) {
              var s = o[n];
              if (0 === e.toUpperCase().indexOf(s)) return
            }
            i.throwError("redirect uri does not match any protocol in " + t)
          };
          e.validateRedirectUrlHost = function(t) {
            e.validateUrlProtocol(t);
            if (t.indexOf("://") > -1) {
              var r = t.split("/")[2];
              r !== window.location.host && i.throwError("redirect uri is not in the same domain as picker sdk")
            } else i.throwError("redirect uri is not an absolute url")
          };
          e._deserializeParameters = function(e, t) {
            for (var r = e.split("&"), i = 0; i < r.length; i++) {
              var n = r[i].split("=");
              2 === n.length && (t[decodeURIComponent(n[0])] = decodeURIComponent(n[1]))
            }
          };
          return e
        }();
        return o
      }(e, r, e("../Constants"), e("./ErrorHandler"), e("./StringUtilities"))
    }, {
      "../Constants": 1,
      "./ErrorHandler": 16,
      "./StringUtilities": 25
    }],
    28: [function(e, t, r) {
      t.exports = function(e, t, r, i) {
        "use strict";
        var n = function() {
          function e() {}
          e.getWindowState = function() {
            return i.deserializeJSON(window.name || "{}")
          };
          e.setWindowState = function(t, n) {
            void 0 === n && (n = null);
            null === n && (n = e.getWindowState());
            for (var o in t) n[o] = t[o];
            var s = i.serializeJSON(n);
            r.logMessage("window.name = " + s);
            window.name = s
          };
          return e
        }();
        return n
      }(e, r, e("./Logging"), e("./ObjectUtilities"))
    }, {
      "./Logging": 18,
      "./ObjectUtilities": 19
    }],
    29: [function(e, t, r) {
      t.exports = function(e, t, r, i, n, o, s) {
        "use strict";
        var a = 3e4,
            l = -1,
            c = -2,
            u = -3,
            d = function() {
              function e(e) {
                this._url = e.url;
                this._json = e.json;
                this._headers = e.headers || {};
                this._method = e.method;
                this._clientId = e.clientId;
                this._apiEndpoint = e.apiEndpoint || r.other;
                n.registerErrorObserver(this._abortRequest)
              }
              e.statusCodeToString = function(e) {
                switch (e) {
                  case -1:
                    return "EXCEPTION";
                  case -2:
                    return "TIMEOUT";
                  case -3:
                    return "REQUEST ABORTED";
                  default:
                    return e.toString()
                }
              };
              e.prototype.start = function(e, t) {
                var r = this;
                try {
                  this._successCallback = e;
                  this._failureCallback = t;
                  this._request = new XMLHttpRequest;
                  this._request.ontimeout = this._onTimeout;
                  this._request.onreadystatechange = function() {
                    if (!r._completed && 4 === r._request.readyState) {
                      r._completed = !0;
                      var e = r._request.status;
                      e < 400 && e > 0 ? r._callSuccessCallback(e) : r._callFailureCallback(e)
                    }
                  };
                  this._method || (this._method = this._json ? i.HTTP_POST : i.HTTP_GET);
                  this._request.open(this._method, this._url, !0);
                  this._request.timeout = a;
                  this._setHeaders();
                  o.logMessage("starting request to: " + this._url);
                  this._request.send(this._json)
                } catch (n) {
                  this._callFailureCallback(l, n)
                }
              };
              e.prototype.upload = function(e, t, r, n) {
                var s = this;
                try {
                  this._successCallback = t;
                  this._progressCallback = n;
                  this._failureCallback = r;
                  this._request = new XMLHttpRequest;
                  this._request.ontimeout = this._onTimeout;
                  this._method = i.HTTP_PUT;
                  this._request.open(this._method, this._url, !0);
                  this._setHeaders();
                  this._request.onload = function(e) {
                    s._completed = !0;
                    var t = s._request.status;
                    200 === t || 201 === t ? s._callSuccessCallback(t) : s._callFailureCallback(t, e)
                  };
                  this._request.onerror = function(e) {
                    s._completed = !0;
                    s._callFailureCallback(s._request.status, e)
                  };
                  this._request.upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                      var t = {
                        bytesTransferred: e.loaded,
                        totalBytes: e.total,
                        progressPercentage: 0 === e.total ? 0 : e.loaded / e.total * 100
                      };
                      s._callProgressCallback(t)
                    }
                  };
                  o.logMessage("starting upload to: " + this._url);
                  this._request.send(e)
                } catch (a) {
                  this._callFailureCallback(l, a)
                }
              };
              e.prototype._callSuccessCallback = function(t) {
                o.logMessage("calling xhr success callback, status: " + e.statusCodeToString(t));
                this._successCallback(this._request, t, this._url)
              };
              e.prototype._callFailureCallback = function(t, r) {
                o.logError("calling xhr failure callback, status: " + e.statusCodeToString(t), this._request, r);
                this._failureCallback(this._request, t, t === c)
              };
              e.prototype._callProgressCallback = function(e) {
                o.logMessage("calling xhr upload progress callback");
                this._progressCallback(this._request, e)
              };
              e.prototype._abortRequest = function() {
                if (!this._completed) {
                  this._completed = !0;
                  if (this._request) try {
                    this._request.abort()
                  } catch (e) {}
                  this._callFailureCallback(u)
                }
              };
              e.prototype._onTimeout = function() {
                if (!this._completed) {
                  this._completed = !0;
                  this._callFailureCallback(c)
                }
              };
              e.prototype._setHeaders = function() {
                for (var e in this._headers) this._request.setRequestHeader(e, this._headers[e]);
                this._clientId && this._apiEndpoint !== r.other && this._request.setRequestHeader("Application", "0x" + this._clientId);
                var t = s.format("{0}={1}", "SDK-Version", i.SDK_VERSION);
                switch (this._apiEndpoint) {
                  case r.graph_odb:
                    this._request.setRequestHeader("X-ClientService-ClientTag", t);
                    break;
                  case r.graph_odc:
                    this._request.setRequestHeader("X-RequestStats", t);
                    break;
                  case r.other:
                    break;
                  default:
                    n.throwError("invalid API endpoint: " + this._apiEndpoint)
                }
                this._method === i.HTTP_POST && this._request.setRequestHeader("Content-Type", this._json ? "application/json" : "text/plain")
              };
              return e
            }();
        return d
      }(e, r, e("../models/ApiEndpoint"), e("../Constants"), e("./ErrorHandler"), e("./Logging"), e("./StringUtilities"))
    }, {
      "../Constants": 1,
      "../models/ApiEndpoint": 5,
      "./ErrorHandler": 16,
      "./Logging": 18,
      "./StringUtilities": 25
    }]
  }, {}, [2])(2)
});
