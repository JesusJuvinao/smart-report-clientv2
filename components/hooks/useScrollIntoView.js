/* eslint-disable no-param-reassign */
import { useEffect, useRef, useState, useCallback } from "react";

export const  useScrollIntoView = ( ref, active=true, options = { behavior: "smooth" } ) => {
  const scrollOptions = useRef(options);
  useEffect(() => {
    scrollOptions.current = options;
  }, [options]);
  useEffect(() => {
    if (ref.current && active) {
      ref.current.scrollIntoView(scrollOptions.current);
    }
  }, [ref, active]);
}

function getScrollPosition(element) {
  const { scrollLeft, scrollTop } = element;
  return {
    scrollLeft,
    scrollTop,
    x: scrollLeft,
    y: scrollTop,
    left: scrollLeft,
    top: scrollTop
  };
}
const initialPosition = {
  scrollLeft: 0,
  scrollTop: 0,
  x: 0,
  y: 0,
  left: 0,
  top: 0
};
export function useScrollPosition(element) {
  const rafTick = useRef(0);
  const [position, setPosition] = useState(initialPosition);
  useEffect(() => {
    if (element === null) return;
    const target = element ?? document;
    const targetElement = element ?? document.documentElement;
    setPosition(getScrollPosition(targetElement));

    const onScroll = () => {
      if (rafTick.current) {
        return;
      }
      const cb = () => {
        setPosition(getScrollPosition(targetElement));
        rafTick.current = 0;
      };
      rafTick.current = requestAnimationFrame(cb);
    };
    target.addEventListener("scroll", onScroll);

    // eslint-disable-next-line consistent-return
    return () => {
      target.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafTick.current);
    };
  }, [element]);

  return position;
}

function getStorage(key, initialValue) {
  if (!window?.localStorage) {
    return initialValue;
  }

  try {
    const stringValue = window.localStorage.getItem(key);
    return stringValue ? JSON.parse(stringValue) : initialValue;
  } catch {
    return initialValue;
  }
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => getStorage(key, initialValue));

  const setStorageValue = useCallback(
    (v) => {
      window?.localStorage.setItem(key, JSON.stringify(v));
      setValue(v);
    },
    [key]
  );

  useEffect(() => {
    if (!window?.localStorage) return;
    const notify = (e) => {
      if (e.key === key) {
        try {
          setValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
        } catch {
          setValue(initialValue);
        }
      }
    };
    window.addEventListener("storage", notify);

    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener("storage", notify);
  }, [initialValue, key]);

  return [value, setStorageValue];
}
