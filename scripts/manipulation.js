// 선택한 요소에 클래스를 추가하는 함수
function addClass(elems, className) {
  for (let i = 0; i < elems.length; i++) {
    if (className instanceof String) {
      elems[i].classList.add(...className.split(" "));
    } else if (className instanceof Function) {
      elems[i].classList.add(className.call(elems[i], i));
    } else elems[i].classList.add(...className);
  }
}

// 선택한 요소 뒤에 다른 곳에 있는 요소를 이동시키는 함수
function after(elems, nodes) {
  for (let i = 0; i < elems.length; i++) {
    if (typeof nodes == "string") {
      elems[i].insertAdjacentHTML("afterend", nodes);
    } else if (nodes instanceof Array) {
      for (let [key, value] of Object.entries(nodes)) {
        if (typeof value == "string") {
          elems[i].insertAdjacentHTML("afterend", value);
        } else if (typeof value == "object") {
          const nodeVal = value instanceof Node ? [value] : [...value];
          for (let j = 0; j < nodeVal.length; j++) {
            nodeVal[j].remove();
          }
          elems[i].after(
            ...nodeVal.map((value) => {
              return value.cloneNode(true);
            })
          );
        }
      }
    } else if (typeof nodes == "object") {
      const nodeArr = nodes instanceof Node ? [nodes] : [...nodes];
      for (let j = 0; j < nodeArr.length; j++) {
        nodeArr[j].remove();
      }
      elems[i].after(
        ...nodeArr.map((value) => {
          return value.cloneNode(true);
        })
      );
    } else {
      elems[i].after(nodes.call(elems[i], i));
    }
  }
}

// 선택한 요소의 마지막 자식 요소로 추가하는 함수
function append(elems, nodes) {
  for (let i = 0; i < elems.length; i++) {
    if (typeof nodes == "string") {
      elems[i].insertAdjacentHTML("beforeend", nodes);
    } else if (nodes instanceof Array) {
      for (let [key, value] of Object.entries(nodes)) {
        if (typeof value == "string") {
          elems[i].append(value);
        } else if (typeof value == "object") {
          const nodeVal = value instanceof Node ? [value] : [...value];
          for (let j = 0; j < nodeVal.length; j++) {
            nodeVal[j].remove();
          }
          elems[i].append(
            ...nodeVal.map((value) => {
              return value.cloneNode(true);
            })
          );
        }
      }
    } else if (typeof nodes == "object") {
      const nodeArr = nodes instanceof Node ? [nodes] : [...nodes];
      for (let j = 0; j < nodeArr.length; j++) {
        nodeArr[j].remove();
      }
      elems[i].append(
        ...nodeArr.map((value) => {
          return value.cloneNode(true);
        })
      );
    } else {
      elems[i].append(nodes.call(elems[i], i));
    }
  }
}

// 선택한 요소들 중에서 제일 처음 요소의 속성의 값을 가져오거나 하나 이상의 속성을 추가하는 함수
function attr(elems, attributeName, value) {
  for (let i = 0; i < elems.length; i++) {
    if (value == null) {
      if (attributeName instanceof Object) {
        for (let [key, value] of Object.entries(attributeName)) {
          elems[i].setAttribute(key, value);
        }
      } else {
        return elems[0].getAttribute(attributeName);
      }
    } else {
      if (value instanceof Function) {
        elems[i].setAttribute(attributeName, value.call(elems[i], i));
      } else {
        elems[i].setAttribute(attributeName, value);
      }
    }
  }
}

// 선택한 요소 앞에 다른 곳에 있는 요소를 이동시키는 함수
function before(elems, nodes) {
  for (let i = 0; i < elems.length; i++) {
    if (typeof nodes == "string") {
      elems[i].insertAdjacentHTML("beforebegin", nodes);
    } else if (nodes instanceof Array) {
      for (let [key, value] of Object.entries(nodes)) {
        if (typeof value == "string") {
          elems[i].insertAdjacentHTML("beforebegin", value);
        } else if (typeof value == "object") {
          const nodeVal = value instanceof Node ? [value] : [...value];
          for (let j = 0; j < nodeVal.length; j++) {
            nodeVal[j].remove();
          }
          elems[i].before(
            ...nodeVal.map((value) => {
              return value.cloneNode(true);
            })
          );
        }
      }
    } else if (typeof nodes == "object") {
      const nodeArr = nodes instanceof Node ? [nodes] : [...nodes];
      for (j = 0; j < nodeArr.length; j++) {
        nodeArr[j].remove();
      }
      elems[i].before(
        ...nodeArr.map((value) => {
          return value.cloneNode(true);
        })
      );
    } else {
      elems[i].before(nodes.call(elems[i], i));
    }
  }
}

// 선택한 요소와 일치하는 요소 집합을 복제(deep copy)하는 함수
function clone(elems) {
  for (let i = 0; i < elems.length; i++) {
    document.body.appendChild(elems[i].cloneNode(true));
  }
}

// 선택한 요소의 css 속성값을 가져오거나 style 속성을 추가하는 함수
function css(elems, propertyName, value) {
  const newStr = new Set();
  for (let i = 0; i < elems.length; i++) {
    if (value == null) {
      if (propertyName instanceof String || value == null) {
        return window.getComputedStyle(elems[i]).getPropertyValue(propertyName);
      }
      if (propertyName instanceof Object) {
        for (let [key, value] of Object.entries(propertyName)) {
          elems[i].style.setProperty(key, value);
        }
      }
      if (propertyName instanceof Array) {
        for (let [key, value] of Object.entries(propertyName)) {
          newStr.add(window.getComputedStyle(elems[i]).getPropertyValue(value));
        }
        return newStr;
      }
    }
    if (value != null || value instanceof (String, Number)) {
      elems[i].style.setProperty(propertyName, value);
    }
    if (value instanceof Function) {
      elems[i].style.setProperty(propertyName, value.call(elems[i], i));
    }
  }
}

// 선택한 요소를 문서에서 제거하는 함수(제거한 요소를 저장하여 다시 사용할 수 있다.)
function detach(elems) {
  const newElems = [];
  for (let i = 0; i < elems.length; i++) {
    elems[i].parentNode.removeChild(elems[i]);
    newElems.push(elems[i]);
  }
  return new Set(newElems);
}

// 선택한 요소의 첫 번재 요소 높이를 반환하거나, 선택된 요소의 높이를 인수로 전달받은 값으로 설정하는 함수
function height(elems, value) {
  for (let i = 0; i < elems.length; i++) {
    if (typeof value == "string") {
      elems[i].style.height = value;
    } else if (typeof value == "number") {
      elems[i].style.height = value + "px";
    } else if (typeof value == "function") {
      elems[i].style.height = value.call(elems[i], i);
    } else {
      return elems[0].offsetHeight;
    }
  }
}

// 선택한 요소를 문서에서 제거하는 함수
function remove(elems) {
  for (let i = 0; i < elems.length; i++) {
    elems[i].parentNode.removeChild(elems[i]);
  }
}

// 선택한 요소에 클래스를 제거하는 함수
function removeClass(elems, className) {
  for (let i = 0; i < elems.length; i++) {
    if (className instanceof String) {
      elems[i].classList.remove(...className.split(" "));
    } else if (className instanceof Function) {
      elems[i].classList.remove(className.call(elems[i], i));
    } else elems[i].classList.remove(...className);
  }
}

// 선택한 요소의 첫 번재 요소 너비를 반환하거나, 선택된 요소의 너비를 인수로 전달받은 값으로 설정하는 함수
function width(elems, value) {
  for (let i = 0; i < elems.length; i++) {
    if (typeof value == "string") {
      elems[i].style.width = value;
    } else if (typeof value == "number") {
      elems[i].style.width = value + "px";
    } else if (typeof value == "function") {
      elems[i].style.width = value.call(elems[i], i);
    } else {
      return elems[0].offsetWidth;
    }
  }
}
