import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import UseAuthcontext from "../Hooks/UseAuthcontext";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";

const UpdateTask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({});
  const { id } = useParams();
  const axiosInstance = UseAxiosSecure();

  useEffect(() => {
    axiosInstance.get(`/tasks/${id}`).then((res) => setTask(res));
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    Swal.fire({
      title: "Updating...",
      allowOutsideClick: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    const taskInfo = {
      title: data.title,
      description: data.description,
      status: data.status,
    };
    axiosInstance.put(`/tasks/${id}`, taskInfo).then((res) => {
      if (res.modifiedCount > 0) {
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "success",
          text: "successfully modified",
        });
        navigate("/");
      } else {
        Swal.close();
        navigate("/");
      }
    });
  };

  return (
    <div>
      <form
        className="border mt-10 mx-auto md:mt-16 md:min-w-[28rem] md:max-w-[42rem] p-4 w-full md:py-5 text-slate-800 dark:text-slate-200 md:px-20 bg-slate-300/90 dark:bg-slate-700/90 border-slate-300 dark:border-slate-600 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-2xl font-semibold ">Add your task</h1>
        <div className="w-full">
          <label htmlFor="title" className="label">
            Title:
          </label>
          <input
            defaultValue={task?.title}
            type="text"
            id="title"
            required
            {...register("title", { required: true })}
            placeholder="Enter task title"
            className="py-2 px-2 bg-slate-100/60 dark:bg-slate-500/60 rounded-md border dark:border-slate-500 border-slate-300 focus:outline-none focus:border-slate-400 w-full max-w-lg"
          />
        </div>
        <div className="w-full mt-4">
          <label className="description" htmlFor="password">
            Description:
          </label>
          <textarea
            defaultValue={task?.description}
            className="py-2 px-2 mt-1 h-32 bg-slate-100/60 dark:bg-slate-500/60 rounded-md border dark:border-slate-500 border-slate-300 focus:outline-none focus:border-slate-400 w-full max-w-lg"
            {...register("description")}
            id="description"
          ></textarea>
        </div>
        <div className="w-full">
          <label htmlFor="status" className="label">
            status:
          </label>
          <input
            defaultValue={task?.status}
            type="text"
            id="status"
            required
            {...register("status", { required: true })}
            placeholder="Enter status"
            className="py-2 px-2 bg-slate-100/60 dark:bg-slate-500/60 rounded-md border dark:border-slate-500 border-slate-300 focus:outline-none focus:border-slate-400 w-full max-w-lg"
          />
        </div>
        <input
          className="w-full max-w-lg mt-6 py-2 bg-orange-400 rounded  text-slate-50 hover:bg-orange-500 duration-200 shadow-lg"
          type="submit"
          value="Update Task"
        />
      </form>
    </div>
  );
};

export default UpdateTask;
