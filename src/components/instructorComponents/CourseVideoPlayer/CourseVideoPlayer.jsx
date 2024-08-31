import React, { useState, useEffect } from 'react';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../app/firebaseConfig";

function CourseVideoPlayer({ courseName, fileName }) {
  const [videoURL, setVideoURL] = useState(null);

  useEffect(() => {
    const getVideo = async () => {
      const url = await fetchVideoURL(courseName, fileName);
      setVideoURL(url);
    };

    getVideo();
  }, [courseName, fileName]);

  if (!videoURL) {
    return <div>Loading video...</div>;
  }

  return (
    <video controls className='m-auto mt-5' src={videoURL}>
      Your browser does not support the video tag.
    </video>
  );
}

const fetchVideoURL = async (courseName, fileName) => {
  try {
    const videoRef = ref(storage, `Emad Elshplangy/${courseName}/${fileName}`);
    const url = await getDownloadURL(videoRef);
    return url;
  } catch (error) {
    console.error("Error fetching video URL:", error);
    return null;
  }
};

export default CourseVideoPlayer;