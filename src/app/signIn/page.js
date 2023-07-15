import { Toaster } from "react-hot-toast";
import LoginForm from "./LoginForm";


const page = () => {
    return (
      <>
      <div>
            <h3 className='font-bold text-center text-5xl'>Login Now</h3>
        </div>
          <LoginForm />
          <Toaster
  position="top-center"
  reverseOrder={false}
/>
      </>
    );
};

export default page;