export interface ErrorBoxProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

/** Centered error message with an optional retry chip. */
export function ErrorBox({ message, onRetry, retryLabel = "Try again" }: ErrorBoxProps) {
  return (
    <div className="ds-errbox ds-glass">
      <p>{message}</p>
      {onRetry ? (
        <button className="ds-chip" onClick={onRetry}>
          {retryLabel}
        </button>
      ) : null}
    </div>
  );
}
