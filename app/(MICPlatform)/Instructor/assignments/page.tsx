import React from 'react'
import AssignmentCard from '../../_MICcomponents/assignment_UI/AssignmentCard'
import Editor from '../../_MICcomponents/RichTextEditor/NovelEditor'
const page = () => {
  return (
    <div className=''>
      <AssignmentCard />
      <AssignmentCard />
      <AssignmentCard />
      <AssignmentCard />
      <AssignmentCard />
      <Editor />
    </div>
  )
}

export default page
