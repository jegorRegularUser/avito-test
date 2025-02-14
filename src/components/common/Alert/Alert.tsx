import { useEffect, useState } from "react";
import "./Alert.css";

interface AlertProps {
  message: string;
  type: "success" | "error";
  onClose?: () => void;
}

const Alert = ({ message, type, onClose }: AlertProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      onClose && onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`alert ${type} ${visible ? "show" : "hide"}`}>
      {message}
      <button className="close-btn" onClick={() => { setVisible(false); onClose && onClose(); }}>×</button>
    </div>
  );
};

export default Alert;
