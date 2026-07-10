// Loose by design: consumers spread this into Tailwind's `presets` array, whose
// own types are broadly partial. Typing it `any` avoids a hard tailwindcss type
// dependency in this package while keeping the subpath import declaration-clean.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const preset: any;
export default preset;
