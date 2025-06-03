import React, { useEffect, useState } from "react";
import { useTokenStore } from "../../store/useTokenStore";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/useAuthStore.js";
import { useBillStore } from "../../store/useBillStore.js";
import { FiRefreshCw } from "react-icons/fi";
import Modal from "react-modal";

Modal.setAppElement("#root");

const CTokens = () => {
  const { tokens, fetchTodayTokens } = useTokenStore();
  const { authUser } = useAuthStore();
  const { createBill } = useBillStore();
  const [showBillModal, setShowBillModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [billAmount, setBillAmount] = useState(500);

  useEffect(() => {
    fetchTodayTokens();
  }, [fetchTodayTokens]);

  const handleCreateBillClick = (token) => {
    setSelectedToken(token);
    setShowBillModal(true);
  };

  const handleSubmitBill = async () => {
    try {
      if (!selectedToken?.visit?._id) {
        throw new Error("No visit record found for this token");
      }

      await createBill({
        visitId: selectedToken.visit._id,
        amount: billAmount,
        description: `Consultation fee for ${selectedToken.patient.fullName}`,
      });
      toast.success("Bill created successfully");
      setShowBillModal(false);
      fetchTodayTokens();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to create bill"
      );
    }
  };

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
          Today's Tokens - Receptionist View
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
              <th className="p-3 text-left">Actions</th>
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
                <td className="p-3 flex gap-2">
                  <button
                    className="text-blue-600 hover:underline text-sm"
                    onClick={() => {
                      toast.info(`Patient: ${token.patient?.fullName}`);
                    }}
                  >
                    View Details
                  </button>
                  {token.status === "completed" && token.visit?._id && (
                    <button
                      onClick={() => handleCreateBillClick(token)}
                      className="px-2 py-1 rounded text-sm bg-green-100 text-green-800 hover:bg-green-200"
                    >
                      Create Bill
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bill Creation Modal */}
      <Modal
        isOpen={showBillModal}
        onRequestClose={() => setShowBillModal(false)}
        style={customStyles}
        contentLabel="Create Bill Modal"
      >
        <div className="modal-inner space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Create Bill</h2>
            <button
              onClick={() => setShowBillModal(false)}
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
              Amount (₹)
            </label>
            <input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(Number(e.target.value))}
              className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter bill amount"
            />
          </div>

          <div className="modal-actions flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowBillModal(false)}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitBill}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Create Bill
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CTokens;
