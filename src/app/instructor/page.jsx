"use client"
import Calendar from "../../components/instructorComponents/Calendar";
import DefaultLayout from'../../components/Layouts/DefaultLayout'
const name= localStorage.getItem("name");
const CalendarPage = () => {
  
  return (
    <DefaultLayout>
      <Calendar />
    </DefaultLayout>
  );
};

export default CalendarPage;