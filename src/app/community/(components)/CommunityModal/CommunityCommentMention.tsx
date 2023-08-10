const CommunityCommentMention = ({ content }: { content: string }) => {
  const parts = content.split("|");
  const highlightedContent = parts.map((part, index) => {
    if (part.startsWith("@")) {
      return (
        <span key={index} className="text-primary-80 mr-2">
          {part}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });

  return <>{highlightedContent}</>;
};

export default CommunityCommentMention;
