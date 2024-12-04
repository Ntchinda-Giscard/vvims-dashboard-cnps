"use client"
import { Button, Checkbox, Group, TextInput, Modal, Select, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUser } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import {ADD_TASK} from "@/app/dashboard/events/mutation/add_task_mut";
import { useMutation } from '@apollo/client';
import {useSelector} from "react-redux";
import toast from "react-hot-toast";

export default function AddTask({ opened, close, data }: any) {
    const [allEmployee, setAllOptions] = useState();
    const user = useSelector((state: any) => state.auth.userInfo)
    useEffect(() => {
        console.log('Data events chosen', data)
        const allOptions = data?.event_participants?.map((d: {
            employee: any; id: any; firstname: any, lastname:any }) =>({
            value: d?.employee?.id,
            label: `${d?.employee?.firstname}` + " "+ `${d?.employee?.lastname}`
        }))
        setAllOptions(allOptions)
    }, [data]);
    const [insertTask, {loading}] = useMutation(ADD_TASK);
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: '',
            description: '',
            termsOfService: false,
            employees: [],
        },

        validate: {
            title: (value) => ( value.length > 3 ? null : 'Invalid title'),
            employees: (value) => ( value.length > 0 ? null : 'Pick an employee'),
            description: (value) => ( value.length > 3 ? null : 'Invalid description'),
        },
    });

    const handleAddTask= (values: any) =>{
        insertTask({
            variables:{
                assigned_by: user?.employee?.id,
                event_id: data?.id,
                title: values?.title,
                description: values?.description,
                assigned_to: values?.employees
            },
            onCompleted: () =>{
                toast.success('Operation successful')
                close()
            },
            onError: (err) => {
                toast.error(`${err?.message}`)
            }
        })
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title={<p style={{color: '#404040'}}> Add task </p>}>
                {/* Modal content */}
                <form onSubmit={form.onSubmit((values) => handleAddTask(values))}>
                    <TextInput
                        mt={'md'}
                        withAsterisk
                        label="Title"
                        placeholder="title"
                        key={form.key('title')}
                        {...form.getInputProps('title')}
                        styles={{
                            label: {
                                color: "#404040"
                            }
                        }}
                    />

                    <TextInput
                        mt={'md'}
                        withAsterisk
                        label="Description"
                        placeholder="description"
                        key={form.key('description')}
                        {...form.getInputProps('description')}
                        styles={{
                            label: {
                                color: "#404040"
                            }
                        }}
                    />
                    <Select
                        mt={'md'}
                        withAsterisk
                        data={allEmployee}
                        leftSectionPointerEvents="none"
                        leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
                        label="Assign to"
                        placeholder="pick employee"
                        searchable
                        nothingFoundMessage="Nothing found..."
                        key={form.key('employees')}
                        {...form.getInputProps('employees')}
                        styles={{
                            label:{
                                color: "#404040"
                            },
                            option:{
                                color: "#404040"
                            }
                        }}
                    />
                    <Group  justify="flex-end" mt="md" grow>
                        <Button loading={loading} type="submit">Submit</Button>
                    </Group>
                </form>

            </Modal>

        </>
);
}