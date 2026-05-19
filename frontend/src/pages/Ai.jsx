import React from 'react'
import ai from "../assetss/ai.jpg"
import { useNavigate } from "react-router-dom";

function Ai() {
     const navigate = useNavigate();
function speak(message) {
    const utterance = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterance)
  }


  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()

  if(!recognition){
     console.log("not supported")
  }

//   recognition.onresult = (event) => {
//     const transcript = event.results[0][0].transcript.trim()
//     console.log("Transcript:", transcript)
//     // You can add logic here to handle user vs LLM dialogue separation
//   }

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.trim()
    console.log("User:", transcript)

    // Voice navigation logic
    if (
      transcript.toLowerCase().includes("collection") ||
      transcript.toLowerCase().includes("collections") ||
      transcript.toLowerCase().includes("product") ||
      transcript.toLowerCase().includes("products")
    ) {
      speak("Opening collection page")
      navigate("/collection")
    } else if (
      transcript.toLowerCase().includes("about") ||
      transcript.toLowerCase().includes("aboutpage")
    ) {
      speak("Opening about page")
      navigate("/about")
     
    }else if (
      transcript.toLowerCase().includes("contact") ||
      transcript.toLowerCase().includes("contactpages")
    ) {
      speak("Opening contact page")
      navigate("/contact")
     
    }  else if (
      transcript.toLowerCase().includes("mycart") ||
      transcript.toLowerCase().includes("cart")
    ) {
      speak("Opening cart page")
      navigate("/cart")
     
    }  
    else if (
      transcript.toLowerCase().includes("myorder") ||
      transcript.toLowerCase().includes("order")
    ) {
      speak("Opening order page")
      navigate("/orders")
     
    }  
    
    else {
      speak("Sorry, I didn't understand that")
    }
  }

  return (
    <div
  className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]"
  onClick={() => recognition.start()}
>
  <img
    src={ai}
    alt="AI Icon"
    className="w-[100px] h-[100px] rounded-full object-cover cursor-pointer"
  />
</div>
  )
}

export default Ai
