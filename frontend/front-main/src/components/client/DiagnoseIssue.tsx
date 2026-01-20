import { useState } from "react";
import { Loader2, Brain } from "lucide-react";

const DiagnoseIssue = () => {
  const [description, setDescription] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDiagnose = async () => {
    if (!description.trim()) return;
    setLoading(true);
    setSuggestion("");

    try {
      const response = await fetch("/api/advisor/diagnose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ description: description.trim() })
      });

      if (!response.ok) throw new Error("Błąd serwera");

      const data = await response.json();
      setSuggestion(data.suggestedService);
    } catch (err) {
      console.error(err);
      setSuggestion("Wystąpił błąd podczas diagnozy.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="text-blue-600" size={28} />
        <h2 className="text-2xl font-semibold text-gray-800">Diagnozuj problem z pojazdem</h2>
      </div>

      <label className="block text-gray-600 mb-2 font-medium">Opis problemu</label>
      <textarea
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        rows={6}
        placeholder="Napisz, co się dzieje z autem (np. dziwne dźwięki, dym, problemy z zapłonem)..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={handleDiagnose}
        disabled={loading}
        className="mt-5 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-60"
      >
        {loading ? <Loader2 className="animate-spin" size={20} /> : <Brain size={20} />}
        {loading ? "Diagnozuję..." : "Zdiagnozuj usterkę AI"}
      </button>

      {suggestion && (
        <div className="mt-8 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
          <p className="text-blue-800 font-semibold mb-1">Sugerowana usługa:</p>
          <p className="text-gray-800">{suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default DiagnoseIssue;
