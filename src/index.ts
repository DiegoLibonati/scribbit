import "@/index.css";
import NotesPage from "@/pages/NotesPage/NotesPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const notesPage = NotesPage();
  app.appendChild(notesPage);
};

document.addEventListener("DOMContentLoaded", onInit);
