import { useState, type FormEvent } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import { validateSignup } from "../utils/validator";
import toast from "react-hot-toast";

const Signup = () => {
    const { login, isAuthenticated } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    if (isAuthenticated) {
        navigate('/')
        return null;
    }

    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { valid, errors } = validateSignup({
            firstName,
            lastName,
            email,
            password,
        })

        if (!valid) {
            const firstError = Object.values(errors)[0];
            toast.error(firstError || "Invalid input");
            return;
        }

        try {
            toast.loading("Creating account...", { id: "signup" });
            let res = await axios.post('http://ec2-13-201-98-117.ap-south-1.compute.amazonaws.com:3000/auth/signup',
                {
                    firstName,
                    lastName,
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            res = await axios.post('/api/auth/login',
                {
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            let token = res.data.data.accessToken;
            if (!token) {
                throw new Error("Token not received");
            }
            login({
                email,
            }, token)

            toast.success("Account created successfully!", { id: "signup" });
            navigate('/');


        } catch (err: any) {
            console.error(err);
            const message = err.response?.data?.message || "Signup failed";
            toast.error(message, { id: "signup" });
        }
    }

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans">

            <div className="hidden md:flex items-end bg-linear-to-br from-sky-200 via-sky-100 to-white p-16">
                <h1 className="text-5xl leading-tight text-slate-800">
                    <span className="block mb-2 font-bold text-black">Welcome.</span>
                    <span className="font-semibold text-gray-700">
                        Begin your cinematic adventure now with our ticketing platform!
                    </span>
                </h1>
            </div>


            <div className="flex items-center justify-center px-6 py-12 md:py-0">
                <div className="w-full max-w-md">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-center md:text-left">Register Here</h2>

                    <form
                        className="space-y-4"
                        onSubmit={(e) => {
                            handleSignup(e)
                        }}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-1 text-gray-600">First Name</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First Name"
                                    className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1 text-gray-600">Last Name</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last Name"
                                    className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm mb-1 text-gray-600">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Your Email"
                                className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>


                        <div>
                            <label className="block text-sm mb-1 text-gray-600">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Password"
                                    className="w-full rounded-2xl border border-gray-300 px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                    {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                                </button>
                            </div>
                        </div>


                        <button
                            type="submit"
                            className="w-full text-lg mt-4 bg-blue-600 text-white py-2.5 rounded-2xl font-medium hover:bg-blue-100 hover:text-blue-600 transition-all duration-150 ease-in cursor-pointer shadow-sm"
                        >
                            Sign Up
                        </button>
                    </form>


                    <p className="text-sm text-center text-gray-400 mt-8">
                        Already Have An Account?{" "}
                        <a
                            className="text-blue-500 hover:underline cursor-pointer font-medium"
                            onClick={() => navigate('/login')}
                        >
                            Login Here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;