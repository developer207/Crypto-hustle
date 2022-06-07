import { Button, TextField } from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/context";
import { auth } from "../firebase";
// import { useDispatch, useSelector } from "react-redux";

const textFild = {
  width: "100%",
};
// interface props{
//     buttonName: string,
//     already:string
// }

// interface inputData{
//     email: string,
//     password: string,
//     picture: string,
//     name:string
// }
const SignUp = ({ buttonName, already,handleFlag }) => {
  const {signUp,user} = useContext(AuthContext);
  const [pic, setPic] = useState("");
  const [userData, setUserData] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  // const dispatch = useDispatch()
  //const store=useSelector(selectUser)

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData((items) => ({ ...items, [name]: value }));
  };

  const uploadPic = (pics) => {
    if (pics) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ashok21");
      data.append("cloud_name", "zarmariya");
      fetch("https://api.cloudinary.com/v1_1/zarmariya/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          // userData.picture=data.url.toString()
          console.log(data.url.toString());
        });
    } else {
      console.log("error");
    }
  };

  class users {
    constructor(e, p) {
      this.email = e;
      this.password = p;
    }
  }

  const handleSubmit = async() => {
    const data = new users(userData.email, userData.password);
    signUp(data.email, data.password)
    
  };

  return (
    <div className="flex flex-col items-center p-10 justify-center ">
      <h1 className="pb-5 text-md lg:text-3xl font-semibold text-white">
        Make the most of your professional life
      </h1>

      <div className="bg-white shadow-xl w-full lg:w-[27%] p-10 flex items-center flex-col rounded-md">
        <div className="pb-5">
          <h1 className="font-bold text-2xl">{buttonName}</h1>
        </div>

        <div className="lg:w-full pb-5">
          <InputLabel sx={{ mb: "1rem" }}>Email</InputLabel>
          <TextField
            onChange={handleOnChange}
            name={"email"}
            value={userData.email || ""}
            sx={textFild}
            placeholder="Email"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="lg:w-full pb-5">
          <InputLabel sx={{ mb: "1rem" }}>Password</InputLabel>
          <TextField
            onChange={handleOnChange}
            name="password"
            value={userData.password || ""}
            sx={textFild}
            size="small"
            placeholder="Password"
            type={"password"}
            variant="outlined"
          />
        </div>

        <div className="w-full pb-5">
          <Button
            onClick={handleSubmit}
            sx={{ width: "100%", padding: ".7rem", bgcolor: "blue" }}
            variant="contained"
            className="bg-blue-700 rounded-full"
          >
            {buttonName}
          </Button>

          {/* <Button variant="contained">Contained</Button> */}
        </div>
        <div className="w-full pb-5">
          <Button
            onClick={handleSubmit}
            sx={{ width: "100%", padding: ".7rem" }}
            variant="contained"
            className="bg-blue-700 rounded-full"
          >
            Continue With Google
          </Button>
        </div>
        <div className="pt-5 text-center flex items-center">
          <p className="pr-2 text-sm lg:text-lg">
            if you have already acount ?
          </p>
          <h1
            onClick={handleFlag}
            className="text-sm lg:text-md font-semibold hover:cursor-pointer text-blue-900 hover:scale-95 transition-all hover:underline underline-offset-2 duration-100">
            {already}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
