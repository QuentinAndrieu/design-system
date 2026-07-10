export interface AvatarProps {
  name?: string;
  src?: string;
  size?: number;
}

/** Round avatar: image if `src`, otherwise the first initial on the accent gradient. */
export function Avatar({ name, src, size = 40 }: AvatarProps) {
  const initial = name?.trim()?.[0]?.toUpperCase() ?? "?";
  return (
    <div
      className="ds-avatar"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {src ? (
        <img
          src={src}
          alt={name ?? ""}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "inherit",
            objectFit: "cover",
          }}
        />
      ) : (
        initial
      )}
    </div>
  );
}
