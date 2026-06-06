export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

const fmtMb = (b: number) => Math.round((b / 1024 / 1024) * 10) / 10;

export interface ReadFileOptions {
  maxBytes?: number;
  kind?: string;
}

export const readFileAsDataUrl = (
  file: File,
  { maxBytes, kind = "fayl" }: ReadFileOptions = {},
): Promise<string> =>
  new Promise((resolve, reject) => {
    if (!file) return reject(new Error("Fayl seçilməyib."));
    if (maxBytes && file.size > maxBytes) {
      const msg = `${kind} çox böyükdür (${fmtMb(file.size)} MB) — maksimum ${fmtMb(maxBytes)} MB`;
      alert(msg);
      return reject(new Error(msg));
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") resolve(result);
      else reject(new Error(`${kind} oxunmadı`));
    };
    reader.onerror = () => {
      alert(`${kind} oxunmadı`);
      reject(new Error(`${kind} oxunmadı`));
    };
    reader.readAsDataURL(file);
  });
