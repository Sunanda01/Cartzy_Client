import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formdata, setFormdata] = useState(initialState);
  // const {isAuthenticated,user}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  // const navigate=useNavigate();
  // useEffect(()=>{
  //   if(user.role==='admin'){
  //     navigate("/admin/dashboard");
  //   }
  //   else{
  //     navigate("/shop/home");
  //   }
  // },[isAuthenticated,user,navigate])

  function onSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(formdata)).then((data) => {
      if (data?.payload?.success) {
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
