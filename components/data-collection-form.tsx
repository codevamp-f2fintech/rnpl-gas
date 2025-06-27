"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Smartphone,
  Home,
  Users,
  Banknote,
  Shield,
  Car,
  Calendar,
  Brain,
  Zap,
  User,
} from "lucide-react";

interface FormData {
  // Basic Information
  // name: string
  // address: string
  // gender: string
  // phone: string
  // maritalStatus: string
  // cibilScore?: number // New: CIBIL Score
  // bouncesIn6Months?: boolean // New: Bounces in last 6 months

  // Section 1: Digital Access and Expenses
  internetUsage: string;
  monthlyDataExpense: string;

  // Section 2: Family Spending Patterns
  majorSpendingHeads: string[];
  foodCookingFuelPercentage: string;
  outstandingLoansEMI: string;

  // Section 3: Family Dynamics and LPG Usage
  householdMembers: string;
  cookingArrangement: string;
  cookingUnits: string;
  lpgRefillFrequency: string;
  totalMonthlyEarning: string;

  // Section 4: Income Dependency and Stability
  earningMembers: string;
  dependentMembers: string;
  earningMembersJobs: string[];
  jobStability: string;

  // Section 5: Emergency Fund Access
  emergencyFundManagement: string[];
  emergencyInterestRate: string;
  pastEmergencyExperience: string;

  // Section 6: Asset Ownership
  familyAssets: string[];
  landUsage: string;
  motorizedVehicles: string[];

  // Section 7: Income Frequency and Patterns
  incomeFrequency: string;
  averageIncomePerCycle: string;
  secondaryIncome: string;
  secondaryIncomeAmount: string;

  // Section 8: Financial Behavior and Awareness
  monthlySavings: string;
  loanDefaultHistory: string;

  // Section 9: LPG Adoption and Preferences
  lpgPreference: string;
  lpgChallenges: string;
  cylinderPreference: string;
}

interface DataCollectionFormProps {
  onSubmit: (data: FormData) => void;
}

export default function DataCollectionForm({
  onSubmit,
}: DataCollectionFormProps) {
  const [currentStep, setCurrentStep] = useState(0); // Start with basic info (step 0)
  const [formData, setFormData] = useState<FormData>({
    // Initialize basic information
    // name: "",
    // address: "",
    // gender: "",
    // phone: "",
    // maritalStatus: "",
    // cibilScore: undefined, // Initialize CIBIL Score
    // bouncesIn6Months: undefined, // Initialize Bounces

    // Initialize all other fields
    internetUsage: "",
    monthlyDataExpense: "",
    majorSpendingHeads: [],
    foodCookingFuelPercentage: "",
    outstandingLoansEMI: "",
    householdMembers: "",
    cookingArrangement: "",
    cookingUnits: "",
    lpgRefillFrequency: "",
    totalMonthlyEarning: "",
    earningMembers: "",
    dependentMembers: "",
    earningMembersJobs: [],
    jobStability: "",
    emergencyFundManagement: [],
    emergencyInterestRate: "",
    pastEmergencyExperience: "",
    familyAssets: [],
    landUsage: "",
    motorizedVehicles: [],
    incomeFrequency: "",
    averageIncomePerCycle: "",
    secondaryIncome: "",
    secondaryIncomeAmount: "",
    monthlySavings: "",
    loanDefaultHistory: "",
    lpgPreference: "",
    lpgChallenges: "",
    cylinderPreference: "",
  });

  console.log("formData", formData);
  const totalSteps = 8;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (
    field: keyof FormData,
    value: string | string[] | number | boolean | undefined
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (
    field: keyof FormData,
    value: string,
    checked: boolean
  ) => {
    const currentValues = (formData[field] as string[]) || [];
    if (checked) {
      handleInputChange(field, [...currentValues, value]);
    } else {
      handleInputChange(
        field,
        currentValues.filter((v) => v !== value)
      );
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const getSectionIcon = (step: number) => {
    const icons = [
      User,
      Smartphone,
      Home,
      Users,
      Banknote,
      Shield,
      Car,
      Calendar,
      Brain,
      Zap,
    ];
    const Icon = icons[step];
    return <Icon className="h-5 w-5 text-blue-600" />;
  };

  const getSectionTitle = (step: number) => {
    const titles = [
      // "Basic Information",
      "Digital Access and Expenses",
      "Family Spending Patterns",
      "Family Dynamics and LPG Usage",
      "Income Dependency and Stability",
      "Emergency Fund Access",
      "Asset Ownership",
      "Income Frequency and Patterns",
      "Financial Behavior and Awareness",
      "LPG Adoption and Preferences",
    ];
    return titles[step];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Data Collection</CardTitle>
          <CardDescription>
            Step {currentStep + 1} of {totalSteps} -{" "}
            {getSectionTitle(currentStep)}
          </CardDescription>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Section 1: Digital Access and Expenses */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                {getSectionIcon(1)}
                <h3 className="text-lg font-semibold">
                  Digital Access and Expenses
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>
                    1. Do you use an internet/data pack on your mobile phone?
                  </Label>
                  <RadioGroup
                    value={formData.internetUsage}
                    onValueChange={(value) =>
                      handleInputChange("internetUsage", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="internet-yes" />
                      <Label htmlFor="internet-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="internet-no" />
                      <Label htmlFor="internet-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>
                    2. What is your estimated monthly expense on internet/data
                    packs?
                  </Label>
                  <RadioGroup
                    value={formData.monthlyDataExpense}
                    onValueChange={(value) =>
                      handleInputChange("monthlyDataExpense", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="expense-0" />
                      <Label htmlFor="expense-0">₹0</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-100" id="expense-1-100" />
                      <Label htmlFor="expense-1-100">₹1-₹100</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="101-200" id="expense-101-200" />
                      <Label htmlFor="expense-101-200">₹101-₹200</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="200+" id="expense-200+" />
                      <Label htmlFor="expense-200+">More than ₹200</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Family Spending Patterns */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                {getSectionIcon(2)}
                <h3 className="text-lg font-semibold">
                  Family Spending Patterns
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>
                    3. What are the major spending heads of your family monthly
                    budget? (Select all that apply)
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Rent",
                      "Children's Education",
                      "Electricity",
                      "Loan Payments",
                      "Transportation",
                      "Food",
                      "Entertainment",
                      "Luxury Items",
                    ].map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={`spending-${item}`}
                          checked={formData.majorSpendingHeads.includes(item)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              "majorSpendingHeads",
                              item,
                              checked as boolean
                            )
                          }
                        />
                        <Label htmlFor={`spending-${item}`}>{item}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>
                    4. What percentage of your monthly income is spent on food
                    and cooking fuel?
                  </Label>
                  <RadioGroup
                    value={formData.foodCookingFuelPercentage}
                    onValueChange={(value) =>
                      handleInputChange("foodCookingFuelPercentage", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="<25%" id="food-less-25" />
                      <Label htmlFor="food-less-25">Less than 25%</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="25-50%" id="food-25-50" />
                      <Label htmlFor="food-25-50">25-50%</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="51-75%" id="food-51-75" />
                      <Label htmlFor="food-51-75">51-75%</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value=">75%" id="food-more-75" />
                      <Label htmlFor="food-more-75">More than 75%</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>
                    5. Do you currently have any outstanding loans or EMIs? If
                    yes, how much do you pay monthly?
                  </Label>
                  <RadioGroup
                    value={formData.outstandingLoansEMI}
                    onValueChange={(value) =>
                      handleInputChange("outstandingLoansEMI", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="emi-0" />
                      <Label htmlFor="emi-0">₹0</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-1000" id="emi-1-1000" />
                      <Label htmlFor="emi-1-1000">₹1-₹1,000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1001-5000" id="emi-1001-5000" />
                      <Label htmlFor="emi-1001-5000">₹1,001-₹5,000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5001-10000" id="emi-5001-10000" />
                      <Label htmlFor="emi-5001-10000">₹5,001-₹10,000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="10001-20000"
                        id="emi-10001-20000"
                      />
                      <Label htmlFor="emi-10001-20000">₹10,001-₹20,000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="20000+" id="emi-20000+" />
                      <Label htmlFor="emi-20000+">More than ₹20,000</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Family Dynamics and LPG Usage */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                {getSectionIcon(3)}
                <h3 className="text-lg font-semibold">
                  Family Dynamics and LPG Usage
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>
                    6. How many family members live together in your household?
                  </Label>
                  <RadioGroup
                    value={formData.householdMembers}
                    onValueChange={(value) =>
                      handleInputChange("householdMembers", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-3" id="members-1-3" />
                      <Label htmlFor="members-1-3">1-3 members</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4-6" id="members-4-6" />
                      <Label htmlFor="members-4-6">4-6 members</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="7-10" id="members-7-10" />
                      <Label htmlFor="members-7-10">7-10 members</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="10+" id="members-10+" />
                      <Label htmlFor="members-10+">More than 10 members</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>
                    7. Do all family members cook together, or do separate units
                    (e.g., married brothers) cook individually?
                  </Label>
                  <RadioGroup
                    value={formData.cookingArrangement}
                    onValueChange={(value) =>
                      handleInputChange("cookingArrangement", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="together" id="cooking-together" />
                      <Label htmlFor="cooking-together">Together</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="separate" id="cooking-separate" />
                      <Label htmlFor="cooking-separate">Separate</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>
                    8. If separate, how many cooking units exist in your
                    household?
                  </Label>
                  <RadioGroup
                    value={formData.cookingUnits}
                    onValueChange={(value) =>
                      handleInputChange("cookingUnits", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="units-1" />
                      <Label htmlFor="units-1">1 unit</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="units-2" />
                      <Label htmlFor="units-2">2 units</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="units-3" />
                      <Label htmlFor="units-3">3 units</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3+" id="units-3+" />
                      <Label htmlFor="units-3+">More than 3 units</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>
                    9. How often do you currently refill your LPG cylinder
                    (e.g., 5 kg cylinder)?
                  </Label>
                  <RadioGroup
                    value={formData.lpgRefillFrequency}
                    onValueChange={(value) =>
                      handleInputChange("lpgRefillFrequency", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-2-months" id="refill-1-2" />
                      <Label htmlFor="refill-1-2">Every 1-2 months</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3-4-months" id="refill-3-4" />
                      <Label htmlFor="refill-3-4">Every 3-4 months</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5-6-months" id="refill-5-6" />
                      <Label htmlFor="refill-5-6">Every 5-6 months</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="6+-months" id="refill-6+" />
                      <Label htmlFor="refill-6+">More than 6 months</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>
                    10. What is the total monthly earning of all family members
                    combined?
                  </Label>
                  <RadioGroup
                    value={formData.totalMonthlyEarning}
                    onValueChange={(value) =>
                      handleInputChange("totalMonthlyEarning", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0-5000" id="earning-0-5000" />
                      <Label htmlFor="earning-0-5000">₹0-₹5,000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="5001-10000"
                        id="earning-5001-10000"
                      />
                      <Label htmlFor="earning-5001-10000">₹5,001-₹10,000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="10001-20000"
                        id="earning-10001-20000"
                      />
                      <Label htmlFor="earning-10001-20000">
                        ₹10,001-₹20,000
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="20001-30000"
                        id="earning-20001-30000"
                      />
                      <Label htmlFor="earning-20001-30000">
                        ₹20,001-₹30,000
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="30001-50000"
                        id="earning-30001-50000"
                      />
                      <Label htmlFor="earning-30001-50000">
                        ₹30,001-₹50,000
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="50000+" id="earning-50000+" />
                      <Label htmlFor="earning-50000+">More than ₹50,000</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Income Dependency and Stability */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                {getSectionIcon(4)}
                <h3 className="text-lg font-semibold">
                  Income Dependency and Stability
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>
                    11. How many earning members are there in your family?
                  </Label>
                  <RadioGroup
                    value={formData.earningMembers}
                    onValueChange={(value) =>
                      handleInputChange("earningMembers", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="earning-0" />
                      <Label htmlFor="earning-0">0</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="earning-1" />
                      <Label htmlFor="earning-1">1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="earning-2" />
                      <Label htmlFor="earning-2">2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2+" id="earning-2+" />
                      <Label htmlFor="earning-2+">More than 2</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>
                    12. How many family members are dependent on the earning
                    members' income?
                  </Label>
                  <RadioGroup
                    value={formData.dependentMembers}
                    onValueChange={(value) =>
                      handleInputChange("dependentMembers", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0-2" id="dependent-0-2" />
                      <Label htmlFor="dependent-0-2">0-2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3-5" id="dependent-3-5" />
                      <Label htmlFor="dependent-3-5">3-5</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="6-8" id="dependent-6-8" />
                      <Label htmlFor="dependent-6-8">6-8</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="8+" id="dependent-8+" />
                      <Label htmlFor="dependent-8+">More than 8</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>
                    13. What are the jobs of the earning members of your family?
                    (Select all that apply)
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Daily Wager",
                      "Factory Worker",
                      "Agriculture",
                      "Small Business",
                      "Government Job",
                      "Private Job",
                    ].map((job) => (
                      <div key={job} className="flex items-center space-x-2">
                        <Checkbox
                          id={`job-${job}`}
                          checked={formData.earningMembersJobs.includes(job)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              "earningMembersJobs",
                              job,
                              checked as boolean
                            )
                          }
                        />
                        <Label htmlFor={`job-${job}`}>{job}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>14. How stable is the primary earner's job?</Label>
                  <RadioGroup
                    value={formData.jobStability}
                    onValueChange={(value) =>
                      handleInputChange("jobStability", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="permanent" id="job-permanent" />
                      <Label htmlFor="job-permanent">Permanent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="seasonal" id="job-seasonal" />
                      <Label htmlFor="job-seasonal">Seasonal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="irregular" id="job-irregular" />
                      <Label htmlFor="job-irregular">
                        Irregular/Daily Wage
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Emergency Fund Access */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                {getSectionIcon(5)}
                <h3 className="text-lg font-semibold">Emergency Fund Access</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>
                    15. How does your family manage emergency fund requirements
                    (e.g., medical expenses, urgent major costs)? (Select all
                    that apply)
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Savings",
                      "Borrow from family/friends",
                      "Local moneylender",
                      "Bank loan",
                      "No access",
                    ].map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={`emergency-${option}`}
                          checked={formData.emergencyFundManagement.includes(
                            option
                          )}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              "emergencyFundManagement",
                              option,
                              checked as boolean
                            )
                          }
                        />
                        <Label htmlFor={`emergency-${option}`}>{option}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>
                    16. If you borrow for emergencies, what is the typical
                    interest rate charged by your lender?
                  </Label>
                  <RadioGroup
                    value={formData.emergencyInterestRate}
                    onValueChange={(value) =>
                      handleInputChange("emergencyInterestRate", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0%" id="interest-0" />
                      <Label htmlFor="interest-0">0%</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-10%" id="interest-1-10" />
                      <Label htmlFor="interest-1-10">1-10%</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="11-20%" id="interest-11-20" />
                      <Label htmlFor="interest-11-20">11-20%</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="20%+" id="interest-20+" />
                      <Label htmlFor="interest-20+">More than 20%</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>
                    17. Have you faced an emergency requiring large funds in the
                    past year? If yes, how did you manage?
                  </Label>
                  <RadioGroup
                    value={formData.pastEmergencyExperience}
                    onValueChange={(value) =>
                      handleInputChange("pastEmergencyExperience", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="emergency-exp-no" />
                      <Label htmlFor="emergency-exp-no">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="yes-low-interest"
                        id="emergency-exp-low"
                      />
                      <Label htmlFor="emergency-exp-low">
                        Yes (borrowed at low/no interest)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="yes-high-interest"
                        id="emergency-exp-high"
                      />
                      <Label htmlFor="emergency-exp-high">
                        Yes (borrowed at high interest)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Section 6: Asset Ownership */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                {getSectionIcon(6)}
                <h3 className="text-lg font-semibold">Asset Ownership</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>
                    18. What type of assets does your family possess? (Select
                    all that apply)
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "None",
                      "Mobile phones only",
                      "Livestock",
                      "Vehicles",
                      "Land",
                      "Gold",
                      "Silver",
                      "Any precious metal",
                    ].map((asset) => (
                      <div key={asset} className="flex items-center space-x-2">
                        <Checkbox
                          id={`asset-${asset}`}
                          checked={formData.familyAssets.includes(asset)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              "familyAssets",
                              asset,
                              checked as boolean
                            )
                          }
                        />
                        <Label htmlFor={`asset-${asset}`}>{asset}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>19. If you own land, how do you use it?</Label>
                  <RadioGroup
                    value={formData.landUsage}
                    onValueChange={(value) =>
                      handleInputChange("landUsage", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no-use" id="land-no-use" />
                      <Label htmlFor="land-no-use">No use</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="agriculture"
                        id="land-agriculture"
                      />
                      <Label htmlFor="land-agriculture">Agriculture</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="commercial" id="land-commercial" />
                      <Label htmlFor="land-commercial">Commercial</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="house" id="land-house" />
                      <Label htmlFor="land-house">House</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="plot" id="land-plot" />
                      <Label htmlFor="land-plot">Plot</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lease" id="land-lease" />
                      <Label htmlFor="land-lease">Lease</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="na" id="land-usage-na" />
                      <Label htmlFor="land-usage-na">
                        N/A (Don't own land)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>
                    20. Do you own any motorized vehicles in your family (e.g.,
                    two-wheeler, three-wheeler, four-wheeler)? If yes, choose
                    the vehicle(s): (Select all that apply)
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "None",
                      "Two-wheeler (Bike/Scooter)",
                      "Three-wheeler (Auto/Tempo)",
                      "Four-wheeler (Car)",
                      "Commercial vehicle",
                    ].map((vehicle) => (
                      <div
                        key={vehicle}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`vehicle-${vehicle}`}
                          checked={formData.motorizedVehicles.includes(vehicle)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              "motorizedVehicles",
                              vehicle,
                              checked as boolean
                            )
                          }
                        />
                        <Label htmlFor={`vehicle-${vehicle}`}>{vehicle}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 7: Income Frequency and Patterns */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                {getSectionIcon(7)}
                <h3 className="text-lg font-semibold">
                  Income Frequency and Patterns
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>21. What is the income cycle of your family?</Label>
                  <RadioGroup
                    value={formData.incomeFrequency}
                    onValueChange={(value) =>
                      handleInputChange("incomeFrequency", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="daily" id="frequency-daily" />
                      <Label htmlFor="frequency-daily">Daily</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="frequency-weekly" />
                      <Label htmlFor="frequency-weekly">Weekly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="frequency-monthly" />
                      <Label htmlFor="frequency-monthly">Monthly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="irregular"
                        id="frequency-irregular"
                      />
                      <Label htmlFor="frequency-irregular">Irregular</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>
                    22. How much does your family earn on average per cycle?
                  </Label>
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-600">
                      Income Range:
                    </Label>
                    <RadioGroup
                      value={formData.averageIncomePerCycle}
                      onValueChange={(value) =>
                        handleInputChange("averageIncomePerCycle", value)
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="daily-0-200" id="daily-0-200" />
                        <Label htmlFor="daily-0-200">Daily: ₹0-₹200</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="daily-200-500"
                          id="daily-200-500"
                        />
                        <Label htmlFor="daily-200-500">Daily: ₹200-₹500</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="daily-500-1000"
                          id="daily-500-1000"
                        />
                        <Label htmlFor="daily-500-1000">
                          Daily: ₹500-₹1,000
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="daily-1000+" id="daily-1000+" />
                        <Label htmlFor="daily-1000+">
                          Daily: More than ₹1,000
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="weekly-0-2000"
                          id="weekly-0-2000"
                        />
                        <Label htmlFor="weekly-0-2000">Weekly: ₹0-₹2,000</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="weekly-2000-5000"
                          id="weekly-2000-5000"
                        />
                        <Label htmlFor="weekly-2000-5000">
                          Weekly: ₹2,000-₹5,000
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="weekly-5000-10000"
                          id="weekly-5000-10000"
                        />
                        <Label htmlFor="weekly-5000-10000">
                          Weekly: ₹5,000-₹10,000
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="weekly-10000+"
                          id="weekly-10000+"
                        />
                        <Label htmlFor="weekly-10000+">
                          Weekly: More than ₹10,000
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="monthly-0-10000"
                          id="monthly-0-10000"
                        />
                        <Label htmlFor="monthly-0-10000">
                          Monthly: ₹0-₹10,000
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="monthly-10000-25000"
                          id="monthly-10000-25000"
                        />
                        <Label htmlFor="monthly-10000-25000">
                          Monthly: ₹10,000-₹25,000
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="monthly-25000-50000"
                          id="monthly-25000-50000"
                        />
                        <Label htmlFor="monthly-25000-50000">
                          Monthly: ₹25,000-₹50,000
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="monthly-50000+"
                          id="monthly-50000+"
                        />
                        <Label htmlFor="monthly-50000+">
                          Monthly: More than ₹50,000
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>
                    23. Do you have any secondary sources of income (e.g.,
                    seasonal work, small business)?
                  </Label>
                  <RadioGroup
                    value={formData.secondaryIncome}
                    onValueChange={(value) =>
                      handleInputChange("secondaryIncome", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="secondary-yes" />
                      <Label htmlFor="secondary-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="secondary-no" />
                      <Label htmlFor="secondary-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.secondaryIncome === "yes" && (
                  <div className="space-y-2">
                    <Label>If yes, how much approximately per month?</Label>
                    <Input
                      value={formData.secondaryIncomeAmount}
                      onChange={(e) =>
                        handleInputChange(
                          "secondaryIncomeAmount",
                          e.target.value
                        )
                      }
                      placeholder="Enter approximate monthly amount"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section 8: Financial Behavior and Awareness */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                {getSectionIcon(8)}
                <h3 className="text-lg font-semibold">
                  Financial Behavior and Awareness
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>
                    24. Do you save any portion of your monthly income? If yes,
                    how much?
                  </Label>
                  <RadioGroup
                    value={formData.monthlySavings}
                    onValueChange={(value) =>
                      handleInputChange("monthlySavings", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="savings-0" />
                      <Label htmlFor="savings-0">₹0</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1-1000" id="savings-1-1000" />
                      <Label htmlFor="savings-1-1000">₹1-₹1,000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="1001-5000"
                        id="savings-1001-5000"
                      />
                      <Label htmlFor="savings-1001-5000">₹1,001-₹5,000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="5001-10000"
                        id="savings-5001-10000"
                      />
                      <Label htmlFor="savings-5001-10000">₹5,001-₹10,000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="10001-25000"
                        id="savings-10001-25000"
                      />
                      <Label htmlFor="savings-10001-25000">
                        ₹10,001-₹25,000
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="25000+" id="savings-25000+" />
                      <Label htmlFor="savings-25000+">More than ₹25,000</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>
                    25. Have you ever defaulted on a loan repayment in the past?
                    If yes, why?
                  </Label>
                  <RadioGroup
                    value={formData.loanDefaultHistory}
                    onValueChange={(value) =>
                      handleInputChange("loanDefaultHistory", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="default-no" />
                      <Label htmlFor="default-no">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="yes-emergency"
                        id="default-emergency"
                      />
                      <Label htmlFor="default-emergency">
                        Yes (due to emergency)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="yes-financial-strain"
                        id="default-strain"
                      />
                      <Label htmlFor="default-strain">
                        Yes (due to financial strain)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Section 9: LPG Adoption and Preferences */}
          {currentStep === 8 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                {getSectionIcon(9)}
                <h3 className="text-lg font-semibold">
                  LPG Adoption and Preferences
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>
                    26. Do you prefer using LPG over traditional fuels (e.g.,
                    firewood, coal) for cooking?
                  </Label>
                  <RadioGroup
                    value={formData.lpgPreference}
                    onValueChange={(value) =>
                      handleInputChange("lpgPreference", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="lpg-pref-yes" />
                      <Label htmlFor="lpg-pref-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="lpg-pref-no" />
                      <Label htmlFor="lpg-pref-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>
                    27. What challenges do you face in using LPG regularly?
                  </Label>
                  <RadioGroup
                    value={formData.lpgChallenges}
                    onValueChange={(value) =>
                      handleInputChange("lpgChallenges", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="challenges-none" />
                      <Label htmlFor="challenges-none">None</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cost" id="challenges-cost" />
                      <Label htmlFor="challenges-cost">Cost of refills</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="availability"
                        id="challenges-availability"
                      />
                      <Label htmlFor="challenges-availability">
                        Availability
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="affordability"
                        id="challenges-affordability"
                      />
                      <Label htmlFor="challenges-affordability">
                        Affordability
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="safety" id="challenges-safety" />
                      <Label htmlFor="challenges-safety">Safety concerns</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>
                    28. Would you prefer a smaller 5 kg cylinder or a standard
                    14.2 kg cylinder for your household?
                  </Label>
                  <RadioGroup
                    value={formData.cylinderPreference}
                    onValueChange={(value) =>
                      handleInputChange("cylinderPreference", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5kg" id="cylinder-5kg" />
                      <Label htmlFor="cylinder-5kg">5 kg cylinder</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="14.2kg" id="cylinder-14kg" />
                      <Label htmlFor="cylinder-14kg">14.2 kg cylinder</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="no-preference"
                        id="cylinder-no-pref"
                      />
                      <Label htmlFor="cylinder-no-pref">No preference</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </Button>

            {currentStep < totalSteps - 1 ? (
              <Button onClick={handleNext}>Next Step</Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit Assessment
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
