"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Camera,
  User,
  FileText,
  Home,
  CheckCircle,
  AlertTriangle,
  Receipt,
  BookText,
  DollarSign,
  Users,
  Wallet,
  Calendar,
  FuelIcon as Gas,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox" // Import Checkbox

interface VerificationFormProps {
  onSubmit: (data: any) => void
}

export default function VerificationForm({ onSubmit }: VerificationFormProps) {
  const [step, setStep] = useState(1)
  const totalSteps = 11 // Updated total steps

  const [userPhoto, setUserPhoto] = useState<string | null>(null)
  const [idPhoto, setIdPhoto] = useState<string | null>(null)
  const [assetPhotos, setAssetPhotos] = useState<string[]>([])
  const [vehicleRegistrationNumber, setVehicleRegistrationNumber] = useState("")
  const [digitalFootprintPhone, setDigitalFootprintPhone] = useState("")
  const [utilityBills, setUtilityBills] = useState<string[]>([])
  const [rationCard, setRationCard] = useState<string | null>(null)
  const [incomeProof, setIncomeProof] = useState<string[]>([])
  const [dependantsProof, setDependantsProof] = useState<string[]>([])
  const [emergencyFundProof, setEmergencyFundProof] = useState<string[]>([])
  const [incomeFrequencyProof, setIncomeFrequencyProof] = useState<string[]>([])
  const [gasConnectionNumber, setGasConnectionNumber] = useState("")
  const [gasBook, setGasBook] = useState<string | null>(null)

  const [consents, setConsents] = useState({
    dataUsage: false,
    verification: false,
    assetPhotos: false,
    creditInfo: false,
    accountAggregator: false, // New consent
  })

  // Helper function to convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Helper function to compress image
  const compressImage = (file, maxWidth = 800, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        // Draw and compress
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(resolve, 'image/jpeg', quality);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  // Main photo capture function
  const handlePhotoCapture = async (
    type:
      | "user"
      | "id"
      | "asset"
      | "utilityBill"
      | "rationCard"
      | "incomeProof"
      | "dependantsProof"
      | "emergencyFundProof"
      | "incomeFrequencyProof"
      | "gasBook",
  ) => {
    try {
      // Create file input element
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';

      // Add capture attribute for mobile camera access
      input.capture = 'environment'; // Use back camera

      // Handle file selection
      input.onchange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
          // Validate file type
          if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file');
            return;
          }

          // Validate file size (max 5MB)
          if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
          }

          // Compress image
          const compressedFile = await compressImage(file);

          // Convert to base64
          const base64Image = await fileToBase64(compressedFile);

          // Update state based on type
          if (type === "user") {
            setUserPhoto(base64Image);
          } else if (type === "id") {
            setIdPhoto(base64Image);
          } else if (type === "asset") {
            setAssetPhotos((prev) => [...prev, base64Image]);
          } else if (type === "utilityBill") {
            setUtilityBills((prev) => [...prev, base64Image]);
          } else if (type === "rationCard") {
            setRationCard(base64Image);
          } else if (type === "incomeProof") {
            setIncomeProof((prev) => [...prev, base64Image]);
          } else if (type === "dependantsProof") {
            setDependantsProof((prev) => [...prev, base64Image]);
          } else if (type === "emergencyFundProof") {
            setEmergencyFundProof((prev) => [...prev, base64Image]);
          } else if (type === "incomeFrequencyProof") {
            setIncomeFrequencyProof((prev) => [...prev, base64Image]);
          } else if (type === "gasBook") {
            setGasBook(base64Image);
          }

          console.log(`${type} photo captured successfully`);

        } catch (error) {
          console.error('Error processing image:', error);
          alert('Error processing image. Please try again.');
        }
      };

      // Trigger file selection
      input.click();

    } catch (error) {
      console.error('Error capturing photo:', error);
      alert('Error accessing camera/gallery. Please try again.');
    }
  };

  // Alternative: Camera-first approach (for mobile devices)
  // const handleCameraCapture = async (type) => {
  //   try {
  //     // Check if device supports camera
  //     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //       // Try to access camera first
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         video: {
  //           facingMode: 'environment' // Use back camera
  //         }
  //       });

  //       // Create video element to show camera preview
  //       const video = document.createElement('video');
  //       video.srcObject = stream;
  //       video.play();

  //       // Create canvas to capture frame
  //       const canvas = document.createElement('canvas');
  //       const ctx: any = canvas.getContext('2d');

  //       // Create modal for camera preview
  //       const modal = document.createElement('div');
  //       modal.style.cssText = `
  //       position: fixed;
  //       top: 0;
  //       left: 0;
  //       width: 100%;
  //       height: 100%;
  //       background: rgba(0,0,0,0.9);
  //       display: flex;
  //       flex-direction: column;
  //       align-items: center;
  //       justify-content: center;
  //       z-index: 10000;
  //     `;

  //       video.style.cssText = `
  //       max-width: 90%;
  //       max-height: 70%;
  //       border-radius: 8px;
  //     `;

  //       const captureBtn = document.createElement('button');
  //       captureBtn.textContent = 'Capture Photo';
  //       captureBtn.style.cssText = `
  //       margin: 20px;
  //       padding: 12px 24px;
  //       background: #007bff;
  //       color: white;
  //       border: none;
  //       border-radius: 6px;
  //       font-size: 16px;
  //       cursor: pointer;
  //     `;

  //       const cancelBtn = document.createElement('button');
  //       cancelBtn.textContent = 'Cancel';
  //       cancelBtn.style.cssText = `
  //       margin: 10px;
  //       padding: 12px 24px;
  //       background: #6c757d;
  //       color: white;
  //       border: none;
  //       border-radius: 6px;
  //       font-size: 16px;
  //       cursor: pointer;
  //     `;

  //       modal.appendChild(video);
  //       modal.appendChild(captureBtn);
  //       modal.appendChild(cancelBtn);
  //       document.body.appendChild(modal);

  //       // Capture photo
  //       captureBtn.onclick = () => {
  //         canvas.width = video.videoWidth;
  //         canvas.height = video.videoHeight;
  //         ctx.drawImage(video, 0, 0);

  //         // Convert to base64
  //         const base64Image = canvas.toDataURL('image/jpeg', 0.8);

  //         // Update state based on type (same logic as above)
  //         if (type === "user") {
  //           setUserPhoto(base64Image);
  //         } else if (type === "id") {
  //           setIdPhoto(base64Image);
  //         } else if (type === "asset") {
  //           setAssetPhotos((prev) => [...prev, base64Image]);
  //         } else if (type === "utilityBill") {
  //           setUtilityBills((prev) => [...prev, base64Image]);
  //         } else if (type === "rationCard") {
  //           setRationCard(base64Image);
  //         } else if (type === "incomeProof") {
  //           setIncomeProof((prev) => [...prev, base64Image]);
  //         } else if (type === "dependantsProof") {
  //           setDependantsProof((prev) => [...prev, base64Image]);
  //         } else if (type === "emergencyFundProof") {
  //           setEmergencyFundProof((prev) => [...prev, base64Image]);
  //         } else if (type === "incomeFrequencyProof") {
  //           setIncomeFrequencyProof((prev) => [...prev, base64Image]);
  //         } else if (type === "gasBook") {
  //           setGasBook(base64Image);
  //         }

  //         // Cleanup
  //         stream.getTracks().forEach(track => track.stop());
  //         document.body.removeChild(modal);
  //       };

  //       // Cancel
  //       cancelBtn.onclick = () => {
  //         stream.getTracks().forEach(track => track.stop());
  //         document.body.removeChild(modal);
  //       };

  //     } else {
  //       // Fallback to file input if camera not available
  //       handlePhotoCapture(type);
  //     }
  //   } catch (error) {
  //     console.error('Camera access denied or not available:', error);
  //     // Fallback to file input
  //     handlePhotoCapture(type);
  //   }
  // };

  // Enhanced function with camera/gallery choice
  // const handlePhotoSelection = (type) => {
  //   // Create choice modal
  //   const modal = document.createElement('div');
  //   modal.style.cssText = `
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  //   background: rgba(0,0,0,0.5);
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   z-index: 10000;
  // `;

  //   const dialog = document.createElement('div');
  //   dialog.style.cssText = `
  //   background: white;
  //   padding: 24px;
  //   border-radius: 12px;
  //   text-align: center;
  //   max-width: 300px;
  //   margin: 20px;
  // `;

  //   const title = document.createElement('h3');
  //   title.textContent = 'Select Image Source';
  //   title.style.marginBottom = '20px';

  //   const cameraBtn = document.createElement('button');
  //   cameraBtn.textContent = '📷 Take Photo';
  //   cameraBtn.style.cssText = `
  //   width: 100%;
  //   padding: 12px;
  //   margin: 8px 0;
  //   background: #007bff;
  //   color: white;
  //   border: none;
  //   border-radius: 6px;
  //   font-size: 16px;
  //   cursor: pointer;
  // `;

  //   const galleryBtn = document.createElement('button');
  //   galleryBtn.textContent = '🖼️ Choose from Gallery';
  //   galleryBtn.style.cssText = `
  //   width: 100%;
  //   padding: 12px;
  //   margin: 8px 0;
  //   background: #28a745;
  //   color: white;
  //   border: none;
  //   border-radius: 6px;
  //   font-size: 16px;
  //   cursor: pointer;
  // `;

  //   const cancelBtn = document.createElement('button');
  //   cancelBtn.textContent = 'Cancel';
  //   cancelBtn.style.cssText = `
  //   width: 100%;
  //   padding: 12px;
  //   margin: 8px 0;
  //   background: #6c757d;
  //   color: white;
  //   border: none;
  //   border-radius: 6px;
  //   font-size: 16px;
  //   cursor: pointer;
  // `;

  //   dialog.appendChild(title);
  //   dialog.appendChild(cameraBtn);
  //   dialog.appendChild(galleryBtn);
  //   dialog.appendChild(cancelBtn);
  //   modal.appendChild(dialog);
  //   document.body.appendChild(modal);

  //   cameraBtn.onclick = () => {
  //     document.body.removeChild(modal);
  //     handleCameraCapture(type);
  //   };

  //   galleryBtn.onclick = () => {
  //     document.body.removeChild(modal);
  //     handlePhotoCapture(type);
  //   };

  //   cancelBtn.onclick = () => {
  //     document.body.removeChild(modal);
  //   };

  //   // Close on background click
  //   modal.onclick = (e) => {
  //     if (e.target === modal) {
  //       document.body.removeChild(modal);
  //     }
  //   };
  // };

  const handleRemovePhoto = (type: string, index?: number) => {
    if (type === "user") setUserPhoto(null)
    else if (type === "id") setIdPhoto(null)
    else if (type === "asset" && index !== undefined) setAssetPhotos(assetPhotos.filter((_, i) => i !== index))
    else if (type === "utilityBill" && index !== undefined) setUtilityBills(utilityBills.filter((_, i) => i !== index))
    else if (type === "rationCard") setRationCard(null)
    else if (type === "incomeProof" && index !== undefined) setIncomeProof(incomeProof.filter((_, i) => i !== index))
    else if (type === "dependantsProof" && index !== undefined)
      setDependantsProof(dependantsProof.filter((_, i) => i !== index))
    else if (type === "emergencyFundProof" && index !== undefined)
      setEmergencyFundProof(emergencyFundProof.filter((_, i) => i !== index))
    else if (type === "incomeFrequencyProof" && index !== undefined)
      setIncomeFrequencyProof(incomeFrequencyProof.filter((_, i) => i !== index))
    else if (type === "gasBook") setGasBook(null)
  }

  const handleConsentChange = (key: keyof typeof consents, checked: boolean) => {
    setConsents({ ...consents, [key]: checked })
  }

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return userPhoto !== null && idPhoto !== null
      case 2:
        return assetPhotos.length > 0
      case 3:
        // Vehicle registration number is now optional
        return true
      case 4:
        return digitalFootprintPhone.trim() !== ""
      case 5:
        return utilityBills.length > 0
      case 6:
        return rationCard !== null
      case 7:
        return incomeProof.length > 0
      case 8:
        return dependantsProof.length > 0
      case 9:
        return emergencyFundProof.length > 0
      case 10:
        return incomeFrequencyProof.length > 0
      case 11:
        return (
          gasConnectionNumber.trim() !== "" &&
          gasBook !== null &&
          Object.values(consents).every((value) => value === true)
        )
      default:
        return false
    }
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      // Submit all verification data
      onSubmit({
        userPhoto,
        idPhoto,
        assetPhotos,
        vehicleRegistrationNumber,
        digitalFootprintPhone,
        utilityBills,
        rationCard,
        incomeProof,
        dependantsProof,
        emergencyFundProof,
        incomeFrequencyProof,
        gasConnectionNumber,
        gasBook,
        consents,
        submittedAt: new Date().toISOString(),
      })
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const renderPhotoUploadSection = (
    label: string,
    photos: string | string[] | null,
    setterType:
      | "user"
      | "id"
      | "asset"
      | "utilityBill"
      | "rationCard"
      | "incomeProof"
      | "dependantsProof"
      | "emergencyFundProof"
      | "incomeFrequencyProof"
      | "gasBook",
    icon: React.ElementType,
    description: string,
    allowMultiple = false,
  ) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="border-2 border-dashed rounded-md p-4 text-center">
        {photos && (Array.isArray(photos) ? photos.length > 0 : photos) ? (
          <div className={allowMultiple ? "grid grid-cols-2 gap-2" : "relative"}>
            {Array.isArray(photos) ? (
              photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={photo || "/placeholder.svg"}
                    alt={`${label} ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => handleRemovePhoto(setterType, index)}
                  >
                    Remove
                  </Button>
                </div>
              ))
            ) : (
              <div className="relative">
                <img
                  src={photos || "/placeholder.svg"}
                  alt={label}
                  className="w-full h-40 object-cover rounded-md mx-auto"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => handleRemovePhoto(setterType)}
                >
                  Retake
                </Button>
              </div>
            )}
            {allowMultiple &&
              photos.length < 4 && ( // Limit to 4 photos for demo
                <div
                  className="border-2 border-dashed rounded-md flex flex-col items-center justify-center h-32 cursor-pointer"
                  onClick={() => handlePhotoCapture(setterType)}
                >
                  {React.createElement(icon, { className: "h-8 w-8 text-gray-400 mb-1" })}
                  <span className="text-sm text-gray-600">Add Photo</span>
                </div>
              )}
          </div>
        ) : (
          <div className="py-4">
            {React.createElement(icon, { className: "h-12 w-12 mx-auto text-gray-400 mb-2" })}
            <p className="text-sm text-gray-600 mb-4">{description}</p>
            <Button
              onClick={() => handlePhotoCapture(setterType)}
              className="flex items-center gap-1 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 rounded-md text-sm font-medium"
            >
              <Camera className="h-4 w-4" />
              Take Photo / Upload
            </Button>
          </div>
        )}
      </div>
      {allowMultiple && photos?.length === 0 && (
        <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <p className="text-sm text-amber-800">Please add at least one photo to continue</p>
        </div>
      )}
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Step {step} of {totalSteps}: {step === 1 && "Personal Verification"}
          {step === 2 && "Asset Verification"}
          {step === 3 && "Vehicle Details"}
          {step === 4 && "Digital Footprint"}
          {step === 5 && "Utility Bills"}
          {step === 6 && "Ration Card"}
          {step === 7 && "Income Proof"}
          {step === 8 && "Dependants Proof"}
          {step === 9 && "Emergency Fund Proof"}
          {step === 10 && "Income Frequency Proof"}
          {step === 11 && "Consent"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {step === 1 && (
          <>
            {renderPhotoUploadSection(
              "Your Photo",
              userPhoto,
              "user",
              User,
              "Click a selfie or upload a photo from gallery.",
            )}
            {renderPhotoUploadSection(
              "ID Verification",
              idPhoto,
              "id",
              FileText,
              "Proof of identification (adhar, license, pan card, Passport).",
            )}
          </>
        )}

        {step === 2 && (
          <>
            {renderPhotoUploadSection(
              "Asset Photos",
              assetPhotos,
              "asset",
              Home,
              "Take photos of assets you own (home, vehicles, appliances, livestock, land, etc.)",
              true,
            )}
          </>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vehicle-reg-num">Vehicle Registration Number (Optional)</Label>
              <Input
                id="vehicle-reg-num"
                value={vehicleRegistrationNumber}
                onChange={(e) => setVehicleRegistrationNumber(e.target.value)}
                placeholder="Enter vehicle registration number if applicable"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="digital-phone">Phone number of the digital footprint</Label>
              <Input
                id="digital-phone"
                type="tel"
                value={digitalFootprintPhone}
                onChange={(e) => setDigitalFootprintPhone(e.target.value)}
                placeholder="Enter phone number with valid data pack"
              />
            </div>
          </div>
        )}

        {step === 5 && (
          <>
            {renderPhotoUploadSection(
              "Utility Bills",
              utilityBills,
              "utilityBill",
              Receipt,
              "Upload any utility bills you pay (e.g., electricity, gas, rent, water, education).",
              true,
            )}
          </>
        )}

        {step === 6 && (
          <>
            {renderPhotoUploadSection(
              "Ration Card",
              rationCard,
              "rationCard",
              BookText,
              "Upload your ration card for family member count verification.",
            )}
          </>
        )}

        {step === 7 && (
          <>
            {renderPhotoUploadSection(
              "Income Proof",
              incomeProof,
              "incomeProof",
              DollarSign,
              "Upload income proof of your total earning members combined (e.g., salary slips, bank statements).",
              true,
            )}
          </>
        )}

        {step === 8 && (
          <>
            {renderPhotoUploadSection(
              "Dependants Proof",
              dependantsProof,
              "dependantsProof",
              Users,
              "Upload proof of dependants (adhar, pancard, voter id, school marksheet).",
              true,
            )}
          </>
        )}

        {step === 9 && (
          <>
            {renderPhotoUploadSection(
              "Emergency Fund Proof",
              emergencyFundProof,
              "emergencyFundProof",
              Wallet,
              "Upload the proof of emergency fund (jewellery, cash, stock).",
              true,
            )}
          </>
        )}

        {step === 10 && (
          <>
            {renderPhotoUploadSection(
              "Income Frequency Proof",
              incomeFrequencyProof,
              "incomeFrequencyProof",
              Calendar,
              "Upload any proof showing the frequency of your income (salary slip, bank statement, letter head from company, authorised letter from the work place).",
              true,
            )}
          </>
        )}

        {step === 11 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gas-connection-num">Gas Connection Number</Label>
              <Input
                id="gas-connection-num"
                value={gasConnectionNumber}
                onChange={(e) => setGasConnectionNumber(e.target.value)}
                placeholder="Enter gas connection registration number"
              />
            </div>
            {renderPhotoUploadSection(
              "Gas Book",
              gasBook,
              "gasBook",
              Gas,
              "Upload your gas book (registration number).",
            )}

            <div className="space-y-2 mt-6">
              <Label>Consent</Label>
              <p className="text-sm text-gray-600 mb-4">Please review and provide consent for the following:</p>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent-data"
                    checked={consents.dataUsage}
                    onCheckedChange={(checked) => handleConsentChange("dataUsage", checked as boolean)}
                  />
                  <Label htmlFor="consent-data" className="text-sm leading-tight">
                    I consent to the use of my personal information for credit assessment purposes
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent-verification"
                    checked={consents.verification}
                    onCheckedChange={(checked) => handleConsentChange("verification", checked as boolean)}
                  />
                  <Label htmlFor="consent-verification" className="text-sm leading-tight">
                    I consent to the verification of my provided documents with relevant third parties
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent-photos"
                    checked={consents.assetPhotos}
                    onCheckedChange={(checked) => handleConsentChange("assetPhotos", checked as boolean)}
                  />
                  <Label htmlFor="consent-photos" className="text-sm leading-tight">
                    I consent to the collection and storage of photographs of my assets
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent-credit"
                    checked={consents.creditInfo}
                    onCheckedChange={(checked) => handleConsentChange("creditInfo", checked as boolean)}
                  />
                  <Label htmlFor="consent-credit" className="text-sm leading-tight">
                    I consent to the sharing of my credit information with relevant financial institutions
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent-account-aggregator"
                    checked={consents.accountAggregator}
                    onCheckedChange={(checked) => handleConsentChange("accountAggregator", checked as boolean)}
                  />
                  <Label htmlFor="consent-account-aggregator" className="text-sm leading-tight">
                    I consent for the account aggregator and cross checking my details for this micro lending loan
                    facility
                  </Label>
                </div>
              </div>
            </div>

            {!Object.values(consents).every((value) => value === true) && (
              <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <p className="text-sm text-amber-800">All consents are required to proceed with verification</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        ) : (
          <div></div>
        )}
        <Button
          onClick={handleNext}
          disabled={!isStepComplete()}
          className={step === totalSteps ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {step < totalSteps ? "Next" : "Submit Verification"}
          {step === totalSteps && <CheckCircle className="h-4 w-4 ml-1" />}
        </Button>
      </CardFooter>
    </Card>
  )
}