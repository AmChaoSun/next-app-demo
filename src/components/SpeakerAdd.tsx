import { Speaker } from "../../SpeakerData";

interface SpeakerAddProps {
  eventYear: string;
  insertRecord: (speaker: Speaker) => void;
}

export const SpeakerAdd = ({ eventYear, insertRecord }: SpeakerAddProps) => {
  return (
    <a href="#" className="addSes">
      <i
        onClick={(e) => {
          e.preventDefault();
          const firstLast = window.prompt("Enter first and last name:", "");
          const firstLastArray = firstLast!.split(" ");
          insertRecord({
            id: "99999",
            first: firstLastArray[0],
            last: firstLastArray[1],
            bio: "Bio not entered yet",
            sessions: [
              {
                id: "88888",
                title: `New Session For ${firstLastArray[0]}`,
                room: {
                  name: "Main Ball Room",
                  capacity: 0,
                },
                eventYear,
              },
            ],
            company: "",
            twitterHandle: "",
            favorite: false,
          });
        }}
      >
        +
      </i>
    </a>
  );
};
