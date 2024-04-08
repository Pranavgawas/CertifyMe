import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function InputField() {
  const [recipientName, setRecipientName] = useState('');
  const [course, setCourse] = useState('');
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setRecipientName(e.target.value);
  };

  const handleCourseChange = (e) => {
    setCourse(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/Certificate', { state: { recipientName, course, canvasRef } });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-10 bg-white shadow-md rounded-md">
        <label className="input input-bordered flex items-center gap-2 mb-4">
          Name
          <input
            type="text"
            className="grow"
            placeholder="Recipient Name"
            value={recipientName}
            onChange={handleNameChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          Course
          <input
            type="text"
            className="grow"
            placeholder="Course Name"
            value={course}
            onChange={handleCourseChange}
          />
        </label>
        <div className="text-center">
          <button type="submit" className="btn btn-outline btn-success">
            Generate Certificate
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputField;