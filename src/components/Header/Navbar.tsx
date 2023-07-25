import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <div className="flex justify-center bg-blue-50 h-20 items-center">
        <div className="flex justify-between w-3/4">
          <div className="flex">
            <div className="">
              <span className="mr-1">이미지</span>
              <Image src="" alt="" />
            </div>
            <div>
              <p>
                안녕하세요 <span className="font-bold">캐서린님</span>, 강의{" "}
                <span className="font-bold">10일째</span>입니다.
              </p>
            </div>
          </div>
          <div className="flex justify-center ">
            <p className="mr-2">스나이퍼팩토리</p>
            <p>
              <span className="mr-1 text-blue-600 font-bold">FLUTTER</span>
              <span className="font-bold">부트캠프 3기</span>
            </p>
          </div>
          <div className="flex w-1/4 divide-x-2 divide-gray justify-end">
            <Link href="{}">
              <button className="mr-2">마이페이지</button>
            </Link>
            <div>
              <Link href="{}">
                <button className="ml-2">로그아웃</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
