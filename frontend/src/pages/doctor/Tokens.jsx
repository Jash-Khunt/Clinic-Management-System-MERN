import React, { useEffect, useState } from "react";
import { useTokenStore } from "../../store/useTokenStore";
import { useVisitStore } from "../../store/useVisitStore";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/useAuthStore.js";
import { FiRefreshCw } from "react-icons/fi";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Tokens = () => {
  const { tokens, fetchTodayTokens, updateTokenStatus } = useTokenStore();
  const { createVisit } = useVisitStore();
  const { authUser } = useAuthStore();
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [visitData, setVisitData] = useState({
    symptoms: "",
    diagnosis: "",
    prescription: "",
  });

  useEffect(() => {
    fetchTodayTokens();
  }, [fetchTodayTokens]);

  const handleStatusChange = async (tokenId, newStatus) => {
    await updateTokenStatus(tokenId, newStatus);
  };

  const handleCreateVisitClick = (token) => {
    setSelectedToken(token);
    setShowVisitModal(true);
  };

  const handleVisitInputChange = (e) => {
    const { name, value } = e.target;
    setVisitData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitVisit = async () => {
    try {
      await createVisit({
        patientId: selectedToken.patient._id,
        tokenId: selectedToken._id,
        ...visitData,
      });
      toast.success("Visit created successfully");
      setShowVisitModal(false);
      setVisitData({
        symptoms: "",
        diagnosis: "",
        prescription: "",
      });
      fetchTodayTokens();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create visit");
    }
  };

  const isDoctor = authUser?.role === "doctor";
  const isReceptionist = authUser?.role === "receptionist";

  // Custom modal styles
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      maxWidth: "600px",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };

  return (
    <div className="patients-container px-4 py-6 h-full flex flex-col">
      <div className="patients-header flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">
          Today's Tokens
          {isDoctor && " - Doctor View"}
          {isReceptionist && " - Receptionist View"}
        </h1>
        <button
          onClick={fetchTodayTokens}
          className="flex items-center gap-2 btn-primary"
        >
          <FiRefreshCw size={16} /> Refresh
        </button>
      </div>

      <div className="patients-table-container overflow-auto flex-1">
        <table className="patients-table w-full">
          <thead>
            <tr className="bg-gray-100 sticky top-0">
              <th className="p-3 text-left">Token #</th>
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Status</th>
              {isDoctor && <th className="p-3 text-left">Actions</th>}
              {isReceptionist && <th className="p-3 text-left">Details</th>}
            </tr>
          </thead>
          <tbody>
            {tokens.map((token) => (
              <tr key={token._id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-mono">{token.tokenNumber}</td>
                <td className="p-3">
                  <div className="font-medium">
                    {token.patient?.fullName || "Unknown"}
                  </div>
                  {token.patient?.phone && (
                    <div className="text-sm text-gray-500">
                      {token.patient.phone}
                    </div>
                  )}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      token.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : token.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {token.status}
                  </span>
                </td>

                {/* Doctor-specific actions */}
                {isDoctor && (
                  <td className="p-3 flex gap-2">
                    <select
                      value={token.status}
                      onChange={(e) =>
                        handleStatusChange(token._id, e.target.value)
                      }
                      className="border rounded p-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button
                      onClick={() => handleCreateVisitClick(token)}
                      disabled={token.status === "completed"}
                      className={`px-2 py-1 rounded text-sm ${
                        token.status === "completed"
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                      }`}
                    >
                      Create Visit
                    </button>
                  </td>
                )}

                {isReceptionist && (
                  <td className="p-3">
                    <button
                      className="text-blue-600 hover:underline text-sm"
                      onClick={() => {
                        toast.info(`Patient: ${token.patient?.fullName}`);
                      }}
                    >
                      View Details
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visit Creation Modal */}
      <Modal
        isOpen={showVisitModal}
        onRequestClose={() => setShowVisitModal(false)}
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
        contentLabel="Create Visit Modal"
      >
        <div className="modal-inner space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Create Visit</h2>
            <button
              onClick={() => setShowVisitModal(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>

          <div className="mb-4">
            <h3 className="font-medium">
              Patient: {selectedToken?.patient?.fullName}
            </h3>
            <p className="text-sm text-gray-600">
              Token: {selectedToken?.tokenNumber}
            </p>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Symptoms
            </label>
            <textarea
              name="symptoms"
              value={visitData.symptoms}
              onChange={handleVisitInputChange}
              className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Enter patient symptoms..."
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Diagnosis
            </label>
            <textarea
              name="diagnosis"
              value={visitData.diagnosis}
              onChange={handleVisitInputChange}
              className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Enter diagnosis..."
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prescription
            </label>
            <textarea
              name="prescription"
              value={visitData.prescription}
              onChange={handleVisitInputChange}
              className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Enter prescription..."
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={() => setShowVisitModal(false)}
              className="btn-cancel"
            >
              Cancel
            </button>
            <button onClick={handleSubmitVisit} className="btn-submit">
              Save Visit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Tokens;
