// components/Toast.jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Toast = ({
  message,
  duration = 3000,
  className = "fixed bottom-5 left-1/2",
  onClose,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        
        if (onClose) onClose();
      }, duration);

      // Cleanup the timer on unmount or when message changes
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  return (
    <div
      className={`transform ${className} px-4 py-2 bg-red-500 text-white rounded-md shadow-lg transition-all ease-in-out duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ zIndex: 1000 }} // Ensure the toast is above other content
    >
      <p className="text-center">{message}</p>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
  duration: PropTypes.number,
  onClose: PropTypes.func,
};

export default Toast;
