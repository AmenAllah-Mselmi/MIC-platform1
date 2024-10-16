"use client";
import { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useInstructorStore } from '@/app/store/MyStore/InstructorStore';
import { useDepartmentStore } from '@/app/store/MyStore/DepartementStore'; // Import the Zustand store

type UpdateInstructorProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  id: string;
};

const UpdateInstructorModal: React.FC<UpdateInstructorProps> = ({ isOpen, onRequestClose, id }) => {
  const [instructorName, setInstructorName] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const inputRef = useRef<HTMLInputElement>(null); // Input reference for focus control

  // Zustand actions to update instructor and get departments
  const updateInstructor = useInstructorStore((state) => state.updateInstructor);
  const departments = useDepartmentStore((state) => state.departments);
  const instructors = useInstructorStore((state) => state.instructors);

  // Fetch the instructor details from Zustand store when the modal is opened
  useEffect(() => {
    if (isOpen) {
      const instructor = instructors.find((inst) => inst._id === id);
      if (instructor) {
        setInstructorName(instructor.NomPrenom);
        setDepartmentId(instructor.DepartmentId); // Set the initial department ID
      }
      // Set focus on input when modal opens
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [id, isOpen, instructors]);

  // Handle form submission to update the instructor
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedInstructor = {
      NomPrenom: instructorName,
      DepartmentId: departmentId,
    };

    try {
      await updateInstructor(id, updatedInstructor); // Call the Zustand action
      alert('Instructor updated successfully!');
      window.location.reload(); // Refresh the page or you can handle state update here
      onRequestClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error updating the instructor:', error);
      alert('Failed to update the instructor. Please try again.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false} // Prevent react-modal from hiding other content (helps with focus issues)
      className="flex justify-center items-center w-full h-full"
    >
      <main className="bg-white flex justify-evenly items-center flex-col mt-14 h-[500px] w-[400px] relative">
        <FontAwesomeIcon
          icon={faTimes}
          className="absolute top-3 right-2 text-black w-4 h-4 font-bold cursor-pointer"
          onClick={onRequestClose}
        />
        <h1 className="text-blue-400 font-bold text-xl">Update Instructor</h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          {/* Input field for Instructor Name */}
          <div className="w-5/6 mb-2">
            <label htmlFor="instructor-name" className="block mb-1">
              Instructor Name:
            </label>
            <input
              ref={inputRef} // Input reference for focus
              type="text"
              id="instructor-name"
              value={instructorName}
              onChange={(e) => setInstructorName(e.target.value)}
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>

          {/* Select for Department */}
          <div className="w-5/6 mb-2">
            <label htmlFor="department" className="block mb-1">
              Department:
            </label>
            <select
              id="department"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              className="border border-gray-300 p-2 w-full"
              required
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.DepartmentName}
                </option>
              ))}
            </select>
          </div>

          {/* Submit button */}
          <button className="bg-blue-500 text-white px-4 py-2 mt-4 w-5/6 rounded-md border-none text-xl" type="submit">
            Update
          </button>
        </form>
      </main>
    </Modal>
  );
};

export default UpdateInstructorModal;
