import { createContext, ReactNode } from "react";
import { useSpeakerFilter } from "../hooks/useSpeakerFilter";

interface SpeakerFilterContextInterface {
  showSessions: boolean;
  setShowSessions: Function;
  eventYear: string;
  setEventYear: Function;
  searchQuery: string;
  setSearchQuery: Function;
  EVENT_YEARS: string[];
}
export const SpeakerFilterContext =
  createContext<SpeakerFilterContextInterface>(
    {} as SpeakerFilterContextInterface
  );

interface SpeakerFilterProviderProps {
  children: ReactNode;
  startingShowSessions: boolean;
  startingEventYear: string;
}
export const SpeakerFilterProvider = ({
  children,
  startingShowSessions,
  startingEventYear,
}: SpeakerFilterProviderProps) => {
  const {
    showSessions,
    setShowSessions,
    eventYear,
    setEventYear,
    searchQuery,
    setSearchQuery,
    EVENT_YEARS,
  } = useSpeakerFilter(startingShowSessions, startingEventYear);

  return (
    <SpeakerFilterContext.Provider
      value={{
        showSessions,
        setShowSessions,
        eventYear,
        setEventYear,
        searchQuery,
        setSearchQuery,
        EVENT_YEARS,
      }}
    >
      {children}
    </SpeakerFilterContext.Provider>
  );
};
