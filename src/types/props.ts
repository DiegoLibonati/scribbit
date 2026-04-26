interface DefaultProps {
  className?: string;
  children?: string;
}

export interface NoteProps extends DefaultProps {
  id: string;
  onClickEdit: (e: MouseEvent, id: string) => void;
  onClickDelete: (e: MouseEvent, id: string) => void;
}
