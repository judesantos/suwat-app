import Link from "next/link";

const ConfirmationPage = async ({params}:{params:{email:string}}) => {

  let email = '';
  let info = <></>;
  console.log({ConfirmationPage: params})

  if (0 === params.email.indexOf("NOT-FOUND")) {
    const split = params.email.split('_');
    email = decodeURIComponent(split[1]);
    info = (
      <><p>
        Sorry, email address
        <span className="underline underline-offset-4 font-medium">
          {` ${email} `}
        </span> 
        is not enrolled with us.
      </p></>
    )
  } else {
    email = decodeURIComponent(params.email);
    info = (
      <><p>
        Email address
        <span className="underline underline-offset-4 font-medium">
          {` ${email} `}
        </span> 
        found,
        you should receive an email from us very soon.
      </p>
      <p> 
        If no email is received after waiting a few minutes
        please check your junk or spam box, or try our 
        <Link
          className="text-blue-500 font-medium"
          href={"/faq"}
        >
          {" Email FAQs & troubleshooting page."} 
        </Link>
      </p></>
    )
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div
        className="w-4/5 h-3/5 p-5 justify-center items-center"
      >
        <div 
          className="w-full space-y-6 text-center"
        >
          <div className="text-3xl">
            <span
              className="h-full font-extrabold"
            >
              {"Password "}
            </span>Recovery
          </div>
          <div
            className="text-left m-20 space-y-4"
          >
            {info}
            <p> 
              If you are not sure which email you have used on your suwat.com account, 
              or you are not sure what account you are associated with? Contact us at 
              <Link
                className="text-blue-500 font-medium"
                href={"/faq"}
              >
                {" support@yourtechy.com"} 
              </Link>
            </p>
            <p>
              {"Do you remember the password? - "}
              <Link
                className="text-blue-500 font-medium"
                href={"/sign-in"}
              >
                Go Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;