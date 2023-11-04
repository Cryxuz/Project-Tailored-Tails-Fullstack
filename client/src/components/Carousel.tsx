import { useState, useEffect } from 'react'
import axios from 'axios'
import { ItemInterface } from '../interfaces/iteminterface'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'

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

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % (images.length - 3)
    )
  }

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length - 3))
  }

  return (
    <div className="w-full h-80 overflow-hidden relative">
      <div className="flex transition-transform duration-500 ease-in-out">
        {visibleImages.map((image) => (
          <img
            key={image._id}
            src={image.imageUrl}
            alt={image.name}
            className="w-full h-80 object-cover object-center ml-2 mr-2 transition-transform duration-500 ease-in-out"
          />
        ))}
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full">
        <AiFillCaretLeft
          onClick={handlePrevClick}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-l"
        >
          Prev
        </AiFillCaretLeft>
        <AiFillCaretRight
          onClick={handleNextClick}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-r"
        >
          Next
        </AiFillCaretRight>
      </div>
    </div>
  )
}

export default Carousel
