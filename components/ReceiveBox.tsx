
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'

export function ReceiveBox() {
    const [code, setCode] = useState("")
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")

    const getMessage = async () => {

        const res = await axios.get(`api/receive?code=${code.toUpperCase()}`)

        if (res.status == 200) {
            setMessage(res.data.message)
            setType(res.data.type)
            console.log('res is', res.data.type)
        }

    }
    const url = `https://wuzyjjpsxprqujastctb.supabase.co/storage/v1/object/public/swift-send/${message}`
    console.log('the src url is', url)

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = url;
        link.download = message;
        link.click();

    }

    return (
        <section className=' py-4 px-12 flex flex-col gap-y-2 items-center'>
            <h1 className='text-text-focus text-center text-4xl font-semibold '>
                <span>Enter the code to get the </span>
                <br />
                <span> message or files.</span>
            </h1>

            <div className=' w-full flex justify-center gap-x-4 p-2 mt-12' >
                <input onChange={(e) => { setCode(e.target.value) }} placeholder=' E4AC' className='border p-2  text-text-focus text-xl outline-none border-zinc-500 rounded-xl w-32 uppercase font-semibold' type="text" />

                <button onClick={getMessage} className='px-2 py-1 rounded-xl bg-sky-500/80 text-white font-semibold cursor-pointer w-32' >Get Message</button>
            </div>
            <div>
                {message && (
                    <section>

                        {
                            type == 'text' ? (
                                <div>
                                    <textarea value={message} readOnly={true} className='border-1 border-stone-600 rounded-2xl px-2 py-2 outline-none h-24 w-full mt-4' />
                                    <button>copy</button>
                                </div>

                            ) : (
                                <div>
                                    <iframe
                                        src={url} // put the pdf in /public/sample.pdf
                                        height={500}
                                        width={500}


                                    />

                                    <button onClick={handleDownload} className='bg-green-500 text-white px-2 py-1 rounded-md border-none ' >Download</button>

                                </div>

                            )
                        }






                    </section>


                )}


            </div>

            <br />

        </section>
    )
}
