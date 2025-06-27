import { db } from "@/lib/db";

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            connectionType,
            business_name,
            name,
            phone,
            address,
            state,
            business_type,
            service,
            income,
            number_of_employees,
            notes,
        } = body;

        if (!connectionType || !["domestic", "commercial"].includes(connectionType)) {
            return new Response(JSON.stringify({ message: "Invalid type" }), { status: 400 });
        }
        let result;
        if (connectionType === "domestic") {
            result = await db.query(
                `INSERT INTO domestic_customer 
         (name, phone, address, state, service_type, monthly_income, notes) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [name, phone, address, state, service, income, notes]
            );
        } else {
            result = await db.query(

                `INSERT INTO commercial_customer 
         (business_name, name, phone, business_type, address, state, service_type, monthly_income, number_of_employees, requirements) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    business_name,
                    name,
                    phone,
                    business_type,
                    address,
                    state,
                    service,
                    income,
                    number_of_employees,
                    notes,
                ]
            );
        }
        const insertId = result?.[0]?.insertId ?? null;

        return new Response(
            JSON.stringify({
                message: "Application saved successfully",
                customerId: insertId,
            }),
            { status: 200 }
        );
    } catch (err) {
        console.error("API Error:", err);
        return new Response(JSON.stringify({ message: "Failed to save application" }), { status: 500 });
    }
}
