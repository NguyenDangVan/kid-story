import { storage } from "@/config/firebaseConfig";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const data=await req.json();
    const {imageBase64}=data;

    const fileName = "/ai-story/"+Date.now()+".png"
    const imageRef = ref(storage,fileName)

    await uploadString(imageRef,imageBase64,'data_url').then((snapshot) => {
        console.log('File uploaded');
    })

    const downloadUrl = await getDownloadURL(imageRef);
    console.log(downloadUrl);

    return NextResponse.json({imageUrl:downloadUrl});
}