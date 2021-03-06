// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var stringData = localStorage.getItem("siteData"); // 如果JSON.parse(stringData)存在就返回，不存在就设定初始值

var hashMap = JSON.parse(stringData) || [{
  logo: "B",
  url: "https://www.baidu.com",
  name: "baidu.com"
}, {
  logo: "B",
  url: "https://www.bilibili.com",
  name: "bilibili.com"
}];
var $sites = $(".sites");
var $last = $(".last");

var render = function render() {
  // 每次渲染都要把之前保存在hash里的数据去掉，不然会多次渲染
  $sites.find("li:not(.last)").remove();
  hashMap.forEach(function (node, index) {
    var $sites = $("<li>\n        <a href=\"".concat(node.url, "\">\n          <div class=\"siteWrapper\">\n            <div class=\"oneSite\"><img id=\"icon-img\" src=\"").concat(node.url, "/favicon.ico\" alt=\"").concat(node.logo, "\"></div>\n            <span>").concat(node.name, "</span>\n            <div class=\"delete\">\n                <svg class=\"icon\" aria-hidden=\"true\">\n                    <use xlink:href=\"#icon-delete\"></use>\n                </svg>\n            </div>\n            <div class=\"edit\">\n                <svg class=\"icon\" aria-hidden=\"true\">\n                    <use xlink:href=\"#icon-xiugai\"></use>\n                </svg>\n            </div>\n          </div>\n        </a>\n      </li>")).insertBefore($last);
    $sites.on("click", ".delete", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var bool = window.confirm("确定要删除该网站吗？");

      if (bool) {
        hashMap.splice(index, 1);
      }

      render();
    });
    $sites.on("click", ".edit", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var siteName = window.prompt("请输入新的网站名称");
      hashMap[index].name = siteName;
      render();
    });
  }); // $sites.on("error", "#icon-img", (e) => {
  //   console.log(e);
  //   this.remove();
  // });
}; // 简化url


var simplify = function simplify(string) {
  var x = string.replace("http://", "").replace("https://", "").replace("www.", "").replace("/", "");
  return x;
};

render();
$(".addSite").on("click", function () {
  var url = window.prompt("请输入要添加的正确网址噢");

  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }

  hashMap.push({
    logo: simplify(url)[0].toUpperCase(),
    url: url,
    name: simplify(url)
  });
  render();
});

window.onbeforeunload = function () {
  // localStorage只能保存字符串
  var stringData = JSON.stringify(hashMap);
  localStorage.setItem("siteData", stringData);
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.2a51c195.js.map