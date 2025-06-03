import React, { useEffect, useState } from "react";
import { useBillStore } from "../../store/useBillStore.js";
import { toast } from "react-toastify";
import { FiTrash2 } from "react-icons/fi";
const Billing = () => {
  const { bills, fetchBills, updateBillStatus, deleteBill } = useBillStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBills = async () => {
      setLoading(true);
      try {
        await fetchBills();
      } catch (error) {
        toast.error("Failed to load bills");
      } finally {
        setLoading(false);
      }
    };
    loadBills();
  }, [fetchBills]);

  const handleStatusChange = async (billId, newStatus) => {
    try {
      await updateBillStatus(billId, newStatus);
      toast.success("Bill status updated");
    } catch (error) {
      toast.error("Failed to update bill status");
    }
  };

  const handleDeleteBill = async (billId) => {
    if (window.confirm("Are you sure you want to delete this bill?")) {
      try {
        await deleteBill(billId);
        toast.success("Bill deleted successfully");
      } catch (error) {
        toast.error("Failed to delete bill");
      }
    }
  };

  return (
    <div className="patients-container px-4 py-6 h-full flex flex-col">
      <div className="patients-header flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Billing Management</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="patients-table-container overflow-auto flex-1">
          <table className="patients-table w-full">
            <thead>
              <tr className="bg-gray-100 sticky top-0">
                <th className="py-3 px-4 text-left">Patient</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bills.map((bill) => (
                <tr key={bill._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    {bill.patient?.fullName || "Unknown Patient"}
                  </td>
                  <td className="py-3 px-4">₹{bill.amount}</td>
                  <td className="py-3 px-4">
                    <select
                      value={bill.status}
                      onChange={(e) =>
                        handleStatusChange(bill._id, e.target.value)
                      }
                      className={`px-2 py-1 rounded text-sm ${
                        bill.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      <option value="unpaid">Unpaid</option>
                      <option value="paid">Paid</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    {new Date(bill.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDeleteBill(bill._id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Billing;
