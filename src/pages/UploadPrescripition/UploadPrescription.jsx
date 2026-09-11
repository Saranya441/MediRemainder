import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Camera,
  CheckCircle2,
  ChevronDown,
  FileText,
  Image,
  Upload,
  X,
} from "lucide-react";

import Sidebar from "../../components/Sidebar/Sidebar";
import "./UploadPrescription.css";

function UploadPrescription() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const validateFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

    const maximumSize = 10 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPG, PNG, or PDF file.");
      return false;
    }

    if (file.size > maximumSize) {
      setError("The file must be smaller than 10 MB.");
      return false;
    }

    setError("");
    return true;
  };

  const handleFile = (file) => {
    if (!file || !validateFile(file)) return;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);

    if (file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl("");
    }
  };

  const handleFileChange = (event) => {
    handleFile(event.target.files?.[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    setDragging(false);

    handleFile(event.dataTransfer.files?.[0]);
  };

  const removeFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(null);
    setPreviewUrl("");
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (cameraInputRef.current) {
      cameraInputRef.current.value = "";
    }
  };

  const handleContinue = () => {
    if (!selectedFile) {
      setError("Please upload a prescription before continuing.");
      return;
    }

    /*
      Later:
      1. Send selectedFile to .NET API.
      2. OCR reads prescription.
      3. API returns detected medicines.
      4. Pass those medicines to Prescription Review.
    */

    navigate("/prescription-review");
  };

  return (
    <div className="upload-prescription-page">
      <Sidebar activePage="Prescriptions" />

      <main className="upload-prescription-main">
        {/* HEADER */}

        <header className="upload-page-header">
          <div>
            <h1>Upload Prescription</h1>

            <p>
              Upload your prescription and we&apos;ll help extract your medicine
              details.
            </p>
          </div>

          <div className="upload-user-area">
            <button
              type="button"
              className="upload-notification-button"
              aria-label="Notifications"
            >
              <Bell size={19} />

              <span className="upload-notification-dot" />
            </button>

            <div className="upload-user-avatar">J</div>

            <div className="upload-user-details">
              <strong>John Doe</strong>
              <span>Patient</span>
            </div>
          </div>
        </header>

        <section className="upload-content">
          {/* UPLOAD CARD */}

          <article className="prescription-upload-card">
            <div className="upload-card-heading">
              <h2>Upload Prescription</h2>

              <p>Upload a clear image or PDF of your prescription.</p>
            </div>

            {!selectedFile ? (
              <div
                className={`prescription-drop-zone ${
                  dragging ? "dragging" : ""
                }`}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
              >
                <div className="upload-icon-circle">
                  <Upload size={25} />
                </div>

                <h3>Upload your prescription</h3>

                <p>
                  Drag and drop your prescription here, or choose a file from
                  your device.
                </p>

                <button
                  type="button"
                  className="choose-file-button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={15} />
                  Choose File
                </button>

                <span className="upload-file-support">
                  PDF, JPG or PNG • Maximum 10 MB
                </span>

                <div className="upload-divider">
                  <span />
                  <small>OR</small>
                  <span />
                </div>

                <button
                  type="button"
                  className="camera-upload-button"
                  onClick={() => cameraInputRef.current?.click()}
                >
                  <Camera size={15} />
                  Take a Photo
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  hidden
                  onChange={handleFileChange}
                />

                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  hidden
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div className="uploaded-file-area">
                {previewUrl ? (
                  <div className="prescription-preview">
                    <img src={previewUrl} alt="Prescription preview" />
                  </div>
                ) : (
                  <div className="pdf-preview">
                    <FileText size={38} />

                    <span>PDF Prescription</span>
                  </div>
                )}

                <div className="uploaded-file-information">
                  <div className="uploaded-file-icon">
                    {selectedFile.type.startsWith("image/") ? (
                      <Image size={18} />
                    ) : (
                      <FileText size={18} />
                    )}
                  </div>

                  <div className="uploaded-file-text">
                    <strong>{selectedFile.name}</strong>

                    <span>
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>

                  <div className="uploaded-success">
                    <CheckCircle2 size={17} />
                  </div>

                  <button
                    type="button"
                    className="remove-upload-button"
                    onClick={removeFile}
                    aria-label="Remove file"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}

            {error && <p className="upload-error">{error}</p>}
          </article>

          {/* WHAT HAPPENS NEXT */}

          <article className="upload-next-card">
            <h2>What happens next?</h2>

            <div className="upload-next-list">
              <div className="upload-next-item">
                <span>1</span>

                <div>
                  <strong>We scan your prescription</strong>

                  <p>
                    Medicine information will be detected from your uploaded
                    prescription.
                  </p>
                </div>
              </div>

              <div className="upload-next-item">
                <span>2</span>

                <div>
                  <strong>Review the medicines</strong>

                  <p>
                    Check the detected medicine names, dosage and instructions.
                  </p>
                </div>
              </div>

              <div className="upload-next-item">
                <span>3</span>

                <div>
                  <strong>Set your reminders</strong>

                  <p>
                    Confirm the schedule and MediReminder will help you stay on
                    track.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <div className="upload-page-actions">
            <button
              type="button"
              className="upload-cancel-button"
              onClick={removeFile}
            >
              Cancel
            </button>

            <button
              type="button"
              className="upload-continue-button"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UploadPrescription;
