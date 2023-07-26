import { Lecture } from "@/types/firebase.types";
import LectureVideo from "./Video";
import LectureNote from "./Note";

const LetcureContent = ({
  contentType,
}: {
  contentType: Pick<Lecture, "lectureType">;
}) => {
  return (
    <div className="w-full h-full">
      {contentType.lectureType === "비디오" ? (
        <LectureVideo />
      ) : (
        <LectureNote />
      )}
    </div>
  );
};

export default LetcureContent;
