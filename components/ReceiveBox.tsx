'use client'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'

export function ReceiveBox() {
    const [code, setCode] = useState("")
    const [message, setMessage] = useState("")

    const getMessage = async () => {

        const res = await axios.get(`api/receive?code=${code.toUpperCase()}`)

        if (res.status == 200) {
            setMessage(res.data.message)
        }

    }
    const url = `https://wuzyjjpsxprqujastctb.supabase.co/storage/v1/object/public/swift-send/${message}`


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
