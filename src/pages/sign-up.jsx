import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { SimpleFooter } from "@/widgets/layout";
import axios from "axios";
import { useRef, useState } from "react";
import { Toast } from 'primereact/toast';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
export function SignUp() {

  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  const toast = useRef(null);

  const handleSubmit = async() => {
   const data = {
    email:email,
    password:password,
    firstName:name
   }
   const resp = await axios.post("http://localhost:5050/api/user",data)
   if(resp.data.responseStatus === "success"){
    toast.current.show({severity:'success', summary: 'Success', detail:resp.data.responseMsg, life: 3000});
   }else {
      toast.current.show({severity:'error', summary: 'error', detail:resp.data.responseMsg, life: 3000});
   }
   console.log("resp",resp);

  }

  console.log("name",name);
  return (
    <>
    <Toast ref={toast} />
      <img
        src="/img/background-2.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input variant="standard" value={name}
              onChange={(e)=>setName(e.target.value)} label="Name" size="lg" />
            <Input variant="standard" value={email}
              onChange={(e)=>setEmail(e.target.value)} type="email" label="Email" size="lg" />
            <Input
              variant="standard"
              type="password"
              label="Password"
              size="lg"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <div className="-ml-2.5">
              <Checkbox label="I agree the Terms and Conditions" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleSubmit} fullWidth>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
      <div className="container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <SimpleFooter />
      </div>
    </>
  );
}

export default SignUp;
