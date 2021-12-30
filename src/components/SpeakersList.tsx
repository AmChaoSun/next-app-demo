import SpeakerCard from "./SpeakerCard";
import ReactPlaceHolder from "react-placeholder";
import useRequestDelay, { RequestStatus } from "../hooks/useRequestDelay";
import { data as speakersData, Speaker } from "../../SpeakerData";
import { useContext } from "react";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";
import { SpeakerAdd } from "./SpeakerAdd";

const SpeakersList = () => {
  const {
    data,
    requestStatus,
    error,
    updateRecord,
    insertRecord,
    deleteRecord,
  } = useRequestDelay(2000, speakersData);

  const { searchQuery, eventYear } = useContext(SpeakerFilterContext);

  if (requestStatus === RequestStatus.Failure) {
    return (
      <div className="text-danger">
        Error: <b>loading Speaker Data Failed {error}</b>
      </div>
    );
  }

  return (
    <div className="container speaker-list">
      <ReactPlaceHolder
        type="media"
        rows={15}
        className="speakerslist-placeholder"
        ready={requestStatus === RequestStatus.Success}
      >
        <SpeakerAdd eventYear={eventYear} insertRecord={insertRecord} />
        <div className="row">
          {(data as Speaker[])
            .filter(
              (speaker) =>
                speaker.first
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                speaker.last.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .filter((speaker) =>
              speaker.sessions.some((s) => s.eventYear === eventYear)
            )
            .map((speaker) => {
              return (
                <SpeakerCard
                  key={speaker.id}
                  speaker={speaker}
                  updateRecord={updateRecord}
                  deleteRecord={deleteRecord}
                />
              );
            })}
        </div>
      </ReactPlaceHolder>
    </div>
  );
};

export default SpeakersList;
