import React, { useMemo } from "react";
import { db, storage } from "../../firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import {
  ref,
  uploadBytes,
  listAll,
  list,
  getDownloadURL,
} from "firebase/storage";
let data=[];
export async function GET(request) {
    let imagesRef = ref(storage, "images/courses/");
    let imageUrls = [];
    let res = await listAll(imagesRef).then((response) =>
      response.items.forEach((item) =>
        getDownloadURL(item).then((url) => imageUrls.push(url))
      )
    );
    const querySnapshot = await getDocs(collection(db, "courses"));
    if (querySnapshot) console.log("get done");
    data=[];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        data: doc.data(),
        image: imageUrls.filter((url, i) => url.includes(doc.data().imgPath)),
      });
    });
    return NextResponse.json(data);
}
export async function POST(request) {
  const { title, price, details, duration, instructor, cImage , buyers , track } =
    await request.json();
  try {
    const docRef = await addDoc(collection(db, "courses"), {
      title: title,
      price: price,
      details: details,
      instructor: instructor,
      duration: duration,
      cImage:cImage,
      buyers : buyers,
      track : track ,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return NextResponse.json({ message: "course created" });
}
