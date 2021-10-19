import Resizer from "react-image-file-resizer";
export const resizeFile = (file) =>
  new Promise((resolve) => {
  Resizer.imageFileResizer(
    file,
    550,
    550,
    "JPEG",
    90,
    0,
    (uri) => {
      resolve(uri);
    },
    "base64"
  );
});
