const LectureCommentInput = ({ parentId }: { parentId: string }) => {
  console.log(parentId)
  return (
    <div className="w-full min-h-[90px] bg-white rounded-2xl p-4 flex items-center justify-center border border-grayscale-10">
      <div className="w-full h-full">
        <div className="w-full h-2/5">
          {/* 추후 프로필 이미지 들어갈 공간 */}
          캐서린 ˙ 수강생
        </div>
        <input
          name="commentInput"
          placeholder="댓글을 입력해 주세요"
          className="w-full"
        />
        <button>업로드</button>
      </div>
    </div>
  );
};

export default LectureCommentInput;
