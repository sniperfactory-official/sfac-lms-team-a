import { render,waitFor,screen } from "@testing-library/react"
import LectureHallHeader from "../(components)/Header"
import TestReactQueryClientProvider from "./TestReactQueryClientProvider";
import { Lecture } from "@/types/firebase.types";
import { Timestamp } from "firebase/firestore";
import LetcureContent from "../(components)/(LetcureArea)/LectureContent";
interface MockLecture extends Omit<Lecture, "userId" | "courseId">{}
const mockData: MockLecture  = {
    "title": "[DAY1] 프론트엔드와 백엔드",
    "isPrivate": false,
    "endDate": {
        "seconds": 1689865200,
        "nanoseconds": 312000000
    } as Timestamp,
    "startDate": {
        "seconds": 1689865200,
        "nanoseconds": 439000000
    } as Timestamp,
    "createdAt": {
        "seconds": 1689865200,
        "nanoseconds": 721000000
    } as Timestamp,
    "lectureType": "비디오",
    "updatedAt": {
        "seconds": 1689865200,
        "nanoseconds": 33000000
    } as Timestamp,
    "lectureContent": {
        "textContent": "",
        "externalLink": "",
        "videoLength": 0,
        "images": [],
        "videoUrl": ""
    },
    "user": {
        id: "",
        "role": "관리자",
        "email": "",
        "username": "김스팩",
        "profileImage": "",
        "createdAt": {
            "seconds": 1688970687,
            "nanoseconds": 206000000
        } as Timestamp,
        "updatedAt": {
            "seconds": 1688970687,
            "nanoseconds": 206000000
        } as Timestamp
    },
    id: "",
}

jest.mock("../../../hooks/reactQuery/lecture/useGetLectureInfoQuery.ts", () => ({
    __esModule: true,
    default: jest.fn(),
}));



describe("헤더에 데이터가 정상적으로 들어오는지 판단", () => {
    // it('useQuery 모킹 테스트', async () => {
    //      useGetLectureInfoQuery.mockReturnValue({data:mockData, isLoading:false,error:null})
    // })
    it("헤더에 데이터가 정상적으로 들어온 경우", async () => {
        const rendered = render(<TestReactQueryClientProvider><LectureHallHeader LetcureInfo={mockData}/></TestReactQueryClientProvider>);
        await waitFor(() => rendered.getByText("[DAY1] 프론트엔드와 백엔드"));
        await waitFor(() => rendered.getByText("[수강기간]2023.07.21~2023.07.21"));
        await waitFor(() => rendered.getByText("김스팩 · 관리자"));
        
    })

    it("강의가 동영상 타입인 경우와 노트인 경우", async () => {
        const contentType = {
            lectureType:"비디오" as "비디오"|"노트"|"링크"
        }
        render(<LetcureContent contentType={contentType} />)
        screen.getByText("비디오인가?");
    })
    it("강의가 동영상 타입인 경우와 노트인 경우", async () => {
        const contentType = {
            lectureType:"노트" as "비디오"|"노트"|"링크"
        }
        render(<LetcureContent contentType={contentType} />)
        screen.getByText("노트인가?");
    } )
 })
