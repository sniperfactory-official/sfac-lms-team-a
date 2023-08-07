import imageCompression from "browser-image-compression";

export default async function imageCompress(file: File) {
  const options = {
    maxSizeMB: 0.2, // 이미지 최대 용량 - 200kb
    maxWidthOrHeight: 1920, // 최대 넓이(혹은 높이)
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.log(error);
  }
}
