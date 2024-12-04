"use client"
import { useMutation, useQuery } from '@apollo/client';
import { Modal, Button, TextInput, Group, MultiSelect, Textarea } from '@mantine/core';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { GET_EMPLOYEE_EVENTS } from '../queries/get_empl';
import { useSelector } from 'react-redux';
import { INSERT_EVENTS } from '../mutation/insert_events';
import toast from 'react-hot-toast';


export default function AddEvent({opened, close}: any) {

  const [employees, setEmployees ] = useState([])
  const userInfo = useSelector((state: any) => state.auth.userInfo)

  const {data: dataAllEmpl, loading: loadEmpl} = useQuery(GET_EMPLOYEE_EVENTS);
  const [insertEvents, {loading: loadInsertEvents}] = useMutation(INSERT_EVENTS);
  
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      description: '',
      participants: [],
      start_time: null,
      end_time: null,
      date: null
    },

    validate: {
      title: (value) => ( value?.length > 3 ? null : 'Invalid title'),
    },
  });

  useEffect(() =>{
    const allOptions = dataAllEmpl?.employees?.map((d: {id: any; firstname: any, lastname:any }) =>({
      value: d?.id,
      label: `${d?.firstname}` + " "+ `${d?.lastname}`
    }))

    setEmployees(allOptions)

  }, [dataAllEmpl]);

  function convertToEmployeeObjects(arr: any[]) {
    return arr.map((id: any) => ({ employee_id: id }));
}

  const handleSubmit = (value: any) =>{
    console.log(value)
    insertEvents({
      variables:{
        orgenizer_id: userInfo?.employee?.id,
        start_date: value?.date,
        title: value?.title,
        end_time: value?.end_time,
        start_time: value?.start_time,
        participants: convertToEmployeeObjects(value?.participants),
        description: value?.description

      },
      onCompleted: () =>{
        toast.success("Events created");
        close();
      },
      onError: (err) =>{
        toast.error(`${err.message}`)
      }
    })
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title=   {<p style={{fontSize: 'small', color: "#404040", fontWeight: 600}} > Add Event </p>} >
        {/* Modal content */}
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          radius="md"
          withAsterisk
          label="Title"
          placeholder="enter title"
          key={form.key('title')}
          {...form.getInputProps('title')}
          styles={{
            label:{
              color: "#404040"
            }
          }}
        />
        <Textarea
          radius='md'
          mt={'md'}
          label="Description"
          placeholder="enter description"
          key={form.key('description')}
          {...form.getInputProps('description')}
          styles={{
            label:{
              color: "#404040"
            }
          }}
        />
        <MultiSelect
          radius="md"
          mt={'md'}
          label="Participants"
          placeholder="Pick employees"
          data={employees}
          searchable
          nothingFoundMessage="Nothing found..."
          key={form.key('participants')}
          {...form.getInputProps('participants')}
          styles={{
            label:{
                color: "#404040"
            },
            option:{
                color: "#404040"
            }
        }}

        />
        <DatePickerInput
          label="Date"
          radius="md"
          mt={'md'}
          placeholder="Pick date"
          minDate={new Date()}
          key={form.key('date')}
          {...form.getInputProps('date')}
          styles={{
            label:{
              color: "#404040"
            }
          }}

        />
        <TimeInput
          radius="md"
          mt={'md'}
          label="Start time"
          key={form.key('start_time')}
          {...form.getInputProps('start_time')}
          styles={{
            label:{
              color: "#404040"
            }
          }}
        />

        <TimeInput
          radius="md"
          mt={'md'}
          label="End time"
          key={form.key('end_time')}
          {...form.getInputProps('end_time')}
          styles={{
            label:{
              color: "#404040"
            }
          }}
        />

        <Group grow justify="flex-end" mt="md">
            <Button type="submit" loading={loadInsertEvents} >Submit</Button>
        </Group>
    </form>
      </Modal>
    </>
  );
}