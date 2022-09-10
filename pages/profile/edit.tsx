import useUser from "@libs/client/useUser";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/button";
import Input from "../../components/input";
import Layout from "../../components/layout";

interface EditProfileForm {
  email?: string;
  phone?: string;
  formErrors?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser({ isPublic: false });
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditProfileForm>();
  useEffect(() => {
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
  }, [user, setValue]);

  const onValid = (form: EditProfileForm) => {
    console.log(form);
    if (form.email === "" && form.phone === "") {
      setError("formErrors", {
        message: "Email or PhoneNumber are required. You need choose one.",
      });
    }
  };
  return (
    <Layout canGoBack title="Edit Profile">
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register("email")}
          required={false}
          label="Email address"
          name="email"
          type="email"
        />
        <Input
          register={register("phone")}
          required={false}
          label="Phone number"
          name="phone"
          type="number"
          kind="phone"
        />
        {errors.formErrors ? (
          <span className="mt-2 text-red-500 font-bold block">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button text="Update profile" />
      </form>
    </Layout>
  );
};

export default EditProfile;
