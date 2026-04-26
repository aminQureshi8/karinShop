import { memo, useRef } from "react";
import { CiMobile1 } from "react-icons/ci";
import * as CiIcons from "react-icons/ci";

const SubCate = memo(
  ({
    title,
    _id,
    icon,
    setBrandState,
    setSection,
    href,
  }: {
    title: string;
    _id: string;
    icon: string;
    href: string;
    setBrandState: React.Dispatch<React.SetStateAction<Brand[]>>;
    setSection: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    const controllerRef = useRef<AbortController | null>(null);

    const mouseEnter = async (id: string) => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      controllerRef.current = new AbortController();

      try {
        const res = await fetch(`/api/brand/subCate?sub=${id}`, {
          signal: controllerRef.current.signal,
        });

        const data = await res.json();

        setBrandState(data.findsBrand);
        setSection(href);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    };

    const Icon = CiIcons[icon as keyof typeof CiIcons] ?? CiMobile1;

    return (
      <li
        onMouseEnter={() => mouseEnter(_id)}
        className="flex items-center gap-1 transition-all hover:bg-blue-500 p-2 hover:text-white rounded-xl"
      >
        <Icon size={20} />
        <p>{title}</p>
      </li>
    );
  }
);

export default SubCate;
