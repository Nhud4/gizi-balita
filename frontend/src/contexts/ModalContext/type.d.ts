type Modal = {
  content: React.ReactNode;
  onConfirm?: () => void;
  open: boolean;
  title?: string;
  type?: "confirmation" | null;
  confirmationType?: "delete" | "add" | "edit" | "logout";
};
