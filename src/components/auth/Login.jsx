import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-2xl p-8"
        >
          <h1 className="font-extrabold text-3xl text-center mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm text-center mb-6">
            Login to continue exploring jobs 🚀
          </p>

          {/* Email */}
          <div className="mb-4">
            <Label className="text-sm font-medium">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="you@example.com"
              className="mt-1"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label className="text-sm font-medium">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="••••••••"
              className="mt-1"
            />
          </div>

          {/* Role selection */}
          <div className="flex items-center justify-between gap-4 my-5">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="accent-blue-600"
              />
              <span className="text-sm">Student</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="accent-indigo-600"
              />
              <span className="text-sm">Recruiter</span>
            </label>
          </div>

          {/* Submit button */}
          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}

          {/* Footer */}
          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-medium">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
