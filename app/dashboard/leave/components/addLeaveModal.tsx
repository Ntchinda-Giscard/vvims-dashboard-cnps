"use client"
import { useMutation, useQuery } from '@apollo/client';
import { Modal, Button, Select, Textarea, Loader, rem, FileInput, TextInput, Text, Switch, Checkbox } from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { GET_LEAVE_TYPE } from '../queries/queries';
import { useEffect, useState } from 'react';
import { INSERT_LEAVE } from '../mutation/mutations';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { IconCalendar } from '@tabler/icons-react';
import axios from 'axios';
import FileUpload from "@/app/dashboard/leave/components/fileUploader";
import { GET_EMPLOYEES_QUERY } from '../../reports/query/query';
import { start } from 'repl';

export default function AddLeaveManagement({opened, close}: any) {

    const {data: dataType, error: errType, loading: loadType} = useQuery(GET_LEAVE_TYPE);
    const [insertLeave, {loading: loadInsert}] = useMutation(INSERT_LEAVE);
    const [types, setTypes] = useState([]);
    const user = useSelector((state: any) => state.auth.userInfo);
    const [other, setOther] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false)
    const [checked, setChecked] = useState(true);
    const [allArr, setAll] = useState([]);
    const [from, setFrom] = useState<Date | null>(null);
    const [to, setTo] = useState<Date | null>(null);

    const {data: dataAllEmpl, loading: loadAll, error: errAll} = useQuery(GET_EMPLOYEES_QUERY,{
        variables:{
            company_id: user?.employee?.company_id
        }
        })

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          type: null,
          to: null,
          from: null,
          comment: null,
          start_time: null,
          end_time: null,
        //   localite: null,
          employee: [],
          describtion: null,
        },
    
        validate: {
            type: (value) => ( value !== null ? null : 'Invalid type'),
            to: (value) => ( value !== null ? null : 'Invalid date'),
            from: (value) => ( value !== null ? null : 'Invalid date'),
            comment: (value) => ( value !== null ? null : 'Invalid comment'),
        },
      });

    form.watch('from', ({ previousValue, value, touched, dirty }) => {
        console.log({ previousValue, value, touched, dirty });
        setFrom(value);
    });

    form.watch('to', ({ previousValue, value, touched, dirty }) => {
        console.log({ previousValue, value, touched, dirty });
        setTo(value);
    });

    form.watch('type', ({ previousValue, value, touched, dirty }) => {
        console.log({ previousValue, value, touched, dirty });
        setOther(value);
    });

    useEffect(() =>{
        const typeOptions = dataType?.leave_type?.map((d: { type: any; }) =>({
            value: d?.type,
            label: `${d?.type}`,
        }))

        const allOptions = dataAllEmpl?.employees?.map((d: {
            service: any;
            department: any; id: any; firstname: any, lastname:any 
}) =>({
            value: d?.id,
            label: `${d?.firstname}` + " "+ `${d?.lastname}`,
            department: d?.department?.text_content?.content
        }))

        setAll(allOptions)

        

        setTypes(typeOptions)
    }, [dataType, errType, loadType, dataAllEmpl])

    function handelSubmit(values: any){
        console.log(values)
        if ( !(values?.to > values?.from)){
            toast.error(" 'From' date should be earlier than the 'To' date")
            return
        }
        insertLeave(
            {
            variables:{
                // employee_id: user?.employee?.id,
                employee_id: values?.employee,
                comment: values?.comment,
                end_date: checked ? values?.to : null,
                start_date: checked ? values?.from : null,
                start_time: !checked ? values?.start_time : null,
                end_time: !checked ? values?.end_time : null,
                leave_type: values?.type,
                other_description: other ? values?.describtion : null,
                // region: values?.region,
                // ville: values?.ville,
                // localite: values?.localite
            },
            onCompleted: () =>{
                toast.success("Operation successful")
                form.reset()
                close()
            },
            onError: (err) =>{
                toast.error(`${err.message}`)
            }}
        )
    }

    function daysBetweenDates(date1: Date | string | null | undefined, date2: Date | string | null | undefined): number | null {
  if (!date1 || !date2) {
    return null;
  }

  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Check for invalid dates
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    return null;
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(diffTime / msPerDay);
}


  return (
    <>
      <Modal opened={opened} onClose={close} title= {<p style={{color: "#404040"}} > Leave application </p>}>
        {/* Modal content */}
        <form onSubmit={form.onSubmit((values) => handelSubmit(values))}>

            <div className="flex flex-col md:flex-row gap-4">
                <Checkbox
                                        mt="md"
                                        label="Hourly leave"
                                        onChange={(event) => setChecked(event.currentTarget.checked)}
                                        styles={{
                                                label:{color: "#404040"},
                                            
                                        }}
                                    />

               { !checked && <>
                    <DateInput
                        minDate={new Date()}
                        label="From"
                        placeholder="Date"
                        withAsterisk
                        leftSection={<IconCalendar style={{width: rem(16), height: rem(16)}} />}
                        key={form.key('from')}
                        {...form.getInputProps('from')}
                        styles={{
                            label:{
                                color: "#404040"
                            },
                        }}
                    />

                    <DateInput
                        minDate={new Date()}
                        label="To"
                        placeholder="Date"
                        withAsterisk
                        leftSection={<IconCalendar style={{width: rem(16), height: rem(16)}} />}
                        key={form.key('to')}
                        {...form.getInputProps('to')}
                        styles={{
                            label:{
                                color: "#404040"
                            },
                        }}
                    />
                </>}

                {
                    checked &&    <>
                            <TimeInput
                            label="Start time"
                            placeholder="Start time"
                            withAsterisk
                            key={form.key('start_time')}
                            {...form.getInputProps('start_time')}
                            styles={{
                                    label:{
                                        color: "#404040"
                                    },
                                }}
                        />
                        <TimeInput
                            label="End time"
                            placeholder="End time"
                            withAsterisk
                            key={form.key('end_time')}
                            {...form.getInputProps('end_time')}
                            styles={{
                                    label:{
                                        color: "#404040"
                                    },
                                }}
                        />
                        </>
                    }
                    { checked && <Text mt={8} c={'blue'} fw={300} > Number of days: {daysBetweenDates(from, to)} </Text>}


                    <Select 
                        label= "Leave type"
                        data={types}
                        clearable
                        searchable
                        allowDeselect
                        key={form.key('type')}
                        {...form.getInputProps('type')}
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
                    {
                        other === "Other" && 
                        <TextInput
                            label="Other type"
                            placeholder="Type here..."
                            withAsterisk
                            key={form.key('describtion')}
                            {...form.getInputProps('describtion')}
                            styles={{
                                label:{
                                    color: "#404040"
                                },
                            }}
                        />
                    }
                    
                <Textarea
                    size="lg"
                    label="Comment"
                    placeholder="comment..."
                    withAsterisk
                    key={form.key('comment')}
                    {...form.getInputProps('comment')}
                    styles={{
                            label:{
                                color: "#404040"
                            },
                        }}
                />

                    
            </div>
            <Select label="Employees" searchable key={form.key('employee')}
                        {...form.getInputProps('employee')} 
                        data={allArr}  
                        styles={{
                            label:{color: "#404040"},
                            option:{color: "#404040"}
                        }} />
            {/* <TextInput
                    label={"Region"}
                        key={form.key('region')}
                        {...form.getInputProps('region')}
                        withAsterisk
                        styles={{
                            label:{
                                color: "#404040"
                            },
                        }}
                    />

                    <TextInput
                    label={"Ville"}
                        key={form.key('ville')}
                        {...form.getInputProps('ville')}
                        withAsterisk
                        styles={{
                            label:{
                                color: "#404040"
                            },
                        }}
                    />

                    <TextInput
                    label={"Localite"}
                        key={form.key('localite')}
                        {...form.getInputProps('localite')}
                        withAsterisk
                        styles={{
                            label:{
                                color: "#404040"
                            },
                        }}
                    /> */}
            <div className=" mt-5 flex col gap-2 md:flex-row flex-grow" >
                <Button loading={loadInsert} className="grow" type="submit" color={"#16DBCC"}>
                    Add leave
                </Button>
                <Button color="red" className="grow" onClick={close} >
                    Cancel
                </Button>
            </div>
        </form>
      </Modal>

    </>
  );
}