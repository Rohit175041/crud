import { useCallback, useEffect, useRef, useState } from "react";

export function useAsync(asyncFn, immediate = true) {
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const [value, setValue] = useState(null);

  const isMounted = useRef(true);

  useEffect(() => {
    return () => (isMounted.current = false);
  }, []);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);

      try {
        const data = await asyncFn(...args);
        if (isMounted.current) setValue(data);
        return data;
      } catch (err) {
        if (isMounted.current) setError(err.message);
        throw err;
      } finally {
        if (isMounted.current) setLoading(false);
      }
    },
    [asyncFn]
  );

  useEffect(() => {
    if (immediate) execute();
  }, [execute, immediate]);

  return { loading, error, value, execute };
}
