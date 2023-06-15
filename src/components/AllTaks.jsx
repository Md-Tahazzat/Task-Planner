import React from "react";
import UpdateTitle from "../Hooks/UpdateTitle";
import { useQuery } from "react-query";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import UseAuthcontext from "../Hooks/UseAuthcontext";

const AllTaks = () => {
  const { user } = UseAuthcontext();
  const axiosInstance = UseAxiosSecure();
  const { data: tasks = [] } = useQuery(["tasks", 5], async () => {
    axiosInstance
      .get(`/tasks?email=${user.email}`)
      .then((res) => console.log(res));
  });
  console.log(tasks);
  return (
    <div>
      <UpdateTitle title="Home"></UpdateTitle>
      <h1 className="">from all task</h1>
    </div>
  );
};

export default AllTaks;
