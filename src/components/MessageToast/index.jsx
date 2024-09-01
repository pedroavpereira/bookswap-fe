/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import "./MessageToast.css";

function MessageToast({ name, t }) {
  function handleToastClose() {
    toast.dismiss(t.id);
  }
  return (
    <section id="toast" className="info">
      <div id="icon-wrapper">
        <div id="icon"></div>
      </div>
      <div id="toast-message">
        <h4>{name}</h4>
        <p>Just messaged you</p>
      </div>
      <button id="toast-close" onClick={handleToastClose}></button>
    </section>
  );
}

export default MessageToast;
