import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { NoteProps } from "@/types/props";
import type { NoteComponent } from "@/types/components";

import Note from "@/components/Note/Note";

const renderComponent = (props: NoteProps): NoteComponent => {
  const container = Note(props);
  document.body.appendChild(container);
  return container;
};

describe("Note Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const mockOnClickEdit = jest.fn();
  const mockOnClickDelete = jest.fn();

  const defaultProps: NoteProps = {
    id: "note-1",
    children: "This is a test note",
    onClickEdit: mockOnClickEdit,
    onClickDelete: mockOnClickDelete,
  };

  it("should render note with correct structure", () => {
    renderComponent(defaultProps);

    const note = document.querySelector<HTMLDivElement>(".note");
    expect(note).toBeInTheDocument();
    expect(note).toHaveAttribute("id", "note-1");
  });

  it("should render textarea with note content", () => {
    renderComponent(defaultProps);

    const textarea =
      document.querySelector<HTMLTextAreaElement>(".note__textarea");
    expect(textarea).toBeInTheDocument();
    expect(textarea?.value).toBe("This is a test note");
    expect(textarea).toHaveAttribute("disabled");
  });

  it("should render edit and delete buttons", () => {
    renderComponent(defaultProps);

    expect(
      screen.getByRole("button", { name: "Edit note" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Delete note" })
    ).toBeInTheDocument();
  });

  it("should call onClickEdit with event and id when edit button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent(defaultProps);

    const editButton = screen.getByRole("button", { name: "Edit note" });
    await user.click(editButton);

    expect(mockOnClickEdit).toHaveBeenCalledTimes(1);
    expect(mockOnClickEdit).toHaveBeenCalledWith(
      expect.any(MouseEvent),
      "note-1"
    );
  });

  it("should call onClickDelete with event and id when delete button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent(defaultProps);

    const deleteButton = screen.getByRole("button", { name: "Delete note" });
    await user.click(deleteButton);

    expect(mockOnClickDelete).toHaveBeenCalledTimes(1);
    expect(mockOnClickDelete).toHaveBeenCalledWith(
      expect.any(MouseEvent),
      "note-1"
    );
  });

  it("should cleanup event listeners", async () => {
    const user = userEvent.setup();
    const note = renderComponent(defaultProps);

    note.cleanup?.();

    const editButton = screen.getByRole("button", { name: "Edit note" });
    const deleteButton = screen.getByRole("button", { name: "Delete note" });

    await user.click(editButton);
    await user.click(deleteButton);

    expect(mockOnClickEdit).not.toHaveBeenCalled();
    expect(mockOnClickDelete).not.toHaveBeenCalled();
  });
});
