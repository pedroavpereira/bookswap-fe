import React from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import './MessageToast.css';

function MessageToast({ title, subtitle, t }) {
  function handleToastClose() {
    toast.dismiss(t.id);
  }

  return (
    <section id="toast" className="info" role="alert">
      <div id="icon-wrapper" data-testid="icon-wrapper">
        <div id="icon" data-testid="icon"></div>
      </div>
      <div id="toast-message">
        <h4>{title}</h4>
        <p>{subtitle}</p>
      </div>
      <button id="toast-close" onClick={handleToastClose} aria-label="Close"></button>
    </section>
  );
}

MessageToast.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  t: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default MessageToast;