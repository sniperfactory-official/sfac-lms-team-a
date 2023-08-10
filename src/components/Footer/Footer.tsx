import Image from "next/image";
import Link from "next/link";

import facebookLogo from "/public/images/facebookLogo.svg";
import instagramLogo from "/public/images/instagramLogo.svg";
import youtubeLogo from "/public/images/youtubeLogo.svg";

const contactInfo = [
  { info: "고유번호 : 324-82-00580 | 이사장 : 염민호 (와이엠에스닷코)" },
  { info: "통신판매업 신고번호 : 2022-경기김포-3659" },
  {
    info: "주소 : 서울특별시 강서구 마곡중앙2로 11, 3층 305호(마곡동, M밸리 W TOWER III)",
  },
  { info: "연락처 : 050-6683-1001" },
  { info: "고객센터 : cs@sniperfactory.com" },
];

const links = [
  { text: "개인정보 처리방침", href: "" },
  { text: "서비스 이용약관", href: "" },
  { text: "환불규정", href: "" },
];

const socialMedia = [
  {
    src: facebookLogo,
    alt: "페이스북",
    href: "https://m.facebook.com/people/%EC%8A%A4%ED%8C%A9-%EC%8A%A4%EB%82%98%EC%9D%B4%ED%8D%BC%ED%8C%A9%ED%86%A0%EB%A6%AC/100084805140712/",
  },
  {
    src: instagramLogo,
    alt: "인스타그램",
    href: "https://instagram.com/sniperfactory_official?igshid=MzRlODBiNWFlZA==",
  },
  {
    src: youtubeLogo,
    alt: "유튜브",
    href: "https://youtube.com/@user-tl4ho6fw4u",
  },
];

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center pb-[4.5%]">
      <p className="font-bold">인사이드아웃 사회적 협동조합</p>
      <ul className="w-[1024px] mb-16 flex flex-col items-center text-sm">
        {contactInfo.map((item, index) => (
          <li key={index}>{item.info}</li>
        ))}
      </ul>
      <div className="flex justify-between">
        {links.map((link, index) => (
          <div key={index}>
            <Link
              className="px-1 underline underline-offset-[3px]"
              href={link.href}
            >
              {link.text}
            </Link>
            {index < links.length - 1 && <span className="w-1">|</span>}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-8 mt-8">
        {socialMedia.map((media, index) => (
          <Link href={media.href} target="_blank">
            <Image
              key={index}
              className="cursor-pointer"
              src={media.src}
              alt={media.alt}
            />
          </Link>
        ))}
      </div>
    </footer>
  );
}
