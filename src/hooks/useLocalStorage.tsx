import { useState } from 'react';

function useLocalStorage(key: string) {
  const getItem = () => {
    const storedItem = localStorage.getItem(key);
    return storedItem ? storedItem : null;
  };

  const [item, setItemState] = useState<string | null>(getItem());

  const setItem = (newItem: string) => {
    localStorage.setItem(key, newItem);
    setItemState(newItem);
  };

  const removeItem = () => {
    localStorage.removeItem(key);
    setItemState(null);
  };

  return { item, setItem, removeItem };
}

export default useLocalStorage;
