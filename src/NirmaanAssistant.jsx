import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function NirmaanAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const isProcessingRef = useRef(false);
  const restartTimeoutRef = useRef(null);

  // Route mappings with fuzzy matching
  const routeMap = {
    view: "/view",
    attendance: "/attendance",
    "daily itinerary": "/iop",
    itinerary: "/iop",
    tasks: "/task",
    task: "/task",
    approval: "/approv",
    approvals: "/approv",
    "material management": "/invoice",
    materials: "/invoice",
    invoice: "/invoice",
    safety: "/saftey",
    "safety report": "/saftey",
    projects: "/quick-view",
    "project view": "/view",
    dashboard: "/manager-dashboard",
    "create project": "/create",
    dpr: "/ddpr"
  };

  // Fuzzy match function
  const fuzzyMatch = (input, target) => {
    const inputLower = input.toLowerCase().replace(/[^a-z]/g, '');
    const targetLower = target.toLowerCase().replace(/[^a-z]/g, '');
    
    if (inputLower.includes(targetLower) || targetLower.includes(inputLower)) {
      return true;
    }

    const distance = levenshteinDistance(inputLower, targetLower);
    return distance <= 2;
  };

  const levenshteinDistance = (str1, str2) => {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  };

  // Find best matching route
  const findRoute = (command) => {
    const commandLower = command.toLowerCase();
    
    const openMatch = commandLower.match(/(?:open|show|go to|navigate to)\s+(.+)/);
    if (openMatch) {
      const target = openMatch[1].trim();
      
      for (const [key, route] of Object.entries(routeMap)) {
        if (target.includes(key) || key.includes(target)) {
          return { route, name: key };
        }
      }
      
      for (const [key, route] of Object.entries(routeMap)) {
        if (fuzzyMatch(target, key)) {
          return { route, name: key };
        }
      }
    }
    
    return null;
  };

  // Show visual feedback
  const showVisualFeedback = (text, duration = 3000) => {
    setFeedbackText(text);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), duration);
  };

  // Process voice command
  const processCommand = (command) => {
    if (isProcessingRef.current) return;
    
    isProcessingRef.current = true;
    console.log("Processing command:", command);
    
    const result = findRoute(command);
    if (result) {
      showVisualFeedback(`Opening ${result.name}...`);
      setTimeout(() => {
        navigate(result.route);
        isProcessingRef.current = false;
      }, 1000);
    } else {
      showVisualFeedback("Sorry, I didn't understand that command");
      setTimeout(() => {
        isProcessingRef.current = false;
      }, 2000);
    }
  };

  // Start recognition safely
  const startRecognition = () => {
    if (!recognitionRef.current) return;
    
    try {
      recognitionRef.current.start();
      console.log("Recognition started successfully");
    } catch (error) {
      if (error.message.includes('already started')) {
        console.log("Recognition already running");
      } else {
        console.error("Error starting recognition:", error);
      }
    }
  };

  // Stop recognition safely
  const stopRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error("Error stopping recognition:", error);
      }
    }
  };

  // Initialize speech recognition
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error("Speech recognition not supported");
      showVisualFeedback("Voice commands not supported in this browser", 5000);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-IN';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("✅ Voice recognition active");
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        console.log("Heard:", finalTranscript);
        setTranscript(finalTranscript);

        const lowerTranscript = finalTranscript.toLowerCase();
        
        // Check for wake word variations
        const wakeWords = [
          "hey nirmaan",
          "hey nirman", 
          "he nirmaan",
          "he nirman",
          "a nirmaan",
          "hey nirman",
          "nirmaan"
        ];

        const hasWakeWord = wakeWords.some(word => lowerTranscript.includes(word));

        if (hasWakeWord && !isProcessingRef.current) {
          showVisualFeedback("🎤 I'm listening...", 2000);
          
          // Extract command after wake word
          let command = lowerTranscript;
          wakeWords.forEach(word => {
            if (command.includes(word)) {
              command = command.split(word)[1];
            }
          });
          
          command = command.trim();
          
          if (command.length > 2) {
            console.log("Command extracted:", command);
            processCommand(command);
          }
        }
      }
    };

    recognition.onerror = (event) => {
      console.error("Recognition error:", event.error);
      
      if (event.error === 'aborted') {
        // Don't restart on abort, it's intentional
        return;
      }
      
      if (event.error === 'no-speech') {
        // Just continue listening
        return;
      }

      if (event.error === 'network') {
        showVisualFeedback("Network error. Check your connection.", 3000);
      }
    };

    recognition.onend = () => {
      console.log("Recognition ended");
      setIsListening(false);
      
      // Restart after a delay to prevent rapid restarts
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      
      restartTimeoutRef.current = setTimeout(() => {
        if (recognitionRef.current) {
          startRecognition();
        }
      }, 1000);
    };

    recognitionRef.current = recognition;

    // Start recognition
    startRecognition();

    // Cleanup
    return () => {
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      stopRecognition();
      recognitionRef.current = null;
    };
  }, [navigate]);

  return (
    <>
      {/* Voice Status Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all ${
          isListening ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
        }`}>
          <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-white animate-pulse' : 'bg-gray-500'}`}></div>
          <span className="text-sm font-medium">
            {isListening ? '🎤 Say "Hey Nirmaan"' : '🎤 Activating...'}
          </span>
        </div>
      </div>

      {/* Visual Feedback */}
      {showFeedback && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-blue-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span className="font-semibold text-lg">{feedbackText}</span>
          </div>
        </div>
      )}

      {/* Transcript Display */}
      {transcript && (
        <div className="fixed bottom-4 left-4 bg-black/90 text-white px-4 py-3 rounded-xl text-sm max-w-md z-50 shadow-2xl">
          <p className="text-xs text-gray-400 mb-1">Last heard:</p>
          <p className="font-medium">{transcript}</p>
        </div>
      )}

      {/* Help Guide */}
      <div className="fixed bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg text-xs max-w-xs z-40 border border-gray-200">
        <p className="font-semibold text-gray-800 mb-2">💡 Voice Commands:</p>
        <ul className="space-y-1 text-gray-600">
          <li>• "Hey Nirmaan open view"</li>
          <li>• "Hey Nirmaan show attendance"</li>
          <li>• "Hey Nirmaan open itinerary"</li>
          <li>• "Hey Nirmaan go to tasks"</li>
        </ul>
      </div>
    </>
  );
}