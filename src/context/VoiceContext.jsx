import { createContext, useContext, useState } from "react";

const VoiceContext = createContext();

export const VoiceProvider = ({ children }) => {
  const [voiceAction, setVoiceAction] = useState(null);

  return (
    <VoiceContext.Provider value={{ voiceAction, setVoiceAction }}>
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => useContext(VoiceContext);
