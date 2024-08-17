import React from 'react'
import StudentHome from "../../../components/studentComponents/Dashboard/StudentHome"
import DefaultLayout from "../../../components/studentComponents/Layouts/DefaultLayout"

function page() {
    return (
        <>
            <DefaultLayout>
                <StudentHome />
            </DefaultLayout>
        </>
    )
}

export default page
