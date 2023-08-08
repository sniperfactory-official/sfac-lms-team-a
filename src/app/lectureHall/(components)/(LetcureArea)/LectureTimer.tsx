"use client";

import { useEffect } from "react";

const LectureTimer = ({
  setPlayTimeState,
  playTimeState,
}: {
  setPlayTimeState: () => void;
  playTimeState: string;
    }) => {
    useEffect(() => {
        const timer = setInterval(() => {
            
        },10000)
    },[])
    
};

export default LectureTimer;
