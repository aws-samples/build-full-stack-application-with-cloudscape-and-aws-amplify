// data controller
import { useEffect, useState } from 'react';

export function useAsyncData(loadCallback) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let rendered = true;
    loadCallback().then(items => {
      if (rendered) {
        setItems(items);
        setLoading(false);
      }
    });
    return () => {
      rendered = false;
    };
  }, []);

  return [items, setItems, loading];
}
