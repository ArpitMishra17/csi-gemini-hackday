import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

export async function POST(req: Request) {
    try {
        await dbConnect();

        const cookieStore = await cookies();
        const token = cookieStore.get("auth-token")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        } catch (err) {
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const {
            age,
            gender,
            grade,
            skills,
            interests,
            aims,
            personalityAnswers,
            situationPreference,
            explorationPreference
        } = body;

        const user = await User.findByIdAndUpdate(
            decoded.userId,
            {
                isOnboarded: true,
                onboardingData: {
                    age,
                    gender,
                    grade,
                    skills,
                    interests,
                    aims,
                    personalityAnswers,
                    situationPreference,
                    explorationPreference
                }
            },
            { new: true }
        );

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Onboarding data saved successfully", user },
            { status: 200 }
        );

    } catch (error) {
        console.error("Onboarding error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
