import { useEffect } from "react";

import { CalendarDays, Clock3, Pill, X, XCircle } from "lucide-react";

import "./MissedMedicineModal.css";

function MissedMedicineModal({ isOpen, missedMedicines = [], onClose }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);

      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);

      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="missed-modal-overlay" onMouseDown={handleOverlayClick}>
      <div className="missed-modal">
        {/* HEADER */}

        <div className="missed-modal-header">
          <div className="missed-modal-title-section">
            <div className="missed-modal-title-icon">
              <XCircle size={22} />
            </div>

            <div>
              <h2>Missed Medicines</h2>

              <p>
                Review medicines that were not taken at their scheduled time.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="missed-modal-close"
            onClick={onClose}
            aria-label="Close missed medicines"
          >
            <X size={20} />
          </button>
        </div>

        {/* SUMMARY */}

        <div className="missed-modal-summary">
          <div>
            <span>Total Missed Doses</span>

            <strong>{missedMedicines.length}</strong>
          </div>

          <div className="missed-modal-summary-icon">
            <Pill size={24} />
          </div>
        </div>

        {/* LIST */}

        <div className="missed-modal-list">
          {missedMedicines.length > 0 ? (
            missedMedicines.map((medicine) => (
              <article key={medicine.id} className="missed-medicine-item">
                <div className="missed-item-icon">
                  <Pill size={20} />
                </div>

                <div className="missed-item-content">
                  <div className="missed-item-top">
                    <div>
                      <h3>{medicine.medicine}</h3>

                      <span>{medicine.dosage}</span>
                    </div>

                    <span className="missed-status">Missed</span>
                  </div>

                  <div className="missed-item-details">
                    <div className="missed-detail">
                      <CalendarDays size={15} />

                      <div>
                        <span>Missed Date</span>

                        <strong>{medicine.date}</strong>
                      </div>
                    </div>

                    <div className="missed-detail">
                      <Clock3 size={15} />

                      <div>
                        <span>Scheduled Time</span>

                        <strong>{medicine.time}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="missed-item-instruction">
                    <span>Instruction</span>

                    <p>{medicine.instruction}</p>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="missed-empty-state">
              <div className="missed-empty-icon">
                <Pill size={28} />
              </div>

              <h3>No missed medicines</h3>

              <p>Great! There are no missed dose records.</p>
            </div>
          )}
        </div>

        {/* FOOTER */}

        <div className="missed-modal-footer">
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default MissedMedicineModal;
