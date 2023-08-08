"use client"

import React, { useState, useEffect } from "react";
import PostCard from "@/components/CommunityModal/PostCard";
import CommentCard from "@/components/CommunityModal/CommentCard";
import { useAppSelector } from "@/redux/store";

const AssignmentsDetailModal = ({ id, filteredAssignments, filteredComments }) => {
  const userId = useAppSelector(state => state.userInfo.id);
  console.log(filteredAssignments)
  return (
    <div>     
      {/* {filteredAssignments.map((item)=> { */}
        <div
        key={filteredAssignments[0].id}
        className="h-[73px] text-base border-solid border border-gray-200 rounded-[10px] px-[12px] py-[16px] my-3 cursor-pointer"
        >
          <div className="flex">
            <div className="align-middle px-[5px] leading-5 text-[10px] text-center bg-gray-200 rounded mr-[7px] mb-[4px]">
              {filteredAssignments[0].category}
            </div>
            <h4 className=" text-sm">{filteredAssignments[0].title}</h4>
          </div>
          <p className=" text-xs text-primary-30 truncate overflow-hidden ...">
            {filteredAssignments[0].content}
          </p>
        </div>
        {/* })} */}
    </div> 

  )
}
export default AssignmentsDetailModal;