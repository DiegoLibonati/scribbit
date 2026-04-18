import "@/index.css";
import ScribbitPage from "@/pages/ScribbitPage/ScribbitPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const scribbitPage = ScribbitPage();
  app.appendChild(scribbitPage);
};

document.addEventListener("DOMContentLoaded", onInit);
