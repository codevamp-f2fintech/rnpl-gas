import { db } from "@/lib/db";

interface RouteParams {
    params: {
        id: string;
    };
}

// App Router — supports dynamic route [id]
export async function POST(req: Request, { params }: RouteParams) {
    try {
        const { id } = params; // customer_id from URL
        const body = await req.json();
        const jsonString = JSON.stringify(body);

        // Insert using raw SQL
        await db.query(
            `INSERT INTO customer_assesment (customer_id, assesment) VALUES (?, ?)`,
            [id, jsonString]
        );

        return Response.json({ message: "Data inserted successfully" }, { status: 200 });
    } catch (error) {
        console.error("SQL insert error:", error);
        return Response.json({ message: "Insertion failed" }, { status: 500 });
    }
}
