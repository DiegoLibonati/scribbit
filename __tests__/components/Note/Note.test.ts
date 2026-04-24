import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { NoteProps } from "@/types/props";
import type { NoteComponent } from "@/types/components";

import Note from "@/components/Note/Note";

const mockOnClickEdit = jest.fn();
const mockOnClickDelete = jest.fn();

const defaultProps: NoteProps = {
  id: "note-test-id",
  children: "Test note text",
  onClickEdit: mockOnClickEdit,
  onClickDelete: mockOnClickDelete,
};

const renderComponent = (props: Partial<NoteProps> = {}): NoteComponent => {
  const element = Note({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("Note", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render with the correct id", () => {
      renderComponent();
      expect(
        document.querySelector<HTMLDivElement>("#note-test-id")
      ).toBeInTheDocument();
    });

    it("should render with the note class", () => {
      const element = renderComponent();
      expect(element).toHaveClass("note");
    });

    it("should render the textarea with the given text", () => {
      renderComponent();
      expect(screen.getByDisplayValue("Test note text")).toBeInTheDocument();
    });

    it("should render the textarea as disabled", () => {
      renderComponent();
      expect(screen.getByDisplayValue("Test note text")).toBeDisabled();
    });

    it("should render the edit button with the correct aria-label", () => {
      renderComponent();
      expect(
        screen.getByRole("button", { name: "Edit note" })
      ).toBeInTheDocument();
    });

    it("should render the delete button with the correct aria-label", () => {
      renderComponent();
      expect(
        screen.getByRole("button", { name: "Delete note" })
      ).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should call onClickEdit with the event and id when edit button is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Edit note" }));
      expect(mockOnClickEdit).toHaveBeenCalledTimes(1);
      expect(mockOnClickEdit).toHaveBeenCalledWith(
        expect.anything(),
        "note-test-id"
      );
    });

    it("should call onClickDelete with the event and id when delete button is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Delete note" }));
      expect(mockOnClickDelete).toHaveBeenCalledTimes(1);
      expect(mockOnClickDelete).toHaveBeenCalledWith(
        expect.anything(),
        "note-test-id"
      );
    });
  });

  describe("cleanup", () => {
    it("should not call onClickEdit after cleanup", async () => {
      const user = userEvent.setup();
      const element = renderComponent();
      element.cleanup?.();
      await user.click(screen.getByRole("button", { name: "Edit note" }));
      expect(mockOnClickEdit).not.toHaveBeenCalled();
    });

    it("should not call onClickDelete after cleanup", async () => {
      const user = userEvent.setup();
      const element = renderComponent();
      element.cleanup?.();
      await user.click(screen.getByRole("button", { name: "Delete note" }));
      expect(mockOnClickDelete).not.toHaveBeenCalled();
    });
  });
});
