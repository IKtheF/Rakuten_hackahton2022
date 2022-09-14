import './App.css';
import { useEffect, useState } from 'react';
import getNowTime from "./Utils/Util"

function ChatBox(props) {
  const my_user_id = props.user_id;
  const item_id = props.item_id;
  const my_user_name = props.user_name;

  // This will get all of message that API provide and render all.
  const [state, setState] = useState([]);
  const [text, setText] = useState(""); // for handle text inputed form

  // CAll API HERE
  // TODO : CALL GET REGULUARY
  // For now, just read json and sparse that data.
  useEffect(() => {
    // useEffect自体ではasyncの関数を受け取れないので内部で関数を定義して呼び出す。
    const access_db = async () => {
        const response = await import("./chat_data.json");
        console.log(response.default['message-list'][0].user_id)

        setState(
            response.default['message-list']
        ); // stateに反映する        
    };
    access_db(); 
  }, []);

  // Update state value with Input Area and Send Data to API
  const onClickSendText = () => {
    if (text.length <= 2) {
        // The code that summon message "Message must have 2 text at least"
    }else{
        const now_date = getNowTime()
        console.log("Now Date is : " + `${now_date}`)
        const messageInfo = {
            user_id : my_user_id, user_name : my_user_name,
            user_icon : "NoImage", date : now_date,
            message : text,
        }
        setState(
            [...state, messageInfo]
            );
        setText("");
        ////////////////////////////////////////////
        // To be Implemented
        // 
        // POST API Calls to send current message
        // 
        // TODO : define data format
        //  -  send all data? or only new comming data?
        //
        ////////////////////////////////////////////
    }
  }


  // After rendering, scroll to lowest
  useEffect(() => {
    try {
        const el = document.getElementById(`chat-scroll-area`);
        el.scrollTo(0, el.scrollHeight);
      } catch (error) {
        console.log("Error : Trying to get value of have not rendered")
      }
  });

  console.log("This is state here")
  console.log(state)


  if (Object.keys(state).length >=1){
    console.log("We have " + Object.keys(state).length + " MSGs")
    const list = []
    var i = 0;
    for (i=0 ; i < Object.keys(state).length ; i++) {
      //var hhmmdate = state[i].date.toString().slice(8, 10) + ":" + state[i].date.toString().slice(10, 12);
      var hhmmdate = state[i].date.slice(8, 10) + ":" + state[i].date.slice(10, 12);
      //console.log({my_user_id})
      //console.log(state[i].user_id)
      if (state[i].user_id == my_user_id){
        // if me
        list.push(
        <div className='EachMSGfromMe'>
            <p className='ChatName'> You </p>
            <p className='ChatContent'> {state[i].message}</p>
            <p className='ChatMSGDate'>{hhmmdate}</p>
        </div>)
      }else{
        // other
        list.push(
        <div className='EachMSG'>
            <p className='ChatName'>{state[i].user_name}</p>
            <p className='ChatContent'> {state[i].message}</p>
            <p className='ChatMSGDate'>{hhmmdate}</p>
        </div>)
      }
    }
    console.log(list)
    
    return (
        <div className="ChatBoxArea">
            <div className='ChatMessageArea' id = "chat-scroll-area">
                {list}
            </div>
            <div className="ChatInputForm">
                <div className="ChatInputTextForm">
                <input value={text}
                    onChange={(event) => setText(event.target.value)} 
                    minlength="2" maxlength="40" size="10" className='InputForm'>
                </input>
                </div>
                <div className="ChatSendFormArea">
                    <button onClick={onClickSendText} className="ChatSendForm"> Send </button>
                </div>
            </div>
        </div>
      );    
  }else{
    console.log("We have No MSGs")
    return (
        <div className="ChatBoxArea">
            <p>No Message</p>
        </div>
      );
  }

}

export default ChatBox;