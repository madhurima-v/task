import { Button, Input } from "antd";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const [userExistsError, setUserExistsError] = useState("");
  const navigate = useNavigate();

  const base64Encode = (data) => {
    return btoa(JSON.stringify(data));
  };

  const base64Decode = (data) => {
    return JSON.parse(atob(data));
  };

  const onSubmit = (e) => {
    const userData = {
      username: e.username,
      email: e.email,
      password: e.password,
    };

    try {
      const userExists = localStorage.getItem("userData");
      let usersArray = [];

      if (userExists) {
        try {
          usersArray = base64Decode(userExists) || [];
        } catch (error) {
          console.error("Error decoding user data:", error);
        }
      }

      const userAlreadyExists = usersArray.some(
        (user) =>
          user.username === userData.username &&
          user.email === userData.email &&
          user.password === userData.password
      );

      if (userAlreadyExists) {
        setUserExistsError("User already Exist. Please Login.");
        return;
      }

      usersArray.push(userData);
      localStorage.setItem("userData", base64Encode(usersArray));

      setUserExistsError("");
      navigate("/Login");
    } catch (error) {
      console.error("Signup Error:", error);
      setUserExistsError("An error occurred during signup. Please try again.");
    }
  };

  return (
    <>
      <section className="h-screen w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-[60vh] md:h-screen flex items-center justify-center">
          <img
            src="src/assets/image.jpg"
            className="w-full h-full object-cover"
            alt="brand-img"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 md:p-8 h-full">
          <div className="w-[350px] md:w-[450px] h-[140px] md:h-[180px] mb-6">
            <img src="src/assets/ShipcomLogo.png" alt="brand-logo" />
          </div>
          <form className="flex flex-col justify-center items-center w-full max-w-[320px] space-y-7">
            <>
              <Controller
                control={control}
                name="username"
                rules={{ required: "Username is required!" }}
                render={({ field: { onChange, value } }) => (
                  <div className="relative w-full flex flex-col">
                    <Input
                      onChange={onChange}
                      className={`w-full border-gray-400 transition-all ${
                        errors?.username?.message
                          ? "!border-red-500 hover:!border-red-500"
                          : ""
                      }`}
                      value={value}
                    />
                    <label
                      className={`absolute text-violet-950 scale-75 transition-transform transform -translate-y-[120%] left-1 top-4 bg-white ${
                        errors?.username?.message ? "!text-red-500" : ""
                      } `}
                    >
                      Username
                    </label>

                    {errors.username && (
                      <p className="text-red-600 text-sm mt-1 text-left">
                        {errors.username.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                control={control}
                name="email"
                rules={{ required: "Email ID is required!" }}
                render={({ field: { onChange, value } }) => (
                  <div className="relative w-full flex flex-col">
                    <Input
                      onChange={onChange}
                      className={`w-full border-gray-400  transition-all ${
                        errors?.email?.message
                          ? "!border-red-500 hover:!border-red-500"
                          : ""
                      }`}
                      value={value}
                    />
                    <label
                      className={`absolute text-violet-950 scale-75 transition-transform transform -translate-y-[120%] left-1 top-4 bg-white ${
                        errors?.email?.message ? "!text-red-500" : ""
                      } `}
                    >
                      Email ID
                    </label>

                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1 text-left">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                control={control}
                name="password"
                rules={{ required: "Password is required!" }}
                render={({ field: { onChange, value } }) => (
                  <div className="relative w-full flex flex-col">
                    <Input.Password
                      onChange={onChange}
                      className={`w-full border-gray-400 transition-all ${
                        errors?.password?.message
                          ? "!border-red-500 hover:!border-red-500"
                          : ""
                      }`}
                      value={value}
                    />
                    <label
                      className={`absolute text-violet-950 scale-75 transition-transform transform -translate-y-[120%] left-1 top-4 z-10 bg-white ${
                        errors?.password?.message ? "!text-red-500" : ""
                      } `}
                    >
                      Password
                    </label>

                    {errors.password && (
                      <p className="text-red-600 text-sm mt-1 text-left">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </>

            {userExistsError && (
              <p className="text-red-600 text-sm">
                User already Exist. Please{" "}
                <Link to="/Login" className="underline">
                  Login.
                </Link>
              </p>
            )}
            <Button
              onClick={handleSubmit(onSubmit)}
              className="bg-violet-600 hover:!bg-violet-500  hover:!text-white focus:!ring focus:!ring-violet-300 focus:!outline-none border-0  text-white w-full mt-8"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
