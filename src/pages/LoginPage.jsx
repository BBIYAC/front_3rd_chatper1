/** @jsx createVNode */
import { Footer } from "../components/templates/Footer";
import { Header } from "../components/templates/Header";
import{ createVNode } from "../lib";

export const LoginPage = () => 
    createVNode("div", { class: "bg-gray-100 flex items-center justify-center min-h-screen " }, [
      Header(),
      createVNode("div", { class: "bg-white p-8 rounded-lg shadow-md w-full max-w-md" }, [
        createVNode("h1", { class: "text-2xl font-bold text-center text-blue-600 mb-8" }, "항해플러스"),
        createVNode("form", { id: "login-form" }, [
          createVNode("input", { type: "text", id: "username", placeholder: "사용자 이름", class: "w-full p-2 mb-4 border rounded", required: true }),
          createVNode("input", { type: "password", placeholder: "비밀번호", class: "w-full p-2 mb-6 border rounded", required: true }),
          createVNode("button", { type: "submit", class: "w-full bg-blue-600 text-white p-2 rounded" }, "로그인"),
        ]),
        createVNode("div", { class: "mt-4 text-center" }, [
          createVNode("a", { href: "#", class: "text-blue-600 text-sm" }, "비밀번호를 잊으셨나요?"),
        ]),
        createVNode("hr", { class: "my-6" }),
        createVNode("div", { class: "text-center" }, [
          createVNode("button", { class: "bg-green-500 text-white px-4 py-2 rounded" }, "새 계정 만들기"),
        ]),
      ]),
      Footer(),
    ]);