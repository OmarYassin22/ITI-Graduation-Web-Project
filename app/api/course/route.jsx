import { db, imageDb } from "../../firebaseConfig";
import { collection, getDocs, addDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";
//image upload
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export async function GET(request) {
  const querySnapshot = await getDocs(collection(db, "course"));
  let docs = [];

  querySnapshot.forEach((c) => {
    docs.push({ id: c.id, data: { ...c.data() } });
  });
  docs.forEach((doc) => console.log(doc.data.imgPath));

  for (let i = 0; i < docs.length; i++) {
    await (async () => {
      docs[i].data.imgPath = await getDownloadURL(
        ref(imageDb, "images/course/" + docs[i].data.imgPath)
      );
    })();
  }
  return NextResponse.json(docs);
}

export async function POST(request) {
  const { name, instructor, period, students, img } = await request.json();
  let imgPath = v4();
  //upload imag
  const imgRef = ref(imageDb, `images/course/${imgPath}`);
  uploadBytes(imgRef, img);

  try {
    const values = {
      name: name != undefined ? name : " ",
      instructor: instructor != undefined ? instructor : " ",
      period: period != undefined ? period : " ",
      students: students != undefined ? students : " ",
      imgPath: imgPath != undefined ? imgPath : "",
    };
    const docRef = await addDoc(collection(db, "course"), values);
    return NextResponse.json({ message: "course created" });
  } catch (e) {
    return NextResponse.json({ error: "Some thing went wrong" + e });
  }
}
