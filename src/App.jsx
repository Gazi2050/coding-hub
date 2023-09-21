import { useState, useEffect } from 'react';
function App() {
  const [course, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [totalCreditHour, setTotalCreditHour] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [creditHourRemaining, setCreditHourRemaining] = useState(20);
  useEffect(() => {
    fetch('course.json')
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  const isCourseSelected = (selectedCourse) =>
    selectedCourses.some((course) => course.id === selectedCourse.id);

  const handleSelectCourse = (selectedCourse) => {
    if (isCourseSelected(selectedCourse)) {
      window.alert(`${selectedCourse.course_name} is already selected.`);
      return;
    }
    if (
      totalCreditHour + selectedCourse.credit <= 21 &&
      creditHourRemaining - selectedCourse.credit >= 0
    ) {
      setSelectedCourses([...selectedCourses, selectedCourse]);
      setTotalCreditHour(totalCreditHour + selectedCourse.credit);
      setTotalPrice(totalPrice + selectedCourse.price);
      setCreditHourRemaining(creditHourRemaining - selectedCourse.credit);
    } else {
      window.alert('You do not have enough credit to select this course.');
    }
  };
  return (
    <div>
      <div className='flex justify-center items-center'><h1 className='text-center text-5xl m-5 font-bold border rounded-md p-4 bg-zinc-100 w-96'><span className='text-blue-600'>Coding</span> Hub</h1></div>

      <h3 className='text-xl text-black font-bold text-center mt-5'>Course Registration</h3>
      <section className='p-5 w-full mx-auto grid lg:grid-cols-4 gap-4 lg:my-24 md:grid-cols-2 md:my-16 sm:grid-cols-1 sm:my-12 md:items-center'>
        <div className='lg:col-span-3 md:col-span-2 sm:col-span-1 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4'>
          {course.map((course) => (
            <div key={course.id}>
              <div className='rounded-md bg-white p-5 lg:col-span-1 md:col-span-1 sm:col-span-1'>
                <div className='flex justify-center'><img src={course.cover_img} alt="" /></div>
                <h2 className='text-xl font-semibold text-center mt-4'>{course.course_name}</h2>
                <p className='text-justify text-sm mt-2 text-zinc-600'>{course.details}</p>
                <div className='text-base font-medium mt-2'>
                  <span>Price: {course.price}</span>
                  <br></br>
                  <span >Credit: {course.credit}hr</span>
                </div>
                <div className='flex justify-center items-center'>
                  <button
                    className='w-full p-2 bg-blue-500 rounded-lg text-white hover:bg-blue-700'
                    onClick={() => handleSelectCourse(course)}>
                    {selectedCourses.includes(course) ? 'Selected' : 'Select'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='bg-white rounded-md p-10 col-span-1 lg:mt-[-1000px]'>
          <p className='text-lg text-sky-600 font-bold'>Credit Hour Remaining {creditHourRemaining}hr</p>
          <hr />
          <p className='text-lg font-bold'>Course Name:</p>
          <ul>
            {selectedCourses.map((selectedCourse, index) => (
              <li className='text-xl font-medium border border-indigo-400 rounded-md p-2 m-2 bg-slate-100' key={index}>{selectedCourse.course_name}</li>
            ))}
          </ul>
          <hr />
          <p>Total Credit Hour : {totalCreditHour}</p>
          <hr />
          <p>Total Price : {totalPrice}</p>
        </div>
      </section>
    </div>
  );
}
export default App;