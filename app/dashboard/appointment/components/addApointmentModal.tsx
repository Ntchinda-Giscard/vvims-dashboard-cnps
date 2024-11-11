"use client"
import { useMutation, useSubscription } from '@apollo/client';
import { Modal, Button, Group, Textarea, Select, Stack, TextInput, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSelector } from 'react-redux';
import { GET_EMPLY } from '../../add-employee/query/get_all_empl';
import { useEffect, useState } from 'react';
import { GET_ALL_VISITORS } from '../../visitors/query/get_all_visitors';
import { DatePickerInput, TimeInput } from '@mantine/dates';
import { IconClock } from '@tabler/icons-react';
import { INSERT_APPOINTMENT, INSERT_APPOINTMENT_WITH_VISITOR } from '../mutation/add_appointments';
import toast from 'react-hot-toast';

export default function AddAppoinmentModal({opened, close}: any) {
  const user = useSelector((state: any) => state.auth.userInfo);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      description: '',
      employee: null,
      firstname: null,
      lastname: null,
      phone_number: null,
      id_card_number: null,
      visitors: null,
      start_time: null,
      end_time: null,
      date: null
    },

    validate: {
      employee: (value) => ((value) ? null : 'Invalid employee'),
      start_time: (value) => ((value) ? null : 'Invalid time'),
      end_time: (value) => ((value) ? null : 'Invalid time'),
      date: (value) => ((value) ? null : 'Invalid date'),
    },
  });

  const {data: dataAllEmpl, loading: loadAll, error: errAll} = useSubscription(GET_EMPLY,{
    variables:{
        company_id: user?.employee?.company_id
    }
  })
  const {data: dataVisitor, error: errVisitor, loading: loadVisitor} = useSubscription(GET_ALL_VISITORS, {
    variables:{
        company_id: user?.employee?.company_id,
    }
  })

  const [insertAppointment, {loading, error, data}] = useMutation(INSERT_APPOINTMENT)
  const [insertAppointmentWithVisitor, {loading: loadApp, error: errApp}] = useMutation(INSERT_APPOINTMENT_WITH_VISITOR)

  const [allArr, setAll] = useState([]);
  const [arrVisitor, setAllVisitor] = useState([])

  useEffect(() =>{
    const allOptions = dataAllEmpl?.employees?.map((d: { id: any; firstname: any, lastname:any }) =>({
      value: d?.id,
      label: `${d?.firstname}` + " "+ `${d?.lastname}`,
    }));
    const visitorOption = dataVisitor?.visitors?.map((d: {
        id_number: any;
        phone_number: any; id: any; firstname: any, lastname:any 
    }) =>({
      value: d?.id,
      label: `${d?.firstname}` + " "+ `${d?.lastname}`,
      phone_number: d?.phone_number,
      id_card_no: d?.id_number
    }))
    setAll(allOptions)
    setAllVisitor(visitorOption)
  },[dataAllEmpl, dataVisitor])

  const handleSubmit= (values: any) =>{
    console.log(values)
    if (values?.visitors){
      insertAppointment({
        variables:{
          employee_id: values?.employee,
          end_time: values?.end_time,
          start_time: values?.start_time,
          visitor_id: values?.visitors,
          description: values?.description,
        },
        onCompleted: () =>{
          close()
          toast.success("Operation sucessful")
        },
        onError: (err) =>{
          toast.error(`${err.message}`)
        }
      })
    }
    else{
      insertAppointmentWithVisitor({
        variables:{
          employee_id: values?.employee,
          end_time: values?.end_time,
          start_time: values?.start_time,
          firstname: values?.firstname,
          lastname: values?.lastname,
          phone_number: values?.phone_number,
          id_card_number: values?.id_number,
          description: values?.description,
          date: values?.date,
        },
        onCompleted: () =>{
          close()
          toast.success("Operation sucessful")
        },
        onError: (err) =>{
          toast.error(`${err.message}`)
        }
      })
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title={<p style={{color: "#404040"}}>Add Appointment</p>}>
        {/* Modal content */}
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Stack>
            <Select
              label={"Employee"}
              placeholder="Pick supervisor"
              data={allArr}
              clearable
              searchable
              key={form.key('employee')}
              {...form.getInputProps('employee')}
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
            <Select
              label={"Visitor"}
              placeholder="Pick visitor"
              data={arrVisitor}
              clearable
              searchable
              allowDeselect
              key={form.key('visitors')}
              {...form.getInputProps('visitors')}
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
            <DatePickerInput
              label={"Date"}
              placeholder="Pick date"
              key={form.key('date')}
              {...form.getInputProps('date')}
              styles={{
                label:{
                    color: "#404040"
                },
                calendarHeader:{
                    color: "#000"
                },
                calendarHeaderControl:{
                    color: "#000"
                }
            }}

            />
            <Group grow>
              <TimeInput
                label="Start time"
                rightSection={<IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                key={form.key('start_time')}
              {...form.getInputProps('start_time')}
                styles={{
                  label:{
                      color: "#404040"
                  }
              }}
              />
              <TimeInput
                label="End time"
                rightSection={<IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                key={form.key('end_time')}
              {...form.getInputProps('end_time')}
                styles={{
                  label:{
                      color: "#404040"
                  }
              }}
              />
            </Group>
            <Group grow>
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
            </Group>
            <Group grow>
              <TextInput
                  withAsterisk
                  label="Id card number"
                  placeholder="..."
                  key={form.key('id_card_number')}
                  {...form.getInputProps('id_card_number')}
                  styles={{
                      label:{
                          color: "#404040"
                      }
                  }}
              />
              <TextInput
                  withAsterisk
                  label="Phone number"
                  placeholder="6xxxxxx"
                  key={form.key('phone_number')}
                  {...form.getInputProps('phone_number')}
                  styles={{
                      label:{
                          color: "#404040"
                      }
                  }}
              />
            </Group>
            <Textarea
              size="lg"
              label="Descritption"
              placeholder=""
              key={form.key('description')}
              {...form.getInputProps('description')}
              styles={{
                label:{
                    color: "#404040"
                }
            }}
            />
          </Stack>

          <Group justify="flex-end" mt="md" grow>
            <Button bg={"#16DBCC"} loading={loading || loadApp}  type="submit">Submit</Button>
            <Button bg={"red"} onClick={close} >Cancel</Button>
          </Group>
        </form>
      </Modal>

    </>
  );
}