import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formdata, setFormdata] = useState(initialState);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  function onSubmit(e) {
    e.preventDefault();
    dispatch(registerUser(formdata)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.msg);
      }
      else{
        toast.error(data?.payload?.msg);
      }
    });
  }
  return (
    <>
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Create new account
          </h1>
          <p className="mt-2">
            Already have an account
            <Link
              className="font-medium ml-2 text-primary hover:underline"
              to="/auth/login"
            >
              Login
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formdata}
          setFormData={setFormdata}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
}

export default AuthRegister;
