import React from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
export async function GET(request) {
  const querySnapshot = await getDocs(collection(db, "courses"));
  let docs = [];
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    docs.push({ id: doc.id, data: doc.data() });
  });

  return NextResponse.json(docs);
}
export async function POST(request) {
  const { title, price ,image ,details , instructor } = await request.json();

  try {
    const docRef = await addDoc(collection(db, "courses"), {
      title: title,
      price: price,
      image:image,
      details: details,
      instructor:instructor,
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
