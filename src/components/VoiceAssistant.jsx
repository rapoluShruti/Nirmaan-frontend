import { useEffect } from "react";

export default function VoiceAssistant({ onCommand }) {
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-IN";

    recognition.onresult = (e) => {
      const text =
        e.results[e.results.length - 1][0].transcript.toLowerCase();

      if (text.includes("hey nirman")) {
        speak("Haan boliye");
        return;
      }

      onCommand(text); // 👈 only responsibility
    };

    recognition.start();
    return () => recognition.stop();
  }, [onCommand]);

  const speak = (msg) => {
    const u = new SpeechSynthesisUtterance(msg);
    u.lang = "hi-IN";
    speechSynthesis.speak(u);
  };

  return null;
}
