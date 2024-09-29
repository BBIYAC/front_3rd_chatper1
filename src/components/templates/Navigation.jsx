/** @jsx createVNode */
import{ createVNode } from "../../lib";

const getNavItemClass = (path) => {
    const currentPath = window.location.pathname;
    return currentPath === path ? 'text-blue-600 font-bold' : 'text-gray-600';
  }
  
  export const Navigation = ({ loggedIn }) => 
    createVNode("nav", { class: "bg-white shadow-md p-2 sticky top-14" }, [
      createVNode("ul", { class: "flex justify-around" }, [
        createVNode("li", null, createVNode("a", { href: "/", class: getNavItemClass('/'), "data-link": true }, "홈")),
        !loggedIn ? createVNode("li", null, createVNode("a", { href: "/login", class: getNavItemClass('/login'), "data-link": true }, "로그인")) : null,
        loggedIn ? createVNode("li", null, createVNode("a", { href: "/profile", class: getNavItemClass('/profile'), "data-link": true }, "프로필")) : null,
        loggedIn ? createVNode("li", null, createVNode("a", { href: "#", id: "logout", class: "text-gray-600" }, "로그아웃")) : null,
      ]),
    ]);
