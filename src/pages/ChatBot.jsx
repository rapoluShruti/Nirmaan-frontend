import React, { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Send } from "lucide-react";

/* -------------------- CONSTANTS -------------------- */
const INTENTS = {
  SHOW_PHOTOS: "SHOW_PHOTOS",
  SHOW_PENDING: "SHOW_PENDING",
  SEND_MATERIAL: "SEND_MATERIAL",
  SHOW_ATTENDANCE: "SHOW_ATTENDANCE",
  SHOW_STATUS: "SHOW_STATUS",
  UNKNOWN: "UNKNOWN",
};

/* -------------------- MOCK DATA (REPLACE WITH API) -------------------- */
const PROJECT = {
  name: "Residency Tower A",
  location: "Hyderabad",
};

const TASKS = [
  {
    id: "104",
    name: "Brick Masonry",
    status: "pending",
    reason: "Awaiting steel pipe approval",
    beforeImg:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400",
    afterImg: null,
  },
  {
    id: "101",
    name: "Foundation Casting",
    status: "completed",
    reason: null,
    beforeImg:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400",
    afterImg:
      "https://images.unsplash.com/photo-1590849858295-92331a89c4e8?w=400",
  },
];

const ATTENDANCE = {
  total: 25,
  present: 23,
  absent: [
    { name: "Ramesh", reason: "Sick leave" },
    { name: "Suresh", reason: "Absent without notice" },
  ],
};

/* -------------------- MAIN COMPONENT -------------------- */
export default function NirmaanAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState(null);

  const recognitionRef = useRef(null);

  /* -------------------- SPEECH SETUP -------------------- */
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (e) => {
      handleUserText(e.results[0][0].transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => recognitionRef.current?.start();

  /* -------------------- HELPERS -------------------- */
  const addMsg = (text, sender, data = null) =>
    setMessages((m) => [...m, { text, sender, data }]);

  /* -------------------- NLP PARSER -------------------- */
  const parseCommand = (text) => {
    const lower = text.toLowerCase();

    const taskId = lower.match(/task\s*(id)?\s*(\d+)/)?.[2] || null;
    const taskName =
      TASKS.find((t) => lower.includes(t.name.toLowerCase()))?.name || null;

    const material =
      ["steel pipe", "steel", "cement", "sand", "bricks"].find((m) =>
        lower.includes(m)
      ) || null;

    const quantity = lower.match(/(\d+)\s*(bags|pipes|kg|units)?/)?.[0] || null;

    if (/photo|before|after/i.test(lower))
      return { intent: INTENTS.SHOW_PHOTOS, taskId, taskName };

    if (/pending|remaining|left/i.test(lower))
      return { intent: INTENTS.SHOW_PENDING };

    if (/send|request/i.test(lower) && /material/i.test(lower))
      return {
        intent: INTENTS.SEND_MATERIAL,
        taskId,
        taskName,
        material,
        quantity,
      };

    if (/attendance|absent|workers/i.test(lower))
      return { intent: INTENTS.SHOW_ATTENDANCE };

    if (/status|progress/i.test(lower))
      return { intent: INTENTS.SHOW_STATUS, taskId, taskName };

    return { intent: INTENTS.UNKNOWN };
  };

  /* -------------------- MAIN HANDLER -------------------- */
  const handleUserText = (text) => {
    if (!text) return;
    addMsg(text, "user");

    const parsed = parseCommand(text);

    switch (parsed.intent) {
      case INTENTS.SHOW_PHOTOS: {
        const task =
          TASKS.find((t) => t.id === parsed.taskId) ||
          TASKS.find((t) => t.name === parsed.taskName);

        addMsg(
          `📸 Project: ${PROJECT.name}\nTask: ${task.name}`,
          "bot",
          { type: "photos", task }
        );
        break;
      }

      case INTENTS.SHOW_PENDING: {
        const pending = TASKS.filter((t) => t.status === "pending");
        addMsg(
          `⏳ Project: ${PROJECT.name}\n\nPending Work:\n\n${pending
            .map(
              (t) => `• ${t.name}\n  Reason: ${t.reason}`
            )
            .join("\n\n")}`,
          "bot"
        );
        break;
      }

      case INTENTS.SEND_MATERIAL: {
        setConversation(parsed);
        addMsg(
          `📦 Material Request\n\nProject: ${PROJECT.name}\nTask: ${
            parsed.taskName || parsed.taskId || "❓"
          }\nMaterial: ${parsed.material || "❓"}\nQuantity: ${
            parsed.quantity || "❓"
          }`,
          "bot",
          { type: "materialForm" }
        );
        break;
      }

      case INTENTS.SHOW_ATTENDANCE: {
        addMsg(
          `👷 Attendance – Today\n\nTotal: ${ATTENDANCE.total}\nPresent: ${
            ATTENDANCE.present
          }\nAbsent: ${ATTENDANCE.absent.length}\n\nAbsent Workers:\n${ATTENDANCE.absent
            .map((a) => `• ${a.name} (${a.reason})`)
            .join("\n")}`,
          "bot"
        );
        break;
      }

      case INTENTS.SHOW_STATUS: {
        const task =
          TASKS.find((t) => t.id === parsed.taskId) ||
          TASKS.find((t) => t.name === parsed.taskName);
        addMsg(
          `📊 Task Status\n\nTask: ${task.name}\nStatus: ${task.status}`,
          "bot"
        );
        break;
      }

      default:
        addMsg(
          `I can help with:\n• Show task photos\n• Pending work\n• Send material request\n• Attendance\n• Task status`,
          "bot"
        );
    }
  };

  const submitMaterial = () => {
    addMsg(
      `✅ Material Request Sent\n\nTask: ${conversation.taskName ||
        conversation.taskId}\nMaterial: ${conversation.material}\nQuantity: ${conversation.quantity}`,
      "bot"
    );
    setConversation(null);
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="flex flex-col h-screen bg-orange-50">
      <div className="bg-orange-600 text-white p-4 font-bold">
        🏗️ Nirmaan Assistant
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-xl ${
              m.sender === "user"
                ? "ml-auto bg-orange-600 text-white"
                : "bg-white"
            } p-4 rounded-xl`}
          >
            <div className="whitespace-pre-line">{m.text}</div>

            {m.data?.type === "photos" && (
              <div className="grid grid-cols-2 gap-2 mt-3">
                <img src={m.data.task.beforeImg} className="rounded" />
                {m.data.task.afterImg ? (
                  <img src={m.data.task.afterImg} className="rounded" />
                ) : (
                  <div className="bg-gray-200 flex items-center justify-center rounded">
                    Pending
                  </div>
                )}
              </div>
            )}

            {m.data?.type === "materialForm" && (
              <div className="mt-3 space-y-2">
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Quantity"
                  onChange={(e) =>
                    setConversation({
                      ...conversation,
                      quantity: e.target.value,
                    })
                  }
                />
                <button
                  onClick={submitMaterial}
                  className="w-full bg-green-600 text-white p-2 rounded"
                >
                  Send Request
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 bg-white flex gap-3 border-t">
        <button
          onClick={startListening}
          className={`p-4 rounded-full ${
            isListening ? "bg-red-600" : "bg-orange-600"
          }`}
        >
          {isListening ? (
            <MicOff className="text-white" />
          ) : (
            <Mic className="text-white" />
          )}
        </button>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleUserText(input)}
          className="flex-1 border rounded px-4 py-2"
          placeholder="Speak or type..."
        />

        <button
          onClick={() => handleUserText(input)}
          className="bg-orange-600 p-3 rounded"
        >
          <Send className="text-white" />
        </button>
      </div>
    </div>
  );
}
