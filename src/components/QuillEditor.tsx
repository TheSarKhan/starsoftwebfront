"use client";

import { useRef, useMemo, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { api } from "@/lib/api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false }) as any;

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function QuillEditor({ value, onChange, placeholder }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const quillRef = useRef<any>(null);

  // Dynamically load Quill CSS only when this component mounts
  useEffect(() => {
    import("react-quill-new/dist/quill.snow.css");
  }, []);

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const token = localStorage.getItem("starsoft_token") || "";
      try {
        const { url } = await api.admin.uploadImage(token, file);

        // Get the underlying Quill editor instance
        const quill = quillRef.current?.getEditor
          ? quillRef.current.getEditor()
          : quillRef.current?.editor;

        if (!quill) {
          console.error("Quill editor instance not found");
          return;
        }

        const range = quill.getSelection(true);
        quill.insertEmbed(range ? range.index : 0, "image", url);
        quill.setSelection((range ? range.index : 0) + 1);
      } catch (err) {
        console.error("Image upload error:", err);
        alert("Şəkil yüklənmədi. Yenidən cəhd edin.");
      }
    };
    input.click();
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: { image: imageHandler },
      },
    }),
    [imageHandler],
  );

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      placeholder={placeholder}
    />
  );
}
