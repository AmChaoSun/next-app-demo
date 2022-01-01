import { useState, useEffect } from "react";
import axios from "axios";

export enum RequestStatus {
  Loading = "loading",
  Success = "success",
  Failure = "failure",
}

interface Record {
  id: string | number;
}

const restUrl = "api/speakers";

const useRequestRest = () => {
  const [data, setData] = useState<Record[]>([]);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    RequestStatus.Loading
  );
  const [error, setError] = useState("");

  useEffect(() => {
    const delayFunc = async () => {
      try {
        const result = await axios.get(restUrl);
        // throw "Manual Error";
        setData(result.data);
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
  }, []);

  const updateRecord = async (record: Record) => {
    const originalRecords = [...data];
    const newRecords = data.map((rec) => (rec.id === record.id ? record : rec));
    const delayFunction = async () => {
      try {
        setData(newRecords);
        await axios.put(`${restUrl}/${record.id}`, record);
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

  const insertRecord = async (record: Record) => {
    const originalRecords = [...data];
    const newRecords = [record, ...data];
    const delayFunction = async () => {
      try {
        setData(newRecords);
        await axios.post(`${restUrl}/${record.id}`, record);
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

  const deleteRecord = async (record: Record) => {
    const originalRecords = [...data];
    const newRecords = data.filter((rec) => rec.id !== record.id);
    const delayFunction = async () => {
      try {
        setData(newRecords);
        await axios.delete(`${restUrl}/${record.id}`);
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

export default useRequestRest;
