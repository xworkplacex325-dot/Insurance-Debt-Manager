import { createContext, useEffect, useState } from "react"  
import { createPortal } from "react"

const ModalMenu = createContext()

function Menu ({children}) {
    return <ModalMenu value={{onClose}}>
        
    </ModalMenu>
}

function MenuItem() {
    return 
}