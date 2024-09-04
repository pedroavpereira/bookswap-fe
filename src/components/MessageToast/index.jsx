/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import "./MessageToast.css";

function MessageToast({ title, subtitle, t }) {
  function handleToastClose() {
    toast.dismiss(t.id);
  }
  return (
    <section id="toast" className="info">
      <div id="icon-wrapper">
        <div id="icon"></div>
      </div>
      <div id="toast-message">
        <h4>{title}</h4>
        <p>{subtitle}</p>
      </div>
      <button id="toast-close" onClick={handleToastClose}></button>
    </section>
  );
}

export default MessageToast;
