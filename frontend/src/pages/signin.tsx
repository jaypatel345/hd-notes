import Container from "../components/Container";
import SignInForm from "../components/SignInForm";

function Signin() {
  const handleSignUp = (data: any) => {
    console.log("User signed up:", data);
  };

  const handleSwitchToSignIn = () => {
    console.log("Switch to Sign In");
  };

  return (
    <div className="flex min-h-screen h-full">
      <div className="flex-1 flex justify-center items-center bg-white h-screen">
        <SignInForm onSubmit={handleSignUp} onSwitchToSignIn={handleSwitchToSignIn} />
      </div>
      <div className="flex-1 hidden md:block">
        <Container />
      </div>
    </div>
  );
}

export default Signin;