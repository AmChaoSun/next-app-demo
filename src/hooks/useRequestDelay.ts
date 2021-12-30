import { useState, useEffect } from "react";

export enum RequestStatus {
  Loading = "loading",
  Success = "success",
  Failure = "failure",
}

interface Record {
  id: string | number;
}

const useRequestDelay = (delayTime: number, initialData: Record[]) => {
  const [data, setData] = useState<Record[]>(initialData);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    RequestStatus.Loading
  );
  const [error, setError] = useState("");

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const delayFunc = async () => {
      try {
        await delay(delayTime);
        // throw "Manual Error";
        setData(data);
        setRequestStatus(RequestStatus.Success);
      } catch (error: unknown) {
        setRequestStatus(RequestStatus.Failure);
        if (typeof error === "string") {
          setError(error);
        } else if (error instanceof Error) {
          setError(error.message);
        }
      }
    };
    delayFunc();
  }, [delayTime, data]);

  const updateRecord = (record: Record) => {
    const originalRecords = [...data];
    const newRecords = data.map((rec) => (rec.id === record.id ? record : rec));
    const delayFunction = async () => {
      try {
        setData(newRecords);
        await delay(delayTime);
        // throw "Manual Error";
        // if (doneCallback) {
        //   doneCallback();
        // }
      } catch (error) {
        console.log(error);
        // if (doneCallback) {
        //   doneCallback();
        // }
        setData(originalRecords);
      }
    };
    delayFunction();
  };

  const insertRecord = (record: Record) => {
    const originalRecords = [...data];
    const newRecords = [...data, record];
    const delayFunction = async () => {
      try {
        setData(newRecords);
        await delay(delayTime);
        // throw "Manual Error";
        // if (doneCallback) {
        //   doneCallback();
        // }
      } catch (error) {
        console.log(error);
        // if (doneCallback) {
        //   doneCallback();
        // }
        setData(originalRecords);
      }
    };
    delayFunction();
  };

  const deleteRecord = (record: Record) => {
    const originalRecords = [...data];
    const newRecords = data.filter((rec) => rec.id !== record.id);
    const delayFunction = async () => {
      try {
        setData(newRecords);
        await delay(delayTime);
        // throw "Manual Error";
        // if (doneCallback) {
        //   doneCallback();
        // }
      } catch (error) {
        console.log(error);
        // if (doneCallback) {
        //   doneCallback();
        // }
        setData(originalRecords);
      }
    };
    delayFunction();
  };

  return {
    data,
    requestStatus,
    error,
    updateRecord,
    insertRecord,
    deleteRecord,
  };
};

export default useRequestDelay;
