!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["1"], [], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("2", [], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var $Object = Object;
  module.exports = {
    create: $Object.create,
    getProto: $Object.getPrototypeOf,
    isEnum: {}.propertyIsEnumerable,
    getDesc: $Object.getOwnPropertyDescriptor,
    setDesc: $Object.defineProperty,
    setDescs: $Object.defineProperties,
    getKeys: $Object.keys,
    getNames: $Object.getOwnPropertyNames,
    getSymbols: $Object.getOwnPropertySymbols,
    each: [].forEach
  };
  return module.exports;
});
$__System.registerDynamic('3', ['2'], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  var $ = $__require('2');
  module.exports = function defineProperty(it, key, desc) {
    return $.setDesc(it, key, desc);
  };
  return module.exports;
});
$__System.registerDynamic("4", ["3"], true, function ($__require, exports, module) {
  var define,
      global = this || self,
      GLOBAL = global;
  /* */
  module.exports = { "default": $__require("3"), __esModule: true };
  return module.exports;
});
$__System.registerDynamic("5", ["4"], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  var _Object$defineProperty = $__require("4")["default"];
  exports["default"] = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        _Object$defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  exports.__esModule = true;
  return module.exports;
});
$__System.registerDynamic("6", [], true, function ($__require, exports, module) {
  /* */
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  exports["default"] = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  exports.__esModule = true;
  return module.exports;
});
$__System.register('7', ['5', '6'], function (_export) {
  var _createClass, _classCallCheck, CodeView;

  return {
    setters: [function (_) {
      _createClass = _['default'];
    }, function (_2) {
      _classCallCheck = _2['default'];
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
            this.cmHide = entryElements.not('.highlight, .cm-show, .highlighter-rouge');
            this.cmShow = entryElements.filter('.cm-show');
          }
        }, {
          key: 'toggleCM',
          value: function toggleCM(e) {
            e.preventDefault();

            if (!this.enabled) {
              this.enableCM();
              this.cmBtn.text("Exit CodeView");
              this.enabled = true;
            } else {
              this.resetAll();
            }
          }
        }, {
          key: 'enableCM',
          value: function enableCM() {
            this.cmHide.velocity("slideUp", 500);
            this.cmShow.velocity("slideDown", 500);
          }
        }, {
          key: 'disableCM',
          value: function disableCM(callback) {
            var done = 0;

            this.cmHide.velocity("slideDown", 500, function () {
              if (done++ === 2) callback();
            });
            this.cmShow.velocity("slideUp", 500, function () {
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
            this.contextElements.velocity("slideDown", 500);
          }
        }, {
          key: 'hideContext',
          value: function hideContext() {
            this.contextElements.velocity("slideUp", 500);
          }
        }, {
          key: 'resetAll',
          value: function resetAll() {
            var _this = this;

            var callback = function callback() {
              _this.enabled = false;
              _this.cmHide.attr('style', '');
              _this.cmShow.attr('style', '');
              _this.cmBtn.text("Just show me the code");
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
$__System.register('8', ['5', '6', '7'], function (_export) {
  var _createClass, _classCallCheck, CodeView, Blog;

  return {
    setters: [function (_) {
      _createClass = _['default'];
    }, function (_2) {
      _classCallCheck = _2['default'];
    }, function (_3) {
      CodeView = _3['default'];
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
$__System.register('1', ['8'], function (_export) {
  'use strict';

  var Blog;
  return {
    setters: [function (_) {
      Blog = _['default'];
    }],
    execute: function () {

      $(function () {
        Blog.initialize();
      });
    }
  };
});
})
(function(factory) {
  factory();
});
//# sourceMappingURL=blog.js.map