import React from 'react'
import Department from '../views/Department'
import { Route, Routes } from 'react-router-dom'
import Template from '../components/Template'
import Role from '../views/Role'
import Employee from '../views/Employee'

export default function index() {
    return (
        <>
            <Routes>
                <Route element={<Template />}>
                    <Route path='/' element={<Department />} />
                    <Route path='/role' element={<Role />} />
                    <Route path='/employee' element={<Employee />} />
                </Route>
            </Routes>
        </>
    )
}
