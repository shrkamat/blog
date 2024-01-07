"use client";

import { Copy, CopyCheck } from "lucide-react";
import { useRef, useState } from "react";

const CodeExport = (props) => {
  const [showCheck, setShowCheck] = useState(false);
  const preRef = useRef();
  return (
    <div className="group relative">
      <pre className="bg-white text-primary " {...props} ref={preRef} />
      <div
        className="group-hover:block absolute right-2 top-2 dark:text-secondary"
        title="Copy code"
      >
        {showCheck ? (
          <CopyCheck size={14} />
        ) : (
          <Copy
            size={14}
            onClick={() => {
              if (preRef.current) {
                const text = preRef.current.innerText;
                setShowCheck(true);
                setTimeout(() => {
                  setShowCheck(false);
                }, 1000);
                navigator.clipboard.writeText(text);
              }
            }}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default CodeExport;
