import EnrollmentDialog from "@/components/account/new-account-form2";

const EnrollmentPage = async ({params}: {params: {email: string}}) => {

  return (
    <div
      className="h-screen flex items-center justify-center relative"
    >
      <EnrollmentDialog {...params}/>
    </div>
  )
}

export default EnrollmentPage;
