interface CardProps {
  children: JSX.Element[];
  vertical?: boolean;
  key?: string;
}

const Card = ({ children, vertical, key }: CardProps) => {
  return (
    <li
      className={`flex ${
        vertical ? "flex-row" : "flex-col"
      } rounded-lg p-7 border border-grayscale-10 list-none`}
      key={key}
    >
      {children}
    </li>
  );
};

export default Card;
