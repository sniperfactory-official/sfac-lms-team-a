import imageCompression from "browser-image-compression";

interface ImageCompressionProps {
  file: File;
  setCompressedImages: React.Dispatch<React.SetStateAction<File[]>>;
}

export default async function imageCompress({
  file,
  setCompressedImages,
}: ImageCompressionProps) {
  const options = {
    maxSizeMB: 0.2, // 이미지 최대 용량 - 200kb
    maxWidthOrHeight: 1920, // 최대 넓이(혹은 높이)
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(file, options);
    setCompressedImages(prev => [...prev, compressedFile]);
    console.log("각각의 압축파일::", compressedFile);
  } catch (error) {
    console.log(error);
  }
}
