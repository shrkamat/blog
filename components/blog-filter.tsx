"use client";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { Input } from "./ui/input";
import { debounce } from "lodash";

const BlogFilter = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const search = searchParams.get("search") ?? "";
  const [searchState, setSearchState] = useState(search);

  return (
    <div className="flex items-center relative">
      <Input
        className="rounded-xl focus-visible:ring-purple-200 pr-8"
        placeholder="Search articles"
        ref={inputRef}
        value={searchState}
        type="text"
        onChange={(e) => {
          const value = e.target.value;
          setSearchState(value);
          debounce(() => {
            router.push(pathname + "?" + createQueryString("search", value));
          }, 1000)();
        }}
      />
      <div
        className="absolute right-2"
        onClick={() => {
          if (inputRef.current) {
            inputRef?.current?.focus();
          }
        }}
      >
        <Search size={16} />
      </div>
    </div>
  );
};

export default BlogFilter;
