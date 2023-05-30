import { useState } from "react";

export const convertToPNG = (file, callback) => {
//   const [convertedFile, setConvertedFile] = useState(null);

    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          const converted = new File([blob], 'converted.png', { type: 'image/png' });
          callback(converted);
        }, 'image/png');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };
  
  