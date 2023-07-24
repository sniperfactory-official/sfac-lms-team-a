"use client";
import { useAppSelector } from "@/redux/store";

export default function CommunityPage() {
  const userId = useAppSelector(state => state.userId);
  console.log(userId); // {uid: 'uid 값'} 확인가능
  return (
    <div>
      <h3>커뮤니티 페이지</h3>
      <h4>uid : {userId.uid}</h4>
    </div>
  );
}
