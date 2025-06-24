"use client"
import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, use, useState } from 'react'
import HTMLFlipBook from 'react-pageflip';
import BookCoverPage from '../_components/BookCoverPage'
import StoryPages from '../_components/StoryPages'
import LastPage from '../_components/LastPage'

function ViewStory({ params }: { params: Promise<{ id: string }> }) {
    const idParams = use(params)
    const [story,setStory]=useState<any>();
    
    useEffect(() => {
        console.log(idParams.id);
        getStory();
    },[])

    const getStory = async()=>{
        const result = await db.select().from(StoryData)
            .where(eq(StoryData.storyId,idParams.id));
        
        console.log(result[0])
        console.log(result[0].coverImage)
        setStory(result[0])
    }
  return (
    <div className='p-10 md:px-20 lg:px-40'>
        <h2 className='font-bold text-4xl text-center p-10 bg-primary text-white'>
            {story?.output?.storyTitle}</h2>
        
        <HTMLFlipBook 
              width={500}
              height={500}
              className="mt-10"
              showCover={true}
              style={{}}
              startPage={0}
              minWidth={500}
              maxWidth={500}
              minHeight={500}
              maxHeight={500}
              drawShadow={true}
              flippingTime={0.5}
              usePortrait={true}
              startZIndex={0}
              autoSize={false}
              maxShadowOpacity={0}
              mobileScrollSupport={false}
              clickEventForward={false}
              useMouseEvents={true}
              swipeDistance={0}
              showPageCorners={false}
              disableFlipByClick={false}
              size={'fixed'}
            >
            <div>
                <BookCoverPage imageUrl={story?.coverImage} />
            </div>
            {
                [...Array(story?.output?.chapters?.length)].map((item,index) => (
                    <div key={index} className='bg-white p-10 border'>
                        <StoryPages storyChapter={story?.output.chapters[index]} />
                    </div>
                ))
            }
            {/* <div>
                <LastPage />
            </div> */}
        </HTMLFlipBook>
    </div>
  )
}
export default ViewStory

