import { createContext, ReactNode } from "react";
import { Speaker } from "../../SpeakerData";

interface SpeakerContextProps {
  speaker: Speaker;
  updateRecord: (speaker: Speaker) => void;
  deleteRecord: (speaker: Speaker) => void;
}
export const SpeakerContext = createContext<SpeakerContextProps>(
  {} as SpeakerContextProps
);

interface SpeakerContextProviderProps extends SpeakerContextProps {
  children: ReactNode;
}
export const SpeakerContextProvider = ({
  children,
  speaker,
  updateRecord,
  deleteRecord,
}: SpeakerContextProviderProps) => {
  return (
    <SpeakerContext.Provider value={{ speaker, updateRecord, deleteRecord }}>
      {children}
    </SpeakerContext.Provider>
  );
};
