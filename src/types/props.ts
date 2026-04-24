interface DefaultProps {
  className?: string | undefined;
  children?: string | undefined;
}

export interface NoteProps extends DefaultProps {
  id: string;
  onClickEdit: (e: MouseEvent, id: string) => void;
  onClickDelete: (e: MouseEvent, id: string) => void;
}
