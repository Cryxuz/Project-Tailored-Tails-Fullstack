import axios from "axios"
import { useState, useEffect } from "react"
import { ItemInterface } from "../interfaces/iteminterface"
import { useNavigate, useParams } from "react-router-dom"

function SingleItem () {

  const navigate = useNavigate();

 

  const { itemId } = useParams()
  const [item, setItem] = useState<ItemInterface | null>(null);
  console.log(item)

  useEffect(() => {
    axios
      .get<ItemInterface>(`http://localhost:3000/items/${itemId}`)
      .then((response) => {
        console.log(response.data);
        setItem(response.data);
      })
      .catch((error) => {
        console.error('Error fetching item:', error);
      });
  }, [itemId]);

  if (item === null) {
    return <div>Loading...</div>;
  }
return (
  <div>
    <button onClick={() => navigate(-1)} className='py-2 px-4 bg-orange-600 rounded-lg text-white hover:bg-orange-500 m-[4%]'>Previous Page</button>
    <div className="md:grid md:grid-cols-2 mx-[5%] gap-[2%]">
      <div className="flex items-center justify-center ">
        <img className="rounded-md py-[5%]" src={item.imageUrl} alt=""/>
      </div>
      <div className="">
        <h2 className="font-bold text-2xl">{item.name}</h2>
        <p className="font-medium text-lg">Rating:</p>
        {(() => {
            switch (item.rating) {
              case 1:
                return "★☆☆☆☆";
              case 2:
                return "★★☆☆☆";
              case 3:
                return "★★★☆☆";
              case 4:
                return "★★★★☆";
              case 5:
                return "★★★★★";
              default:
                return "Not rated";
            }
          })()}
        <p className="font-medium text-lg">Description:</p>
        <p>{item.description}</p>
        <p><span className="font-medium text-lg">Catgory:</span> {item.category}</p>
        <p><span className="font-medium text-lg">Price:</span> ${item.price}</p>
        <p><span className="font-medium text-lg">Stock:</span> {item.stock}</p>
        <br />
        <hr className="border-t border-black my-4" />
        <br />
        <p className="font-semibold text-xl">Product Information:</p>
        <p><span className="font-medium text-lg">Weight:</span> 120g</p>
        <p><span className="font-medium text-lg">Dimension:</span> 50-60 cm</p>
        <p><span className="font-medium text-lg">Superior Material:</span> Made of breathable,soft and skin-friendly cotton and polyester fiber.</p>
        <p><span className="font-medium text-lg">Used Widley:</span> Suitable for all house pets</p>
        <button className='p-2 bg-orange-600 rounded-lg text-white hover:bg-orange-500 mt-4'>Add To Cart</button>

      </div>
      <div>    
      </div>
    </div>
  
</div>
)
}

export default SingleItem