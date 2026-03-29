import type { NoteProps } from "@/types/props";
import type { NoteComponent } from "@/types/components";

import "@/components/Note/Note.css";

const Note = ({
  id,
  children,
  onClickDelete,
  onClickEdit,
}: NoteProps): NoteComponent => {
  const divRoot = document.createElement("div") as NoteComponent;
  divRoot.className = "note";
  divRoot.id = id;

  divRoot.innerHTML = `
    <div class="note__header">
        <button type="button" class="note__header-btn note__header-btn-edit" aria-label="Edit note">
            <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button type="button" class="note__header-btn note__header-btn-delete" aria-label="Delete note">
            <i class="fa-solid fa-trash"></i>
        </button>
    </div>

    <div class="note__content">
        <textarea rows="5" cols="2" disabled class="note__textarea">${children}</textarea>
    </div>
  `;

  const noteBtnEdit = divRoot.querySelector<HTMLButtonElement>(
    ".note__header-btn-edit"
  );
  const noteBtnDelete = divRoot.querySelector<HTMLButtonElement>(
    ".note__header-btn-delete"
  );

  const handleEdit = (e: MouseEvent): void => {
    onClickEdit(e, id);
  };

  const handleDelete = (e: MouseEvent): void => {
    onClickDelete(e, id);
  };

  noteBtnEdit?.addEventListener("click", handleEdit);
  noteBtnDelete?.addEventListener("click", handleDelete);

  divRoot.cleanup = (): void => {
    noteBtnEdit?.removeEventListener("click", handleEdit);
    noteBtnDelete?.removeEventListener("click", handleDelete);
  };

  return divRoot;
};

export default Note;
