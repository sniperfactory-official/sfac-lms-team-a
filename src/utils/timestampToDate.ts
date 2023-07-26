import type { Timestamp } from "firebase/firestore";

const timestampToDate = (firebaseTimestamp: Timestamp) => {
  const timestampInMillis =
    firebaseTimestamp.seconds * 1000 + firebaseTimestamp.nanoseconds / 1000000;
  const date = new Date(timestampInMillis);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export default timestampToDate;
