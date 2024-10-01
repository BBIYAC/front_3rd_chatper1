// renderElement.js
import { addEvent, removeEvent, setupEventListeners } from "./eventManager";
import { createElement__v2 } from "./createElement__v2.js";

// TODO: processVNode 함수 구현
function processVNode(vNode) {
  // null, undefined, boolean 값 처리
  if (!vNode || typeof vNode === "boolean") {
    return null;
  }

  // 문자열과 숫자를 문자열로 변환
  if (typeof vNode === "string" || typeof vNode === "number") {
    return vNode;
  }

  // 함수형 컴포넌트 처리
  if (typeof vNode.type === "function") {
    return processVNode(vNode.type(vNode.props || {}));
  }

  // 일반적인 vNode는 그대로 반환
  return vNode;
}

// TODO: updateAttributes 함수 구현
function updateAttributes(element, oldProps = {}, newProps = {}) {
  // 이전 속성 제거
  Object.keys(oldProps).forEach((key) => {
    if (!(key in newProps)) {
      if (key.startsWith("on")) {
        const eventType = key.slice(2).toLowerCase();
        removeEvent(element, eventType, oldProps[key]);
      } else if (key === "className") {
        element.className = ""; // 클래스 제거
      } else {
        element.removeAttribute(key);
      }
    }
  });

  // 새로운 속성 추가 또는 업데이트
  Object.entries(newProps).forEach(([key, value]) => {
    if (key.startsWith("on")) {
      const eventType = key.slice(2).toLowerCase();
      if (oldProps[key] !== value) {
        removeEvent(element, eventType, oldProps[key]);
        addEvent(element, eventType, value);
      }
    } else if (key === "className") {
      if (element.className !== value) {
        element.className = value; // 클래스 업데이트
      }
    } else {
      if (element.getAttribute(key) !== value) {
        element.setAttribute(key, value); // 속성 업데이트
      }
    }
  });
}

// TODO: updateElement 함수 구현
function updateElement(parent, oldNode, newNode, index = 0) {
  const oldChild = parent.childNodes[index];

  // 1. 노드 제거 (newNode가 없고 oldNode가 있는 경우)
  if (!newNode && oldNode) {
    parent.removeChild(oldChild);
    return;
  }

  // 2. 새 노드 추가 (newNode만 있는 경우)
  if (newNode && !oldNode) {
    parent.appendChild(createElement__v2(newNode));
    return;
  }

  // 3. 텍스트 노드 업데이트
  if (typeof newNode === "string" || typeof newNode === "number") {
    if (oldChild.textContent !== newNode) {
      oldChild.textContent = newNode; // 기존 노드의 내용 업데이트
    }
    return;
  }

  // 4. 노드 교체 (타입이 다른 경우)
  if (newNode.type !== oldNode.type) {
    parent.replaceChild(createElement__v2(newNode), oldChild);
    return;
  }

  // 5. 같은 타입의 노드 업데이트
  if (newNode.type) {
    updateAttributes(oldChild, oldNode.props, newNode.props);

    // 5-2. 자식 노드 업데이트 (재귀적 호출)
    const maxLength = Math.max(
      oldNode.children?.length || 0,
      newNode.children?.length || 0
    );
    for (let i = 0; i < maxLength; i++) {
      updateElement(oldChild, oldNode.children[i], newNode.children[i], i);
    }
  }
}

export function renderElement(vNode, container, oldVNode = null) {
  // App처럼 함수형 컴포넌트를 처리하기 위해 processVNode 호출
  const processedVNode = processVNode(vNode);

  if (!oldVNode) {
    // 처음 렌더링 시: createElement__v2를 통해 렌더링
    const newElement = createElement__v2(processedVNode);
    container.appendChild(newElement);
  } else {
    // 리렌더링 시: updateElement로 DOM 업데이트
    updateElement(container, oldVNode, processedVNode, 0);
  }

  // 이벤트 위임 설정
  setupEventListeners(container);
}
