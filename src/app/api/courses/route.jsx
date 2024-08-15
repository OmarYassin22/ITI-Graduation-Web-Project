import React from "react";
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
export async function GET(request) {
  let imagesRef = ref(storage, "images/courses/");
  let imageUrls = [];
  let res = await listAll(imagesRef).then((response) =>
    response.items.forEach((item) =>
      getDownloadURL(item).then((url) => imageUrls.push(url))
    )
  );

  const querySnapshot = await getDocs(collection(db, "courses"));
  let docs = [];
  querySnapshot.forEach( (doc) => {
    docs.push({
      id: doc.id,
      data: doc.data(),
      image:  imageUrls.filter((url, i) => url.includes(doc.data().imgPath)),
    });
  });

  return NextResponse.json( docs );
}
export async function POST(request) {
  const { title, price, details, duration , instructor, imgPath } = await request.json();

  try {
    console.log(imgPath);
    const docRef = await addDoc(collection(db, "courses"), {
      title: title,
      price: price,
      details: details,
      instructor: instructor,
      duration: duration,
      imgPath: imgPath != null ? imgPath : null,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  //   console.log(res);
  console.log("============================");
  //   const data = await req.json();
  //   console.log(data);
  return NextResponse.json({ message: "course created" });
}
