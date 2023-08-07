"use client";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import NextImage from "next/image";
import { useEffect, useState } from "react";

interface ImageSize {
  width: number;
  height: number;
}

const LectureNote = ({ content }: { content: string }) => {
  const [images, setImages] = useState<{
    [key: string]: ImageSize;
  }>({});

  const getImageSize = (
    imageUrl: string,
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = (error: unknown) => {
        reject(error);
      };
    });
  };
  useEffect(() => {
    const imageUrls = content
      .match(/!\[.*?\]\((.*?)\)/g)
      ?.map(match => match.match(/!\[.*?\]\((.*?)\)/)?.[1]);
    if (imageUrls && imageUrls.length > 0) {
      const imageSizes: { [key: string]: ImageSize } = {};

      // 이미지 URL로 이미지 크기 정보를 얻어옴
      Promise.all(
        imageUrls.map(async url => {
          try {
            const size = await getImageSize(url!);
            imageSizes[url!] = size;
          } catch (error) {
            console.error("Error while getting image size:", error);
          }
        }),
      ).then(() => {
        setImages(imageSizes);
      });
    }
  }, [content]);

  return (
    <div className="w-full h-full overflow-y-scroll max-h-[800px]">
      <div className="prose max-w-none">
        <ReactMarkdown
          components={{
            img: props => {
              const imageUrl = props.src as string;
              const imageSize = images[imageUrl];

              if (imageSize) {
                return (
                  <NextImage
                    src={props.src as string}
                    alt={props.alt as string}
                    width={imageSize.width}
                    height={imageSize.height}
                  />
                );
              } else {
                return <img src={imageUrl} alt={props.alt as string} />;
              }
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default LectureNote;