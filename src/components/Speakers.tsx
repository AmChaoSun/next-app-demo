import { SpeakerFilterProvider } from "../contexts/SpeakerFilterContext";
import SpeakersList from "./SpeakersList";
import SpeakersToolbar from "./SpeakersToolbar";

const Speakers = () => {
  return (
    <SpeakerFilterProvider
      startingShowSessions={false}
      startingEventYear="2019"
    >
      <SpeakersToolbar />
      <SpeakersList />
    </SpeakerFilterProvider>
  );
};

export default Speakers;
