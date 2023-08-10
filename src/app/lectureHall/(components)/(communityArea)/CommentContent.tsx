const LectureCommentContentMention = ({ content }: { content: string }) => {
  const parts = content.split("");
  const highlightedContent = parts.map((part, index) => {
    const timePattern = /\b\d{1,2}:\d{2}(:\d{2})?\b/; // MM:SS 또는 HH:MM:SS 패턴
    if (part.startsWith("@")) {
      return (
        <span key={index} className="text-primary-80 mr-2">
          {part}
        </span>
      );
    } else if (timePattern.test(part)) {
      return (
        <button key={index} className="text-primary-80 mr-1">
          {part}
        </button>
      );
    }
    return (
      <span key={index} className="mr-1">
        {part}
      </span>
    );
  });

  return <>{highlightedContent}</>;
};

export default LectureCommentContentMention;
