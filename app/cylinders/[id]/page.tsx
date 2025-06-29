"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Award,
  Users,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Factory,
  Truck,
  User,
  FileText,
  Shield,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
// import { Separator } from "@/components/ui/separator"
import Link from "next/link"

// Mock data - in real app, this would come from API
const mockCylinderData = {
  serialNumber: "369369369",
  dateOfManufacturing: "2021-05-12",
  manufacturer: "ABC Gas Equipments Pvt Ltd",
  manufacturerLocation: "Bhiwadi, Rajasthan",
  lastLifeDate: "2031-05-12",
  qualityScore: "A",
  currentStatus: "Active",
  totalRefills: 18,
  totalCustomersUsed: 4,
  firstFill: {
    date: "2021-06-15",
    company: "Bharat Gas",
    batchNumber: "BG2021-06-15",
  },
  distributor: {
    name: "Rural Bharat Distributors",
    conditionStatus: "Good",
    lastReceivedDate: "2023-09-10",
  },
  customerHistory: [
    {
      customerId: "CUS001",
      deliveryDate: "2021-07-01",
      usageDurationDays: 180,
    },
    {
      customerId: "CUS015",
      deliveryDate: "2022-01-10",
      usageDurationDays: 150,
    },
    {
      customerId: "CUS032",
      deliveryDate: "2022-07-20",
      usageDurationDays: 220,
    },
    {
      customerId: "CUS049",
      deliveryDate: "2023-03-01",
      usageDurationDays: 120,
    },
  ],
  usageHistory: [
    {
      refillNumber: 1,
      refillDate: "2021-07-01",
      weightBefore: 5,
      weightAfter: 29,
      leakTestResult: "Pass",
    },
    {
      refillNumber: 2,
      refillDate: "2021-09-20",
      weightBefore: 4,
      weightAfter: 28,
      leakTestResult: "Pass",
    },
    {
      refillNumber: 3,
      refillDate: "2021-12-15",
      weightBefore: 5,
      weightAfter: 29,
      leakTestResult: "Pass",
    },
    {
      refillNumber: 4,
      refillDate: "2022-03-10",
      weightBefore: 4,
      weightAfter: 28,
      leakTestResult: "Pass",
    },
  ],
  damageLog: [
    {
      damageDate: "2022-10-10",
      description: "Minor dent on lower ring",
      causedBy: "Customer",
      actionTaken: "Repaired",
    },
  ],
  finalRemarks: "Cylinder in good condition. Regular maintenance recommended.",
}

export default function CylinderTrackingPage({ params }: { params: { serialNumber: string } }) {
  const [cylinderData, setCylinderData] = useState(mockCylinderData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500"
      case "inactive":
        return "bg-red-500"
      case "maintenance":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getQualityColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "bg-green-500"
      case "B":
        return "bg-blue-500"
      case "C":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const calculateLifeProgress = () => {
    const manufacturingDate = new Date(cylinderData.dateOfManufacturing)
    const lastLifeDate = new Date(cylinderData.lastLifeDate)
    const currentDate = new Date()

    const totalLife = lastLifeDate.getTime() - manufacturingDate.getTime()
    const usedLife = currentDate.getTime() - manufacturingDate.getTime()

    return Math.min((usedLife / totalLife) * 100, 100)
  }

  const calculateYearsInService = () => {
    const manufacturingDate = new Date(cylinderData.dateOfManufacturing)
    const currentDate = new Date()
    return Math.floor((currentDate.getTime() - manufacturingDate.getTime()) / (1000 * 60 * 60 * 24 * 365))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cylinder information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              {/* <Separator orientation="vertical" className="h-6" /> */}
              <h1 className="text-2xl font-bold text-gray-900">Cylinder Tracking</h1>
            </div>
            <Badge className="bg-blue-500 text-white">
              <Shield className="w-4 h-4 mr-1" />
              Blockchain Verified
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Cylinder {cylinderData.serialNumber}</h2>
                  <p className="text-blue-100 mb-4">
                    Manufacturing Date: {new Date(cylinderData.dateOfManufacturing).toLocaleDateString()}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={`${getStatusColor(cylinderData.currentStatus)} text-white`}>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {cylinderData.currentStatus}
                    </Badge>
                    <Badge className={`${getQualityColor(cylinderData.qualityScore)} text-white`}>
                      <Award className="w-4 h-4 mr-1" />
                      Grade {cylinderData.qualityScore}
                    </Badge>
                  </div>
                </div>
                <div className="mt-6 md:mt-0">
                  <div className="text-right">
                    <p className="text-blue-100 text-sm">Life Remaining</p>
                    <p className="text-2xl font-bold">{Math.round(100 - calculateLifeProgress())}%</p>
                    <Progress value={calculateLifeProgress()} className="w-32 mt-2 bg-blue-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card>
            <CardContent className="p-6 text-center">
              <RotateCcw className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{cylinderData.totalRefills}</p>
              <p className="text-sm text-gray-600">Total Refills</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{cylinderData.totalCustomersUsed}</p>
              <p className="text-sm text-gray-600">Customers Served</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{calculateYearsInService()}</p>
              <p className="text-sm text-gray-600">Years in Service</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{Math.round(100 - calculateLifeProgress())}%</p>
              <p className="text-sm text-gray-600">Life Remaining</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Journey Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          {/* Manufacturing */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Factory className="w-5 h-5 mr-2 text-blue-500" />
                Manufacturing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Manufacturer</p>
                  <p className="font-semibold">{cylinderData.manufacturer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                    {cylinderData.manufacturerLocation}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Life Expires</p>
                  <p className="font-semibold text-orange-600">
                    {new Date(cylinderData.lastLifeDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* First Fill */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Truck className="w-5 h-5 mr-2 text-green-500" />
                First Fill
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Company</p>
                  <p className="font-semibold">{cylinderData.firstFill.company}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                    {new Date(cylinderData.firstFill.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Batch Number</p>
                  <p className="font-semibold text-green-600">{cylinderData.firstFill.batchNumber}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Distributor */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <User className="w-5 h-5 mr-2 text-purple-500" />
                Current Distributor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold">{cylinderData.distributor.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Condition</p>
                  <Badge className="bg-green-100 text-green-800">{cylinderData.distributor.conditionStatus}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Received</p>
                  <p className="font-semibold">
                    {new Date(cylinderData.distributor.lastReceivedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Customer History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-500" />
                Customer History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cylinderData.customerHistory.map((customer, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-blue-600">{customer.customerId}</p>
                      <Badge variant="outline">{customer.usageDurationDays} days</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Delivered: {new Date(customer.deliveryDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Refill History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RotateCcw className="w-5 h-5 mr-2 text-green-500" />
                Refill History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Refill #</th>
                      <th className="text-left py-2">Date</th>
                      <th className="text-left py-2">Weight Before</th>
                      <th className="text-left py-2">Weight After</th>
                      <th className="text-left py-2">Leak Test</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cylinderData.usageHistory.map((refill, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 font-semibold">#{refill.refillNumber}</td>
                        <td className="py-3">{new Date(refill.refillDate).toLocaleDateString()}</td>
                        <td className="py-3">{refill.weightBefore} kg</td>
                        <td className="py-3">{refill.weightAfter} kg</td>
                        <td className="py-3">
                          <Badge
                            className={
                              refill.leakTestResult === "Pass"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {refill.leakTestResult}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Damage Log */}
        {cylinderData.damageLog.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
                  Damage Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cylinderData.damageLog.map((damage, index) => (
                    <div key={index} className="p-4 border-l-4 border-yellow-400 bg-yellow-50 rounded-r-lg">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-semibold text-gray-900">{damage.description}</p>
                        <Badge variant="outline">{new Date(damage.damageDate).toLocaleDateString()}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">Caused by: {damage.causedBy}</p>
                      <p className="text-sm text-green-600 font-semibold">Action: {damage.actionTaken}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Final Remarks */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-gray-500" />
                Final Remarks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{cylinderData.finalRemarks}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
