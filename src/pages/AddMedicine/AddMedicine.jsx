import { useState } from "react";
import { Bell, ChevronDown, Clock3, Plus, Trash2, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./AddMedicine.css";

const createMedicine = () => ({
  id: Date.now() + Math.random(),
  medicineName: "",
  dosage: "",
  form: "Tablet",
  frequency: "Once Daily",
  timing: ["08:00"],
  startDate: "",
  endDate: "",
  reminder: true,
  notes: "",
});

function AddMedicine() {
  const [medicines, setMedicines] = useState([createMedicine()]);
  const navigate = useNavigate();
  const location = useLocation();
  const isFromPrescription = location.state?.from === "prescription-review";

  const updateMedicine = (id, field, value) => {
    setMedicines((current) =>
      current.map((medicine) =>
        medicine.id === id ? { ...medicine, [field]: value } : medicine,
      ),
    );
  };
  const handleSaveMedicine = () => {
    const newMedicine = {
      id: Date.now(),
      name: medicineName,
      dosage: dosage,
      frequency: frequency,
      timing: reminderTimes,
      startDate: startDate,
      endDate: endDate,
      instructions: instructions,
      status: "Active",
    };
    if (isFromPrescription) {
      navigate("/prescription-review", {
        state: {
          newMedicine,
        },
      });
      return;
    }
    navigate("/medicines", {
      state: {
        newMedicine,
      },
    });
  };

  const updateTiming = (medicineId, timingIndex, value) => {
    setMedicines((current) =>
      current.map((medicine) => {
        if (medicine.id !== medicineId) return medicine;

        const updatedTiming = [...medicine.timing];
        updatedTiming[timingIndex] = value;

        return {
          ...medicine,
          timing: updatedTiming,
        };
      }),
    );
  };

  const addTiming = (medicineId) => {
    setMedicines((current) =>
      current.map((medicine) =>
        medicine.id === medicineId
          ? {
              ...medicine,
              timing: [...medicine.timing, ""],
            }
          : medicine,
      ),
    );
  };

  const removeTiming = (medicineId, timingIndex) => {
    setMedicines((current) =>
      current.map((medicine) => {
        if (medicine.id !== medicineId) return medicine;

        return {
          ...medicine,
          timing: medicine.timing.filter((_, index) => index !== timingIndex),
        };
      }),
    );
  };

  const addAnotherMedicine = () => {
    setMedicines((current) => [...current, createMedicine()]);
  };

  const removeMedicine = (id) => {
    if (medicines.length === 1) return;

    setMedicines((current) => current.filter((medicine) => medicine.id !== id));
  };

  const handleCancel = () => {
    if (isFromPrescription) {
      navigate("/prescription-review");
    } else {
      navigate("/medicines");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const hasEmptyMedicine = medicines.some(
      (medicine) =>
        !medicine.medicineName.trim() ||
        !medicine.dosage.trim() ||
        !medicine.startDate,
    );

    if (hasEmptyMedicine) {
      alert("Please enter the medicine name, dosage and start date.");
      return;
    }

    console.log("Medicines ready to save:", medicines);

    alert(
      `${medicines.length} medicine${
        medicines.length > 1 ? "s" : ""
      } ready to save. Backend connection will be added later.`,
    );
  };

  return (
    <div className="add-medicine-page">
      <Sidebar activePage="Medicines" />

      <main className="add-medicine-main">
        {/* Header */}
        <header className="add-medicine-topbar">
          <div className="add-medicine-heading">
            <h1>Add Medicine</h1>
            <p>Add your medication details and set up reminders.</p>
          </div>

          <div className="add-user-area">
            <button
              type="button"
              className="add-notification-button"
              aria-label="Notifications"
            >
              <Bell size={19} />
              <span className="add-notification-dot" />
            </button>

            <div className="add-user-avatar">J</div>

            <div className="add-user-details">
              <strong>John Doe</strong>
              <span>Patient</span>
            </div>

            <ChevronDown size={16} />
          </div>
        </header>

        <form className="medicine-form-wrapper" onSubmit={handleSubmit}>
          {medicines.map((medicine, medicineIndex) => (
            <section className="medicine-form-card" key={medicine.id}>
              <div className="medicine-card-heading">
                <div>
                  <h2>
                    {medicines.length === 1
                      ? "Medicine Details"
                      : `Medicine ${medicineIndex + 1}`}
                  </h2>

                  <p>Enter the information from your prescription.</p>
                </div>

                {medicines.length > 1 && (
                  <button
                    type="button"
                    className="remove-medicine-button"
                    onClick={() => removeMedicine(medicine.id)}
                  >
                    <Trash2 size={15} />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              <div className="medicine-form-grid">
                {/* Medicine name */}
                <div className="medicine-field medicine-field-full">
                  <label htmlFor={`name-${medicine.id}`}>
                    Medicine Name
                    <span className="required-star">*</span>
                  </label>

                  <input
                    id={`name-${medicine.id}`}
                    type="text"
                    placeholder="e.g. Paracetamol"
                    value={medicine.medicineName}
                    onChange={(event) =>
                      updateMedicine(
                        medicine.id,
                        "medicineName",
                        event.target.value,
                      )
                    }
                  />
                </div>

                {/* Dosage */}
                <div className="medicine-field">
                  <label htmlFor={`dosage-${medicine.id}`}>
                    Dosage
                    <span className="required-star">*</span>
                  </label>

                  <input
                    id={`dosage-${medicine.id}`}
                    type="text"
                    placeholder="e.g. 500mg"
                    value={medicine.dosage}
                    onChange={(event) =>
                      updateMedicine(medicine.id, "dosage", event.target.value)
                    }
                  />
                </div>

                {/* Form */}
                <div className="medicine-field">
                  <label htmlFor={`form-${medicine.id}`}>Form</label>

                  <div className="medicine-select-wrapper">
                    <select
                      id={`form-${medicine.id}`}
                      value={medicine.form}
                      onChange={(event) =>
                        updateMedicine(medicine.id, "form", event.target.value)
                      }
                    >
                      <option>Tablet</option>
                      <option>Capsule</option>
                      <option>Syrup</option>
                      <option>Injection</option>
                      <option>Drops</option>
                      <option>Inhaler</option>
                      <option>Cream</option>
                      <option>Other</option>
                    </select>

                    <ChevronDown size={15} />
                  </div>
                </div>

                {/* Frequency */}
                <div className="medicine-field">
                  <label htmlFor={`frequency-${medicine.id}`}>Frequency</label>

                  <div className="medicine-select-wrapper">
                    <select
                      id={`frequency-${medicine.id}`}
                      value={medicine.frequency}
                      onChange={(event) =>
                        updateMedicine(
                          medicine.id,
                          "frequency",
                          event.target.value,
                        )
                      }
                    >
                      <option>Once Daily</option>
                      <option>Twice Daily</option>
                      <option>Three Times Daily</option>
                      <option>Four Times Daily</option>
                      <option>Every Other Day</option>
                      <option>Once Weekly</option>
                      <option>As Needed</option>
                    </select>

                    <ChevronDown size={15} />
                  </div>
                </div>

                {/* Timing */}
                <div className="medicine-field">
                  <label>Timing</label>

                  <div className="medicine-timing-list">
                    {medicine.timing.map((time, timingIndex) => (
                      <div
                        className="medicine-time-row"
                        key={`${medicine.id}-${timingIndex}`}
                      >
                        <div className="medicine-time-input">
                          <Clock3 size={15} />

                          <input
                            type="time"
                            value={time}
                            onChange={(event) =>
                              updateTiming(
                                medicine.id,
                                timingIndex,
                                event.target.value,
                              )
                            }
                          />
                        </div>

                        {medicine.timing.length > 1 && (
                          <button
                            type="button"
                            className="remove-time-button"
                            aria-label="Remove time"
                            onClick={() =>
                              removeTiming(medicine.id, timingIndex)
                            }
                          >
                            <X size={15} />
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      className="add-time-button"
                      onClick={() => addTiming(medicine.id)}
                    >
                      <Plus size={14} />
                      Add Time
                    </button>
                  </div>
                </div>

                {/* Start date */}
                <div className="medicine-field">
                  <label htmlFor={`start-${medicine.id}`}>
                    Start Date
                    <span className="required-star">*</span>
                  </label>

                  <input
                    id={`start-${medicine.id}`}
                    type="date"
                    value={medicine.startDate}
                    onChange={(event) =>
                      updateMedicine(
                        medicine.id,
                        "startDate",
                        event.target.value,
                      )
                    }
                  />
                </div>

                {/* End date */}
                <div className="medicine-field">
                  <label htmlFor={`end-${medicine.id}`}>End Date</label>

                  <input
                    id={`end-${medicine.id}`}
                    type="date"
                    value={medicine.endDate}
                    min={medicine.startDate || undefined}
                    onChange={(event) =>
                      updateMedicine(medicine.id, "endDate", event.target.value)
                    }
                  />
                </div>

                {/* Reminder */}
                <div className="medicine-field medicine-field-full">
                  <div className="reminder-setting">
                    <div className="reminder-setting-text">
                      <strong>Reminder</strong>
                      <span>
                        Get notified when it&apos;s time to take this medicine.
                      </span>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={medicine.reminder}
                      className={`reminder-switch ${
                        medicine.reminder ? "enabled" : ""
                      }`}
                      onClick={() =>
                        updateMedicine(
                          medicine.id,
                          "reminder",
                          !medicine.reminder,
                        )
                      }
                    >
                      <span />
                    </button>
                  </div>
                </div>

                {/* Notes */}
                <div className="medicine-field medicine-field-full">
                  <label htmlFor={`notes-${medicine.id}`}>
                    Notes
                    <span className="optional-text">(Optional)</span>
                  </label>

                  <textarea
                    id={`notes-${medicine.id}`}
                    rows="3"
                    placeholder="e.g. Take after food"
                    value={medicine.notes}
                    onChange={(event) =>
                      updateMedicine(medicine.id, "notes", event.target.value)
                    }
                  />
                </div>
              </div>
            </section>
          ))}

          <button
            type="button"
            className="add-another-medicine-button"
            onClick={addAnotherMedicine}
          >
            <Plus size={16} />
            Add Another Medicine
          </button>

          <div className="medicine-form-actions">
            <button
              type="button"
              className="medicine-cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>

            <button type="submit" className="medicine-save-button">
              Save Medicine
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default AddMedicine;
