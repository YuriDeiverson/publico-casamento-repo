// src/components/AdminConfirmations.tsx

import React, { useState, useEffect } from "react";
import { db, auth } from "../firabse";
import {
  collection,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { signOut } from "firebase/auth";

interface Confirmation {
  id: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  status: "confirmado" | "nao_irei";
  timestamp: Date;
}

interface AdminConfirmationsProps {
  onNavigate: (page: string) => void;
}

const AdminConfirmations: React.FC<AdminConfirmationsProps> = ({
  onNavigate,
}) => {
  const [confirmations, setConfirmations] = useState<Confirmation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfirmations = async () => {
      setLoading(true);
      const q = query(
        collection(db, "confirmations"),
        orderBy("timestamp", "desc"),
      );
      const querySnapshot = await getDocs(q);

      const confirmationsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: (data.timestamp as Timestamp).toDate(),
        } as Confirmation;
      });

      setConfirmations(confirmationsData);
      setLoading(false);
    };

    fetchConfirmations();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onNavigate("home");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
        <p className="text-gray-700 text-lg">Carregando confirmações...</p>
      </div>
    );
  }

  const confirmedGuests = confirmations.filter(
    (c) => c.status === "confirmado",
  );
  const notAttendingGuests = confirmations.filter(
    (c) => c.status === "nao_irei",
  );

  return (
    <div className="min-h-screen bg-[#F4F4F4] p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-yellow-600">
            Confirmações de Presença
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Sair
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Confirmados ({confirmedGuests.length})
        </h2>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
                  Nome Completo
                </th>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
                  Telefone
                </th>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
                  Data
                </th>
              </tr>
            </thead>
            <tbody>
              {confirmedGuests.map((conf) => (
                <tr key={conf.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-sm">
                    {conf.firstName} {conf.lastName}
                  </td>
                  <td className="py-2 px-4 border-b text-sm">{conf.email}</td>
                  <td className="py-2 px-4 border-b text-sm">
                    {conf.phone || "-"}
                  </td>
                  <td className="py-2 px-4 border-b text-sm">
                    {conf.timestamp.toLocaleString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold text-red-500 mb-4">
          Não Poderão Comparecer ({notAttendingGuests.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
                  Nome Completo
                </th>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
                  Data
                </th>
              </tr>
            </thead>
            <tbody>
              {notAttendingGuests.map((conf) => (
                <tr key={conf.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-sm">
                    {conf.firstName} {conf.lastName}
                  </td>
                  <td className="py-2 px-4 border-b text-sm">{conf.email}</td>
                  <td className="py-2 px-4 border-b text-sm">
                    {conf.timestamp.toLocaleString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminConfirmations;
