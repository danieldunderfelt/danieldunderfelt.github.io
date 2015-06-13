"format register";
System.register("npm:core-js@0.9.6/library/modules/$.fw", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = function($) {
    $.FW = false;
    $.path = $.core;
    return $;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.2.6/helpers/class-call-check", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  exports["default"] = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/modules/$", ["npm:core-js@0.9.6/library/modules/$.fw"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var global = typeof self != 'undefined' ? self : Function('return this')(),
      core = {},
      defineProperty = Object.defineProperty,
      hasOwnProperty = {}.hasOwnProperty,
      ceil = Math.ceil,
      floor = Math.floor,
      max = Math.max,
      min = Math.min;
  var DESC = !!function() {
    try {
      return defineProperty({}, 'a', {get: function() {
          return 2;
        }}).a == 2;
    } catch (e) {}
  }();
  var hide = createDefiner(1);
  function toInteger(it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  }
  function desc(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  }
  function simpleSet(object, key, value) {
    object[key] = value;
    return object;
  }
  function createDefiner(bitmap) {
    return DESC ? function(object, key, value) {
      return $.setDesc(object, key, desc(bitmap, value));
    } : simpleSet;
  }
  function isObject(it) {
    return it !== null && (typeof it == 'object' || typeof it == 'function');
  }
  function isFunction(it) {
    return typeof it == 'function';
  }
  function assertDefined(it) {
    if (it == undefined)
      throw TypeError("Can't call method on  " + it);
    return it;
  }
  var $ = module.exports = require("npm:core-js@0.9.6/library/modules/$.fw")({
    g: global,
    core: core,
    html: global.document && document.documentElement,
    isObject: isObject,
    isFunction: isFunction,
    it: function(it) {
      return it;
    },
    that: function() {
      return this;
    },
    toInteger: toInteger,
    toLength: function(it) {
      return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
    },
    toIndex: function(index, length) {
      index = toInteger(index);
      return index < 0 ? max(index + length, 0) : min(index, length);
    },
    has: function(it, key) {
      return hasOwnProperty.call(it, key);
    },
    create: Object.create,
    getProto: Object.getPrototypeOf,
    DESC: DESC,
    desc: desc,
    getDesc: Object.getOwnPropertyDescriptor,
    setDesc: defineProperty,
    setDescs: Object.defineProperties,
    getKeys: Object.keys,
    getNames: Object.getOwnPropertyNames,
    getSymbols: Object.getOwnPropertySymbols,
    assertDefined: assertDefined,
    ES5Object: Object,
    toObject: function(it) {
      return $.ES5Object(assertDefined(it));
    },
    hide: hide,
    def: createDefiner(0),
    set: global.Symbol ? simpleSet : hide,
    mix: function(target, src) {
      for (var key in src)
        hide(target, key, src[key]);
      return target;
    },
    each: [].forEach
  });
  if (typeof __e != 'undefined')
    __e = core;
  if (typeof __g != 'undefined')
    __g = global;
  global.define = __define;
  return module.exports;
});

System.register("npm:core-js@0.9.6/library/fn/object/define-property", ["npm:core-js@0.9.6/library/modules/$"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var $ = require("npm:core-js@0.9.6/library/modules/$");
  module.exports = function defineProperty(it, key, desc) {
    return $.setDesc(it, key, desc);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.2.6/core-js/object/define-property", ["npm:core-js@0.9.6/library/fn/object/define-property"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": require("npm:core-js@0.9.6/library/fn/object/define-property"),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:babel-runtime@5.2.6/helpers/create-class", ["npm:babel-runtime@5.2.6/core-js/object/define-property"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var _Object$defineProperty = require("npm:babel-runtime@5.2.6/core-js/object/define-property")["default"];
  exports["default"] = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        _Object$defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  exports.__esModule = true;
  global.define = __define;
  return module.exports;
});

System.register('js/CodeView', ['npm:babel-runtime@5.2.6/helpers/create-class', 'npm:babel-runtime@5.2.6/helpers/class-call-check'], function (_export) {
	var _createClass, _classCallCheck, CodeView;

	return {
		setters: [function (_npmBabelRuntime526HelpersCreateClass) {
			_createClass = _npmBabelRuntime526HelpersCreateClass['default'];
		}, function (_npmBabelRuntime526HelpersClassCallCheck) {
			_classCallCheck = _npmBabelRuntime526HelpersClassCallCheck['default'];
		}],
		execute: function () {
			'use strict';

			CodeView = (function () {
				function CodeView() {
					_classCallCheck(this, CodeView);

					this.cmBtn = $('#code-mode-btn');
					this.ctxBtn = $('.show-context-btn');
					this.postElement = $('.post');
					this.enabled = false;
				}

				_createClass(CodeView, [{
					key: 'initialize',
					value: function initialize() {
						this.postElement.on('click', '#code-mode-btn', this.toggleCM.bind(this));
						this.postElement.on('click', '.show-context-btn', this.toggleContext.bind(this));

						this.entry = $('.entry');
						var entryElements = this.entry.children();
						this.cmStatic = entryElements.filter('.highlight');
						this.cmHide = entryElements.not('.highlight, .cm-show');
						this.cmShow = entryElements.filter('.cm-show');
					}
				}, {
					key: 'toggleCM',
					value: function toggleCM(e) {
						e.preventDefault();

						if (!this.enabled) {
							this.enableCM();
							this.cmBtn.text('Exit CodeView');
							this.enabled = true;
						} else {
							this.resetAll();
						}
					}
				}, {
					key: 'enableCM',
					value: function enableCM() {
						this.cmHide.velocity('slideUp', 500);
						this.cmShow.velocity('slideDown', 500);
					}
				}, {
					key: 'disableCM',
					value: function disableCM(callback) {
						var done = 0;

						this.cmHide.velocity('slideDown', 500, function () {
							if (done++ === 2) callback();
						});
						this.cmShow.velocity('slideUp', 500, function () {
							if (done++ === 2) callback();
						});
					}
				}, {
					key: 'toggleContext',
					value: function toggleContext(e) {
						e.preventDefault();
						this.currentCtxBtn = $(e.currentTarget);
						var active = this.currentCtxBtn.parent();
						this.contextElements = active.prevAll('p').first().add(active.nextAll('p').first());

						if (!active.hasClass('active')) {
							this.showContext();
							active.addClass('active');
							this.currentCtxBtn.text('Hide context');
						} else {
							this.hideContext();
							active.removeClass('active');
							this.currentCtxBtn.text('Show context');
						}
					}
				}, {
					key: 'resetContext',
					value: function resetContext() {
						$('.code-caption').removeClass('active').find('.show-context-btn').text('Show context');
					}
				}, {
					key: 'showContext',
					value: function showContext() {
						this.contextElements.velocity('slideDown', 500);
					}
				}, {
					key: 'hideContext',
					value: function hideContext() {
						this.contextElements.velocity('slideUp', 500);
					}
				}, {
					key: 'resetAll',
					value: function resetAll() {
						var _this = this;

						var callback = function callback() {
							_this.enabled = false;
							_this.cmHide.attr('style', '');
							_this.cmShow.attr('style', '');
							_this.cmBtn.text('Just show me the code');
							_this.resetContext();
						};

						this.disableCM(callback);
					}
				}]);

				return CodeView;
			})();

			_export('default', CodeView);
		}
	};
});
System.register('js/Blog', ['npm:babel-runtime@5.2.6/helpers/create-class', 'npm:babel-runtime@5.2.6/helpers/class-call-check', 'js/CodeView'], function (_export) {
	var _createClass, _classCallCheck, CodeView, Blog;

	return {
		setters: [function (_npmBabelRuntime526HelpersCreateClass) {
			_createClass = _npmBabelRuntime526HelpersCreateClass['default'];
		}, function (_npmBabelRuntime526HelpersClassCallCheck) {
			_classCallCheck = _npmBabelRuntime526HelpersClassCallCheck['default'];
		}, function (_jsCodeView) {
			CodeView = _jsCodeView['default'];
		}],
		execute: function () {
			'use strict';

			Blog = (function () {
				function Blog() {
					_classCallCheck(this, Blog);
				}

				_createClass(Blog, [{
					key: 'initialize',
					value: function initialize() {
						if (ddblog.codeView) {
							var codeView = new CodeView();
							codeView.initialize();
						}
					}
				}]);

				return Blog;
			})();

			_export('default', new Blog());
		}
	};
});
System.register('js/index', ['js/Blog'], function (_export) {
	var Blog;
	return {
		setters: [function (_jsBlog) {
			Blog = _jsBlog['default'];
		}],
		execute: function () {
			'use strict';

			(function () {
				Blog.initialize();
			})();
		}
	};
});
//# sourceMappingURL=blog.js.map