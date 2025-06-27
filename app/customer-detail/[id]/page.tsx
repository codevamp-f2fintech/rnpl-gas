"use client";

import { useParams } from "next/navigation";
import DataCollectionForm from "@/components/data-collection-form";

export default function CustomerDetail() {
  const params = useParams();
  const customerId = params.id; // URL: /customer-detail/[id]

  return (
    <div className="m-20">
      <DataCollectionForm
        onSubmit={async (data) => {
          console.log("data", data);
          try {
            const res = await fetch(`/api/customer-assessment/${customerId}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });

            const result = await res.json();
            if (res.ok) {
              alert("Data saved successfully!");
            } else {
              alert(result.message || "Failed to save data");
            }
          } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong.");
          }
        }}
      />
    </div>
  );
}
