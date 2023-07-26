"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Tab() {
  const [activeTab, setActiveTab] = useState("커뮤니티");
  const router = useRouter();
  useEffect(() => {
    renderTabContent();
  }, [activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "커뮤니티":
        return router.push("/community");
      case "과제방":
        return router.push("/assignmentRoom");
      case "강의실":
        return router.push("/classRoom");
      default:
        return router.push("/community");
    }
  };

  return (
    <div>
      <div className="flex justify-center h-20 w-screen">
        <div className="flex justify-between w-9/12">
          <button
            onClick={() => setActiveTab("커뮤니티")}
            className={`w-1/3 text-lg ${
              activeTab === "커뮤니티"
                ? "text-blue-600 border-b-4 border-blue-600"
                : ""
            }`}
          >
            커뮤니티
          </button>
          <button
            onClick={() => setActiveTab("과제방")}
            className={`w-1/3 text-lg ${
              activeTab === "과제방"
                ? "text-blue-600 border-b-4 border-blue-600"
                : ""
            }`}
          >
            과제방
          </button>
          <button
            onClick={() => setActiveTab("강의실")}
            className={`w-1/3 text-lg ${
              activeTab === "강의실"
                ? "text-blue-600 border-b-4 border-blue-600"
                : ""
            }`}
          >
            강의실
          </button>
        </div>
      </div>
    </div>
  );
}
