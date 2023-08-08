import ReactPlayer from "react-player";

const LectureVideo = ({ videoContent }: { videoContent: string }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <video controls className="max-w-[1300px] w-full h-auto">
        <source src={videoContent} type="video/mp4" />
      </video>
    </div>
  );
};

export default LectureVideo;
