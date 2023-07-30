import {
  DocumentData,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  DocumentReference,
} from "@firebase/firestore";
import { Post, User } from "@/types/firebase.types";
import { useState, useEffect } from "react";
import { storage, db } from "@/utils/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";

import { useQuery } from "@tanstack/react-query";

let postImages: string[] = [];

const getPostImage = async (imageArr: string[]) => {
  // const imgArr=["/post/images/chapter3_blueberry1.jpeg", "/post/images/chapter3_dessert1.jpeg"]
  imageArr.forEach(async img => {
    const storageRef = ref(storage, img);
    await getDownloadURL(storageRef).then((x: any) => {
      postImages.push(x);
    });
  });

  return postImages;
};

export default function useGetPostImage(imageArr: string[]) {
  return useQuery(
    ["image", imageArr],
    async () => await getPostImage(imageArr),
  );
}
