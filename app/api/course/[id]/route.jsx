import { db } from "../../../firebaseConfig";
import {
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";
// Get request
export async function GET(request) {
  const res = new URL(request.url);
  const id = res.pathname.substring(res.pathname.lastIndexOf("/") + 1);

  const querySnapshot = await getDocs(collection(db, "course"));
  let result;
  querySnapshot.forEach((c) => {
    c.id === id ? (result = c.data()) : (request = null);
  });

  return NextResponse.json(result);
}

// DELETE request
export async function DELETE(request) {
  const res = new URL(request.url);
  const id = res.pathname.substring(res.pathname.lastIndexOf("/") + 1);

  try {
    await deleteDoc(doc(db, "course", id));
    return NextResponse.json({
      message: `product with ${id} has been deleted`,
    });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

export async function PUT(request) {
  //   try {
  const res = new URL(request.url);
  const id = res.pathname.substring(res.pathname.lastIndexOf("/") + 1);
  const { name, instructor, period, students } = await request.json();
  const oldDoc = doc(db, "course", id);
  const oldData = (await getDoc(oldDoc)).data();

  let newData = {
    name: name == undefined ? oldData.name : name,
    instructor: instructor == undefined ? oldData.instructor : instructor,
    period: period == undefined ? oldData.period : period,
    students: students == undefined ? oldData.students : students,
  };
  updateDoc(oldDoc, newData);
  return NextResponse.json({
    message: `document with ${id} has been updated with values ( ${
      name != undefined ? name : ""
    } , ${instructor != undefined ? instructor : ""},${
      period != undefined ? period : ""
    } ,{ ${students != undefined ? students : ""}} )`,
  });
  //   } catch (error) {
  //     return NextResponse.json({ error });
  //   }
}
