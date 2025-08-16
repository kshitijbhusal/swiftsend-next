'use client'
import Link from 'next/link';
import { ChartLineLinear } from '../components/InflationCard'
import { SessionProvider, useSession, signIn, signOut } from 'next-auth/react';
import { InterestCard } from '@/components/InterestCard';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';


//Box _specefic imports 
import axios from 'axios';
import { Send, Download, Sun, Moon } from 'lucide-react';
import Image from 'next/image';


export default function page() {




  const [currentTab, setCurrentTab] = useState("send")

  function toggleTheme() {
    document.documentElement.classList.toggle('dark')
  }
  return (
    <div className=' md:h-screen'>
      <div className='md:p-4 p-2 '>
        <div className='bg-background-focus p-4 rounded-xl flex justify-between '>
          <span className='text-2xl font-bold text-text-focus'>SwiftSend</span>
          <button className='text-text-focus' onClick={toggleTheme} > <Sun /> <Moon /> </button>
        </div>

      </div>

      <div className='flex flex-row p-4 '>

        <section className=' w-full  rounded-xl p-4 shadow-2xl border-border-focus  bg-background-focus '>
          <div className='flex justify-around  gap-4  md:gap-x-32 mb-16'>

            <button
              className={`border border-border-muted inline-block w-full p-2 rounded-xl text-text-focus text-2xl ${currentTab === "send" ? "bg-sky-500/40 " : " "}`}
              onClick={() => { setCurrentTab("send") }}
            >
              <span className='flex gap-x-2 justify-center '>
                <span>

                  <Send />
                </span>

                <span>SEND</span>

              </span>
            </button>



            <button className={`border border-border-muted inline-block  w-full p-2 rounded-xl text-text-focus text-2xl ${currentTab === "receive" ? "bg-sky-500/40 " : ""}`} onClick={() => { setCurrentTab("receive") }} >
              <span className='flex gap-x-2 justify-center '>
                <span>

                  <Download />
                </span>

                <span>RECEIVE</span>

              </span></button>

          </div>


          <section>
            {currentTab == "send" ? <SendBox /> : <ReceiveBox />}
          </section>

        </section>

      </div>

    </div>
  )


}



function SendBox() {
  const [message, setMessage] = useState("")
  const [files, setFiles] = useState<File>()
  const [messageCode, setMessageCode] = useState("")
  const [currentSendType, setCurrentSendType] = useState("text")

  const sendMessage = async () => {

    if (currentSendType == 'text') {
      const res = await axios.post('api/send', {
        message: message
      })

      if (res.status == 200) {
        setMessageCode(res.data.messageCode)
      }

    }


    if (currentSendType == 'files' && files) {

      const fileName = files.name



      const { data, error } = await supabase.storage.from("swift-send").upload(fileName, files)

      if (data) {
        console.log(data.id)
        const res = await axios.post('api/send', {
          message: data?.path
        })

        if (res.status == 200) {
          setMessageCode(res.data.messageCode)
        }


      }
      console.log('datais', data)
      console.log('error is', error)

    }



  }

  return (
    <section className=' py-4 px-12 flex flex-col gap-y-2 items-center  '>
      <h1 className='text-4xl font-semibold text-text-focus '>Please Send any text and you will get the 4 digit code</h1>
      <section className='flex gap-x-4'>
        <div>
          <input onClick={() => { setCurrentSendType("text") }} defaultChecked id="text" type="radio" name="inputType" />
          <label htmlFor="text"> Text</label>
        </div>

        <div>
          <input onClick={() => { setCurrentSendType("files") }} id="file" type="radio" name="inputType" />
          <label htmlFor="file"> Files</label>
        </div>
      </section>

      <div className=' bg-red-500 w-full '>

        {currentSendType == 'text' && (
          <textarea
            onChange={(e) => { setMessage(e.target.value) }}
            className='border-1 border-border-muted bg-background-focus/50 text-text-focus rounded-2xl p-4 outline-none h-24 w-full mt-12' />
        )}



        {currentSendType == 'files' && (
          <input
            onChange={(e) => {
              setFiles(e.target.files?.[0])

            }}
            type="file"
            className=''
            accept='image/*,.pdf,'
          />)}

      </div>

      <br />
      <div className=' w-full flex justify-between p-2'>
        {messageCode && <p className='text-base text-text-muted '>Your message code is : {messageCode}</p>}

        <button onClick={sendMessage} className='px-3 py-1 rounded bg-sky-500/80  text-white border border-border-muted font-semibold cursor-pointer w-fit' >Send</button>
      </div>
    </section>
  )
}

function ReceiveBox() {
  const [code, setCode] = useState("")
  const [message, setMessage] = useState("")

  const getMessage = async () => {

    const res = await axios.get(`api/receive?code=${code.toUpperCase()}`)

    if (res.status == 200) {
      setMessage(res.data.message)
    }

  }
  const url = `https://wuzyjjpsxprqujastctb.supabase.co/storage/v1/object/public/swift-send/${message}`
  // const url = `https://images.unsplash.com/photo-1626808642875-0aa545482dfb?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`


  return (
    <section className=' py-4 px-12 flex flex-col gap-y-2 items-center'>
      <h1 className='text-text-focus text-4xl font-semibold '>Enter the message code to get the message.</h1>

      <div className=' w-full flex justify-center gap-x-4 p-2 mt-12' >
        <input onChange={(e) => { setCode(e.target.value) }} placeholder=' E4AC' className='border p-2  text-text-focus text-xl outline-none border-zinc-500 rounded-xl w-32 uppercase font-semibold' type="text" />

        <button onClick={getMessage} className='px-2 py-1 rounded-xl bg-sky-500/80 text-white font-semibold cursor-pointer w-32' >Get Message</button>
      </div>
      <div>
        {message && (
          <section>

            <textarea value={message} readOnly={true} className='border-1 border-stone-600 rounded-2xl px-2 py-2 outline-none h-24 w-full mt-4' />
            <button>copy</button>

            <div>

              <Image src={url} alt="Uploaded file" width={100} height={100} />


            </div>
          </section>


        )}


      </div>

      <br />

    </section>
  )
}
