import React, { useEffect, useState } from "react";
import { useVisitStore } from "../store/useVisitStore.js"; // adjust path as needed
import { useAuthStore } from "../store/useAuthStore.js"; // assuming you have a user store
import { useTokenStore } from "../store/useTokenStore.js"; // if you have to fetch tokens
import { usePatientStore } from "../store/usePatientStore.js"; // if you fetch patients

const Visits = () => {
  const { visits, fetchAllVisits, createVisit } = useVisitStore();
  const { authUser } = useAuthStore();
  const { patients } = usePatientStore();
  const { tokens } = useTokenStore();

  const [formData, setFormData] = useState({
    patientId: "",
    tokenId: "",
    symptoms: "",
    diagnosis: "",
    prescription: "",
  });

  useEffect(() => {
    fetchAllVisits();
  }, [fetchAllVisits]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createVisit(formData);
    setFormData({
      patientId: "",
      tokenId: "",
      symptoms: "",
      diagnosis: "",
      prescription: "",
    });
  };

  return (
    <div className="patients-container px-4 py-6 h-full flex flex-col">
      <div className="patients-header flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Visits</h1>
      </div>

      <div className="patients-table-container overflow-auto flex-1">
        <table className="patients-table w-full">
          <thead>
            <tr className="bg-gray-100 sticky top-0">
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Token</th>
              <th className="p-3 text-left">Doctor</th>
              <th className="p-3 text-left">Symptoms</th>
              <th className="p-3 text-left">Diagnosis</th>
              <th className="p-3 text-left">Prescription</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {visits?.data?.map((v) => (
              <tr key={v._id}>
                <td className="border px-4 py-2">{v.patient?.fullName}</td>
                <td className="border px-4 py-2">{v.token?.tokenNumber}</td>
                <td className="border px-4 py-2">{v.doctor?.fullName}</td>
                <td className="border px-4 py-2">{v.symptoms}</td>
                <td className="border px-4 py-2">{v.diagnosis}</td>
                <td className="border px-4 py-2">{v.prescription}</td>
                <td className="border px-4 py-2">
                  {new Date(v.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Visits;
