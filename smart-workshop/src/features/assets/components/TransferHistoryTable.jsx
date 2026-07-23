import { transferHistory } from '../data/mockAssetData';

export default function TransferHistoryTable() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-border overflow-hidden">
      <h3 className="text-lg font-bold text-olive mb-4">Department Transfer History</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-light text-gray-600 font-semibold border-b border-border">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">From Dept</th>
              <th className="px-4 py-3">To Dept</th>
              <th className="px-4 py-3">Reason</th>
              <th className="px-4 py-3">Authorized By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transferHistory.map((th) => (
              <tr key={th.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{th.date}</td>
                <td className="px-4 py-3 font-semibold text-gray-700">{th.from}</td>
                <td className="px-4 py-3 font-semibold text-olive">{th.to}</td>
                <td className="px-4 py-3 text-gray-600">{th.reason}</td>
                <td className="px-4 py-3 text-gray-500">{th.responsible}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}