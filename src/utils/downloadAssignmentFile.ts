import { getDownloadURL, getStorage, ref } from "firebase/storage";

export const downloadAssignmentFile = async (fileName: string) => {
  const storage = getStorage();
  const gsReference = ref(
    storage,
    `gs://sniperfactory-lms.appspot.com/assignments/${fileName}`,
  );

  try {
    const downloadURL = await getDownloadURL(gsReference);

    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = event => {
      const blob = xhr.response;
      const downloadLink = document.createElement("a");

      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = fileName;
      downloadLink.click();
    };
    xhr.open("GET", downloadURL);
    xhr.send();
  } catch (error) {
    console.error("파일 다운로드 에러:", error);
  }
};
