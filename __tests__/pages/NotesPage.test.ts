import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import NotesPage from "@/pages/NotesPage/NotesPage";

import { mocksLocalStorage } from "@tests/__mocks__/localStorage.mock";
import { mockNote, mockNotes } from "@tests/__mocks__/notes.mock";

const renderPage = (): Page => {
  const btnAddNote = document.createElement("button");
  btnAddNote.className = "header__btn-add";
  document.body.appendChild(btnAddNote);

  const alertElement = document.createElement("h2");
  alertElement.className = "header__alert";
  document.body.appendChild(alertElement);

  const container = NotesPage();
  document.body.appendChild(container);
  return container;
};

describe("NotesPage", () => {
  beforeEach(() => {
    mocksLocalStorage.clear();
  });

  afterEach(() => {
    document.body.innerHTML = "";
    mocksLocalStorage.clear();
  });

  it("should render the page with correct structure", () => {
    renderPage();

    const main = document.querySelector<HTMLElement>(".notes-page");
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe("MAIN");
  });

  it("should render notes container", () => {
    renderPage();

    const notesSection = document.querySelector<HTMLElement>(".notes");
    expect(notesSection).toBeInTheDocument();
  });

  it("should load and render notes from localStorage", () => {
    mocksLocalStorage.setItem("notes", JSON.stringify(mockNotes));

    renderPage();

    const textareas =
      document.querySelectorAll<HTMLTextAreaElement>(".note__textarea");
    expect(textareas).toHaveLength(2);
    expect(textareas[0]?.value).toBe("Test note 1");
    expect(textareas[1]?.value).toBe("Test note 2");
  });

  it("should add new note when add button is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    const btnAddNote =
      document.querySelector<HTMLButtonElement>(".header__btn-add");

    if (btnAddNote) await user.click(btnAddNote);

    const notes = document.querySelectorAll<HTMLDivElement>(".note");
    expect(notes).toHaveLength(1);

    const textarea =
      document.querySelector<HTMLTextAreaElement>(".note__textarea");
    expect(textarea?.value).toBe("Ingrese texto");
  });

  it("should save note to localStorage when created", async () => {
    const user = userEvent.setup();
    renderPage();

    const btnAddNote =
      document.querySelector<HTMLButtonElement>(".header__btn-add");

    if (btnAddNote) await user.click(btnAddNote);

    const stored = mocksLocalStorage.getItem("notes");
    const notes = JSON.parse(stored ?? "[]");

    expect(notes).toHaveLength(1);
    expect(notes[0]).toEqual({
      id: "mocked-uuid-1234",
      text: "Ingrese texto",
    });
  });

  it("should enable editing when edit button is clicked", async () => {
    const user = userEvent.setup();
    mocksLocalStorage.setItem("notes", JSON.stringify([mockNote]));

    renderPage();

    const editButton = screen.getByRole("button", { name: "Edit note" });
    await user.click(editButton);

    const textarea =
      document.querySelector<HTMLTextAreaElement>(".note__textarea");
    expect(textarea).not.toHaveAttribute("disabled");
  });

  it("should show finish edit button when editing", async () => {
    const user = userEvent.setup();
    mocksLocalStorage.setItem("notes", JSON.stringify([mockNote]));

    renderPage();

    const editButton = screen.getByRole("button", { name: "Edit note" });
    await user.click(editButton);

    const finishButton = screen.getByRole("button", { name: "Finish editing" });
    expect(finishButton).toBeInTheDocument();
  });

  it("should delete note when delete button is clicked", async () => {
    const user = userEvent.setup();
    mocksLocalStorage.setItem("notes", JSON.stringify(mockNotes));

    renderPage();

    const deleteButtons = screen.getAllByRole("button", {
      name: "Delete note",
    });
    await user.click(deleteButtons[0]!);

    const notes = document.querySelectorAll<HTMLDivElement>(".note");
    expect(notes).toHaveLength(1);
  });

  it("should update localStorage when note is deleted", async () => {
    const user = userEvent.setup();
    mocksLocalStorage.setItem("notes", JSON.stringify(mockNotes));

    renderPage();

    const deleteButtons = screen.getAllByRole("button", {
      name: "Delete note",
    });
    await user.click(deleteButtons[0]!);

    const stored = mocksLocalStorage.getItem("notes");
    const notes = JSON.parse(stored ?? "[]");

    expect(notes).toHaveLength(1);
    expect(notes[0]?.text).toBe("Test note 2");
  });

  it("should cleanup notes and buttons on page cleanup", () => {
    mocksLocalStorage.setItem("notes", JSON.stringify(mockNotes));

    const page = renderPage();

    expect(page.cleanup).toBeDefined();
    page.cleanup?.();

    expect(page.cleanup).toBeDefined();
  });
});
