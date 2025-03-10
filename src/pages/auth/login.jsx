import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formdata, setFormdata] = useState(initialState);
  const dispatch = useDispatch();
  function onSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(formdata)).then((data) => {
      if (data?.payload?.success) {
        console.log(data);
        toast.success(data?.payload?.msg);
      } else {
        toast.error(data?.payload?.msg);
      }
    });
  }
  return (
    <>
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Sign In To Your Account
          </h1>
          <p className="mt-2">
            Don't have an account
            <Link
              className="font-medium ml-2 text-primary hover:underline"
              to="/auth/register"
            >
              Register
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Log In"}
          formData={formdata}
          setFormData={setFormdata}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
}

export default AuthLogin;
