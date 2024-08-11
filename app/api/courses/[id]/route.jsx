import { db } from "../../../Firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";
export async function GET(request) {
  const res = new URL(request.url);
  const id = res.pathname.substring(res.pathname.lastIndexOf("/") + 1);

  const querySnapshot = await getDocs(collection(db, "courses"));
  let result;
  querySnapshot.forEach((doc) => {
    doc.id === id ? (result = doc.data()) : (request = null);
  });

  return NextResponse.json(result);
}

export async function DELETE(request) {
  const res = new URL(request.url);
  const id = res.pathname.substring(res.pathname.lastIndexOf("/") + 1);
  try {
    await deleteDoc(doc(db, "courses", id));
    return NextResponse.json({
      message: `course with ${id} has been deleted`,
    });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
export async function PUT(request) {
  try {
    const res = new URL(request.url);
    const id = res.pathname.substring(res.pathname.lastIndexOf("/") + 1);
    const { title, price ,image ,details , instructor } = await request.json();
    const oldDoc = doc(db, "courses", id);
    updateDoc(oldDoc, { title, price ,image ,details , instructor });
    return NextResponse.json({
      message: `course with ${id} has been updated`,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
