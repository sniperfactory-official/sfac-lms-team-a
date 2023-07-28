#!/usr/bin/env node
const fs = require("fs");

// 커밋 메시지 형식을 정의합니다.
const commitMessagePattern =
  /^(Feat|Update|Fix|!BREAKING CHANGE|!HOTFIX|Style|Refactor|Comment|Chore|Docs|Test|Rename|Remove): .{1,50}$/;

// 커밋 메시지 파일 경로를 가져옵니다. (Husky 훅 스크립트에서 자동으로 전달됩니다.)
const commitMessageFilePath = process.argv[2];

// 커밋 메시지를 읽어옵니다.
const commitMessage = fs.readFileSync(commitMessageFilePath, "utf-8").trim();

// 커밋 메시지 형식을 검증합니다.
if (!commitMessagePattern.test(commitMessage)) {
  console.error(`
  사용가능한 commit의 Prefix는 아래와 같습니다.

  ===================== 반드시 콜론 한 개(:)를 사용하고 띄어쓰기 후 내용을 입력합니다. =====================  
  Feat:             새로운 기능 추가
  Update:           기능 수정
  Fix:              버그 수정
  !BREAKING CHANGE: 커다란 API 변경의 경우
  !HOTFIX:          급하게 치명적인 버그를 고쳐야하는 경우
  Style:            CSS 및 UI, 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우
  Refactor:         코드 리팩토링 (기능 변경 X, 코드 가독성, 구조, 품질 개선의 경우)
  Comment:          필요한 주석 추가 및 변경
  Chore:            빌드 업무 수정, 패키지 매니저 수정
  Docs:             문서 수정
  Test:             빌드 업무 수정, 패키지 매니저 수정, 패키지 관리자 수정 등 업데이트, Production Code 변경 없음
  Rename:           파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
  Remove:           파일을 삭제하는 작업만 수행한 경우
  ==============================================================================================
  `);
  process.exit(1); // 검증 실패 시 프로세스를 종료합니다.
}

// 조정된 커밋 메시지를 파일에 씁니다.
fs.writeFileSync(commitMessageFilePath, commitMessage);
process.exit(0); // 성공적으로 완료되면 프로세스를 종료합니다.
