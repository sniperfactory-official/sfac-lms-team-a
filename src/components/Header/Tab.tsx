"use client";

import { useState } from "react";

export default function Tab() {
  const [activeTab, setActiveTab] = useState("커뮤니티");

  return (
    <div>
      <div className="flex justify-center h-20">
        <div className="flex justify-between w-2/4">
          <div className="flex text-lg">
            <button
              onClick={() => setActiveTab("커뮤니티")}
              className={`w-96 ${
                activeTab === "커뮤니티"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : ""
              }`}
            >
              커뮤니티
            </button>
          </div>
          <div className="flex text-lg">
            <button
              onClick={() => setActiveTab("과제방")}
              className={`w-96 ${
                activeTab === "과제방"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : ""
              }`}
            >
              과제방
            </button>
          </div>
          <div className="flex text-lg">
            <button
              onClick={() => setActiveTab("강의실")}
              className={`w-96 ${
                activeTab === "강의실"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : ""
              }`}
            >
              강의실
            </button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
