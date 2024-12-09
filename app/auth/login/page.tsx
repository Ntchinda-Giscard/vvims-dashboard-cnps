"use client"
import Image from "next/image";
import pic from "@/public/assets/image.png"
import cx from "clsx"
import { Poppins } from "next/font/google";
import classes from "@/app/auth/login/css/login.module.css";
import { Alert, Button, Checkbox, Group, Paper, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from "next/navigation"
import { IconInfoCircle } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./slice/authSlice";
import { useState } from "react";


const poppins_logo = Poppins({ subsets: ["latin"], weight:["800"] });
function Login() {
    const router = useRouter()
    const [loginError, setloginError] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    //@ts-ignore
    const userInfo = useSelector((state) => state.auth.userInfo)


    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          email: '',
          termsOfService: false,
          password: ''
        },
    
        validate: {
          email: (value) => (/^6[0-9]{8}$/.test(value) ? null : 'Invalid phone number'),
          password: (value) => (value.length < 6 ? "Password should 6 characters minimum" : null)
        },
      });

      async function loginUser(value:any) {
        const url = "http://172.17.15.28:30000/api/v1/login";
        setLoading(true)
        try {
          const response = await fetch(url,{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                phone_number: value?.email, 
                password: value?.password, 
                // firebase_token: null 
            }),
          });
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
      
          const data = await response.json();
          dispatch(login(data))
          localStorage.setItem("token", data?.token)
          router.push("/dashboard")
          console.log(data);
          setLoading(false)
        } catch (error) {
            setloginError(true)
            //@ts-ignore
            setErrMsg(error.message)
            setLoading(false)
            //@ts-ignore
            console.error(error.message);
        }
      }
      
    

    const icon = <IconInfoCircle />;
    
    return ( <>
        <div className=" flex flex-row min-w-sreen min-h-screen">
            <div className="w-2/4 hidden lg:block  min-h-full">
                <Image src={pic} alt="Car Rental" 
                    // layout="fill"
                    //  objectFit="cover" 
                    priority
                />
            </div>
            <div className="flex w-2/4 min-h-full flex-col justify-center items-center">
                <span className={cx([classes.logo, poppins_logo.className])}>VVIMS <span style={{color: "#17DBCC"}}>®</span></span>
                <Paper
                    p={15}
                    w={"80%"}
                    shadow="md"
                >
                    <form  style={{width: "100%"}}  
                    onSubmit={form.onSubmit((values) => loginUser(values))}>
                        <Group justify="center">
                            <h2 style={{color: "#404040", fontSize: "large"}}> Enter credential to login </h2>
                        </Group>
                        {
                            loginError &&

                            <Alert variant="light" color="red" withCloseButton mt={10} title="Alert" icon={icon}>
                                <p style={{color: "red"}}>
                                    {errMsg}
                                </p> 
                            </Alert>
                        }
                        
                        <TextInput
                            withAsterisk
                            label={ "Phone number"}
                            placeholder="6xxxxxxx"
                            key={form.key('email')}
                            {...form.getInputProps('email')}
                            w={"100%"}
                            styles={{
                                label:{
                                    color: "#404040"
                                }
                            }}
                        />

                        <PasswordInput
                            my={10}
                            withAsterisk
                            label={"Password"}
                            placeholder="**********"
                            {...form.getInputProps('password')}
                            w={"100%"}
                            styles={{
                                label:{
                                    color: "#404040"
                                }
                            }}
                        />
                        <Group justify="flex-end">
                            <p className={classes.fgp}> Forgot your password ? </p>
                        </Group>
                        

                        <Group justify="center" grow mt="md">
                            <Button type="submit"
                            loading={loading}
                            >Submit</Button>
                        </Group>
                    </form>
                </Paper>
               
            </div>
        </div>
    </> );
}

export default Login;