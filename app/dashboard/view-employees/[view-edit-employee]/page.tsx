"use client"
import { ActionIcon, Avatar, Box, Button, Divider, Group, Paper, PasswordInput, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {useRouter, usePathname} from 'next/navigation';
import { IconArrowLeft } from "@tabler/icons-react";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { GET_SERV_BY_DEPT_ID } from "../../add-employee/query/get_services";
import { GET_POSIOIONS } from "../../add-employee/query/get_positions";
import { GET_ALL_DEPT } from "../../departments/queries/get_dept";
import { GET_EMPLY } from "../../add-employee/query/get_all_empl";
import { GET_ROLES } from "../../add-employee/query/get_roles";
import { GET_EMPL_PK } from "../query/get_employee";
import { UPDATE_EPLY } from "../mutations/edit_employee";
import toast from "react-hot-toast";

export default function Page({ params }: { params: { slug: string } }) {
  const employeeToEdit = useSelector((state: any) => state.editEmpl.editEmpl);
  const router = useRouter();
  const pathname = usePathname()
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      firstname: "",
      lastname: "",
      region: "",
      address: "",
      phone_number: "",
      service: null,
      department: null,
      functions: "",
      supervisor_id: null,
      license: "",
      password: "",
      position: null,
      role: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      firstname: (value) => (value.length < 2? "First name should be 2 characters minimum" : null),
      lastname: (value) => (value.length < 2? "Last name should be 2 characters minimum" : null),
      region: (value) => (value.length < 3? "Region should be 2 characters minimum" : null),
      address: (value) => (value.length < 3? "Address should be 2 characters minimum" : null),
      phone_number: (value) => (/^6[0-9]{8}$/.test(value)? null : 'Invalid phone number'),
      service: (value) => (value === null? "Select service" : null),
      department: (value) => (value === null? "Select department" : null),
      position: (value) => (value === null? "Select position" : null),
      functions: (value) => (value.length < 2? "Fonction should be 2 characters minimum" : null),
    //   supervisor_id: (value) => (value.length < 5? "ID number should be 5 characters minimum" : null),
      license: (value) => (value.length < 2? "License should be 2 characters minimum" : null),
      password: (value) => (value.length < 6? "Password should be 6 characters minimum" : null),
      role: (value) => (value.length < 1? "Select role" : null),
    },
  });

  const user = useSelector((state: any) => state.auth.userInfo);
    const {data: dataService, error: errService, loading: loadService } = useQuery(GET_SERV_BY_DEPT_ID,{
            variables:{
            company_id: user?.employee?.company_id,
            department_id: form.getValues().department
        }}
    );
    const {data: dataPos, error: errPos, loading: loadPos} = useQuery(GET_POSIOIONS,{
        variables:{
            company_id: user?.employee?.company_id,
        }
    })
    const {data: dataDept, loading: loadDept, error: errDept} = useQuery(GET_ALL_DEPT,{
        variables:{
          company_id: user?.employee?.company_id
        }
      });
    const {data: dataAllEmpl, loading: loadAll, error: errAll} = useSubscription(GET_EMPLY,{
        variables:{
            company_id: user?.employee?.company_id
        }
    })
    const {data: dataRoles, loading: loadRoles, error: errRoels} = useQuery(GET_ROLES);
    const {data: dataEmployeePk, loading: loadingEmplPk, error: errEmplPk} = useQuery(GET_EMPL_PK, {
        variables:{
            id: pathname.toString().split("/").filter(Boolean).pop()
        }
    });
    const [updateEmployee, {loading: loadUpdte}] = useMutation(UPDATE_EPLY);

    const [deptArr, setDept] = useState([]);
    const [servArr, setServ] = useState([]);
    const [posArr, setPos] = useState([]);
    const [roleArr, setRole] = useState([]);
    const [allArr, setAll] = useState([]);

  useEffect(() =>{
    console.log("peoples data:", dataEmployeePk);
    if(dataEmployeePk?.employees_by_pk){
        form.setFieldValue('firstname', dataEmployeePk?.employees_by_pk?.firstname)
        form.setFieldValue('email', dataEmployeePk?.employees_by_pk?.email)
        form.setFieldValue('lastname', dataEmployeePk?.employees_by_pk?.lastname)
        form.setFieldValue('region', dataEmployeePk?.employees_by_pk?.region)
        form.setFieldValue('address', dataEmployeePk?.employees_by_pk?.address)
        form.setFieldValue('phone_number', dataEmployeePk?.employees_by_pk?.phone_number)
        form.setFieldValue('service', dataEmployeePk?.employees_by_pk?.service_id)
        form.setFieldValue('department', dataEmployeePk?.employees_by_pk?.department_id)
        form.setFieldValue('position', dataEmployeePk?.employees_by_pk?.position_id)
        form.setFieldValue('functions', dataEmployeePk?.employees_by_pk?.function)
        form.setFieldValue('license', dataEmployeePk?.employees_by_pk?.license)
        form.setFieldValue('supervisor_id', dataEmployeePk?.employees_by_pk?.supervisor_id)
        form.setFieldValue('password', "123456")
        form.setFieldValue('role', "EMPLOYEE")
    }
    
    console.log('employee', employeeToEdit)
  }, [employeeToEdit, dataEmployeePk])

  useEffect(() =>{
    const deptOptions = dataDept?.departments?.map((d: { id: any; text_content: { content: any; }; }) =>({
        value: d?.id,
        label: d?.text_content?.content
    }))
    const servOptions = dataService?.services?.map((d: { id: any; text_content: { content: any; }; }) =>({
        value: d?.id,
        label: d?.text_content?.content
    }))
    const posOptions = dataPos?.positions?.map((d: { id: any; text_content: { content: any; }; }) =>({
        value: d?.id,
        label: d?.text_content?.content
    }))
    const roleOptions = dataRoles?.roles?.map((d: { id: any; role_name: any }) =>({
        value: d?.id,
        label: d?.role_name
    }))
    const allOptions = dataAllEmpl?.employees?.map((d: { id: any; firstname: any, lastname:any }) =>({
        value: d?.id,
        label: `${d?.firstname}` + " "+ `${d?.lastname}`,
    }))

    setDept(deptOptions)
    setServ(servOptions)
    setPos(posOptions)
    setRole(roleOptions)
    setAll(allOptions)

    console.log("Dept id", dataAllEmpl)
},[dataPos, dataDept, dataService, dataRoles, form.getValues().department, dataAllEmpl])

    function handleSubmit(value: any){
        updateEmployee({
            variables:{
                id: pathname.toString().split("/").filter(Boolean).pop(),
                address: value?.address,
                email: value?.email,
                firstname: value?.firstname,
                function: value?.functions,
                lastname: value?.lastname,
                license: value?.license,
                phone_number: value?.phone_number,
                position_id: value?.position,
                region: value?.region,
                service_id: value?.service,
                supervisor_id: value?.supervisor_id,
                department_id: value?.department
            },
            onCompleted: () =>{
                toast.success(" Operation completed ");
                router.back()
            },
            onError: ( ) =>{
                toast.error("Oops 😳! An error occured!!!");
            }
        })
    }
    return (
    <>
    <div> { pathname.toString().split("/").filter(Boolean).pop() } </div>
      <main className="flex min-h-full flex-col gap-3">
        <Group mt={25}>
            <ActionIcon onClick={() => router.back()} variant="transparent" color="black" aria-label="Settings">
                    <IconArrowLeft style={{ width: '70%', height: '70%' }}  stroke={1.5} />
            </ActionIcon>
            <h3 style={{color: "#404040"}}> Employee Details </h3>
        </Group>
        

    <Box pos="relative" w="100%">
      <Group justify="center">
        <Avatar variant='filled' my="lg" radius={100} size={300} src="" />
      </Group>
        <Paper shadow="md" radius="md" p="md">
        <form onSubmit={form.onSubmit((values: any) => handleSubmit(values))}>
            <h3 style={{color: "#386BF6", marginTop: 25}}> Personal Details </h3>
            <Divider my={5} />
            <Stack gap="md" mt="md" mb="xs">
                <Group justify='space-between' grow gap="md">
                    <TextInput
                        withAsterisk
                        label="Firstname"
                        placeholder="firstname"
                        key={form.key('firstname')}
                        {...form.getInputProps('firstname')}
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                    />
                    <TextInput
                        withAsterisk
                        label="Lastname"
                        placeholder="lastname"
                        key={form.key('lastname')}
                        {...form.getInputProps('lastname')}
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                    />
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                    />
                </Group>

                <Group justify="space-between" grow gap="md">
                    <TextInput
                        withAsterisk
                        label="Region"
                        placeholder="littoral"
                        key={form.key('region')}
                        {...form.getInputProps('region')}
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                    />
                    <TextInput
                        withAsterisk
                        label="Address"
                        placeholder="address"
                        key={form.key('address')}
                        {...form.getInputProps('address')}
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                    />
                    <TextInput
                        label="Phone number"
                        placeholder="6xxxxxxxx"
                        key={form.key('phone_number')}
                        {...form.getInputProps('phone_number')}
                        withAsterisk
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                    />
                </Group>
            </Stack>

            <h3 style={{color: "#386BF6", marginTop: 25}}> Company Profile </h3>
            <Divider my={5} />
            <Stack gap="md" mt="md" mb="xs">
                <Group justify="space-between" grow gap="md">
                    <Select
                        label={"Department"}
                        placeholder="Pick department"
                        data={deptArr}
                        clearable
                        searchable
                        allowDeselect
                        key={form.key('department')}
                        {...form.getInputProps('department')}
                        nothingFoundMessage="Nothing found..."
                        withAsterisk
                        styles={{
                            label:{
                                color: "#404040"
                            },
                            option:{
                                color: "#404040"
                            }
                        }}
                    />
                    <Select
                        label={ "Service"}
                        placeholder="Pick service"
                        allowDeselect
                    //@ts-ignore
                        disabled={errService || loadService}
                        data={servArr}
                        clearable
                        searchable
                        key={form.key('service')}
                        {...form.getInputProps('service')}
                        nothingFoundMessage="Nothing found..."
                        withAsterisk
                        styles={{
                            label:{
                                color: "#404040"
                            },
                            option:{
                                color: "#404040"
                            }
                        }}
                    />
                    <TextInput
                        label= {"Function"}
                        placeholder="function"
                        key={form.key('functions')}
                        {...form.getInputProps('functions')}
                        withAsterisk
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                    />
                </Group>

                <Group justify="space-between" grow gap="md">
                    <Select
                        label={ "Position" }
                        placeholder="Pick position"
                        data={posArr}
                        clearable
                        searchable
                        key={form.key('position')}
                        {...form.getInputProps('position')}
                        nothingFoundMessage="Nothing found..."
                        withAsterisk
                        styles={{
                            label:{
                                color: "#404040"
                            },
                            option:{
                                color: "#404040"
                            }
                        }}
                    />
                    <TextInput
                        label={"License"}
                        placeholder="license"
                        key={form.key('license')}
                        {...form.getInputProps('license')}
                        withAsterisk
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                    />
                    <Select
                        label={"Supervisor"}
                        placeholder="Pick supervisor"
                        data={allArr}
                        clearable
                        searchable
                        key={form.key('supervisor_id')}
                        {...form.getInputProps('supervisor_id')}
                        nothingFoundMessage="Nothing found..."
                        styles={{
                        label:{
                            color: "#404040"
                        },
                        option:{
                            color: "#404040"
                        }
                    }}
                    />
                </Group>
            </Stack>

            <h3 style={{color: "#386BF6", marginTop: 25}}> Account Details </h3>
            <Divider my={5} />
            <Group justify="space-between" grow gap="md" mt="md">
                <PasswordInput
                    label={"Password"}
                    placeholder="******"
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                    withAsterisk
                    styles={{
                        label:{
                            color: "#404040"
                        }
                    }}
                />

            </Group>
            <Group justify="center" mt="xl" >
                <Button type="submit" 
                loading={loadUpdte} 
                color={"#16DBCC"}>Edit Employee</Button>
            </Group>
        </form>
    </Paper>
    </Box>
   
    </main>
    </>
    )
  }