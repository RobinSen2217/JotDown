import { useState,useContext } from "react";
import AlertContext from './AlertContext'

import React from 'react'

function AlertState(props) {

    const [logOpen,setLogOpen]=useState(false)
    const [addOpen,setAddOpen]=useState(false)
    const [delOpen,setDelOpen]=useState(false)
    const [editOpen,setEditOpen]=useState(false)

    const LogAlert=()=>{
        setLogOpen(true);
        setTimeout(() => {
            setLogOpen(false)
        }, 3000);
    }
    const AddAlert=()=>{
        setAddOpen(true);
        setTimeout(() => {
            setAddOpen(false)
        }, 3000);
    }
    const EditAlert=()=>{
        setEditOpen(true);
        setTimeout(() => {
            setEditOpen(false)
        }, 3000);
    }
    const DelAlert=()=>{
        setDelOpen(true);
        setTimeout(() => {
            setDelOpen(false)
        }, 1000);
    }

    return (
        <AlertContext.Provider value={{logOpen,LogAlert,addOpen,AddAlert,delOpen,DelAlert,editOpen,EditAlert}}>
            {props.children}
        </AlertContext.Provider>
      )
}

export default AlertState
