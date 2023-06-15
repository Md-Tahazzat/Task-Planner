import React from "react";
import UpdateTitle from "../Hooks/UpdateTitle";
import { useQuery } from "react-query";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import UseAuthcontext from "../Hooks/UseAuthcontext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const AllTaks = () => {
  const { user } = UseAuthcontext();
  const axiosInstance = UseAxiosSecure();
  const {
    data: tasks = [],
    refetch,
    isLoading,
  } = useQuery(["tasks", 5], async () => {
    return axiosInstance.get(`/tasks?email=${user.email}`).then((res) => res);
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/tasks/${id}`).then((result) => {
          if (result.deletedCount > 0) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "success",
              text: "delete successfull",
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };
  const handleUpdate = () => {};
  return (
    <div className="mx-4 md:mx-auto">
      <UpdateTitle title="Tasks"></UpdateTitle>
      <h1 className="text-slate-700 dark:text-slate-300 text-2xl font-bold md:text-3xl text-center mt-6">
        All Task
      </h1>
      <div className="max-w-4xl  md:mx-auto w-full mb-20 mt-10">
        {tasks.map((task, indx) => (
          <div
            key={indx}
            className="border mt-5 px-4 rounded-md text-base border-slate-400/60 md:py-5 text-slate-800 dark:text-slate-200 bg-slate-300 dark:bg-slate-700"
          >
            <h1 className="text-center">{task.title}</h1>
            <h1 className="">Description:-{task.description}</h1>
            <h1>status: {task.status}</h1>
            <div className="flex items-center justify-center gap-10 my-5">
              <Link
                to={`/update/${task._id}`}
                className="py-1 px-3 bg-orange-400 rounded  text-slate-50 hover:bg-orange-500 duration-200 shadow-lg"
              >
                Update
              </Link>
              <button
                onClick={() => handleDelete(task._id)}
                className="py-1 px-3 bg-red-500 rounded  text-slate-50 hover:bg-red-600 duration-200 shadow-lg"
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTaks;
