import { useEffect, useState } from "react";

export function useCopy() {
  const [copiedText, setCopiedText] = useState("");
  const [copiedTextLength, setCopiedTextLength] = useState("");

  const handleCopy = (text) => {
    const cb = navigator.clipboard;
    cb.writeText(text.toString()).catch((error) => console.log(error));
    setCopiedText(text);
  };

  useEffect(() => {
    setCopiedTextLength(copiedText?.length);
    setTimeout(() => {
      setCopiedText(null)
    }, 1000);
  }, [copiedText]);

  return { handleCopy, copiedText, copiedTextLength };
}
