export default function Button({
  text,
  disabled,
  isError,
  options,
}: {
  text: string;
  disabled?: boolean;
  isError?: boolean;
  options?: string;
}) {
  return (
    <button
      disabled={disabled}
      className={`cursor-pointer px-[20px] py-[15px] rounded-[10px] flex justify-center items-center
        ${disabled ? "bg-grayscale-5 text-white" : "hover:opacity-60"}
        ${
          isError
            ? "bg-grayscale-5 text-grayscale-20"
            : "bg-primary-80 text-white"
        }
        ${options}
      `}
    >
      {text}
    </button>
  );
}
