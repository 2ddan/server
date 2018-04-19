/**
 * 一些dom相关的函数
 */

// ============================================= 执行
const TOUCH_EVENT = 1;
const MOUSE_EVENT = 2;

let elementStyle = document.createElement('div').style;

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  };

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }

  return false;
})();

const prefixStyle = (style) => {
  if (vendor === false) {
    return false;
  }

  if (vendor === 'standard') {
    return style;
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

let transform = prefixStyle('transform');
// ============================================= 导出
export const addEvent = (el, type, fn, capture) => {
  el.addEventListener(type, fn, { passive: false, capture: !!capture });
};

export const removeEvent = (el, type, fn, capture) => {
  el.removeEventListener(type, fn, !!capture);
};

export const offset = (el) => {
  let left = 0;
  let top = 0;

  while (el) {
    left -= el.offsetLeft;
    top -= el.offsetTop;
    el = el.offsetParent;
  }

  return {
    left,
    top
  };
};

export const hasPerspective = prefixStyle('perspective') in elementStyle;
export const hasTouch = 'ontouchstart' in window;
export const hasTransform = transform !== false;
export const hasTransition = prefixStyle('transition') in elementStyle;

export const style = {
  transform,
  transitionTimingFunction: prefixStyle('transitionTimingFunction'),
  transitionDuration: prefixStyle('transitionDuration'),
  transitionDelay: prefixStyle('transitionDelay'),
  transformOrigin: prefixStyle('transformOrigin'),
  transitionEnd: prefixStyle('transitionEnd')
};

export const eventType = {
  touchstart: TOUCH_EVENT,
  touchmove: TOUCH_EVENT,
  touchend: TOUCH_EVENT,

  mousedown: MOUSE_EVENT,
  mousemove: MOUSE_EVENT,
  mouseup: MOUSE_EVENT
};

export const getRect = (el) => {
  if (el instanceof (<any>window).SVGElement) {
    var rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  }
};

export const preventDefaultException = (el, exceptions) => {
  for (let i in exceptions) {
    if (exceptions[i].test(el[i])) {
      return true;
    }
  }
  return false;
}

export const tap = (e, eventName) => {
  let ev = document.createEvent('Event');
  ev.initEvent(eventName, true, true);
  (<any>ev).pageX = e.pageX;
  (<any>ev).pageY = e.pageY;
  e.target.dispatchEvent(ev);
};

export const click = (e) => {
  var target = e.target;

  if (!(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName)) {
    let ev = document.createEvent((<any>window).MouseEvent ? 'MouseEvents' : 'Event');
    ev.initEvent('click', true, true);
    (<any>ev)._constructed = true;
    target.dispatchEvent(ev);
  }
};

export const prepend = (el, target) => {
  if (target.firstChild) {
    before(el, target.firstChild);
  } else {
    target.appendChild(el);
  }
}

export const before = (el, target) => {
  target.parentNode.insertBefore(el, target);
}

// ============================================= 本地
