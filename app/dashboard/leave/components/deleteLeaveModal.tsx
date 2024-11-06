"use client"
import { useMutation } from '@apollo/client';
import { Modal, Button, Group } from '@mantine/core';
import { DELETE_LEAVE } from '../mutation/mutations';
import toast from 'react-hot-toast';

export default function DeleteLEaveModal({opened, close, leave}: any) {

    const [deleteLeave, {loading}] = useMutation(DELETE_LEAVE)

    const handleDelete = () =>{
        deleteLeave({
            variables:{
                id: leave?.id
            },
            onCompleted: () => {
                toast.success("Operation successful")
                close();
            },
            onError: (err) => {
                toast.error(`${err.message}`)
            }
        })
    }

  return (
    <>
      <Modal opened={opened} onClose={close} title= {<p style={{ color: "#404040" }} > Delete leave </p>}>
        <p style={{ color: "#404040" }}>Are you sure you want to delete this leave?</p>
        <Group grow mt={"md"}>
            <Button onClick={handleDelete} loading={loading} color="red"  radius="md">Delete</Button>  
            <Button onClick={close} color="#16DBCC"  radius="md">Cancel</Button>
        </Group>
      </Modal>

    </>
  );
}