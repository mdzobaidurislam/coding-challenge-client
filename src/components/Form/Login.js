import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { env } from "../../env";
const Login = () => {
  const [loading, setSetloading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitForm = async ({ email, password }) => {
    setSetloading(true);

    try {
      const response = await axios.post(`${env.baseUrl}/api/signin`, {
        email,
        password,
      });
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/");
      }
      setSetloading(false);
    } catch (error) {
      setSetloading(false);
      toast.error(error.response.data.message);
      console.error(error);
    }
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-5 m-auto">
          <div className="card shadow-lg border-1 p-5 ">
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <h4 className="card-title mb-3">Welcome back ! Please login</h4>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  {...register("email", {
                    required: "Please enter email",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: "Please enter valid email",
                    },
                  })}
                  placeholder="Enter email"
                />
                {errors.email && (
                  <div className="text-danger">{errors.email.message}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  {...register("password", {
                    required: "Please enter password",
                    minLength: {
                      value: 6,
                      message: "password is more than 5 chars",
                    },
                  })}
                  placeholder="Enter password"
                />
                {errors.password && (
                  <div className="text-danger">{errors.password.message}</div>
                )}
              </div>

              <div className="mb-3 mt-3">
                <button
                  type="submit"
                  className="btn btn-outline-secondary btn-lg w-100"
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </div>
              <div className="mb-4 ">
                Don&apos;t have an account? &nbsp;
                <Link to={`/register`}>Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
