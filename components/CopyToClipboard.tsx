"use client";

import { cn } from "@/lib/utils";
import { Copy, CopyCheck } from "lucide-react";
import { useEffect, useState } from "react";

const CopyToClipboard = () => {
  const [showCheck, setShowCheck] = useState(false);

  return (
    <div
      className={cn(
        "group-hover:block transition-all group-hover:animate-slide-in-animation",
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
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default CopyToClipboard;
