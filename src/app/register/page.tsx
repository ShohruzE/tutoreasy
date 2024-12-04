'use client';
// use state is a client feature
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react";




export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulating API call
    setTimeout(() => setIsLoading(false), 2000)
    // call to function to create user goes here
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 via-primary-green to-secondary-green flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
      </div>
      
      <div className="relative">
        <div className="bg-green-900/30 backdrop-blur-md rounded-3xl p-8 w-full max-w-md border border-green-200/20 shadow-2xl ">
          <div className="flex items-center justify-center mb-8">
            <h1 className="text-3xl font-bold text-green-100 ">Register for TutorEasy</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-green-100">Academic Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-green-800/20 border-green-200/30  placeholder-grey-100 text-white"
                placeholder="professor@university.edu"
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-green-100">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-green-800/20 border-green-200/30 placeholder-grey-100 text-white "
                placeholder="Enter your secure password"
              />
            </div>
            
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="text-white w-full bg-gradient-to-r from-green-600 to-orange-700 hover:from-green-700 hover:to-orange-800
              font-bold py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Submit
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-green-200/20 text-center">
            <p className="text-green-200/70 mb-2">New to TutorEasy?</p>
            <a href="mailto:nathanrvazquez@gmail.com">
            <Button variant="outline" className="text-black border-green-200/50 hover:bg-green-100/50">
              Request Institutional Access
            </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}