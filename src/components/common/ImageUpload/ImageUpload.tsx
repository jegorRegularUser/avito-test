import { useState, useEffect } from "react";
import "./ImageUpload.css";

const ImageUpload = ({ onImageUpload, initialImage, isImageLoaded }: { onImageUpload: (file: File | null) => void, initialImage?: string, isImageLoaded?: boolean }) => {
  const [image, setImage] = useState<string | null>(initialImage || null);

  useEffect(() => {
    if (initialImage) {
      setImage(initialImage);
    } else {
      setImage(null);
    }
  }, [initialImage]);

  useEffect(() => {
    if (isImageLoaded && initialImage) {
      setImage(initialImage);
    }
  }, [isImageLoaded, initialImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
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
          <button className="btn-remove" onClick={handleRemoveImage}>Удалить</button>
        </div>
      ) : (
        <label className="file-input-label">
          <input type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleImageChange} />
          Выберите файл
        </label>
      )}
    </div>
  );
};

export default ImageUpload;
