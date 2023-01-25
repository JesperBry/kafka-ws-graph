import { Dispatch, useEffect, useState } from "react";

const usePersistedState = <T>(
  key: string,
  initialState: T
): [T, Dispatch<T>] => {
  const [state, setState] = useState<T>(
    localStorage.getItem(key) !== null || undefined
      ? JSON.parse(localStorage.getItem(key) as string)
      : initialState
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
};

export default usePersistedState;
