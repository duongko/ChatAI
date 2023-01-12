
import React, { useEffect, useState } from 'react';


import { animateScroll as scroll } from 'react-scroll'
import HiPlus, { HiPlusCircle } from 'react-icons/hi'
import FiMessageSquare, { FiDelete } from 'react-icons/fi'
import BiMessage, { BiBookBookmark, BiPencil } from 'react-icons/bi'

// import { Configuration, OpenAIApi } from "openai";

const { Configuration, OpenAIApi } = require("openai");

const Layout = () => {
    const [chatuser, setchatuse] = useState()
    const [chatsubmit, setchatsubmit] = useState([{ name: "AI", text: "xin chào bạn! Tôi là DƯơng đẹp trai có thể giúp gì dc cho bạn " }])
    const [userinput, setuserinput] = useState()
    const [newchat, setnewchat] = useState(["..................................."])

    //newchat để thêm 1 đoạn thoại khác

    const [list, setlist] = useState([])

    //list để lưu các hội thoại đã nói dựa vào state 'chatsubmit'



    const handlesubmit = (e) => {

        e.preventDefault()
        setchatuse(e.target.value)
        if (chatuser !== undefined) {
            setchatsubmit([...chatsubmit, { name: "user", text: `${chatuser}` }])
            setuserinput(chatuser)
            setchatuse()
        } else {
            alert("bạn hãy nhập câu hỏi")
        }

    }

    useEffect(() => {




        if (userinput !== undefined) callapi()





    }, [userinput])







    const Apikey = "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"

    const callapi = async () => {

        const configuration = new Configuration({
            apiKey: Apikey,
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: userinput,
            max_tokens: 2200,
            temperature: 0.2,
        });

        // const res = await openai.listModels()
        // console.log("api-listmode:", res)
        console.log("api", response.data.choices[0].text)


        if (response.data.choices[0].text) {
            setchatsubmit([...chatsubmit, { name: "AI", text: `${response.data.choices[0].text}` }])
        } else {
            setchatsubmit([...chatsubmit, { name: "AI", text: "I don't know" }])

        }



    }

    const hanldeNewchat = () => {

        setnewchat([...newchat, "..................................."])
        setlist([...list, chatsubmit])
        setchatsubmit([{ name: "AI", text: "xin chào bạn! Tôi là DƯơng đẹp trai có thể giúp gì dc cho bạn " }])
    }
    console.log("list", list)

    const handleDelte = (valuedelete) => {
        let newchats = [...newchat]

        let elementToRemove = valuedelete;
        newchats = newchats.filter((element, index) => index !== elementToRemove);
        setnewchat(newchats)

    }




    return (
        <>
            <div className="container">
                <div id="sidebar">
                    <div className='add-newchat'
                        onClick={() => { hanldeNewchat() }}

                    >

                        <HiPlusCircle /> NEW  CHAT
                    </div>
                    {newchat && newchat.length > 0

                        ? newchat.map((value, index) => {
                            console.log("value:", value);
                            return (


                                <div className='litchat' key={index}>
                                    <BiBookBookmark />{value}<BiPencil /> <FiDelete onClick={() => handleDelte(index)} />

                                </div>
                            )
                        })

                        :
                        <></>

                    }


                </div>

                <div id="chat-window">
                    <div id="chat-header">
                        <h1>ChatGpt</h1>
                    </div>
                    <div id="chat-messages">
                        {/* <div className="message">
                            <p>Xin chào! Tôi có thể giúp gì cho bạn không?</p>
                        </div> */}


                        {chatsubmit && chatsubmit.length > 0
                            ? chatsubmit.map((value, index) => {
                                console.log("value:", value)
                                return (
                                    <>
                                        <div className={value.name == "AI" ? "message user" : "message"} key={index}>
                                            <p>{value.text}</p>
                                        </div>

                                    </>
                                )

                            })
                            :
                            <></>

                        }
                        {/* 
                        <div className="message">
                            <p>dksfksdlfklsd</p>
                        </div> */}
                    </div>
                    <form id="chat-form" onSubmit={(e) => { handlesubmit(e) }}>
                        <input id="chat-input" placeholder="Nhập tin nhắn tại đây" value={chatuser == null ? "" : chatuser}
                            onChange={(e) => { setchatuse(e.target.value) }}

                        />
                        <div id="chat-submit"

                            onClick={(e) => handlesubmit(e)}
                        >Gửi</div>
                    </form>
                </div>


            </div>
        </>
    )
}
export default Layout