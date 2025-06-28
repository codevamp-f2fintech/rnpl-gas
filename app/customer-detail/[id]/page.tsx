"use client"

import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "next/navigation"

import DataCollectionForm from "@/components/data-collection-form"
import VerificationForm from "@/components/verificaton"

export default function CustomerDetail() {
  const params = useParams()
  const customerId = params.id // URL: /customer-detail/[id]

  const [isAssessmentComplete, setIsAssessmentComplete] = useState(
    () => localStorage.getItem("assessmentComplete") === "true"
  )
  const [isVerificationComplete, setIsVerificationComplete] = useState(
    () => localStorage.getItem("verificationComplete") === "true"
  )

  const handleAssessmentSubmit = async (data: any) => {
    console.log("assessment data", data)
    try {
      const res = await fetch(`/api/customer-assessment/${customerId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await res.json()
      if (res.ok) {
        alert("Assessment data saved successfully!")
        setIsAssessmentComplete(true)
      } else {
        alert(result.message || "Failed to save assessment data")
      }
    } catch (error) {
      console.error("Error submitting assessment form:", error)
      alert("Something went wrong with assessment submission.")
    }
  }

  const handleVerificationSubmit = async (data: any) => {
    console.log("verification data", data)
    try {
      // Optional: Add request timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      const res = await fetch(`/api/customer-verification/${customerId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const result = await res.json()
      if (res.ok) {
        alert("Verification data saved successfully!")
        setIsVerificationComplete(true)
      } else {
        alert(result.message || "Failed to save verification data")
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        alert("Request timed out. Please try again.")
      } else {
        console.error("Error submitting verification form:", error)
        alert("Something went wrong with verification submission.")
      }
    }
  }

  useEffect(() => {
    localStorage.setItem("assessmentComplete", String(isAssessmentComplete))
  }, [isAssessmentComplete])

  useEffect(() => {
    localStorage.setItem("verificationComplete", String(isVerificationComplete))
  }, [isVerificationComplete])

  useEffect(() => {
    if (isAssessmentComplete || isVerificationComplete) {
      const confirmResubmission = window.confirm(
        "You have already completed this form. Do you want to resubmit? This will clear previous data."
      )
      if (!confirmResubmission) {
        // Optional: redirect user or disable the form
        window.history.back()
      } else {
        // Clear flags if user confirms resubmission
        localStorage.removeItem("assessmentComplete")
        localStorage.removeItem("verificationComplete")
        setIsAssessmentComplete(false)
        setIsVerificationComplete(false)
      }
    }
  }, [])


  return (
    <div className="m-20">
      {!isAssessmentComplete && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Customer Assessment</h2>
          <DataCollectionForm onSubmit={handleAssessmentSubmit} />
        </div>
      )}

      {isAssessmentComplete && !isVerificationComplete && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Customer Verification</h2>
          <VerificationForm onSubmit={handleVerificationSubmit} />
        </div>
      )}

      {isVerificationComplete && (
        <div className="text-center py-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Process Complete!</h3>
            <p className="text-green-600">
              Both customer assessment and verification have been completed successfully.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
