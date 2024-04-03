import React, { useId } from "react";

function Input({
    label,
    className = '',
    type,
    ...props


}) {
    const id = useId()
    return (
        <>
            <div className="">


                <input type={type} className={` w-full  flex bg-slate-200 rounded-lg  ${className}`} {...props} id={id} />
            </div>
        </>
    )
}

export default Input