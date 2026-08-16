"use client";

import { useState } from "react";
import { Database, Play, Table, Code, RefreshCw } from "lucide-react";
import { initialMockDb } from "@/lib/supabase";

export function SupabaseRunner() {
  const [activeTable, setActiveTable] = useState<"posts" | "students" | "products" | "todos">("students");
  const [queryCode, setQueryCode] = useState(`const { data, error } = await supabase\n  .from('students')\n  .select('id, name, course, grade')\n  .order('grade', { ascending: true });`);
  const [outputData, setOutputData] = useState<any[]>(initialMockDb.students);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunQuery = () => {
    setIsRunning(true);
    setTimeout(() => {
      let filtered = [...(initialMockDb[activeTable] || [])];
      setOutputData(filtered);
      setIsRunning(false);
    }, 300);
  };

  const handleSwitchTable = (table: "posts" | "students" | "products" | "todos") => {
    setActiveTable(table);
    setQueryCode(`const { data, error } = await supabase\n  .from('${table}')\n  .select('*');`);
    setOutputData(initialMockDb[table] || []);
  };

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-xs space-y-0">
      {/* Header */}
      <div className="p-4 bg-zinc-50 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-emerald-600" />
          <h3 className="font-bold text-sm sm:text-base text-zinc-900">
            Interactive Supabase & PostgreSQL Query Simulator
          </h3>
        </div>

        {/* Table Selector */}
        <div className="flex items-center gap-1 bg-zinc-200/80 p-1 rounded-2xl text-xs font-semibold">
          {(["students", "posts", "products", "todos"] as const).map((tbl) => (
            <button
              key={tbl}
              onClick={() => handleSwitchTable(tbl)}
              className={`px-3 py-1 rounded-xl capitalize transition-all ${
                activeTable === tbl
                  ? "bg-white text-emerald-800 font-bold shadow-2xs"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              {tbl}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">
        {/* Supabase JS Query Editor */}
        <div className="p-5 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-zinc-600 font-bold flex items-center gap-1.5">
              <Code className="h-3.5 w-3.5 text-amber-600" />
              <span>Next.js Supabase SDK Call</span>
            </span>
            <button
              onClick={handleRunQuery}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-3.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              <Play className={`h-3 w-3 ${isRunning ? "animate-spin" : ""}`} />
              <span>{isRunning ? "Executing..." : "Run Query"}</span>
            </button>
          </div>

          <textarea
            value={queryCode}
            onChange={(e) => setQueryCode(e.target.value)}
            rows={5}
            className="w-full p-3 bg-[#211F2E] border border-[#333045] rounded-2xl font-mono text-xs text-emerald-300 focus:outline-none focus:border-emerald-500 leading-relaxed resize-none shadow-inner"
          />

          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-950 font-mono">
            ⚡ <strong>PostgREST Translation:</strong> <span className="text-emerald-800 font-bold">SELECT * FROM {activeTable};</span>
          </div>
        </div>

        {/* Database Results Table View */}
        <div className="p-5 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-zinc-600 font-bold flex items-center gap-1.5">
              <Table className="h-3.5 w-3.5 text-emerald-600" />
              <span>Database Query Result ({outputData.length} rows)</span>
            </span>
            <span className="text-[11px] text-emerald-700 font-mono font-bold">✓ 200 OK</span>
          </div>

          <div className="overflow-x-auto max-h-[160px] border border-zinc-200 rounded-2xl">
            <table className="w-full text-left text-xs text-zinc-800">
              <thead className="bg-zinc-100 text-zinc-700 border-b border-zinc-200 font-mono uppercase">
                <tr>
                  {outputData[0] &&
                    Object.keys(outputData[0]).map((key) => (
                      <th key={key} className="p-2.5 font-bold">
                        {key}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 bg-white font-mono">
                {outputData.map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-50">
                    {Object.values(row).map((val: any, j) => (
                      <td key={j} className="p-2.5 truncate max-w-[150px]">
                        {typeof val === "boolean" ? (val ? "true" : "false") : String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
