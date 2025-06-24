import Image from 'next/image'
import React from 'react'

function BookCoverPage({ imageUrl }: any) {
  return (
    <div>
      {imageUrl ? (
        <Image src={imageUrl} alt='cover' width={500} height={500} />
      ) : (
        <div style={{ width: 500, height: 500, background: '#eee' }} />
      )}
    </div>
  )
}

export default BookCoverPage