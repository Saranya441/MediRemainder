import { useEffect, useState } from "react";
import { Check, Clock3, Edit3, Plus, X } from "lucide-react";

import "./EditMedicineModal.css";

function EditMedicineModal({ isOpen, medicine, onClose, onSave }) {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (medicine) {
      setFormData({
        ...medicine,
        times: [...medicine.times],
      });
    }
  }, [medicine]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !formData) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleTimeChange = (index, value) => {
    setFormData((current) => {
      const updatedTimes = [...current.times];

      updatedTimes[index] = value;

      return {
        ...current,
        times: updatedTimes,
      };
    });
  };

  const handleAddTime = () => {
    setFormData((current) => ({
      ...current,
      times: [...current.times, "08:00"],
    }));
  };

  const handleRemoveTime = (index) => {
    setFormData((current) => ({
      ...current,
      times: current.times.filter((_, currentIndex) => currentIndex !== index),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      return;
    }

    onSave(formData);
  };

  return (
    <div className="edit-medicine-overlay" onMouseDown={onClose}>
      <div
        className="edit-medicine-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="edit-medicine-modal-header">
          <div className="edit-medicine-modal-title">
            <span className="edit-medicine-modal-icon">
              <Edit3 size={17} />
            </span>

            <div>
              <h2>Edit Medicine</h2>

              <p>
                Update the medicine information before confirming your
                prescription.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="edit-medicine-close"
            onClick={onClose}
            aria-label="Close edit medicine modal"
          >
            <X size={18} />
          </button>
        </div>

        <form className="edit-medicine-form" onSubmit={handleSubmit}>
          <div className="edit-medicine-form-grid">
            <div className="edit-medicine-field full-width">
              <label htmlFor="medicineName">Medicine Name</label>

              <input
                id="medicineName"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter medicine name"
                required
              />
            </div>

            <div className="edit-medicine-field">
              <label htmlFor="medicineDosage">Dosage</label>

              <input
                id="medicineDosage"
                name="dosage"
                type="text"
                value={formData.dosage}
                onChange={handleChange}
                placeholder="Example: 500 mg"
              />
            </div>

            <div className="edit-medicine-field">
              <label htmlFor="medicineFrequency">Frequency</label>

              <select
                id="medicineFrequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
              >
                <option value="Once a day">Once a day</option>

                <option value="Twice a day">Twice a day</option>

                <option value="Three times a day">Three times a day</option>

                <option value="Four times a day">Four times a day</option>

                <option value="As needed">As needed</option>
              </select>
            </div>

            <div className="edit-medicine-field">
              <label htmlFor="medicineStartDate">Start Date</label>

              <input
                id="medicineStartDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>

            <div className="edit-medicine-field">
              <label htmlFor="medicineEndDate">End Date</label>

              <input
                id="medicineEndDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>

            <div className="edit-medicine-field full-width">
              <div className="edit-medicine-time-header">
                <label>Reminder Times</label>

                <button type="button" onClick={handleAddTime}>
                  <Plus size={13} />
                  Add Time
                </button>
              </div>

              <div className="edit-medicine-times">
                {formData.times.map((time, index) => (
                  <div
                    className="edit-medicine-time-row"
                    key={`${formData.id}-${index}`}
                  >
                    <Clock3 size={15} />

                    <input
                      type="time"
                      value={time}
                      onChange={(event) =>
                        handleTimeChange(index, event.target.value)
                      }
                    />

                    {formData.times.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveTime(index)}
                        aria-label="Remove reminder time"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="edit-medicine-field full-width">
              <label htmlFor="medicineInstructions">Instructions</label>

              <textarea
                id="medicineInstructions"
                name="instructions"
                rows="3"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="Example: Take after food"
              />
            </div>
          </div>

          <div className="edit-medicine-modal-footer">
            <button
              type="button"
              className="edit-medicine-cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="edit-medicine-save">
              <Check size={15} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMedicineModal;
