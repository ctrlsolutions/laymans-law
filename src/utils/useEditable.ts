import { useState } from "react";

export function useEditable(initialState: boolean = false) {
  const [isEditable, setIsEditable] = useState(initialState);

  const toggleEditable = () => setIsEditable(!isEditable);

  return { isEditable, toggleEditable };
}
