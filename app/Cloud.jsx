import { getStorage, ref ,getDownloadURL } from "firebase/storage";

// Create a reference with an initial file path and name
const storage = getStorage();
const pathReference = ref(storage, 'wallpaperflare.com_wallpaper (3).jpg');

// Create a reference from a Google Cloud Storage URI
const gsReference = ref(storage, 'gs://grad-projcet.appspot.com/wallpaperflare.com_wallpaper (3).jpg');

// Create a reference from an HTTPS URL
// Note that in the URL, characters are URL escaped!
const httpsReference = ref(storage, 'https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg');  