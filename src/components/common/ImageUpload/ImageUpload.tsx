import { useState, useEffect } from "react";
import "./ImageUpload.css";

const ImageUpload = ({ onImageUpload, initialImage }: { onImageUpload: (file: File | null) => void, initialImage?: string }) => {
  const [image, setImage] = useState<string | null>(initialImage || null);

  useEffect(() => {
    if (initialImage) {
      setImage(initialImage);
    } else {
      setImage(null);
    }
  }, [initialImage]);
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      console.log(imageUrl);
      onImageUpload(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    onImageUpload(null);
  };

  return (
    <div className="image-upload">
      {image ? (
        <div className="image-preview">
          <img src={image} alt="Preview" />
          <button onClick={handleRemoveImage}>Удалить</button>
        </div>
      ) : (
        <input type="file" accept="image/*" onChange={handleImageChange} />
      )}
    </div>
  );
};

export default ImageUpload;
