;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-fenxiang" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M779.24 599.248c-59.104 0-110.304 34.552-134.431 84.524l-251.314-49.71c-1.654-14.161-5.265-27.724-10.609-40.394l167.105-181.312c18.612 8.363 39.206 13.051 60.897 13.051 82.252 0 149.169-66.923 149.169-149.183 0-82.246-66.917-149.156-149.169-149.156-82.259 0-149.169 66.91-149.169 149.156 0 31.163 9.618 60.116 26.017 84.071l-156.214 169.499c-24.35-17.292-54.069-27.501-86.139-27.501-82.252 0-149.176 66.91-149.176 149.169 0 82.246 66.923 149.169 149.176 149.169 59.866 0 111.565-35.464 135.297-86.468l250.159 49.474c7.655 75.123 71.302 133.939 148.401 133.939 82.253 0 149.163-66.923 149.163-149.176s-66.909-149.157-149.162-149.157zM610.888 208.133c37.545 0 68.105 30.548 68.105 68.092 0 37.552-30.56 68.106-68.105 68.106-37.552 0-68.106-30.554-68.106-68.106 0-37.545 30.554-68.092 68.106-68.092zM245.382 719.558c-37.552 0-68.119-30.553-68.119-68.092 0-37.558 30.566-68.105 68.119-68.105 37.545 0 68.098 30.547 68.098 68.105 0 37.538-30.553 68.092-68.098 68.092zM779.24 816.516c-37.545 0-68.111-30.56-68.111-68.111s30.566-68.105 68.111-68.105c37.552 0 68.099 30.553 68.099 68.105s-30.548 68.111-68.099 68.111z" fill="#13227a" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-xiazai" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M123.713536 320.612352 382.262272 320.612352 382.262272 64.536576 575.788032 64.536576l0 256.074752L830.180352 320.611328 476.946432 701.520896 123.713536 320.612352zM829.90592 703.775744l0 62.464L124.913664 766.239744l0-62.464L58.868736 703.775744l0 190.454784 66.044928 0 704.992256 0 61.436928 0L891.342848 703.775744 829.90592 703.775744z" fill="#13227a" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-shenglvehao" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M150 512m-86 0a86 86 0 1 0 172 0 86 86 0 1 0-172 0Z" fill="#13227a" ></path>' +
    '' +
    '<path d="M512 512m-86 0a86 86 0 1 0 172 0 86 86 0 1 0-172 0Z" fill="#13227a" ></path>' +
    '' +
    '<path d="M874 512m-86 0a86 86 0 1 0 172 0 86 86 0 1 0-172 0Z" fill="#13227a" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)