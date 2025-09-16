"use client"


import { useState } from "react"
import { FaPaperPlane } from "react-icons/fa"

interface InputBoxProps {
  onSubmit: (phone: string) => void
}

export default function InputBox({ onSubmit }: InputBoxProps) {
  const [phone, setPhone] = useState("")
  const [loader, setLoader] = useState(false)
  const [success, setSuccess] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoader(true)
    if (!phone || !/^(\+91\d{10}|\d{10})$/.test(phone)) {
      alert("Please enter a valid phone number")
    
      setLoader(false)
      return
    }
    const responsees = await fetch('https://rajabackend.srikrishnatechhub.com/request-callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({phone})
    })
    // console.log(responsees)
    
     setLoader(false)
    if (responsees.ok){
      setSuccess(true)
      
      setTimeout(() => {setSuccess(false)
      onSubmit(phone)
      }, 2000)
    }
   
    
    setPhone("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-green-500 rounded-full overflow-hidden ml-4 w-[300px] border shadow-md"
    >
      
     <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter your phone number"
        className="flex-1 px-3 py-2 text-gray-600 dark:text-gray-300 outline-none"
        required
      />
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 flex items-center gap-1"
      >
        {loader ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                            ) : (
                               <FaPaperPlane />
                            )}
      </button>
      {success && (
        <div className="absolute top-0 right-0 mt-2 mr-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm shadow-lg">
          Sent!
        </div>
      )}
    </form>
  )
}
