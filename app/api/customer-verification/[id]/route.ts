import { db } from "@/lib/db";
import { S3Client, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';

// Initialize S3 client
const s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

// Upload a single base64 image to S3
async function uploadImageToS3(imageDataUrl: string, fileName: string): Promise<string> {
    try {
        const matches = imageDataUrl.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            throw new Error('Invalid image data');
        }

        const mimeType = matches[1];
        const imageBuffer = Buffer.from(matches[2], 'base64');
        const fileExtension = mimeType.split('/')[1];
        const uniqueFileName = `${fileName}_${uuidv4()}.${fileExtension}`;

        const uploadParams: PutObjectCommandInput = {
            Bucket: process.env.AWS_S3_BUCKET_NAME!,
            Key: `verification-documents/${uniqueFileName}`,
            Body: imageBuffer,
            ContentType: mimeType,
        };

        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);

        return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/verification-documents/${uniqueFileName}`;
    } catch (error) {
        console.error('Error uploading to S3:', error);
        throw error;
    }
}

async function processImageArray(images: string[], baseName: string): Promise<string[]> {
    if (!Array.isArray(images) || images.length === 0) return [];
    const uploadPromises = images.map((img, i) => uploadImageToS3(img, `${baseName}_${i + 1}`));
    return await Promise.all(uploadPromises);
}

async function processSingleImage(image: string | null | undefined, fileName: string): Promise<string | null> {
    if (!image) return null;
    return await uploadImageToS3(image, fileName);
}

interface VerificationRequest {
    userPhoto: string | null;
    idPhoto: string | null;
    assetPhotos: string[];
    vehicleRegistrationNumber: string | null;
    digitalFootprintPhone: string;
    utilityBills: string[];
    rationCard: string | null;
    incomeProof: string[];
    dependantsProof: string[];
    emergencyFundProof: string[];
    incomeFrequencyProof: string[];
    gasConnectionNumber: string;
    gasBook: string | null;
    consents: {
        dataUsage: boolean;
        verification: boolean;
        assetPhotos: boolean;
        creditInfo: boolean;
        accountAggregator: boolean;
    };
    submittedAt: string;
}

interface RouteParams {
    params: {
        id: string;
    };
}

export async function POST(req: Request, { params }: RouteParams) {
    try {
        const { id } = params;
        const body: VerificationRequest = await req.json();

        const [
            userPhotoUrl,
            idPhotoUrl,
            assetPhotoUrls,
            utilityBillUrls,
            rationCardUrl,
            incomeProofUrls,
            dependantsProofUrls,
            emergencyFundProofUrls,
            incomeFrequencyProofUrls,
            gasBookUrl
        ] = await Promise.all([
            processSingleImage(body.userPhoto, `user_photo_${id}`),
            processSingleImage(body.idPhoto, `id_photo_${id}`),
            processImageArray(body.assetPhotos, `asset_photo_${id}`),
            processImageArray(body.utilityBills, `utility_bill_${id}`),
            processSingleImage(body.rationCard, `ration_card_${id}`),
            processImageArray(body.incomeProof, `income_proof_${id}`),
            processImageArray(body.dependantsProof, `dependants_proof_${id}`),
            processImageArray(body.emergencyFundProof, `emergency_fund_${id}`),
            processImageArray(body.incomeFrequencyProof, `income_frequency_${id}`),
            processSingleImage(body.gasBook, `gas_book_${id}`)
        ]);

        const verificationData = {
            customer_id: id,
            user_photo_url: userPhotoUrl,
            id_photo_url: idPhotoUrl,
            asset_photo_urls: JSON.stringify(assetPhotoUrls),
            vehicle_registration_number: body.vehicleRegistrationNumber || null,
            digital_footprint_phone: body.digitalFootprintPhone,
            utility_bill_urls: JSON.stringify(utilityBillUrls),
            ration_card_url: rationCardUrl,
            income_proof_urls: JSON.stringify(incomeProofUrls),
            dependants_proof_urls: JSON.stringify(dependantsProofUrls),
            emergency_fund_proof_urls: JSON.stringify(emergencyFundProofUrls),
            income_frequency_proof_urls: JSON.stringify(incomeFrequencyProofUrls),
            gas_connection_number: body.gasConnectionNumber,
            gas_book_url: gasBookUrl,
            consent_data_usage: body.consents.dataUsage,
            consent_verification: body.consents.verification,
            consent_asset_photos: body.consents.assetPhotos,
            consent_credit_info: body.consents.creditInfo,
            consent_account_aggregator: body.consents.accountAggregator,
            submitted_at: body.submittedAt,
            created_at: new Date().toISOString(),
            status: 'pending_review'
        };

        const insertQuery = `
            INSERT INTO customer_verification (
                customer_id,
                user_photo_url,
                id_photo_url,
                asset_photo_urls,
                vehicle_registration_number,
                digital_footprint_phone,
                utility_bill_urls,
                ration_card_url,
                income_proof_urls,
                dependants_proof_urls,
                emergency_fund_proof_urls,
                income_frequency_proof_urls,
                gas_connection_number,
                gas_book_url,
                consent_data_usage,
                consent_verification,
                consent_asset_photos,
                consent_credit_info,
                consent_account_aggregator,
                submitted_at,
                created_at,
                status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = Object.values(verificationData);

        await db.query(insertQuery, values);

        return new Response(JSON.stringify({
            message: "Verification data saved successfully",
            customer_id: id,
            status: "success"
        }), { status: 200 });

    } catch (error: any) {
        console.error("Error saving verification data:", error);
        return new Response(JSON.stringify({
            message: "Failed to save verification data",
            error: error.message
        }), { status: 500 });
    }
}
