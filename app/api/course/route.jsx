import React from "react";

import { db } from "../../firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
export async function GET(request) {
  const querySnapshot = await getDocs(collection(db, "course"));
  let docs = [];
  querySnapshot.forEach((c) => {
    console.log(`${c.id} => ${c.data()}`);
    docs.push({ id: c.id, data: c.data() });
  });

  return NextResponse.json(docs);
}

export async function POST(request) {
  const { data } = await request.json();
  console.log(data);

  try {
    const docRef = await addDoc(collection(db, "course"), {
      name: data.name,
      instructor: data.instructor,
      period: data.period,
      students: data.students,
    });
    return NextResponse.json({ message: "course created" });
  } catch (e) {
    return NextResponse.json({ error: "Some thing went wrong" + e });
  }
}
