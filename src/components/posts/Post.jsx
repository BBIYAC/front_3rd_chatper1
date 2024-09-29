/** @jsx createVNode */
import{ createVNode } from "../../lib";

export const Post = ({ author, time, content, id }) => 
    createVNode("div", { class: "bg-white rounded-lg shadow p-4 mb-4" }, [
      createVNode("div", { class: "flex items-center mb-2" }, [
        createVNode("img", { src: "https://via.placeholder.com/40", alt: "프로필", class: "rounded-full mr-2" }),
        createVNode("div", null, [
          createVNode("div", { class: "font-bold" }, author),
          createVNode("div", { class: "text-gray-500 text-sm" }, time),
        ]),
      ]),
      createVNode("p", null, content),
      createVNode("div", { class: "mt-2 flex justify-between text-gray-500" }, [
        createVNode("span", { class: "like-button", "data-post-id": id }, "좋아요"),
        createVNode("span", null, "댓글"),
        createVNode("span", null, "공유"),
      ]),
    ]);
