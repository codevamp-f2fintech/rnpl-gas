"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Search,
  Filter,
  Building2,
  Users,
  Phone,
  Mail,
  ChevronDown,
} from "lucide-react";
import { Header } from "@/components/Header";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { AccessibilityMenu } from "@/components/AccessibilityMenu";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/hooks/useLanguage";
import { useAudio } from "@/hooks/useAudio";

// Gas Agency Data
const gasAgencies = [
  // Andhra Pradesh
  {
    id: "1.04",
    name: "Kakinada",
    state: "Andhra Pradesh",
    district: "East Godavari",
    entity: "Bhagyanagar Gas Limited",
    type: "Urban",
  },
  {
    id: "5.03",
    name: "East Godavari District",
    state: "Andhra Pradesh",
    district: "East Godavari",
    entity: "Godavari Gas Private Limited",
    type: "Rural",
  },
  {
    id: "5.04",
    name: "West Godavari District",
    state: "Andhra Pradesh",
    district: "West Godavari",
    entity: "Godavari Gas Private Limited",
    type: "Rural",
  },
  {
    id: "5.06",
    name: "Krishna District",
    state: "Andhra Pradesh",
    district: "Krishna",
    entity: "Megha City Gas Distribution Private Limited",
    type: "Urban",
  },
  {
    id: "9.01",
    name: "Srikakulam-Visakhapatnam-Vizianagaram",
    state: "Andhra Pradesh",
    district: "Srikakulam, Visakhapatnam, Vizianagarm",
    entity: "Indian Oil Corporation Limited",
    type: "Multi-District",
  },
  {
    id: "10.01",
    name: "Anantapur-YSR Kadapa",
    state: "Andhra Pradesh",
    district: "Anantapur, YSR Kadapa",
    entity: "AGP City Gas Private Limited",
    type: "Multi-District",
  },
  {
    id: "10.02",
    name: "Nellore District",
    state: "Andhra Pradesh",
    district: "Sri Potti Sriramulu Nellore",
    entity: "AGP City Gas Private Limited",
    type: "Urban",
  },
  {
    id: "10.03",
    name: "Chittoor District",
    state: "Andhra Pradesh",
    district: "Chittoor",
    entity: "AGP City Gas Private Limited",
    type: "Urban",
  },
  {
    id: "11.01",
    name: "Kurnool-Guntur-Prakasam",
    state: "Andhra Pradesh",
    district: "Kurnool, Guntur, Prakasam",
    entity: "Indian Oil Corporation Limited",
    type: "Multi-District",
  },
  {
    id: "99.06",
    name: "Vijayawada",
    state: "Andhra Pradesh",
    district: "Krishna",
    entity: "Bhagyanagar Gas Limited",
    type: "Urban",
  },

  // Telangana
  {
    id: "9.68",
    name: "Bhadradri Kothagudem-Khammam",
    state: "Telangana",
    district: "Bhadradri Kothagudem, Khammam",
    entity: "Megha City Gas Distribution Private Limited",
    type: "Multi-District",
  },
  {
    id: "9.69",
    name: "Jagtial-Peddapalli-Karimnagar-Rajanna Sircilla",
    state: "Telangana",
    district: "Jagtial, Peddapalli, Karimnagar, Rajanna Sircilla",
    entity: "Indian Oil Corporation Limited",
    type: "Multi-District",
  },
  {
    id: "9.70",
    name: "Jangaon-Jayashankar-Mahabubabad-Warangal",
    state: "Telangana",
    district:
      "Jangaon, Jayashankar Bhupalpally, Mahabubabad, Warangal Urban, Warangal Rural",
    entity: "Megha City Gas Distribution Private Limited",
    type: "Multi-District",
  },
  {
    id: "9.71",
    name: "Medak-Siddipet-Sangareddy",
    state: "Telangana",
    district: "Medak, Siddipet, Sangareddy",
    entity: "Torrent Gas Private Limited",
    type: "Multi-District",
  },
  {
    id: "9.72",
    name: "Medchal-Malkajgiri-Ranga Reddy-Vikarabad",
    state: "Telangana",
    district: "Medchal-Malkajgiri, Ranga Reddy, Vikarabad",
    entity: "Megha City Gas Distribution Private Limited",
    type: "Multi-District",
  },
  {
    id: "9.73",
    name: "Nalgonda-Suryapet-Yadadri Bhuvanagiri",
    state: "Telangana",
    district: "Nalgonda Suryapet, Yadadri Bhuvanagiri",
    entity: "Megha City Gas Distribution Private Limited",
    type: "Multi-District",
  },
  {
    id: "11.54",
    name: "Nizamabad-Adilabad-Nirmal-Mancherial-Kamareddy",
    state: "Telangana",
    district:
      "Nizamabad, Adilabad, Nirmal, Mancherial Kumuram Bheem Asifabad, Kamareddy",
    entity: "Maharashtra Natural Gas Limited",
    type: "Multi-District",
  },
  {
    id: "11.55",
    name: "Jogulamba Gadwal-Nagarkurnool-Mahabubnagar-Narayanpet-Wanaparthy",
    state: "Telangana",
    district:
      "Jogulamba Gadwal, Nagarkurnool, Mahabubnagar, Narayanpet, Wanaparthy",
    entity: "Megha City Gas Distribution Private Limited",
    type: "Multi-District",
  },
  {
    id: "99.09",
    name: "Hyderabad",
    state: "Telangana",
    district: "Hyderabad, Medak, Medchal-Malkajgiri, Ranga Reddy, Sangareddy",
    entity: "Bhagyanagar Gas Limited",
    type: "Metropolitan",
  },

  // West Bengal
  {
    id: "9.86",
    name: "Burdwan District",
    state: "West Bengal",
    district: "Burdwan",
    entity: "Indian Oil-Adani Gas Private Limited",
    type: "Urban",
  },
  {
    id: "10.47",
    name: "Darjeeling-Jalpaiguri-Uttar Dinajpur",
    state: "West Bengal",
    district: "Darjeeling, Jalpaiguri, Uttar Dinajpur",
    entity: "Hindustan Petroleum Corporation Limited",
    type: "Multi-District",
  },
  {
    id: "10.48",
    name: "Howrah-Hooghly",
    state: "West Bengal",
    district: "Howrah, Hooghly",
    entity: "Hindustan Petroleum Corporation Limited",
    type: "Multi-District",
  },
  {
    id: "10.49",
    name: "Nadia-North 24 Parganas",
    state: "West Bengal",
    district: "Nadia, North 24 Parganas",
    entity: "Hindustan Petroleum Corporation Limited",
    type: "Multi-District",
  },
  {
    id: "10.50",
    name: "South 24 Parganas",
    state: "West Bengal",
    district: "South 24 Parganas",
    entity: "Hindustan Petroleum Corporation Limited",
    type: "Urban",
  },
  {
    id: "11.60",
    name: "Purulia-Bankura",
    state: "West Bengal",
    district: "Purulia, Bankura",
    entity: "Bharat Petroleum Corporation Limited",
    type: "Multi-District",
  },
  {
    id: "11.61",
    name: "East Medinipur-West Medinipur-Jhargram",
    state: "West Bengal",
    district: "East Medinipur, West Medinipur, Jhargram",
    entity: "Indian Oil Corporation Limited",
    type: "Multi-District",
  },
  {
    id: "11.62",
    name: "Alipurduar-Koch Bihar",
    state: "West Bengal",
    district: "Alipurduar, Koch Bihar",
    entity: "Bharat Petroleum Corporation Limited",
    type: "Multi-District",
  },
  {
    id: "99.14",
    name: "Kolkata",
    state: "West Bengal",
    district:
      "Kolkata, Hooghly, Howrah, Nadia, North 24 Parganas, South 24 Parganas",
    entity: "Bengal Gas Company Limited",
    type: "Metropolitan",
  },
  {
    id: "11A.03",
    name: "Birbhum-Murshidabad-Maldah-Dakshin Dinajpur",
    state: "West Bengal",
    district: "Birbhum, Murshidabad, Maldah, Dakshin Dinajpur",
    entity: "Hindustan Petroleum Corporation Limited",
    type: "Multi-District",
  },

  // Bihar
  {
    id: "9.04",
    name: "Aurangabad-Kaimur-Rohtas",
    state: "Bihar",
    district: "Aurangabad, Kaimur, Rohtas",
    entity: "Indian Oil Corporation Limited",
    type: "Multi-District",
  },
  {
    id: "9.05",
    name: "Begusarai",
    state: "Bihar",
    district: "Begusarai",
    entity: "Think Gas Begusarai Private Limited",
    type: "Urban",
  },
  {
    id: "9.06",
    name: "Gaya-Nalanda",
    state: "Bihar",
    district: "Gaya, Nalanda",
    entity: "Indian Oil-Adani Gas Private Limited",
    type: "Multi-District",
  },
  {
    id: "10.04",
    name: "Araria-Purnia-Katihar-Kishanganj",
    state: "Bihar",
    district: "Araria, Purnia, Katihar, Kishanganj",
    entity: "Indian Oil Corporation Limited",
    type: "Multi-District",
  },
  {
    id: "10.05",
    name: "Arwal-Jehanabad-Bhojpur-Buxar",
    state: "Bihar",
    district: "Arwal, Jehanabad, Bhojpur, Buxar",
    entity: "Indian Oil Corporation Limited",
    type: "Multi-District",
  },
  {
    id: "10.06",
    name: "Khagaria-Saharsa-Madhepura",
    state: "Bihar",
    district: "Khagaria, Saharsa, Madhepura",
    entity: "Indian Oil Corporation Limited",
    type: "Multi-District",
  },
  {
    id: "10.07",
    name: "Lakhisarai-Munger-Bhagalpur",
    state: "Bihar",
    district: "Lakhisarai, Munger, Bhagalpur",
    entity: "Indian Oil Corporation Limited",
    type: "Multi-District",
  },
  {
    id: "10.08",
    name: "Muzaffarpur-Vaishali-Saran-Samastipur",
    state: "Bihar",
    district: "Muzaffarpur, Vaishali, Saran, Samastipur",
    entity: "Indian Oil Corporation Limited",
    type: "Multi-District",
  },
  {
    id: "10.09",
    name: "Nawada",
    state: "Bihar",
    district: "Nawada",
    entity: "Indian Oil Corporation Limited",
    type: "Urban",
  },
  {
    id: "10.10",
    name: "Sheikhpura-Jamui",
    state: "Bihar",
    district: "Sheikhpura, Jamui",
    entity: "Indian Oil Corporation Limited",
    type: "Multi-District",
  },
  {
    id: "11.06",
    name: "Darbhanga-Madhubani-Supaul-Sitamarhi-Sheohar",
    state: "Bihar",
    district: "Darbhanga, Madhubani, Supaul, Sitamarhi, Sheohar",
    entity: "Bharat Petroleum Corporation Limited",
    type: "Multi-District",
  },
  {
    id: "11.07",
    name: "Gopalganj-Siwan-West Champaran-East Champaran",
    state: "Bihar",
    district: "Gopalganj, Siwan, West Champaran, East Champaran",
    entity: "Bharat Petroleum Corporation Limited",
    type: "Multi-District",
  },
  {
    id: "97.01",
    name: "Patna",
    state: "Bihar",
    district: "Patna",
    entity: "GAIL (India) Limited",
    type: "Metropolitan",
  },
  {
    id: "11A.02",
    name: "Banka",
    state: "Bihar",
    district: "Banka",
    entity: "Hindustan Petroleum Corporation Limited",
    type: "Urban",
  },

  // Kerala
  {
    id: "4.09",
    name: "Ernakulam",
    state: "Kerala",
    district: "Ernakulam",
    entity: "Indian-Oil Adani Gas Private Limited",
    type: "Urban",
  },
  {
    id: "9.30",
    name: "Kozhikode-Wayanad",
    state: "Kerala",
    district: "Kozhikode, Wayanad",
    entity: "Indian Oil-Adani Gas Private Limited",
    type: "Multi-District",
  },
  {
    id: "9.31",
    name: "Malappuram",
    state: "Kerala",
    district: "Malappuram",
    entity: "Indian Oil-Adani Gas Private Limited",
    type: "Urban",
  },
  {
    id: "9.32",
    name: "Kannur-Kasaragod",
    state: "Kerala",
    district: "Kannur, Kasaragod",
    entity: "Indian Oil-Adani Gas Private Limited",
    type: "Multi-District",
  },
  {
    id: "9.33",
    name: "Palakkad-Thrissur",
    state: "Kerala",
    district: "Palakkad, Thrissur",
    entity: "Indian Oil-Adani Gas Private Limited",
    type: "Multi-District",
  },
  {
    id: "10.21",
    name: "Alappuzha-Kollam-Thiruvananthapuram",
    state: "Kerala",
    district: "Alappuzha, Kollam, Thiruvananthapuram",
    entity: "AGP City Gas Private Limited",
    type: "Multi-District",
  },
  {
    id: "11.21",
    name: "Idukki-Kottayam-Pathanamthitta",
    state: "Kerala",
    district: "Idukki, Kottayam, Pathanamthitta",
    entity: "Sholagasco Private Limited",
    type: "Multi-District",
  },

  // Punjab
  {
    id: "2.01",
    name: "Chandigarh-SAS Nagar",
    state: "Punjab",
    district: "SAS Nagar",
    entity: "Indian-Oil Adani Gas Private Limited",
    type: "Urban",
  },
  {
    id: "3.01",
    name: "Jalandhar",
    state: "Punjab",
    district: "Jalandhar",
    entity: "Adani Total Gas Limited",
    type: "Urban",
  },
  {
    id: "3.06",
    name: "Ludhiana",
    state: "Punjab",
    district: "Ludhiana",
    entity: "Jay Madhok Energy Private Limited led Consortium",
    type: "Urban",
  },
  {
    id: "4.07",
    name: "Amritsar",
    state: "Punjab",
    district: "Amritsar",
    entity: "Gujarat Gas Limited",
    type: "Urban",
  },
  {
    id: "6.01",
    name: "Bathinda",
    state: "Punjab",
    district: "Bathinda",
    entity: "Gujarat Gas Limited",
    type: "Urban",
  },
  {
    id: "6.06",
    name: "Rupnagar",
    state: "Punjab",
    district: "Rupnagar",
    entity: "Bharat Petroleum Corporation Limited",
    type: "Urban",
  },
  {
    id: "6.12",
    name: "Fatehgarh Sahib",
    state: "Punjab",
    district: "Fatehgarh Sahib",
    entity: "IRM Energy Limited",
    type: "Urban",
  },
  {
    id: "9.52",
    name: "SAS Nagar-Patiala-Sangrur",
    state: "Punjab",
    district: "SAS Nagar, Patiala, Sangrur",
    entity: "Torrent Gas Private Limited",
    type: "Multi-District",
  },
  {
    id: "9.53",
    name: "Ludhiana-Barnala-Moga",
    state: "Punjab",
    district: "Ludhiana, Barnala, Moga",
    entity: "Think Gas Ludhiana Private Limited",
    type: "Multi-District",
  },
  {
    id: "9.54",
    name: "Jalandhar-Kapurthala-SBS Nagar",
    state: "Punjab",
    district: "Jalandhar, Kapurthala, SBS Nagar",
    entity: "Think Gas Ludhiana Private Limited",
    type: "Multi-District",
  },
  {
    id: "10.12",
    name: "Mansa",
    state: "Punjab",
    district: "Mansa",
    entity: "Gujarat Gas Limited",
    type: "Urban",
  },
  {
    id: "10.32",
    name: "Ferozepur-Faridkot-Sri Muktsar Sahib-Fazilka",
    state: "Punjab",
    district: "Ferozepur, Faridkot, Sri Muktsar Sahib, Fazilka",
    entity: "Gujarat Gas Limited",
    type: "Multi-District",
  },
  {
    id: "10.33",
    name: "Hoshiarpur-Gurdaspur",
    state: "Punjab",
    district: "Hoshiarpur, Gurdaspur",
    entity: "Gujarat Gas Limited",
    type: "Multi-District",
  },
  {
    id: "11.39",
    name: "Pathankot",
    state: "Punjab",
    district: "Pathankot",
    entity: "Indian Oil Corporation Limited",
    type: "Urban",
  },
  {
    id: "11.40",
    name: "Tarn Taran",
    state: "Punjab",
    district: "Tarn Taran",
    entity: "Megha City Gas Distribution Private Limited",
    type: "Urban",
  },

  // Uttar Pradesh
  {
    id: "1.03",
    name: "Mathura",
    state: "Uttar Pradesh",
    district: "Mathura",
    entity: "Torrent Gas Private Limited",
    type: "Urban",
  },
  {
    id: "1.06",
    name: "Meerut",
    state: "Uttar Pradesh",
    district: "Meerut",
    entity: "GAIL Gas Limited",
    type: "Urban",
  },
  {
    id: "2.02",
    name: "Allahabad",
    state: "Uttar Pradesh",
    district: "Allahabad",
    entity: "Indian-Oil Adani Gas Private Limited",
    type: "Urban",
  },
  {
    id: "2.03",
    name: "Jhansi",
    state: "Uttar Pradesh",
    district: "Jhansi",
    entity: "Central UP Gas Limited",
    type: "Urban",
  },
  {
    id: "6.02",
    name: "Saharanpur",
    state: "Uttar Pradesh",
    district: "Saharanpur",
    entity: "Bharat Petroleum Corporation Limited",
    type: "Urban",
  },
  {
    id: "8.05",
    name: "Bulandshahr",
    state: "Uttar Pradesh",
    district: "Bulandshahr",
    entity: "Indian-Oil Adani Gas Private Limited",
    type: "Urban",
  },
  {
    id: "8.06",
    name: "Bagpat",
    state: "Uttar Pradesh",
    district: "Bagpat",
    entity: "Bagpat Green Energy Private Limited",
    type: "Urban",
  },
  {
    id: "99.03",
    name: "Bareilly",
    state: "Uttar Pradesh",
    district: "Bareilly",
    entity: "Central UP Gas Limited",
    type: "Urban",
  },
  {
    id: "99.04",
    name: "Kanpur",
    state: "Uttar Pradesh",
    district: "Kanpur",
    entity: "Central UP Gas Limited",
    type: "Urban",
  },
  {
    id: "99.10",
    name: "Agra",
    state: "Uttar Pradesh",
    district: "Agra",
    entity: "Green Gas Limited",
    type: "Urban",
  },
  {
    id: "99.13",
    name: "Firozabad",
    state: "Uttar Pradesh",
    district: "Firozabad",
    entity: "GAIL Gas Limited",
    type: "Urban",
  },
  {
    id: "99.17",
    name: "Lucknow",
    state: "Uttar Pradesh",
    district: "Lucknow",
    entity: "Green Gas Limited",
    type: "Urban",
  },
  {
    id: "99.19",
    name: "Ghaziabad-Hapur",
    state: "Uttar Pradesh",
    district: "Ghaziabad, Hapur",
    entity: "Indraprastha Gas Limited",
    type: "Multi-District",
  },
  {
    id: "99.20",
    name: "Noida",
    state: "Uttar Pradesh",
    district: "Gautam Buddha Nagar",
    entity: "Indraprastha Gas Limited",
    type: "Urban",
  },

  // Tamil Nadu
  {
    id: "9.50",
    name: "Karaikal-Nagapattinam",
    state: "Tamil Nadu",
    district: "Nagapattinam",
    entity: "Torrent Gas Private Limited",
    type: "Multi-District",
  },
  {
    id: "9.61",
    name: "Kanchipuram",
    state: "Tamil Nadu",
    district: "Kanchipuram",
    entity: "AGP CGD India Private Limited",
    type: "Urban",
  },
  {
    id: "9.62",
    name: "Chennai-Tiruvallur",
    state: "Tamil Nadu",
    district: "Chennai, Tiruvallur",
    entity: "Torrent Gas Chennai Private Limited",
    type: "Multi-District",
  },
  {
    id: "9.63",
    name: "Coimbatore",
    state: "Tamil Nadu",
    district: "Coimbatore",
    entity: "Indian Oil Corporation Limited",
    type: "Urban",
  },
  {
    id: "9.64",
    name: "Cuddalore-Nagapattinam-Tiruvarur",
    state: "Tamil Nadu",
    district: "Cuddalore, Nagapattinam, Tiruvarur",
    entity: "Adani Total Gas Limited",
    type: "Multi-District",
  },
  {
    id: "9.65",
    name: "Ramanathapuram",
    state: "Tamil Nadu",
    district: "Ramanathapuram",
    entity: "AGP CGD India Private Limited",
    type: "Urban",
  },
  {
    id: "9.66",
    name: "Salem",
    state: "Tamil Nadu",
    district: "Salem",
    entity: "Indian Oil Corporation Limited",
    type: "Urban",
  },
  {
    id: "9.67",
    name: "Tiruppur",
    state: "Tamil Nadu",
    district: "Tiruppur",
    entity: "Adani Total Gas Limited",
    type: "Urban",
  },

  // Delhi
  {
    id: "9.01",
    name: "Delhi",
    state: "Delhi",
    district: "National Capital Territory of Delhi",
    entity: "Indraprastha Gas Limited",
    type: "Metropolitan",
  },

  // Gujarat
  {
    id: "3.02",
    name: "Bhavnagar",
    state: "Gujarat",
    district: "Bhavnagar",
    entity: "Gujarat Gas Limited",
    type: "Urban",
  },
  {
    id: "3.03",
    name: "Jamnagar",
    state: "Gujarat",
    district: "Jamnagar",
    entity: "Gujarat Gas Limited",
    type: "Urban",
  },
  {
    id: "3.04",
    name: "Kutch West",
    state: "Gujarat",
    district: "Kutch",
    entity: "Gujarat Gas Limited",
    type: "Urban",
  },
  {
    id: "3.05",
    name: "Kutch East",
    state: "Gujarat",
    district: "Kutch",
    entity: "Jay Madhok Energy Private Limited led Consortium",
    type: "Urban",
  },
  {
    id: "98.02",
    name: "Surat-Bharuch-Ankleshwar",
    state: "Gujarat",
    district: "Surat, Bharuch",
    entity: "Gujarat Gas Limited",
    type: "Multi-District",
  },
  {
    id: "98.04",
    name: "Nadiad",
    state: "Gujarat",
    district: "Kheda",
    entity: "Gujarat Gas Limited",
    type: "Urban",
  },
  {
    id: "98.05",
    name: "Navsari",
    state: "Gujarat",
    district: "Navsari",
    entity: "Gujarat Gas Limited",
    type: "Urban",
  },
  {
    id: "98.06",
    name: "Rajkot",
    state: "Gujarat",
    district: "Rajkot",
    entity: "Gujarat Gas Limited",
    type: "Urban",
  },
  {
    id: "98.07",
    name: "Surendranagar",
    state: "Gujarat",
    district: "Surendranagar",
    entity: "Gujarat Gas Limited",
    type: "Urban",
  },
  {
    id: "98.08",
    name: "Ahmedabad",
    state: "Gujarat",
    district: "Ahmedabad",
    entity: "Adani Total Gas Limited",
    type: "Urban",
  },
  {
    id: "99.11",
    name: "Gandhinagar-Mehsana-Sabarkantha",
    state: "Gujarat",
    district: "Gandhinagar, Mehsana, Sabarkantha",
    entity: "Sabarmati Gas Limited",
    type: "Multi-District",
  },
  {
    id: "99.18",
    name: "Vadodara",
    state: "Gujarat",
    district: "Vadodara",
    entity: "Vadodara Gas Limited",
    type: "Urban",
  },

  // Maharashtra
  {
    id: "99.02",
    name: "Mumbai",
    state: "Maharashtra",
    district: "Mumbai",
    entity: "Mahanagar Gas Limited",
    type: "Metropolitan",
  },
  {
    id: "99.05",
    name: "Pune",
    state: "Maharashtra",
    district: "Pune",
    entity: "Maharashtra Natural Gas Limited",
    type: "Urban",
  },
  {
    id: "99.07",
    name: "Thane",
    state: "Maharashtra",
    district: "Thane",
    entity: "Mahanagar Gas Limited",
    type: "Urban",
  },

  // Karnataka
  {
    id: "4.01",
    name: "Bengaluru",
    state: "Karnataka",
    district: "Bengaluru Rural, Bengaluru Urban",
    entity: "GAIL Gas Limited",
    type: "Metropolitan",
  },

  // Haryana
  {
    id: "1.05",
    name: "Sonipat",
    state: "Haryana",
    district: "Sonipat",
    entity: "GAIL Gas Limited",
    type: "Urban",
  },
  {
    id: "95.01",
    name: "Faridabad",
    state: "Haryana",
    district: "Faridabad",
    entity: "Adani Total Gas Limited",
    type: "Urban",
  },
  {
    id: "98.13",
    name: "Gurugram",
    state: "Haryana",
    district: "Gurugram",
    entity: "Haryana City Gas Distribution Limited",
    type: "Urban",
  },

  // Rajasthan
  {
    id: "1.02",
    name: "Kota",
    state: "Rajasthan",
    district: "Kota",
    entity: "Rajasthan State Gas Limited",
    type: "Urban",
  },

  // Odisha
  {
    id: "97.04",
    name: "Khordha",
    state: "Odisha",
    district: "Khordha",
    entity: "GAIL (India) Limited",
    type: "Urban",
  },
  {
    id: "97.05",
    name: "Cuttack",
    state: "Odisha",
    district: "Cuttack",
    entity: "GAIL (India) Limited",
    type: "Urban",
  },

  // Jharkhand
  {
    id: "97.02",
    name: "East Singhbhum",
    state: "Jharkhand",
    district: "East Singhbhum",
    entity: "GAIL (India) Limited",
    type: "Urban",
  },
  {
    id: "97.03",
    name: "Ranchi",
    state: "Jharkhand",
    district: "Ranchi",
    entity: "GAIL (India) Limited",
    type: "Urban",
  },

  // Madhya Pradesh
  {
    id: "1.01",
    name: "Dewas",
    state: "Madhya Pradesh",
    district: "Dewas",
    entity: "GAIL Gas Limited",
    type: "Urban",
  },
  {
    id: "99.08",
    name: "Indore",
    state: "Madhya Pradesh",
    district: "Indore",
    entity: "Aavantika Gas Limited",
    type: "Urban",
  },
  {
    id: "99.12",
    name: "Gwalior",
    state: "Madhya Pradesh",
    district: "Gwalior",
    entity: "Aavantika Gas Limited",
    type: "Urban",
  },

  // Assam
  {
    id: "99.15",
    name: "Upper Assam",
    state: "Assam",
    district: "Upper Assam",
    entity: "Assam Gas Company Limited",
    type: "Regional",
  },

  // Tripura
  {
    id: "99.16",
    name: "Agartala",
    state: "Tripura",
    district: "West Tripura",
    entity: "Tripura Natural Gas Company Limited",
    type: "Urban",
  },

  // Uttarakhand
  {
    id: "9.85",
    name: "Dehradun",
    state: "Uttarakhand",
    district: "Dehradun",
    entity: "GAIL Gas Limited",
    type: "Urban",
  },

  // Goa
  {
    id: "6.07",
    name: "North Goa",
    state: "Goa",
    district: "North Goa",
    entity: "Goa Natural Gas Private Limited",
    type: "Urban",
  },
  {
    id: "8.01",
    name: "South Goa",
    state: "Goa",
    district: "South Goa",
    entity: "Indian Oil Adani Gas Private Limited",
    type: "Urban",
  },

  // Chandigarh
  {
    id: "2.01",
    name: "Chandigarh",
    state: "Chandigarh",
    district: "Chandigarh",
    entity: "Indian Oil Adani Gas Private Limited",
    type: "Urban",
  },

  // Puducherry
  {
    id: "9.51",
    name: "Puducherry",
    state: "Puducherry",
    district: "Puducherry",
    entity: "East Coast Natural Gas Private Limited",
    type: "Urban",
  },
];

const states = [
  "All States",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Chandigarh",
  "Puducherry",
  "Jammu & Kashmir",
  "Ladakh",
  "Dadra & Nagar Haveli",
  "Daman & Diu",
];

export default function ServiceableLocationsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAgencies, setFilteredAgencies] = useState(gasAgencies);
  const { t } = useLanguage();
  const { triggerHapticFeedback, playClickSound } = useAudio();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get cities for selected state
  const getCitiesForState = (state: string) => {
    if (state === "All States") return ["All Cities"];
    const cities = gasAgencies
      .filter((agency) => agency.state === state)
      .map((agency) => agency.name);
    return ["All Cities", ...Array.from(new Set(cities))];
  };

  // Filter agencies based on selections
  useEffect(() => {
    let filtered = gasAgencies;

    if (selectedState !== "All States") {
      filtered = filtered.filter(
        (agency) => agency.state.trim() === selectedState.trim()
      );
    }

    if (selectedCity !== "All Cities") {
      filtered = filtered.filter(
        (agency) => agency.name.trim() === selectedCity.trim()
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (agency) =>
          agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agency.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agency.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAgencies(filtered);
  }, [selectedState, selectedCity, searchTerm]);

  // Reset city when state changes
  useEffect(() => {
    setSelectedCity("All Cities");
  }, [selectedState]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Metropolitan":
        return "bg-purple-100 text-purple-800";
      case "Urban":
        return "bg-blue-100 text-blue-800";
      case "Multi-District":
        return "bg-green-100 text-green-800";
      case "Rural":
        return "bg-yellow-100 text-yellow-800";
      case "Regional":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header isScrolled={isScrolled} />
      <LanguageSwitcher />
      <AccessibilityMenu />

      {/* Hero Section */}
      <section className="relative pt-20 flex justify-center bg-gradient-to-br from-[#0B1C39] via-blue-900 to-[#0B1C39] text-white overflow-hidden h-[100vh]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 flex  items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-green-400 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Serviceable Locations</h1>
                <p className="text-sm text-gray-300">
                  Find LPG services near you
                </p>
              </div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Find{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-green-400">
                LPG Services
              </span>{" "}
              Near You
            </h2>

            <p className="text-xl text-gray-300 mb-8">
              Discover all serviceable locations across India where you can get
              LPG connections and refills. We serve over 500+ cities, towns, and
              villages nationwide.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-orange-400">
                  {gasAgencies.length}+
                </div>
                <div className="text-sm text-gray-400">Service Areas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">28</div>
                <div className="text-sm text-gray-400">States & UTs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">500+</div>
                <div className="text-sm text-gray-400">Cities & Towns</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-200 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-[#0B1C39] mb-4">
                Find Your <span className="text-blue-500">Location</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Search by state, city, or district to find LPG services near you
              </p>
            </motion.div>

            {/* Search and Filters - Modern Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 mb-12 shadow-lg border border-gray-100"
            >
              <div className="grid md:grid-cols-4 gap-6">
                {/* Search Input */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-gray-700 w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all bg-gray-50 hover:bg-white"
                  />
                </div>

                {/* State Filter */}
                <div className="relative group">
                  <select
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      triggerHapticFeedback();
                      playClickSound(true);
                    }}
                    className="text-gray-700 w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all appearance-none bg-gray-50 hover:bg-white cursor-pointer"
                  >
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* City Filter */}
                <div className="relative group">
                  <select
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                      triggerHapticFeedback();
                      playClickSound(true);
                    }}
                    className="text-gray-700 w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all appearance-none bg-gray-50 hover:bg-white cursor-pointer"
                  >
                    {getCitiesForState(selectedState).map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSelectedState("All States");
                    setSelectedCity("All Cities");
                    setSearchTerm("");
                    triggerHapticFeedback();
                    playClickSound(true);
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <Filter className="w-5 h-5" />
                  <span>Clear Filters</span>
                </button>
              </div>

              {/* Results Summary */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center"
              >
                <p className="text-gray-600">
                  Showing{" "}
                  <span className="font-bold text-[#0B1C39]">
                    {filteredAgencies.length}
                  </span>{" "}
                  serviceable locations
                  {selectedState !== "All States" && (
                    <span>
                      {" "}
                      in{" "}
                      <span className="font-bold text-orange-600">
                        {selectedState}
                      </span>
                    </span>
                  )}
                </p>
              </motion.div>
            </motion.div>

            {/* Results Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgencies.length > 0 ? (
                filteredAgencies.map((agency, index) => (
                  <motion.div
                    key={agency.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-orange-300 relative overflow-hidden"
                  >
                    {/* Decorative accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-yellow-400"></div>

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full flex items-center justify-center shadow-md">
                          <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#0B1C39] text-lg group-hover:text-blue-600 transition-colors">
                            {agency.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {agency.state}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                          agency.type
                        )} shadow-sm`}
                      >
                        {agency.type}
                      </span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                          {agency.district}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                          {agency.entity}
                        </span>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            triggerHapticFeedback();
                            playClickSound(true);
                          }}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Contact</span>
                        </button>
                        <button
                          onClick={() => {
                            triggerHapticFeedback();
                            playClickSound(true);
                          }}
                          className="flex-1 px-4 py-2 border border-blue-500 text-blue-500 text-sm font-medium rounded-lg hover:bg-orange-50 transition-colors duration-300 flex items-center justify-center space-x-2 hover:shadow-sm"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Apply</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="col-span-full text-center py-16"
                >
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MapPin className="w-10 h-10 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-3">
                      No locations found
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your search criteria or filters to find what
                      you're looking for
                    </p>
                    <button
                      onClick={() => {
                        setSelectedState("All States");
                        setSelectedCity("All Cities");
                        setSearchTerm("");
                        triggerHapticFeedback();
                        playClickSound(true);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Reset All Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Stats */}
      <section className="py-20 bg-[#0B1C39] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Nationwide Coverage</h2>
            <p className="text-xl text-gray-300">
              Serving millions of customers across India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "28+",
                label: "States & UTs",
                description: "Complete coverage across India",
              },
              {
                number: "500+",
                label: "Cities & Towns",
                description: "Urban and rural areas",
              },
              {
                number: "50+",
                label: "Gas Agencies",
                description: "Authorized distribution partners",
              },
              {
                number: "24/7",
                label: "Customer Support",
                description: "Round-the-clock assistance",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-orange-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <div className="text-gray-400">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
