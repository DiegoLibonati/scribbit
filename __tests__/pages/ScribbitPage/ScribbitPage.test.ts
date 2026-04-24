import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import ScribbitPage from "@/pages/ScribbitPage/ScribbitPage";

import { mockNotes, mockNote } from "@tests/__mocks__/notes.mock";

const renderPage = (): Page => {
  const btnAdd = document.createElement("button");
  btnAdd.className = "header__btn-add";
  btnAdd.setAttribute("aria-label", "Add note");
  document.body.appendChild(btnAdd);

  const alertH2 = document.createElement("h2");
  alertH2.className = "header__alert";
  document.body.appendChild(alertH2);

  const page = ScribbitPage();
  document.body.appendChild(page);
  return page;
};

describe("ScribbitPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render with the scribbit-page class", () => {
      const page = renderPage();
      expect(page).toHaveClass("scribbit-page");
    });

    it("should render no notes when localStorage is empty", () => {
      renderPage();
      expect(
        screen.queryAllByRole("button", { name: "Edit note" })
      ).toHaveLength(0);
    });

    it("should render notes from localStorage on initialization", () => {
      localStorage.setItem("notes", JSON.stringify(mockNotes));
      renderPage();
      expect(screen.getAllByRole("button", { name: "Edit note" })).toHaveLength(
        mockNotes.length
      );
    });

    it("should render the correct text for each note", () => {
      localStorage.setItem("notes", JSON.stringify(mockNotes));
      renderPage();
      expect(screen.getByDisplayValue("Test note 1")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Test note 2")).toBeInTheDocument();
    });
  });

  describe("adding a note", () => {
    it("should add a new note to the DOM", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Add note" }));
      expect(screen.getAllByRole("button", { name: "Edit note" })).toHaveLength(
        1
      );
    });

    it("should save the new note to localStorage", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Add note" }));
      const stored = JSON.parse(
        localStorage.getItem("notes") ?? "[]"
      ) as unknown[];
      expect(stored).toHaveLength(1);
    });

    it("should use the generated uuid as the note id", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Add note" }));
      const stored = JSON.parse(localStorage.getItem("notes") ?? "[]") as {
        id: string;
        text: string;
      }[];
      expect(stored[0]).toBeDefined();
      expect(
        document.querySelector<HTMLDivElement>(`#${CSS.escape(stored[0]!.id)}`)
      ).toBeInTheDocument();
    });

    it("should show a creation success alert", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Add note" }));
      expect(
        document.querySelector<HTMLHeadingElement>(".header__alert")
      ).toHaveTextContent("1 note has been successfully created ✅");
    });
  });

  describe("editing a note", () => {
    beforeEach(() => {
      localStorage.setItem("notes", JSON.stringify([mockNote]));
    });

    it("should enable the textarea when edit button is clicked", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Edit note" }));
      expect(screen.getByDisplayValue(mockNote!.text)).not.toBeDisabled();
    });

    it("should show the finish edit button when edit is clicked", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Edit note" }));
      expect(
        screen.getByRole("button", { name: "Finish editing" })
      ).toBeInTheDocument();
    });

    it("should save the edited text to localStorage on finish", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Edit note" }));
      const textarea = screen.getByDisplayValue(mockNote!.text);
      await user.clear(textarea);
      await user.type(textarea, "Updated text");
      await user.click(screen.getByRole("button", { name: "Finish editing" }));
      const stored = JSON.parse(localStorage.getItem("notes") ?? "[]") as {
        id: string;
        text: string;
      }[];
      expect(stored[0]?.text).toBe("Updated text");
    });

    it("should disable the textarea after finishing edit", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Edit note" }));
      await user.click(screen.getByRole("button", { name: "Finish editing" }));
      expect(screen.getByDisplayValue(mockNote!.text)).toBeDisabled();
    });

    it("should remove the finish edit button after finishing edit", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Edit note" }));
      await user.click(screen.getByRole("button", { name: "Finish editing" }));
      expect(
        screen.queryByRole("button", { name: "Finish editing" })
      ).not.toBeInTheDocument();
    });

    it("should show an edit success alert after finishing edit", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Edit note" }));
      await user.click(screen.getByRole("button", { name: "Finish editing" }));
      expect(
        document.querySelector<HTMLHeadingElement>(".header__alert")
      ).toHaveTextContent("1 note has been successfully edited ✅");
    });
  });

  describe("deleting a note", () => {
    beforeEach(() => {
      localStorage.setItem("notes", JSON.stringify([mockNote]));
    });

    it("should remove the note from the DOM", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Delete note" }));
      expect(
        document.querySelector<HTMLDivElement>(`#${CSS.escape(mockNote!.id)}`)
      ).not.toBeInTheDocument();
    });

    it("should update localStorage to remove the deleted note", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Delete note" }));
      const stored = JSON.parse(
        localStorage.getItem("notes") ?? "[]"
      ) as unknown[];
      expect(stored).toHaveLength(0);
    });

    it("should show a delete success alert", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Delete note" }));
      expect(
        document.querySelector<HTMLHeadingElement>(".header__alert")
      ).toHaveTextContent("1 note has been successfully deleted ✅");
    });
  });

  describe("cleanup", () => {
    it("should stop handling add button clicks after cleanup", async () => {
      const user = userEvent.setup();
      const page = renderPage();
      page.cleanup?.();
      await user.click(screen.getByRole("button", { name: "Add note" }));
      expect(
        screen.queryAllByRole("button", { name: "Edit note" })
      ).toHaveLength(0);
    });

    it("should not throw when called", () => {
      const page = renderPage();
      expect(() => page.cleanup?.()).not.toThrow();
    });
  });
});
