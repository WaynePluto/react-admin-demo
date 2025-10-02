import { useLoaderData } from "react-router-dom";
import { CountProvider, useCountDispatch, useCountState } from "./hooks/useCount";
import { Button } from "antd";
import { useEffect } from "react";
import { templateClient } from "@/api/template";

export function Template() {
  const { page } = useLoaderData() as { page: string };

  console.log(`page:${page}`);
  const init = async () => {
    const res = await templateClient.page.$post({ json: { page: 1, pageSize: 1 } });
    const resJSON = await res.json();
    console.log("====resJSON:", resJSON);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <CountProvider initialCount={0}>
      <div className="flex flex-col items-center">
        <span>Hello world! Template page: {page}.</span>
        <Consumer></Consumer>
        <AddCountCom></AddCountCom>
      </div>
    </CountProvider>
  );
}

function Consumer() {
  const { count } = useCountState();
  return <span className="text-count">{count}</span>;
}
function AddCountCom() {
  const { addCount } = useCountDispatch();
  return (
    <Button className="btn-add-count" onClick={e => addCount()}>
      Add Count
    </Button>
  );
}
