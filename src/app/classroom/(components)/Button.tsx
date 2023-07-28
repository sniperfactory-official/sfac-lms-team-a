interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const ClassroomButton = ({ children, onClick }: Props) => {
  return (
    <button
      className="w-full h-12 mt-3 border border-primary-40 rounded-lg text-primary-60 text-base font-bold"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ClassroomButton;
