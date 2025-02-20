
import ForgotPassword from "@/components/site/forgot-password";

const ForgotPasswordPage = async () => {

  return (
    <div className="h-screen flex items-center justify-center">
      <div
        className="w-1/2 h-3/5 p-5 justify-center items-center"
      >
        <ForgotPassword/>
      </div>
    </div>
  )
}

export default ForgotPasswordPage;