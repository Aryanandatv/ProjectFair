import React, { createContext, useState } from 'react'

export const addprojectResponseContext = createContext()
export const editprojectResponseContext = createContext()

function Contextapi({children}) {
    const [addProjectResponse,setAddProjectResponse] = useState("")
    const [editProjectResponse,setEditProjectResponse] = useState("")
  return (
        <>
            <addprojectResponseContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
                <editprojectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
                  {children}
                </editprojectResponseContext.Provider> 
            </addprojectResponseContext.Provider>
        </>
    )
}

export default Contextapi