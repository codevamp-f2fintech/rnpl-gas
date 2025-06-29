"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Maximize,
  Mic,
  MicOff,
  Send,
  Bot,
  User,
  Phone,
  MessageCircle,
  Headphones,
  Video,
  Sparkles,
} from "lucide-react"

export default function VideoAssistantPage() {
  // Video player state
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Audio player state
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [isAudioMuted, setIsAudioMuted] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Chat state
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "bot",
      message: "Hello! I'm your AI assistant for Ghar Ghar Gas. How can I help you today?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isVoiceListening, setIsVoiceListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  // Video controls
  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted
      setIsVideoMuted(!isVideoMuted)
    }
  }

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      setVideoProgress(0)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  // Audio controls
  const toggleAudioPlay = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsAudioPlaying(!isAudioPlaying)
    }
  }

  const toggleAudioMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isAudioMuted
      setIsAudioMuted(!isAudioMuted)
    }
  }

  // Chat functions
  const sendMessage = () => {
    if (currentMessage.trim()) {
      const newUserMessage = {
        id: chatMessages.length + 1,
        type: "user",
        message: currentMessage,
        timestamp: new Date().toLocaleTimeString(),
      }

      setChatMessages((prev) => [...prev, newUserMessage])
      setCurrentMessage("")
      setIsTyping(true)

      // Simulate AI response
      setTimeout(() => {
        const responses = [
          "Thank you for your inquiry! I'd be happy to help you with your LPG connection needs.",
          "Our plans start from just ₹850 with no service charge. Would you like to know more about our offerings?",
          "You can get instant approval for your LPG connection. Shall I guide you through the application process?",
          "We offer both domestic and commercial LPG solutions. Which one interests you?",
          "Our customer service is available 24/7. How else can I assist you today?",
        ]

        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        const botMessage = {
          id: chatMessages.length + 2,
          type: "bot",
          message: randomResponse,
          timestamp: new Date().toLocaleTimeString(),
        }

        setChatMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      }, 2000)
    }
  }

  const toggleVoiceListening = () => {
    setIsVoiceListening(!isVoiceListening)
    if (!isVoiceListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setCurrentMessage("I want to know about your LPG plans")
        setIsVoiceListening(false)
      }, 3000)
    }
  }

  const quickActions = [
    "Check LPG plans",
    "New connection process",
    "Refill booking",
    "Customer support",
    "Track my order",
  ]

  const handleQuickAction = (action: string) => {
    setCurrentMessage(action)
    sendMessage()
  }

  // Update progress bars
  useEffect(() => {
    const updateVideoProgress = () => {
      if (videoRef.current) {
        const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
        setVideoProgress(progress || 0)
      }
    }

    const updateAudioProgress = () => {
      if (audioRef.current) {
        const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100
        setAudioProgress(progress || 0)
      }
    }

    const videoElement = videoRef.current
    const audioElement = audioRef.current

    if (videoElement) {
      videoElement.addEventListener("timeupdate", updateVideoProgress)
      videoElement.addEventListener("ended", () => setIsVideoPlaying(false))
    }

    if (audioElement) {
      audioElement.addEventListener("timeupdate", updateAudioProgress)
      audioElement.addEventListener("ended", () => setIsAudioPlaying(false))
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", updateVideoProgress)
        videoElement.removeEventListener("ended", () => setIsVideoPlaying(false))
      }
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", updateAudioProgress)
        audioElement.removeEventListener("ended", () => setIsAudioPlaying(false))
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Video Intro & AI Assistant
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch our introduction video and chat with our AI assistant for instant help with your LPG needs
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Video Section */}
          <div className="space-y-6">
            {/* Video Player */}
            <Card className="overflow-hidden shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Introduction Video
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative bg-black aspect-video group">
                  <video ref={videoRef} className="w-full h-full object-cover" poster="/video-thumbnail.jpg">
                    <source src="/intro-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video Controls Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={toggleVideoPlay}
                        size="lg"
                        className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
                      >
                        {isVideoPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      </Button>
                      <Button
                        onClick={toggleVideoMute}
                        size="lg"
                        className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
                      >
                        {isVideoMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                      </Button>
                      <Button
                        onClick={restartVideo}
                        size="lg"
                        className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
                      >
                        <RotateCcw className="h-6 w-6" />
                      </Button>
                      <Button
                        onClick={toggleFullscreen}
                        size="lg"
                        className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
                      >
                        <Maximize className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${videoProgress}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Audio Assistant */}
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Headphones className="h-5 w-5" />
                  Voice Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div
                      className={`relative p-8 rounded-full transition-all duration-300 ${
                        isAudioPlaying ? "bg-gradient-to-r from-green-400 to-teal-500 animate-pulse" : "bg-gray-100"
                      }`}
                    >
                      <div
                        className={`absolute inset-0 rounded-full ${
                          isAudioPlaying ? "animate-ping bg-green-400 opacity-20" : ""
                        }`}
                      ></div>
                      <Headphones
                        className={`h-12 w-12 relative z-10 ${isAudioPlaying ? "text-white" : "text-gray-600"}`}
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-600 mb-4">
                      {isAudioPlaying ? "AI Assistant is speaking..." : "Click to hear our AI assistant introduction"}
                    </p>

                    <div className="flex items-center justify-center gap-4">
                      <Button
                        onClick={toggleAudioPlay}
                        className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
                      >
                        {isAudioPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                        {isAudioPlaying ? "Pause" : "Play"}
                      </Button>

                      <Button onClick={toggleAudioMute} variant="outline">
                        {isAudioMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                    </div>

                    {/* Audio Progress Bar */}
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-full transition-all duration-300"
                          style={{ width: `${audioProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <audio ref={audioRef} preload="auto">
                    <source src="/ai-assistant-voice.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Chat Assistant */}
          <div className="space-y-6">
            <Card className="h-[600px] flex flex-col shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  AI Chat Assistant
                  <Badge className="bg-white bg-opacity-20 text-white ml-auto">Online</Badge>
                </CardTitle>
              </CardHeader>

              {/* Chat Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex gap-3 max-w-[80%] ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          msg.type === "user" ? "bg-blue-500" : "bg-gradient-to-r from-purple-500 to-pink-500"
                        }`}
                      >
                        {msg.type === "user" ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          msg.type === "user"
                            ? "bg-blue-500 text-white rounded-br-sm"
                            : "bg-gray-100 text-gray-800 rounded-bl-sm"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${msg.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>

              {/* <Separator /> */}

              {/* Quick Actions */}
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-2">Quick actions:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action)}
                      className="text-xs"
                    >
                      {action}
                    </Button>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Type your message..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
                    />
                    <Button
                      onClick={toggleVoiceListening}
                      size="sm"
                      variant="ghost"
                      className={`absolute right-1 top-1 rounded-full ${
                        isVoiceListening ? "text-red-500 animate-pulse" : "text-gray-400"
                      }`}
                    >
                      {isVoiceListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Button
                    onClick={sendMessage}
                    className="rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {isVoiceListening && (
                  <div className="mt-2 text-center">
                    <div className="inline-flex items-center gap-2 text-red-500 text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      Listening...
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Contact Options */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Need Human Support?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">Our customer service team is available 24/7 to help you.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
