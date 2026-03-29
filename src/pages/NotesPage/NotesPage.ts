import { v4 as uuidv4 } from "uuid";

import type { Note as NoteT } from "@/types/app";
import type { Page } from "@/types/pages";
import type { NoteComponent } from "@/types/components";

import Note from "@/components/Note/Note";

import { getNotesFromLocalStorage } from "@/helpers/getNotesFromLocalStorage";
import { setLocalStorage } from "@/helpers/setLocalStorage";
import { setAlert, clearAlert } from "@/helpers/setAlert";

import { LOCAL_STORAGE_NOTES_KEY } from "@/constants/vars";

import "@/pages/NotesPage/NotesPage.css";

const NotesPage = (): Page => {
  const main = document.createElement("main") as Page;
  main.className = "notes-page";

  main.innerHTML = `
    <section class="notes">
    </section>
  `;

  const notes = main.querySelector<HTMLElement>(".notes");
  const btnAddNote =
    document.querySelector<HTMLButtonElement>(".header__btn-add");

  const activeNotes = new Map<string, NoteComponent>();

  const editFinishButtons = new Map<string, HTMLButtonElement>();

  const handleEditNote = (e: MouseEvent, id: string): void => {
    const target = e.target as HTMLButtonElement;
    const note = main.querySelector<HTMLDivElement>(`#${CSS.escape(id)}`);

    if (!note) return;

    const notes = getNotesFromLocalStorage();

    const cardTextArea = note.children[1]?.children[0] as
      | HTMLTextAreaElement
      | undefined;
    if (!cardTextArea) return;

    cardTextArea.disabled = false;
    const actionBtnsContainer = note.children[0];

    const buttonFinishEdit = document.createElement("button");

    buttonFinishEdit.className =
      "note__header-btn note__header-btn-edit-finish";
    buttonFinishEdit.type = "button";
    buttonFinishEdit.textContent = "X";
    buttonFinishEdit.setAttribute("aria-label", "Finish editing");

    target.style.display = "none";

    const handleFinishEdit = (): void => {
      const newCards = notes.map((note) => {
        if (note.id === id) {
          note.text = cardTextArea.value;
        }
        return note;
      });

      setLocalStorage(LOCAL_STORAGE_NOTES_KEY, newCards);

      buttonFinishEdit.removeEventListener("click", handleFinishEdit);
      editFinishButtons.delete(id);

      buttonFinishEdit.remove();
      target.style.display = "block";

      cardTextArea.innerHTML = cardTextArea.value;
      cardTextArea.disabled = true;

      setAlert("1 note has been successfully edited ✅");
    };

    buttonFinishEdit.addEventListener("click", handleFinishEdit);

    editFinishButtons.set(id, buttonFinishEdit);

    actionBtnsContainer?.append(buttonFinishEdit);
  };

  const handleDeleteNote = (_: MouseEvent, id: string): void => {
    const notes = getNotesFromLocalStorage();
    const noteComponent = activeNotes.get(id);

    if (noteComponent) {
      noteComponent.cleanup?.();
      activeNotes.delete(id);
    }

    const noteElement = main.querySelector<HTMLDivElement>(
      `#${CSS.escape(id)}`
    );
    noteElement?.remove();

    const editButton = editFinishButtons.get(id);
    if (editButton) {
      editButton.remove();
      editFinishButtons.delete(id);
    }

    const newCards = notes.filter((note) => note.id !== id);

    setLocalStorage(LOCAL_STORAGE_NOTES_KEY, newCards);

    setAlert("1 note has been successfully deleted ✅");
  };

  const handleAddNote = (): void => {
    const notesContainer = main.querySelector<HTMLElement>(".notes");

    const note: NoteT = {
      id: uuidv4(),
      text: "Ingrese texto",
    };

    const noteComponent = Note({
      id: note.id,
      children: note.text,
      onClickDelete: handleDeleteNote,
      onClickEdit: handleEditNote,
    });

    const notesLocalStorage = getNotesFromLocalStorage();

    activeNotes.set(note.id, noteComponent);

    notesContainer?.append(noteComponent);

    setLocalStorage(LOCAL_STORAGE_NOTES_KEY, [...notesLocalStorage, note]);

    setAlert("1 note has been successfully created ✅");
  };

  btnAddNote?.addEventListener("click", handleAddNote);

  getNotesFromLocalStorage().forEach((note) => {
    const noteComponent = Note({
      id: note.id,
      children: note.text,
      onClickDelete: handleDeleteNote,
      onClickEdit: handleEditNote,
    });

    activeNotes.set(note.id, noteComponent);
    notes?.append(noteComponent);
  });

  main.cleanup = (): void => {
    btnAddNote?.removeEventListener("click", handleAddNote);

    activeNotes.forEach((note) => {
      note.cleanup?.();
    });
    activeNotes.clear();

    editFinishButtons.forEach((button) => {
      button.remove();
    });
    editFinishButtons.clear();

    clearAlert();
  };

  return main;
};

export default NotesPage;
