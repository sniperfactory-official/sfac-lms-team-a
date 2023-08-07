import React from "react";
import Detail from "./(assignmentDetail)/Detail";

const AssignmentDetailPage = () => {
  return (
    <Detail></Detail>
  );
};

export default AssignmentDetailPage;

// const { assignmentId } = useParams();

//유저 정보
//userData를 Main과 Sub로 데이터 보내기
// const userId = useAppSelector(state => state.userId.uid);
// const { data: userData } = fetchUserInfo(userId);

// const [assignModal, setAssignModal] = useState(false);
// const handleAssignModal = () => {
//   setAssignModal(!assignModal);
// };

// const {
//   data: listData,
//   error: listError,
//   isLoading: listIsLoading,
// } = useGetAssignments();
// const getUpdateList = (arr: any[]) => {};

// if (listIsLoading) return <div>Loading...</div>;

//textarea 엔터키 구하는 코드
// const textes = data?.content?.split("\n");
// const changeText = (textes: string[]) => {
//   return textes?.map((text: string, index: number) => (
//     <p key={index}>{text}</p>
//   ));
// };

//시작일, 마감일 구하는 코드
// let startDate;
// let endDate;
// if (data) {
//   const startTimestamp = data.startDate;
//   startDate = timestampToDate(startTimestamp as Timestamp)
//   const endTimestamp = data.endDate;
//   endDate = timestampToDate(endTimestamp as Timestamp)
// }

//말 그래도 detail 페이지에서 과제 정보를 보내주는 훅 (걍 과제 제목.내용,강의시작날짜,마감날짜 등등...)
//assignment 콜렉션에서 가져온 딱 하나의 과제
// const { data, isLoading, error } = useGetDetailAssignment(
//   assignmentId as string,
// );

{
  /* {result ? (
          result.data?.map((ele, index) => {
            let k;
            if (ele) {
              // console.log(ele);
              const id = ele.userId?.id;
              const time = ele.createAt?.seconds;
              // console.log(time);
              k = ele.id as string;
              return (
                <SubmitAssign
                  k={k}
                  setUserda={setUserda}
                  setModal={setModal}
                  setDocumentId={setDocumentId}
                  setFeedId={setFeedId}
                  id={id}
                  key={index}
                ></SubmitAssign>
              );
            }
          })
        ) : (
          <div>
            <img src="/images/sad.svg" alt="" className="mb-[18.88px]" />
            <h2 className="font-[500] text-[20px] text-grayscale-30">
              제출된 과제가 없습니다
            </h2>
          </div>
        )}

        {modal && (
          <ModalWrapper modalTitle="상세보기" onCloseModal={handleModal}>
            <SubmittedAssignment k={documentId}></SubmittedAssignment>
            <Feedback
              docId={documentId}
              userId={userId}
              userData={userData}
            ></Feedback>
          </ModalWrapper>
        )} */
}

{
  /* {assignModal && (
          <ModalWrapper modalTitle="상세보기" onCloseModal={handleAssignModal}>
            <Modal></Modal>
          </ModalWrapper>
        )} */
}

// const [modal, setModal] = useState(false);
// const handleModal = () => {
//   setModal(!modal);
// };

// const [feedId, setFeedId] = useState<string>();
// const [userda, setUserda] = useState();
// const [documentId, setDocumentId] = useState<string>();

//강사일 경우 제출된 과제가 많이 렌더링 되야됨
// const result = useGetDetailSubmitted(assignmentId as string);
// console.log(result);
// const re = result.data?.filter(ele => ele !== undefined).length;
