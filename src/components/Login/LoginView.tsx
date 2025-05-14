import Link from "next/link";
import GoogleLogin from "../Buttons/GoogleLogin";

const LoginView = () => {
    
return (
    <>

    <form
            className="flex flex-col gap-3  items-center shadow-2xl rounded-lg"
            >
            <p className=" font-semibold mb-6">
                Sign In
            </p>

            <div>
        <label>Email</label>
        <br />
        <input
    type="email"
    name="email"
    placeholder="Email"/>
        </div>

            <div className="mt-4">
        <label>Password</label>
        <br />
        <input
    type="password"
    name="password"
    placeholder="Password"/>
        </div>
            <li className="list-none">
                <Link
                href="/terminos"
                className="mt-4"
                >
                Forgot your password?
                </Link>
            </li>
            <li className="list-none">
                <Link
                href="/register"
                className="mt-4"
                >
                You dont have an account yet
                </Link>
            </li>
            <button
                type="submit"
            >
                Log In
            </button>
            <GoogleLogin/>
            </form>
    </>
)

}

export default LoginView;