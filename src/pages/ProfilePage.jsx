/** @jsx createVNode */
import { Footer } from "../components/templates/Footer";
import { Header } from "../components/templates/Header";
import { Navigation } from "../components/templates/Navigation";
import{ createVNode } from "../lib";
import { globalStore } from "../stores";

export const ProfilePage = () => {
    const { loggedIn, currentUser } = globalStore.getState();
    const { username = '', email = '', bio = '' } = currentUser ?? {};
    return createVNode("div", { class: "bg-gray-100 min-h-screen flex justify-center" }, [
      createVNode("div", { class: "max-w-md w-full" }, [
        Header(),
        Navigation({ loggedIn }),
        createVNode("main", { class: "p-4" }, [
          createVNode("div", { class: "bg-white p-8 rounded-lg shadow-md" }, [
            createVNode("h2", { class: "text-2xl font-bold text-center text-blue-600 mb-8" }, "내 프로필"),
            createVNode("form", { id: "profile-form" }, [
              createVNode("div", { class: "mb-4" }, [
                createVNode("label", { for: "username", class: "block text-gray-700 text-sm font-bold mb-2" }, "사용자 이름"),
                createVNode("input", { type: "text", id: "username", name: "username", class: "w-full p-2 border rounded", value: username, required: true }),
              ]),
              createVNode("div", { class: "mb-4" }, [
                createVNode("label", { for: "email", class: "block text-gray-700 text-sm font-bold mb-2" }, "이메일"),
                createVNode("input", { type: "email", id: "email", name: "email", class: "w-full p-2 border rounded", value: email, required: true }),
              ]),
              createVNode("div", { class: "mb-6" }, [
                createVNode("label", { for: "bio", class: "block text-gray-700 text-sm font-bold mb-2" }, "자기소개"),
                createVNode("textarea", { id: "bio", name: "bio", rows: "4", class: "w-full p-2 border rounded" }, bio),
              ]),
              createVNode("button", { type: "submit", class: "w-full bg-blue-600 text-white p-2 rounded font-bold" }, "프로필 업데이트"),
            ]),
          ]),
        ]),
        Footer(),
      ]),
    ]);
  }