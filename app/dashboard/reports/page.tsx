"use client"
import {Paper, Button, Checkbox, Group, TextInput, Select, rem} from "@mantine/core";
import { useForm } from '@mantine/form';
import { IconCalendar } from '@tabler/icons-react';
import {DateInput} from "@mantine/dates";
import { useState } from "react";



export default function Page(){
    const [checked, setChecked] = useState(false);
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            termsOfService: false,
            from: null,
            to: null
        },

        validate: {
            email: (value) => ( value?.length > 0 ? null : 'Invalid choice'),
            // from: (value) => ( value !== null ? null : 'Invalid date'),
            // to: (value) => ( value !== null ? null : 'Invalid date'),
        },
    });
    return(
        <>
            <main className={"flex flex-col min-w-full min-h-full"}>
                <p style={{fontWeight: 800, fontSize: "x-large", color: "#404040"}}> Reports </p>
            </main>

            <Paper
                radius={'md'}
                shadow={'md'}
                mt={'md'}
                p={'md'}
            >
                <p style={{fontWeight: 800, fontSize: "large", color: "#404040"}}> Generate Reports </p>
                <form onSubmit={form.onSubmit((values: any) => console.log(values))}>
                    <Select
                        mt={'lg'}
                        withAsterisk
                        radius={'md'}
                        data={['Visits', 'Attendance']}
                        label="Reports type"
                        placeholder="select"
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                        styles={{
                            label:{color: "#404040"},
                            option:{color: "#404040"}
                        }}
                    />


                    <Checkbox
                        mt="md"
                        label="Generate by date range"
                        onChange={(event) => setChecked(event.currentTarget.checked)}
                    />
                    <div className={'flex flex-col md:flex-row gap-3'}>
                        <DateInput
                            disabled={!checked}
                            maw={300}
                            radius={'md'}
                            rightSection={<IconCalendar style={{width: rem(16), height: rem(16) }} />}
                            label="From"
                            placeholder="Date input"
                            key={form.key('from')}
                            {...form.getInputProps('from')}
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
                        <DateInput
                            disabled={!checked}
                            maw={300}
                            radius={'md'}
                            rightSection={<IconCalendar style={{width: rem(16), height: rem(16) }} />}
                            label="To"
                            key={form.key('to')}
                            {...form.getInputProps('to')}
                            placeholder="Date input"
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
                    </div>



                    <Group justify="flex-end" mt="md">
                        <Button variant={'outline'} onClick={() => form.reset()}>Clear</Button>
                        <Button type="submit">Generate report</Button>
                    </Group>
                </form>
            </Paper>
        </>
    )
}