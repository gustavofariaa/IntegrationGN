import React, { useContext, useEffect, useState } from 'react';

const AlertContext = React.createContext();

export const AlertContextProvider = ({ children }) => {
  const [options, setOptions] = useState({});
  const [AlertRef, setAlertRef] = useState(null);

  useEffect(() => {
    const _options = { backdrop: 'static', keyboard: false };
    const element = document.getElementById('modal-alert');
    // eslint-disable-next-line no-undef
    const ref = new bootstrap.Modal(element, _options);
    setAlertRef(ref);
  }, []);

  const showAlert = (_options = {}) => {
    setOptions(_options);
    AlertRef?.show?.();
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      <div id="modal-alert" className="modal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title">{options?.title}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>

            <div className="modal-body">
              <p className="m-0">{options?.message}</p>
            </div>

            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-primary text-light"
                data-bs-dismiss="modal"
                onClick={options?.onClickConfirm}
              >
                {options?.confirmText}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
                onClick={options?.onClickCancel}
              >
                {options?.cancelText}
              </button>
            </div>
          </div>
        </div>
      </div>

    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const alertContext = useContext(AlertContext);
  return alertContext;
};
