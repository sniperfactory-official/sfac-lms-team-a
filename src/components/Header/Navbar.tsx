import Image from "next/image";
import Link from "next/link";
import avatar from "public/images/Avatar.png";
import logo from "public/images/logo.png";

export default function Navbar() {
  return (
    <div>
      <div className="flex justify-center bg-blue-50 h-20 items-center">
        <div className="flex justify-between w-3/4">
          <div className="flex">
            <div className="">
              <Image src={avatar} alt="" className="w-10 h-10 mr-2" />
            </div>
            <div className="flex items-center">
              <p>
                안녕하세요 <span className="font-bold">캐서린님</span>, 강의{" "}
                <span className="font-bold">10일째</span>입니다.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Image src={logo} alt="" className="w-14 h-8 mr-2" />
            <p>
              <span className="mr-1 text-blue-600 font-bold text-xl">
                FLUTTER
              </span>
              <span className="font-bold text-xl">부트캠프 3기</span>
            </p>
          </div>
          <div className="flex w-1/4 divide-x-2 divide-gray justify-end">
            <Link href={"/mypage/"} className="flex items-center">
              <button className="mr-2">마이페이지</button>
            </Link>
            <div className="flex">
              <Link href="{}" className="flex items-center">
                <button className="ml-2">로그아웃</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
