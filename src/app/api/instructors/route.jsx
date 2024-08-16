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
  let imagesRef = ref(storage, "images/instructors/");
  let imageUrls = [];
  let res = await listAll(imagesRef).then((response) =>
    response.items.forEach((item) =>
      getDownloadURL(item).then((url) => imageUrls.push(url))
    )
  );
  console.log(imageUrls);
  const querySnapshot = await getDocs(collection(db, "instructors"));
  let docs = [];
  querySnapshot.forEach((doc) => {
    docs.push({
      id: doc.id,
      data: doc.data(),
      image: imageUrls.find((url) => url.includes(doc.data().imgPath)),
    });
  });
  return NextResponse.json(docs);
}
export async function POST(request) {
  const { name, email, phone, fields , password } = await request.json();
  try {
    const docRef = await addDoc(collection(db, "instructors"), {
      name: name,
      email: email,
      phone: phone,
      fields: fields,
      password:password,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  console.log("============================");
  return NextResponse.json({ message: "instructor added" });
}