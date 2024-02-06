import { createContext, useContext } from "react";

export const DeleteActionContext = createContext<((x: string) => void) | undefined>(undefined);

export function useDeleteActionContext() {
  const setDeletePopUp = useContext(DeleteActionContext);
  if (setDeletePopUp === undefined) {
    throw new Error("useDeleteActionContext must be used with DeleteActionContext.");
  }

  return setDeletePopUp;
}
