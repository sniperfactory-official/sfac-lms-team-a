"use client";

import useProgressMutateion from "@/hooks/reactQuery/lecture/useProgressMutation";
import { Progress } from "@/types/firebase.types";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

const LectureVideo = ({
  videoContent,
  progress,
  userId,
  lectureId,
  nowPlayTime,
  resetTimeHandler,
}: {
  nowPlayTime: number;
  lectureId: string;
  userId: string;
  videoContent: string;
  progress: Progress | null;
  resetTimeHandler: () => void;
}) => {
  const [playTimeState, setPlayTimeState] = useState<number>(0);
  const { mutate } = useProgressMutateion(lectureId);
  const playerRef = useRef<ReactPlayer | null>(null);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    if (
      nowPlayTime !== 0 &&
      playerRef !== (null || undefined) &&
      playerRef.current !== (undefined || null) &&
      duration > 0
    ) {
      if (duration >= nowPlayTime) {
        const timeIndex = nowPlayTime;
        playerRef.current.seekTo(timeIndex);
      }
      resetTimeHandler();
    }
  }, [nowPlayTime]);

  return (
    <div className="w-full h-full flex justify-center items-center p-5">
      <ReactPlayer
        onDuration={duration => {
          setDuration(duration);
        }}
        ref={playerRef}
        url={videoContent}
        controls={true}
        width={"1200px"}
        height={"720px"}
        onProgress={e => {
          if (e.playedSeconds >= playTimeState + 5) {
            setPlayTimeState(prev => prev + 5);
            console.log(e);
            const isCompleted =
              (progress && e.played > 0.8) ||
              (progress && progress.isCompleted === true);
            mutate({
              lectureId,
              userId,
              start: e.playedSeconds.toString(),
              end: e.loaded.toString(),
              isCompleted: isCompleted !== null ? isCompleted : false,
              progressId: progress && progress.id ? progress.id : "",
            });
          }
        }}
        playing={true}
        config={{
          file: {
            attributes: {
              controlsList: "nodownload", // 다운로드 링크 제거
            },
          },
        }}
        onStart={() => {
          if (
            playerRef !== null &&
            playerRef.current !== null &&
            progress !== null &&
            progress.playTimes &&
            progress.playTimes.length > 0 &&
            progress.playTimes[0].start
          ) {
            console.log(progress.playTimes);
            playerRef.current.seekTo(
              parseInt(progress.playTimes[0].start),
              "seconds",
            );
          }
        }}
        onEnded={() => {
          mutate({
            lectureId,
            userId,
            start: "0",
            end: "0",
            isCompleted: true,
            progressId: progress && progress.id ? progress.id : "",
          });
        }}
      />
    </div>
  );
};

export default LectureVideo;
