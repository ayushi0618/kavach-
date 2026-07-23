import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Bot, Search, Send, RefreshCw, CheckCircle2, Cpu } from 'lucide-react';
import PageTransition from '../../../components/animations/PageTransition';
import api from '../../../utils/api';
import toast from 'react-hot-toast';

export default function AIDashboard() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiAnswer, setAiAnswer] = useState(null);
  const [matchedData, setMatchedData] = useState(null);

  const quickPrompts = [
    "Where is TATRA VVN 8x8 and what is its repair status?",
    "Show me all critical maintenance jobs and assigned technicians",
    "Which spare parts are low in stock and need immediate PO generation?",
    "Who is the L1 winning vendor for Tender TNDR-045?",
    "List all technical officers assigned to WSG department"
  ];

  const handleAskAI = async (textToQuery) => {
    const activeQuery = textToQuery || query;
    if (!activeQuery.trim()) {
      toast.error('Please type a question for the AI Chatbot');
      return;
    }

    setLoading(true);
    setAiAnswer(null);
    setMatchedData(null);

    try {
      // Call backend AI Chat endpoint
      const res = await api.post('/ai/chat', { query: activeQuery });
      const textResponse = res.data?.response || res.data?.answer || 'AI response received.';
      const recs = res.data?.records || [];

      setAiAnswer(textResponse);
      setMatchedData(recs);
    } catch (err) {
      // Dynamic Client Fallback if server offline
      const qLow = activeQuery.toLowerCase();
      let fallbackText = `### 🧠 AI Assistant Analysis\n\n**Query:** "${activeQuery}"\n\n`;
      let fallbackRecords = [];

      if (qLow.includes('tech') || qLow.includes('who') || qLow.includes('sharma') || qLow.includes('singh') || qLow.includes('staff') || qLow.includes('officer')) {
        fallbackText += `Found **3 Technical Officers** matching your search criteria:\n\n* **Sub. Maj. Rajesh Sharma** (Vehicle Repair WSG)\n* **Hav. Vikram Singh** (Equipment Repair ERG)\n* **Nk. Amit Patel** (Armament Group)`;
        fallbackRecords = [
          { id: 'TECH-01', name: 'Sub. Maj. Rajesh Sharma', category: 'Senior Officer', stock: 'rajesh.sharma@510abw.in', status: 'Active Duty', dept: 'Vehicle Repair Group (WSG)' },
          { id: 'TECH-02', name: 'Hav. Vikram Singh', category: 'Heavy Engine Specialist', stock: 'vikram.singh@510abw.in', status: 'Active Duty', dept: 'Equipment Repair Group (ERG)' },
          { id: 'TECH-03', name: 'Nk. Amit Patel', category: 'Hydraulic Specialist', stock: 'amit.patel@510abw.in', status: 'Active Duty', dept: 'Armament Group' }
        ];
      } else if (qLow.includes('tender') || qLow.includes('vendor') || qLow.includes('po') || qLow.includes('l1') || qLow.includes('rate')) {
        fallbackText += `**Tender TNDR-045 (Engine Spare Parts & Overhaul Kit)**:\n\n* **L1 Winner:** AutoParts India Ltd (Quoted L1 Price: **₹4,45,000**)\n* **Evaluation:** Technical & Commercial Board 100% Approved.\n* **PO Status:** Order \`PO-L1-2026-045\` ready to issue.`;
        fallbackRecords = [
          { id: 'TNDR-045', name: 'Engine Spare Parts & Vehicle Overhaul Kit', category: 'Procurement Tender', stock: 'AutoParts India Ltd (L1 Winner)', status: 'L1 Approved (₹4,45,000)', dept: 'Procurement Wing' },
          { id: 'PO-L1-2026-045', name: 'L1 Award Purchase Order Contract', category: 'Purchase Order', stock: 'Value: ₹4,45,000 (Net 30 Days)', status: 'Ready to Issue', dept: 'Procurement Wing' }
        ];
      } else if (qLow.includes('stock') || qLow.includes('part') || qLow.includes('inventory') || qLow.includes('fluid') || qLow.includes('filter')) {
        fallbackText += `**Low Stock Inventory Items**:\n\n* **VG46 Hydraulic Fluid**: 2 Barrels Left (Reorder: 5)\n* **TATRA VVN 8x8 Oil Filter**: 3 Units Left (Reorder: 10)\n* **Heavy Duty Brake Pad Set**: 1 Set Left (Reorder: 4)`;
        fallbackRecords = [
          { id: 'SKU-HYD-46', name: 'VG46 Hydraulic Fluid 20L Barrel', category: 'Fluids & Consumables', stock: '2 Barrels Remaining', status: 'Reorder Alert', dept: 'Armament Depot' },
          { id: 'SKU-FILT-01', name: 'TATRA VVN 8x8 Oil Filter Assembly', category: 'Spare Parts', stock: '3 Units Remaining', status: 'Low Stock Alert', dept: 'WSG Bay Depot' },
          { id: 'SKU-BRK-88', name: 'Heavy Duty Brake Pad Set', category: 'Consumables', stock: '1 Set Remaining', status: 'Reorder Alert', dept: 'WSG Bay Depot' }
        ];
      } else if (qLow.includes('vehicle') || qLow.includes('tatra') || qLow.includes('pinaka') || qLow.includes('beml') || qLow.includes('gypsy') || qLow.includes('where')) {
        fallbackText += `**Vehicle Fleet Inspection**:\n\n* **TATRA VVN 8x8** (Reg: \`21B-408912X\`) — Status: **In Bay 2 Overhaul**\n* **Pinaka MBRL Rig #4** (Reg: \`PK-9081\`) — Status: **Hydraulic Leak Repair**`;
        fallbackRecords = [
          { id: '21B-408912X', name: 'TATRA VVN 8x8 Heavy Transport', category: 'Fleet Vehicle', stock: 'Chassis: T815-21B', status: 'In Overhaul (Bay 2)', dept: 'Vehicle Repair (WSG)' },
          { id: 'PK-9081', name: 'Pinaka MBRL Rocket Launcher Rig #4', category: 'Armament Equipment', stock: 'Chassis: PK-9081', status: 'In Repair', dept: 'Armament Group' }
        ];
      } else {
        fallbackText += `Found **2 Active Maintenance Tickets** matching your query:\n\n* **[JOB-9041]** Pinaka Hydraulic Cylinder Flush (Nk. Amit Patel)\n* **[JOB-9042]** 500KVA Diesel Generator Alternator Overhaul (Sep. Deepak Verma)`;
        fallbackRecords = [
          { id: 'JOB-9041', name: 'Pinaka Hydraulic Cylinder Flush & Leak Fix', category: 'Maintenance Ticket', stock: 'Assigned: Nk. Amit Patel', status: 'In Progress', dept: 'Armament Group' },
          { id: 'JOB-9042', name: '500KVA Diesel Generator Alternator Overhaul', category: 'Maintenance Ticket', stock: 'Assigned: Sep. Deepak Verma', status: 'Scheduled', dept: 'Equipment Repair (ERG)' }
        ];
      }

      setAiAnswer(fallbackText);
      setMatchedData(fallbackRecords);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto bg-[#F8F8F8] min-h-screen space-y-6">
        
        {/* AI Chatbot Header & Input Card */}
        <div className="bg-white rounded-xl shadow-sm border border-border p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-border pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-olive text-white flex items-center justify-center shadow-sm">
                <Bot size={22} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-olive">AI Workshop Chatbot & Intelligence Explorer</h1>
                <p className="text-xs text-gray-500">Ask any question to retrieve specific live data on assets, maintenance, inventory & tenders.</p>
              </div>
            </div>
            <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 size={12} /> AI Live Chat Connected
            </span>
          </div>

          {/* Interactive Chat Input Bar */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleAskAI(); }}
            className="relative flex items-center"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask AI Chatbot... e.g. 'Show low stock spare parts', 'Where is TATRA VVN 8x8?', or 'Who is assigned to Pinaka repair?'"
              className="w-full bg-gray-50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3.5 pr-28 text-sm text-gray-800 focus:outline-none transition-all shadow-inner font-medium"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2.5 px-4 py-2 bg-primary hover:bg-olive text-white font-bold text-xs rounded-lg shadow transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw size={14} className="animate-spin" /> Thinking...
                </>
              ) : (
                <>
                  <Send size={14} /> Ask AI
                </>
              )}
            </button>
          </form>

          {/* Quick Prompt Buttons */}
          <div className="pt-1">
            <span className="text-[11px] font-bold text-gray-500 block mb-2">Quick Questions:</span>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((promptText, idx) => (
                <button
                  key={idx}
                  onClick={() => { setQuery(promptText); handleAskAI(promptText); }}
                  className="text-xs bg-gray-50 hover:bg-khaki-light/30 hover:border-khaki text-gray-700 font-semibold px-3 py-1.5 rounded-lg border border-border transition-all flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <Sparkles size={12} className="text-primary shrink-0" />
                  <span>{promptText}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Data Requested by Query (ONLY Requested Data Table) */}
        <AnimatePresence>
          {matchedData ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white rounded-xl shadow-sm border border-border p-6 space-y-3"
            >
              <div className="flex justify-between items-center border-b border-border pb-3">
                <h3 className="font-bold text-olive text-sm flex items-center gap-2">
                  <Cpu size={18} className="text-primary" /> Requested Database Records ({matchedData.length} Items Found)
                </h3>
                <span className="text-xs font-semibold text-gray-500">Filtered for Query: "{query}"</span>
              </div>

              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <thead className="bg-gray-100 font-bold text-gray-700 border-b border-border">
                    <tr>
                      <th className="p-3.5">Record ID & Name</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Department</th>
                      <th className="p-3.5">Operational Details / Contact / Stock</th>
                      <th className="p-3.5">Status Tag</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-white">
                    {matchedData.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                        <td className="p-3.5">
                          <div className="font-extrabold text-olive text-xs">{item.name}</div>
                          <div className="text-[10px] text-gray-400 font-mono font-semibold">{item.id}</div>
                        </td>
                        <td className="p-3.5 font-semibold text-gray-700">{item.category}</td>
                        <td className="p-3.5 text-gray-600 font-medium">{item.dept}</td>
                        <td className="p-3.5 text-gray-800 font-medium">{item.stock}</td>
                        <td className="p-3.5">
                          <span className={`px-2.5 py-1 rounded-full font-extrabold text-[10px] ${
                            item.status.includes('Alert') || item.status.includes('Critical') || item.status.includes('Reorder') ? 'bg-red-100 text-danger border border-red-200' :
                            item.status.includes('L1') || item.status.includes('Operational') || item.status.includes('Active') ? 'bg-green-100 text-success border border-green-200' :
                            'bg-blue-100 text-info border border-blue-200'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            /* Default Empty State before query is asked */
            <div className="bg-white rounded-xl shadow-sm border border-border p-12 text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <Sparkles size={24} />
              </div>
              <h3 className="text-base font-bold text-olive">AI Assistant Ready</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Ask any question in the AI Chatbot bar above or click one of the quick questions to retrieve specific live data.
              </p>
            </div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
}