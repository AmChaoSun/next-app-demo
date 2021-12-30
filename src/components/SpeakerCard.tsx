import { Room, Speaker } from "../../SpeakerData";
import Image from "next/image";
import { useContext, useState } from "react";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";
import {
  SpeakerContext,
  SpeakerContextProvider,
} from "../contexts/SpeakerContext";
import { SpeakerDelete } from "./SpeakerDelete";

interface SessionCardProps {
  title: string;
  room: Room;
}
const SessionCard = ({ title, room }: SessionCardProps) => {
  return (
    <span className="session w-100">
      {title} <strong>Room: {room.name}</strong>
    </span>
  );
};

const Sessions = () => {
  const { eventYear } = useContext(SpeakerFilterContext);
  const {
    speaker: { sessions },
  } = useContext(SpeakerContext);
  return (
    <div className="sessionBox card h-250">
      {sessions
        .filter((s) => s.eventYear === eventYear)
        .map((s) => {
          return (
            <div key={s.id} className="session w-100">
              {" "}
              <SessionCard {...s}></SessionCard>
            </div>
          );
        })}
    </div>
  );
};

const SpeakerImage = () => {
  const {
    speaker: { id, first, last },
  } = useContext(SpeakerContext);
  return (
    <div className="speaker-img d-flex flex-row justify-content-center align-items-center h-300">
      <Image
        className="contain-fit"
        width={300}
        height={300}
        src={`/images/speaker-${id}.jpg`}
        alt={`${first}${last}`}
      />
    </div>
  );
};

const SpeakerFavorite = () => {
  const { speaker, updateRecord } = useContext(SpeakerContext);

  const [inTransition, setInTransition] = useState(false);
  const doneCallback = () => {
    setInTransition(false);
  };
  return (
    <div className="action padB1">
      <span
        onClick={() => {
          setInTransition(true);
          updateRecord({ ...speaker, favorite: !speaker.favorite });
          doneCallback();
        }}
      >
        <i
          className={
            speaker.favorite ? "fa fa-star orange" : "fa fa-star-o orange"
          }
        />{" "}
        Favorite{" "}
        {inTransition ? (
          <span className="fas fa-circle-notch fa-spin"></span>
        ) : null}
      </span>
    </div>
  );
};

const SpeakerDemographics = () => {
  const { speaker } = useContext(SpeakerContext);
  const { first, last, company, bio, twitterHandle } = speaker;
  return (
    <div className="speaker-info">
      <div className="d-flex justify-content-between mb-3">
        <h3 className="text-truncate w-200">
          {first} {last}
        </h3>
      </div>
      <SpeakerFavorite />
      <div>
        <p className="card-description">{bio}</p>
        <div className="social d-flex flex-row mt-4">
          <div className="company">
            <h5>Company</h5>
            <h6>{company}</h6>
          </div>
          <div className="twitter">
            <h5>Twitter</h5>
            <h6>{twitterHandle}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SpeakerCardProps {
  speaker: Speaker;
  updateRecord: (speaker: Speaker) => void;
  deleteRecord: (speaker: Speaker) => void;
}
const SpeakerCard = ({
  speaker,
  updateRecord,
  deleteRecord,
}: SpeakerCardProps) => {
  const { showSessions } = useContext(SpeakerFilterContext);
  return (
    <SpeakerContextProvider
      speaker={speaker}
      updateRecord={updateRecord}
      deleteRecord={deleteRecord}
    >
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-sm-12 col-xs-12">
        <div className="card card-height p-4 mt-4">
          <SpeakerImage />
          <SpeakerDemographics />
        </div>
        {showSessions ? <Sessions /> : null}
        <SpeakerDelete />
      </div>
    </SpeakerContextProvider>
  );
};

export default SpeakerCard;
