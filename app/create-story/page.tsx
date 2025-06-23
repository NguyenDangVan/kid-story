"use client"
import React, { useState } from 'react'
import StorySubjectInput from './_components/StorySubjectInput'
import StoryType from './_components/StoryType'
import AgeGroup from './_components/AgeGroup'
import ImageStyle from './_components/ImageStyle'
import { Button, image, toast, useRouter } from '@heroui/react'
import { getCreateStoryPrompt } from '@/config/prompt'
import { geminiChat } from '@/config/GeminiAi'
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import { useUser } from "@clerk/nextjs"
import CustomLoader from './_components/CustomLoader'
import axios from 'axios'

export interface fieldData {
  fieldName:string,
  fieldValue:string
}
export interface formDataType{
  storySubject:string,
  storyType:string,
  imageStyle:string,
  ageGroup:string,
}
function CreateStory() {

  const [formData,setFormData]=useState<formDataType>();
  const [loading,setLoading]=useState(false);
  const router = useRouter();
  // const notify = (msg:string) => toast(msg);
  // const notifyError = (msg:string) => toast.error(msg);
  const {user}=useUser();

  // used to add data to form
  const onHandleUserSelection=(data:fieldData)=>{
    setFormData((prev:any)=>({
      ...prev,
      [data.fieldName]:data.fieldValue
    }));
  }

  const GenerateStory=async()=>{
    setLoading(true);
    const prompt = getCreateStoryPrompt({
      ageGroup: formData?.ageGroup??'',
      storyType: formData?.storyType??'',
      imageStyle: formData?.imageStyle??'',
      storySubject: formData?.storySubject??'',
    });
    // Generate Story
    try {
      const response = await geminiChat(prompt);
      const storyText = response.text ?? '';
      
      console.log(storyText);

      const imageResp = await axios.post('/api/generate-image', {
        prompt: 'Add text with tittle:'+JSON.parse(storyText)?.storyTitle+
        " in bold text for cover, "+JSON.parse(storyText)?.storyCoverPrompt?.prompt
      });

      let imageBase64 = imageResp?.data?.image;

      // Nếu chưa có tiền tố, thêm vào
      if (!imageBase64.startsWith('data:image/png;base64,')) {
        imageBase64 = `data:image/png;base64,${imageBase64}`;
      }

      const imageRespSaveImage = await axios.post('/api/save-image', {
        imageBase64
      })

      const storageImageUrl = imageRespSaveImage.data

      const resp = await SaveInDB(storyText, storageImageUrl);
      console.log(resp);

      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }


    // Generate image
  }

  const SaveInDB=async(output:string, imageUrl:string)=>{
    const recordId = uuidv4();
    setLoading(true);
    try {
      const result = await db.insert(StoryData).values({
        storyId:recordId,
        ageGroup:formData?.ageGroup,
        imageStyle:formData?.imageStyle,
        storySubject:formData?.storySubject,
        storyType:formData?.storyType,
        output:JSON.parse(output),
        coverImage:imageUrl,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        userImage:user?.imageUrl,
        userName:user?.fullName
      }).returning({storyId:StoryData?.storyId})
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
    
  }

  return (
    <div className='p-10 md:px-20 lg:px-40'>
      <h2 className='font-extrabold text-[70px] text-primary text-center'>CREATE YOUR STORY</h2>
      <p className='text-2xl text-primary text-center font-light'>Unlock your creativity with AI: Craft stories like never before !Let our AI bring your imagination to life, one story at a time</p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-14'>
        {/* Story Subject */}
        <StorySubjectInput userSelection={onHandleUserSelection}/>

        {/* Story Type */}
        <StoryType userSelection={onHandleUserSelection}/>

        {/* Age Group */}
        <AgeGroup userSelection={onHandleUserSelection}/>

        {/* Image Style */}
        <ImageStyle userSelection={onHandleUserSelection}/>
      </div>

      <div className='flex justify-end my-10'>
        <Button color='primary'
        disabled={loading}
        className='p-10 text-2xl'
        onClick={GenerateStory}>
          Generate Story
        </Button>
      </div>
      <CustomLoader isLoading={loading} />
    </div>
  )
}

export default CreateStory
