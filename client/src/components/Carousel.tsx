import { useState, useEffect } from 'react'
import axios from 'axios'
import { ItemInterface } from '../interfaces/iteminterface'

const Carousel: React.FC = () => {
  const [images, setImages] = useState<ItemInterface[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)

  useEffect(() => {
    let isMounted = true

    axios
      .get<ItemInterface[]>('http://localhost:3000/items')
      .then((response) => {
        if (isMounted) {
          setImages(response.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching items:', error)
      })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    const nextImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }

    const timer = setInterval(() => {
      nextImage()
    }, 5000)

    return () => {
      clearInterval(timer)
    }
  }, [currentImageIndex, images])

  return (
    <div className="w-full h-80 overflow-hidden relative">
      <div className="flex transition-transform duration-300 ease-in-out">
        {images.map((image, index) => (
          <img
            key={image._id}
            src={image.imageUrl}
            alt={image.name}
            className={`w-full h-full absolute transform ${
              index === currentImageIndex ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-500`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
