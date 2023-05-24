import { useState } from 'react';

export default function useOpenModal() {
  const [open, setOpen] = useState(false);

  function setToOpen() {
    setOpen((prev) => !prev);
  }

  return [open, setToOpen];
}
