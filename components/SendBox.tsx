import { supabase } from '@/lib/supabaseClient'
import axios from 'axios'
import { useState } from 'react'

export function SendBox() {
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

            <div className='  w-full '>

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