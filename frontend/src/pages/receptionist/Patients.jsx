import React, { useEffect, useState } from "react";
import { usePatientStore } from "../../store/usePatientStore.js";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { useAuthStore } from "../../store/useAuthStore";
import { FiTrash2, FiEdit, FiFileText, FiPlusCircle } from "react-icons/fi";
import { useTokenStore } from "../../store/useTokenStore.js";

Modal.setAppElement("#root");

const Patients = () => {
  const { createToken } = useTokenStore();
  const {
    patients,
    fetchPatients,
    addPatient,
    updatePatient,
    deletePatient,
    fetchPatientHistory,
    selectedPatient,
  } = usePatientStore();
  const { authUser } = useAuthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [patientHistory, setPatientHistory] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentPatientId, setCurrentPatientId] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "male",
    address: "",
    phone: "",
    email: "",
    medicalHistory: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    age: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Full name is required";
        break;
      case "age":
        if (!value) error = "Age is required";
        else if (isNaN(value) || value < 0 || value > 120)
          error = "Please enter a valid age";
        break;
      case "phone":
        if (!/^[0-9]{10,15}$/.test(value))
          error = "Please enter a valid phone number (10-15 digits)";
        break;
      case "email":
        if (
          value &&
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        ) {
          error = "Please enter a valid email";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = Object.entries(formData).every(([key, value]) => {
      if (key === "email" || key === "address" || key === "medicalHistory")
        return true;
      return validateField(key, value);
    });

    if (!isValid) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      const patientData = {
        ...formData,
        age: Number(formData.age),
        medicalHistory: formData.medicalHistory
          ? formData.medicalHistory.split(",")
          : [],
        createdBy: authUser._id,
      };

      if (editMode) {
        await updatePatient(currentPatientId, patientData);
        toast.success("Patient updated successfully");
      } else {
        await addPatient(patientData);
        toast.success("Patient created successfully");
      }

      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      age: "",
      gender: "male",
      address: "",
      phone: "",
      email: "",
      medicalHistory: "",
    });
    setErrors({
      fullName: "",
      age: "",
      phone: "",
      email: "",
    });
    setEditMode(false);
    setCurrentPatientId(null);
  };

  const handleEdit = (patient) => {
    setFormData({
      fullName: patient.fullName,
      age: patient.age.toString(),
      gender: patient.gender,
      address: patient.address || "",
      phone: patient.phone,
      email: patient.email || "",
      medicalHistory: patient.medicalHistory?.join(",") || "",
    });
    setCurrentPatientId(patient._id);
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await deletePatient(id);
        toast.success("Patient deleted successfully");
      } catch (error) {
        toast.error(error.message || "Failed to delete patient");
      }
    }
  };

  const handleViewHistory = async (id) => {
    try {
      const history = await fetchPatientHistory(id);
      setPatientHistory(history);
      setIsHistoryModalOpen(true);
    } catch (error) {
      toast.error("Failed to load patient history");
    }
  };

  const closeHistoryModal = () => {
    setIsHistoryModalOpen(false);
    setPatientHistory(null);
  };

  const handleGenerateToken = async (patientId) => {
    try {
      await createToken({ patientId });
    } catch (error) {}
  };

  return (
    <div className="patients-container px-4 py-6 h-full flex flex-col">
      <div className="patients-header flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Patient Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary w-full sm:w-auto"
        >
          Add New Patient
        </button>
      </div>

      <div className="patients-table-container overflow-auto flex-1">
        <table className="patients-table w-full">
          <thead>
            <tr className="bg-gray-100 sticky top-0">
              <th className="p-3 text-left">Full Name</th>
              <th className="p-3 text-left">Age</th>
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{patient.fullName}</td>
                <td className="p-3">{patient.age}</td>
                <td className="p-3 capitalize">{patient.gender}</td>
                <td className="p-3">{patient.phone}</td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEdit(patient)}
                      className="btn-edit p-2"
                      aria-label="Edit"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(patient._id)}
                      className="btn-delete p-2"
                      aria-label="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                    <button
                      onClick={() => handleViewHistory(patient._id)}
                      className="btn-history p-2"
                      aria-label="History"
                    >
                      <FiFileText size={18} />
                    </button>
                    <button
                      onClick={() => handleGenerateToken(patient._id)}
                      className="btn-token p-2"
                      aria-label="Generate Token"
                      title="Generate Token"
                    >
                      <FiPlusCircle size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Patient Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        className="modal-content"
        overlayClassName="modal-overlay"
        closeTimeoutMS={200}
        style={{
          content: {
            width: "90%",
            maxWidth: "600px",
            margin: "1rem auto",
            maxHeight: "90vh",
            overflowY: "auto",
          },
        }}
      >
        <div className="modal-inner">
          <h2>{editMode ? "Edit Patient" : "Add New Patient"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                onBlur={(e) => validateField("fullName", e.target.value)}
                className={errors.fullName ? "input-error" : ""}
                required
              />
              {errors.fullName && (
                <p className="error-message">{errors.fullName}</p>
              )}
            </div>

            {/* Age */}
            <div className="form-group">
              <label htmlFor="age">Age *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                onBlur={(e) => validateField("age", e.target.value)}
                className={errors.age ? "input-error" : ""}
                required
                min="0"
                max="120"
              />
              {errors.age && <p className="error-message">{errors.age}</p>}
            </div>

            {/* Gender */}
            <div className="form-group">
              <label htmlFor="gender">Gender *</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={(e) => validateField("phone", e.target.value)}
                className={errors.phone ? "input-error" : ""}
                required
              />
              {errors.phone && <p className="error-message">{errors.phone}</p>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={(e) => validateField("email", e.target.value)}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            {/* Address */}
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="2"
              />
            </div>

            {/* Medical History */}
            <div className="form-group">
              <label htmlFor="medicalHistory">
                Medical History (comma separated)
              </label>
              <textarea
                id="medicalHistory"
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleInputChange}
                rows="2"
                placeholder="e.g., Diabetes, Hypertension"
              />
            </div>

            <div className="modal-actions">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="btn-cancel"
              >
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                {editMode ? "Update Patient" : "Add Patient"}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        isOpen={isHistoryModalOpen}
        onRequestClose={closeHistoryModal}
        className="modal-content"
        overlayClassName="modal-overlay"
        closeTimeoutMS={200}
        style={{
          content: {
            width: "90%",
            maxWidth: "800px",
            margin: "1rem auto",
            maxHeight: "90vh",
            overflowY: "auto",
          },
        }}
      >
        <div className="modal-inner">
          <h2>Patient Medical History</h2>
          {patientHistory ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Patient Information</h3>
                <p>Name: {patientHistory.fullName}</p>
                <p>Age: {patientHistory.age}</p>
                <p>Gender: {patientHistory.gender}</p>
              </div>

              <div>
                <h3 className="font-semibold">Medical Conditions</h3>
                {patientHistory.manuallyAddedHistory?.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {patientHistory.manuallyAddedHistory.map((item, index) => (
                      <li key={`manual-${index}`}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No medical conditions recorded</p>
                )}
              </div>

              {/* Visit History */}
              <div>
                <h3 className="font-semibold">Visit History</h3>
                {patientHistory.visitHistory?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2 border">Date</th>
                          <th className="p-2 border">Token</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patientHistory.visitHistory.map((visit) => (
                          <tr key={visit._id} className="border-t">
                            <td className="p-2 border">
                              {new Date(visit.token.date).toLocaleDateString()}
                            </td>
                            <td className="p-2 text-center border">
                              {visit.token.tokenNumber}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No visit history recorded</p>
                )}
              </div>

              <div className="modal-actions">
                <button onClick={closeHistoryModal} className="btn-cancel">
                  Close
                </button>
              </div>
            </div>
          ) : (
            <p>Loading patient history...</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Patients;
