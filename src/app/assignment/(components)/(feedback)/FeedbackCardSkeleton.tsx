import React from "react";
import Card from "../Card";

const FeedbackCardSkeleton = () => {
  return (
    <>
      <Card vertical={true}>
        <div className="flex animate-pulse">
          <div className="flex-shrink-0">
            <span className="w-12 h-12 block bg-gray-200 rounded-full"></span>
          </div>

          <div className="ml-4 mt-2 w-full">
            <div className="flex gap-3">
              <h3 className="h-4 bg-gray-200 rounded-md w-[15%]"></h3>
              <h3 className="h-4 bg-gray-200 rounded-md w-[10%]"></h3>
            </div>

            <ul className="flex flex-col items-end mt-5 space-y-3">
              <li className="w-full h-4 bg-gray-200 rounded-md"></li>
              <li className="w-1/6 h-[35px] bg-gray-200 rounded-md"></li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
};

export default FeedbackCardSkeleton;
