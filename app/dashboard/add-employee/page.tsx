"use client"
import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay, Button, Group, Box, Paper, Text, TextInput, Divider, Stack, Select, MultiSelect, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { GET_SERV_BY_DEPT_ID } from './query/get_services';
import { GET_POSIOIONS } from './query/get_positions';
import { GET_ALL_DEPT } from '../departments/queries/get_dept';
import { useEffect, useState } from 'react';
import { GET_ROLES } from './query/get_roles';
import { GET_EMPLY } from './query/get_all_empl';
import { INSERT_EMPLOYEE } from './mutation/insert_employee';
import toast from 'react-hot-toast';
function AddEmployee() {
    const [visible, { open, close }] = useDisclosure(false);
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
    const {data: dataRoles, loading: loadRoles, error: errRoels} = useQuery(GET_ROLES)

    const [deptArr, setDept] = useState([]);
    const [servArr, setServ] = useState([]);
    const [posArr, setPos] = useState([]);
    const [roleArr, setRole] = useState([]);
    const [allArr, setAll] = useState([]);

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

    const [insertEmployee, {data, loading, error}] = useMutation(INSERT_EMPLOYEE)

    function handleSubmit(values: any){
        open()
        insertEmployee({
            variables:{
                address: values?.email,
                companyId: user?.employee?.company_id,
                departmentId: values?.department,
                email: values?.email,
                firstname: values?.firstname,
                function: values?.functions,
                lastname: values?.lastname,
                license: values?.license,
                password: values?.password,
                phoneNumber: values?.phone_number,
                positionId: values?.position,
                region: values?.region,
                serviceId: values?.service,
                roles: values?.role

            },
            onCompleted: () =>{
                close()
                toast.success("Operation successful")
                console.log("Employee inserted", data)
                form.reset()
            },
            onError: (err) =>{
                close()
                toast.error(`${err?.message}`)
            }
        })
        close()

    }

    return ( <>
    <main className="flex min-h-full flex-col gap-3">
    <p style={{fontWeight: 800, fontSize: "large", color: "#404040"}}> Add Employees </p>

    <Box pos="relative" w="100%">
        <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

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
                <Select
                    label={"Role"}
                    placeholder="Pick role"
                    data={['EMPLOYEE', 'ADMIN', 'GUARD']}
                    key={form.key('role')}
                    {...form.getInputProps('role')}
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
            </Group>
            <Group justify="center" mt="xl" >
                <Button type="submit" loading={loading} color={"#16DBCC"}>Add Employee</Button>
            </Group>
        </form>
    </Paper>
    </Box>
   
    </main>
    </> );
}

export default AddEmployee;