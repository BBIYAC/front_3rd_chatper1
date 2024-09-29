/** @jsx createVNode */
import { Post } from "../components/posts/Post";
import { PostForm } from "../components/posts/PostForm";
import { Footer } from "../components/templates/Footer";
import { Header } from "../components/templates/Header";
import { Navigation } from "../components/templates/Navigation";
import{ createVNode } from "../lib";
import { globalStore } from "../stores";

export const HomePage = () => {
    const { loggedIn, posts } = globalStore.getState();
    return createVNode("div", { class: "bg-gray-100 min-h-screen flex justify-center" }, [
      createVNode("div", { class: "max-w-md w-full" }, [
        Header(),
        Navigation({ loggedIn }),
        createVNode("main", { class: "p-4" }, [
          loggedIn ? PostForm() : null,
          createVNode("div", { id: "posts-container", class: "space-y-4" }, posts.map(Post)),
        ]),
        Footer(),
      ]),
    ]);
  }
