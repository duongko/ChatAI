
import React, { useEffect, useState } from 'react';


import { animateScroll as scroll } from 'react-scroll'
import HiPlus, { HiPlusCircle } from 'react-icons/hi'
import FiMessageSquare, { FiDelete } from 'react-icons/fi'
import BiMessage, { BiBookBookmark, BiPencil } from 'react-icons/bi'

// import { Configuration, OpenAIApi } from "openai";

const { Configuration, OpenAIApi } = require("openai");

const Layout = () => {
    const [chatuser, setchatuse] = useState()
    const [ChatConversation, setChatConversation] = useState([{ name: "AI", text: "xin chào bạn! Tôi là DƯơng đẹp trai có thể giúp gì dc cho bạn " }])
    const [userinput, setuserinput] = useState()
    const [outputchat, setoutoutchat] = useState()
    const [newchat, setnewchat] = useState(["New chat"])

    //newchat để thêm 1 đoạn thoại khác

    const [list, setlist] = useState([])

    //list để lưu các hội thoại đã nói dựa vào state 'ChatConversation'
    const [listchoose, setlistchoose] = useState(0)



    ////////Header


    const [shownavbar, setshownavbar] = useState(false)



    useEffect(() => {


        // if (newchat[0] === undefined) {

        //     setnewchat(["NEWCHAT"])
        //     setChatConversation([{ name: "AI", text: "xin chào bạn! Tôi là DƯơng đẹp trai có thể giúp gì dc cho bạn " }])
        //     setuserinput()


        // }


        if (userinput !== undefined) callapi()

        handlechatUpdate(listchoose)
        setuserinput()


    }, [userinput, outputchat])


    const handlesubmit = (e) => {

        e.preventDefault()

        if (chatuser !== undefined) {

            setChatConversation([...ChatConversation, { name: "user", text: `${chatuser}` }])
            setuserinput(chatuser)
            setchatuse()


            if (newchat[listchoose] === "New chat") {
                let newchatss = [...newchat]
                newchatss[listchoose] = chatuser
                setnewchat(newchatss)
            }

        } else {
            alert("bạn hãy nhập câu hỏi")
        }

    }




    const Apikey = "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"

    const callapi = async () => {

        const configuration = new Configuration({
            apiKey: Apikey,
        });
        const openai = new OpenAIApi(configuration);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: userinput,
            max_tokens: 1300,
            temperature: 0.2,
        });

        if (response.data.choices[0].text) {
            setChatConversation([...ChatConversation, { name: "AI", text: `${response.data.choices[0].text}` }])
            setoutoutchat(response.data.choices[0].text)


        } else {
            setChatConversation([...ChatConversation, { name: "AI", text: "I don't know" }])

        }



    }

    const hanldeNewchat = () => {

        setnewchat(["New chat", ...newchat])
        setlistchoose(0)
        setChatConversation([{ name: "AI", text: "xin chào bạn! Tôi là DƯơng đẹp trai có thể giúp gì dc cho bạn " }])
        setuserinput()
        setlist([[{ name: "AI", text: "xin chào bạn! Tôi là DƯơng đẹp trai có thể giúp gì dc cho bạn " }], ...list])

        setshownavbar(!shownavbar)


    }





    ////xóa dánh sách phần sidebar

    const handleDelte = async (valuedelete) => {
        let newchats = [...newchat]

        let elementToRemove = valuedelete;
        newchats = newchats.filter((element, index) => index !== elementToRemove);

        setnewchat(newchats)

        let listchat = [...list]

        let elementlistToRemove = valuedelete;
        listchat = listchat.filter((element, index) => index !== elementlistToRemove);

        setlist(listchat)
        await valuedelete > 0 ? setChatConversation(list[valuedelete - 1]) : setChatConversation(list[valuedelete + 1])
        setuserinput()

    }



    /// chọn list ở sidebar
    const handleChooseList = (listchooseid) => {

        setlistchoose(listchooseid)


        if (list.length > 0 && list[listchooseid]) {
            setChatConversation(list[listchooseid])

        }
        setshownavbar(!shownavbar)




    }



    const handlechatUpdate = (index) => {


        const updatedchat = [...list];
        updatedchat[index] = ChatConversation;
        setlist(updatedchat);

    }



    //// update tên newlist



    const handleUpdate = (index) => {

        const newText = prompt("Tên Danh Sách :", newchat[index]);
        const updatednewchat = [...newchat];
        updatednewchat[index] = newText;
        setnewchat(updatednewchat);

    }







    // console.log("list", list)
    // console.log("list id: ", list[listchoose])

    // console.log("userinput: ", userinput)

    // console.log("list chooose:", listchoose)

    // console.log("ChatConversation: ", ChatConversation)

    // console.log("newchat", newchat[0])




    return (
        <>
            <div className="container">
                <div className={`sidebar ${shownavbar == false ? '' : "active"}`} >
                    <div className='add-newchat'
                        onClick={() => { hanldeNewchat() }}


                    >

                        <HiPlusCircle /> NEW  CHAT
                    </div>
                    <div className='litchat-container'>

                        {newchat && newchat.length > 0

                            ? newchat.map((value, index) => {
                                // console.log("value:", value);
                                return (



                                    <div className='litchat' key={index}


                                    >
                                        <div className='tilete-chat'

                                            onClick={() => { handleChooseList(index) }}
                                        >
                                            <BiBookBookmark /> {value.substring(0, 22)}

                                        </div>


                                        <div className='newchat'>


                                            <div className='p-1 z-10'>
                                                <BiPencil onClick={() => handleUpdate(index)} />

                                            </div>
                                            <div className='p-1 z-10'>
                                                <FiDelete onClick={() => handleDelte(index)} />
                                            </div>

                                        </div>

                                    </div>



                                )
                            })

                            :
                            <>

                            </>

                        }
                    </div>


                </div>

                <div id="chat-window">
                    <div id="chat-header">

                        <button className={`navbar-menu-btn ${shownavbar == false ? '' : "active"} `}

                            onClick={() => { setshownavbar(!shownavbar) }}
                        >
                            <span className="one"></span>
                            <span className="two"></span>
                            <span className="three"></span>
                        </button>

                        <h1>ChatGpt</h1>
                    </div>
                    <div id="chat-messages">
                        {/* <div className="message">
                            <p>Xin chào! Tôi có thể giúp gì cho bạn không?</p>
                        </div> */}

                        {
                            ChatConversation && ChatConversation.length > 0 ? ChatConversation.map((value, index) => {


                                return (
                                    <>
                                        <div className={value.name == "AI" ? "message user" : "message"} key={index}>
                                            <p>{value.text}</p>

                                        </div>

                                    </>
                                )


                            })

                                :
                                <>
                                    <div className="message">
                                        <p style={{ "color": "red", "font-size": "20px" }}>! Hãy tạo newchat thới mới nói chuyện được với tôi</p>
                                    </div>
                                </>

                        }

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