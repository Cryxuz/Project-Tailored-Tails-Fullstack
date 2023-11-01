import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ItemInterface } from '../interfaces/iteminterface'

const Carousel: React.FC = () => {
  const [images, setImages] = useState<ItemInterface[]>([])
  const [visibleImages, setVisibleImages] = useState<ItemInterface[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    axios
      .get<ItemInterface[]>('http://localhost:3000/items')
      .then((response) => {
        setImages(response.data)
        setVisibleImages(response.data.slice(0, 4))
      })
      .catch((error) => {
        console.error('Error fetching items:', error)
      })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length - 3))
    }, 5000)

    return () => {
      clearInterval(timer)
    }
  }, [currentIndex, images])

  useEffect(() => {
    setVisibleImages(images.slice(currentIndex, currentIndex + 4))
  }, [currentIndex, images])

  return (
    <div className="w-full h-80 overflow-hidden relative carousel-container">
      <div className="flex transition-transform duration-500 ease-in-out">
        {visibleImages.map((image) => (
          <img
            key={image._id}
            src={image.imageUrl}
            alt={image.name}
            className="w-1/4 object-cover object-center ml-2 mr-2"
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
