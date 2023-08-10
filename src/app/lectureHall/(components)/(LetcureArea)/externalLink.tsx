import Link from "next/link";

const ExternalLink = ({ content }: { content: string }) => {
  return (
    <Link
      href={content}
      about="외부로 나가지는 링크입니다."
      className="text-primary-80"
      target="_blank"
    >
      {content}
    </Link>
  );
};

export default ExternalLink;
