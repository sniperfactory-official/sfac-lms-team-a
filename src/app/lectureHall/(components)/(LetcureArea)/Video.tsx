import ReactPlayer from "react-player";

const LectureVideo = ({ videoContent }: { videoContent: string }) => {
  console.log(videoContent);
  return (
    <div className="w-full h-full flex justify-center items-center p-5">
      <video controls className="max-w-[1280px] w-full h-auto">
        <source src={videoContent} type="video/mp4" />
      </video>
    </div>
  );
};

export default LectureVideo;
