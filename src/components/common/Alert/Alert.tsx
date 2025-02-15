import { useEffect, useState } from "react";
import "./Alert.css";

interface AlertProps {
  message: string;
  type: "success" | "error";
  onClose?: () => void;
}

const Alert = ({ message, type, onClose }: AlertProps) => {
  const [visible, setVisible] = useState(false);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setCanClose(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (canClose) {
      const autoCloseTimer = setTimeout(() => {
        setVisible(false);
        onClose && onClose();
      }, 3000);

      return () => clearTimeout(autoCloseTimer);
    }
  }, [canClose, onClose]);

  const handleClose = () => {
    if (canClose) {
      setVisible(false);
      onClose && onClose();
    }
  };

  return (
    <div className={`alert ${type} ${visible ? "show" : "hide"}`}>
      {message}
      <button className="close-btn" onClick={handleClose}>×</button>
    </div>
  );
};

export default Alert;
