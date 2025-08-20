'use client'

import { useState } from 'react';






import { Send, Download, Sun, Moon } from 'lucide-react';

import { SendBox } from '@/components/SendBox';
import { ReceiveBox } from '@/components/ReceiveBox';


export default function Page() {
  const [currentTab, setCurrentTab] = useState("send")
  const [theme, setTheme] = useState(true)

  function toggleTheme() {
    document.documentElement.classList.toggle("dark")
    setTheme(!theme)
  }
  return (
    <div className=' md:h-screen'>
      <div className='md:p-4 p-2 '>
        <div className='bg-background-focus p-4 rounded-xl flex justify-between mt-2 '>
          <span className='text-2xl font-bold text-text-focus'>SwiftSend</span>
          <button className='text-text-focus' onClick={toggleTheme} >{theme ? (<Moon />) : (<Sun />)}  </button>
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




