import { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VoiceAssistant = () => {
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setListening(true);
    toast.info("🎤 Listening...");

    recognition.start();

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase().trim();

      console.log("Voice Command:", command);

      if (
        command.includes("home") ||
        command.includes("go to home")
      ) {
        toast.success("Opening Home");
        navigate("/");
      } else if (
        command.includes("cart") ||
        command.includes("go to cart")
      ) {
        toast.success("Opening Cart");
        navigate("/cart");
      } else if (
        command.includes("checkout")
      ) {
        toast.success("Opening Checkout");
        navigate("/checkout");
      } else if (
        command.includes("profile")
      ) {
        toast.success("Opening Profile");
        navigate("/profile");
      } else if (
        command.includes("login")
      ) {
        toast.success("Opening Login");
        navigate("/login");
      } else if (
        command.includes("register")
      ) {
        toast.success("Opening Register");
        navigate("/register");
      } else if (
        command.includes("orders") ||
        command.includes("my orders")
      ) {
        toast.success("Opening My Orders");
        navigate("/my-orders");
      } else if (
        command.includes("admin")
      ) {
        toast.success("Opening Admin");
        navigate("/admin");
      } else {
        toast.error("Command not recognized.");
      }

      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
      toast.error("Voice recognition failed.");
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <button
      onClick={startListening}
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition ${
        listening
          ? "bg-red-500 animate-pulse"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      <FaMicrophone size={22} />
    </button>
  );
};

export default VoiceAssistant;