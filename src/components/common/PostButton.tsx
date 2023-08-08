export default function PostButton({
  text,
  disabled,
  isError,
}: {
  text: string;
  disabled: boolean;
  isError?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      className={`
        ${
          disabled
            ? "h-[31px] px-[20px] rounded-[10px] bg-grayscale-5 text-white"
            : "h-[31px] px-[20px] rounded-[10px] bg-primary-80 text-white hover:opacity-60"
        }
        ${isError ? "bg-red" : "bg-primary-80"}
      `}
    >
      {text}
    </button>
  );
}
