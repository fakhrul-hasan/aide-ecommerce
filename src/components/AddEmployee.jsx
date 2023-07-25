"use client";
import { Controller, useForm } from "react-hook-form";

const img_hosting_token = process.env.NEXT_PUBLIC_img_token;

const AddEmployee = () => {
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const file = data.employeeImage;
    const formData = new FormData();
    formData.append("image", data.employeeImage);
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const {
            name,
            mobile,
            email,
            role,
            plan,
          } = data;
          const newItem = {
            name,
            image: imgURL,
            mobile,
            email,
            role,
            plan,
            status: 'pending',
          };
          try {
            const response = fetch('/api/postData', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newItem),
            });
      
            if (response.ok) {
              const data = response.json();
              console.log(data.message);
            } else {
              console.error('Failed to post data:', response.status);
            }
          } catch (error) {
            console.error('Error posting data:', error);
          }
        }
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-center mt-4">
      <div className="flex gap-2 w-full">
        <div className="w-1/2">
          <label className="label">
            <span className="label-text">Employee Name</span>
          </label>
          <input
            type="text"
            placeholder="Employee Name"
            className="input input-bordered input-accent w-full"
            {...register("name", { required: true })}
          />
          {errors.name && <span className="text-red-600">Employee Name is required</span>}
        </div>
        <div className="w-1/2">
          <label className="label">
            <span className="label-text">Employee Image</span>
          </label>
          <Controller
            name="employeeImage"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <input
                className="file-input file-input-bordered w-full"
                type="file"
                onChange={(e) => field.onChange(e.target.files[0])}
              />
            )}
          />
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <div className="w-1/2">
          <label className="label">
            <span className="label-text">Mobile No.</span>
          </label>
          <input
            type="tel"
            placeholder="Mobile No."
            className="input input-bordered input-accent w-full"
            {...register("mobile", { required: true })}
          />
          {errors.mobile && <span className="text-red-600">Invalid Mobile Number</span>}
        </div>
        <div className="w-1/2">
          <label className="label">
            <span className="label-text">Employee Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered input-accent w-full"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="text-red-600">Email is required</span>}
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <div className="w-1/2 mt-4">
          <select className="select select-bordered select-accent w-full max-w-xs" {...register("role")} defaultValue='Select a role'>
            <option disabled>
              Select a role
            </option>
            <option value='Admin'>Admin</option>
            <option value='Editor'>Editor</option>
            <option value='Author'>Author</option>
            <option value='Maintainer'>Maintainer</option>
            <option value='Subscriber'>Subscriber</option>
          </select>
        </div>
        <div className="w-1/2 mt-4">
          <select className="select select-bordered select-accent w-full max-w-xs" {...register("plan")} defaultValue='Select a plan'>
            <option disabled>
              Select a plan
            </option>
            <option value='Enterprise'>Enterprise</option>
            <option value='Team'>Team</option>
            <option value='Company'>Company</option>
            <option value='Basic'>Basic</option>
          </select>
        </div>
      </div>
      <input
        type="submit"
        value="Add Employee"
        className="bg-[#008ecc] hover:scale-105 hover:duration-200 hover:transition-all text-white mt-4 px-8 py-4 rounded-3xl w-1/2 cursor-pointer font-semibold text-lg hover:ease-in-out"
      />
    </form>
  );
};

export default AddEmployee;
