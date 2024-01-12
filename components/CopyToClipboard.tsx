"use client";

import { cn } from "@/lib/utils";
import { Copy, CopyCheck } from "lucide-react";
import { useEffect, useState } from "react";

const CopyToClipboard = () => {
  const [showCheck, setShowCheck] = useState(false);

  return (
    <div
      className={cn(
        "group-hover:block transition-all dark:text-secondary group-hover:animate-slide-in-animation hover:bg-primary/5 dark:hover:bg-secondary/5 p-1 rounded",
        !showCheck ? "hidden" : "block"
      )}
      title="Copy link"
    >
      {showCheck ? (
        <CopyCheck size={14} />
      ) : (
        <Copy
          size={14}
          onClick={() => {
            setShowCheck(true);
            setTimeout(() => {
              setShowCheck(false);
            }, 1000);
            navigator.clipboard.writeText(window.location.href);
          }}
        //   className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default CopyToClipboard;
