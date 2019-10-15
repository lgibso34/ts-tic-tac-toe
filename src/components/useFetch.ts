
import { useEffect, useState, useRef } from "react";

export const useFetch = (url: string) => {
  const isCurrent = useRef(true);
  const [state, setState] = useState<{data: any, loading: boolean}>({ data: null, loading: true });

  useEffect(() => {
    return () => {
      // called when the component is going to unmount
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    setState(state => ({ data: state.data, loading: true }));
    fetch(url)
      .then(x => x.json())
      .then(y => {
        if (isCurrent.current) {
          setState({ data: y, loading: false });
        }
      });
  }, [url, setState]);

  return state;
};