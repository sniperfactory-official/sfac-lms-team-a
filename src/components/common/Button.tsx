export default function Button({
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
            ? "h-[50px] px-[20px] py-[15px] rounded-[10px] bg-grayscale-5 text-white"
            : "h-[50px] px-[20px] py-[15px] rounded-[10px] bg-primary-80 text-white hover:opacity-60"
        }
        ${isError ? "bg-red" : "bg-primary-80"}
      `}
    >
      {text}
    </button>
  );
}
