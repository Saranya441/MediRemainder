import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Check,
  Clock3,
  Edit3,
  FileText,
  Pill,
  Plus,
  Trash2,
} from "lucide-react";
import Sidebar from "../../components/Sidebar/Sidebar";
import EditMedicineModal from "../../components/EditMedicineModal/EditMedicineModal";
import "./PrescriptionReview.css";

function PrescriptionReview() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const newMedicine = location.state?.newMedicine;
    if (!newMedicine) {
      return;
    }
    setMedicines((currentMedicines) => {
      const alreadyExists = currentMedicines.some(
        (medicine) => medicine.id === newMedicine.id,
      );
      if (alreadyExists) {
        return currentMedicines;
      }
      return [...currentMedicines, newMedicine];
    });
    navigate(location.pathname, {
      replace: true,
      state: {},
    });
  }, [location.state, location.pathname, navigate]);

  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: "Paracetamol",
      dosage: "500 mg",
      frequency: "Twice a day",
      times: ["08:00", "20:00"],
      startDate: "2026-09-10",
      endDate: "2026-09-15",
      instructions: "Take after food",
    },
    {
      id: 2,
      name: "Amoxicillin",
      dosage: "250 mg",
      frequency: "Three times a day",
      times: ["08:00", "14:00", "20:00"],
      startDate: "2026-09-10",
      endDate: "2026-09-17",
      instructions: "Take after meals",
    },
    {
      id: 3,
      name: "Vitamin D3",
      dosage: "1000 IU",
      frequency: "Once a day",
      times: ["09:00"],
      startDate: "2026-09-10",
      endDate: "2026-10-10",
      instructions: "Take in the morning",
    },
  ]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const handleEditMedicine = (medicine) => {
    setSelectedMedicine(medicine);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedMedicine(null);
  };

  const handleSaveMedicine = (updatedMedicine) => {
    setMedicines((current) =>
      current.map((medicine) =>
        medicine.id === updatedMedicine.id ? updatedMedicine : medicine,
      ),
    );

    handleCloseModal();
  };

  const handleDeleteMedicine = (id) => {
    setMedicines((current) => current.filter((medicine) => medicine.id !== id));
  };

  const handleConfirmPrescription = () => {
    console.log("Confirmed medicines:", medicines);

    /*
      Later, when we connect .NET:
      axios.post("/api/prescriptions/confirm", medicines)
    */

    navigate("/medicines");
  };

  return (
    <div className="prescription-review-layout">
      <Sidebar activePage="Prescriptions" />

      <main className="prescription-review-main">
        {/* PAGE HEADER */}

        <div className="prescription-review-header">
          <div>
            <p className="prescription-review-breadcrumb">
              Prescriptions / Review
            </p>

            <h1>Review Prescription</h1>

            <p>
              Check the extracted medicine information before saving it to your
              medication schedule.
            </p>
          </div>

          <div className="prescription-review-status">
            <Check size={15} />
            Prescription scanned
          </div>
        </div>

        {/* SUMMARY */}

        <section className="prescription-summary-card">
          <div className="prescription-summary-icon">
            <FileText size={22} />
          </div>

          <div>
            <h2>Prescription Details</h2>

            <p>
              We found <strong>{medicines.length} medicines</strong> in your
              prescription.
            </p>
          </div>
        </section>

        {/* MEDICINES */}

        <section className="prescription-medicine-section">
          <div className="prescription-section-heading">
            <div>
              <h2>Medicines</h2>

              <p>Review each medicine and correct any information if needed.</p>
            </div>

            <button
              type="button"
              className="prescription-add-medicine"
              onClick={() =>
                navigate("/add-medicine", {
                  state: {
                    from: "prescription-review",
                  },
                })
              }
            >
              <Plus size={15} />
              Add Medicine
            </button>
          </div>

          <div className="prescription-medicine-list">
            {medicines.length === 0 ? (
              <div className="prescription-empty">
                <Pill size={25} />

                <h3>No medicines found</h3>

                <p>Add a medicine before confirming your prescription.</p>
              </div>
            ) : (
              medicines.map((medicine) => (
                <article
                  className="prescription-medicine-card"
                  key={medicine.id}
                >
                  <div className="prescription-medicine-top">
                    <div className="prescription-medicine-info">
                      <div className="prescription-pill-icon">
                        <Pill size={19} />
                      </div>

                      <div>
                        <h3>{medicine.name}</h3>

                        <span>{medicine.dosage}</span>
                      </div>
                    </div>

                    <div className="prescription-card-actions">
                      <button
                        type="button"
                        className="prescription-edit-button"
                        onClick={() => handleEditMedicine(medicine)}
                      >
                        <Edit3 size={14} />
                        Edit
                      </button>

                      <button
                        type="button"
                        className="prescription-delete-button"
                        onClick={() => handleDeleteMedicine(medicine.id)}
                        aria-label={`Delete ${medicine.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="prescription-medicine-details">
                    <div>
                      <span className="prescription-detail-icon">
                        <Clock3 size={14} />
                      </span>

                      <div>
                        <small>Frequency</small>

                        <strong>{medicine.frequency}</strong>
                      </div>
                    </div>

                    <div>
                      <span className="prescription-detail-icon">
                        <Clock3 size={14} />
                      </span>

                      <div>
                        <small>Reminder Time</small>

                        <strong>{medicine.times.join(", ")}</strong>
                      </div>
                    </div>

                    <div>
                      <span className="prescription-detail-icon">
                        <CalendarDays size={14} />
                      </span>

                      <div>
                        <small>Duration</small>

                        <strong>
                          {medicine.startDate} - {medicine.endDate}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {medicine.instructions && (
                    <div className="prescription-instructions">
                      <span>Instructions:</span>

                      {medicine.instructions}
                    </div>
                  )}
                </article>
              ))
            )}
          </div>
        </section>

        {/* FOOTER */}

        <div className="prescription-review-footer">
          <button
            type="button"
            className="prescription-back-button"
            onClick={() => navigate("/upload-prescription")}
          >
            Back
          </button>

          <button
            type="button"
            className="prescription-confirm-button"
            disabled={medicines.length === 0}
            onClick={handleConfirmPrescription}
          >
            <Check size={16} />
            Confirm & Save
          </button>
        </div>
      </main>

      {/* REUSABLE MODAL */}

      <EditMedicineModal
        isOpen={isEditModalOpen}
        medicine={selectedMedicine}
        onClose={handleCloseModal}
        onSave={handleSaveMedicine}
      />
    </div>
  );
}

export default PrescriptionReview;
