import axios from 'axios'

export const setItems = (items) => ({
  type: 'SET_ITEMS',
  payload: items,
})

export const fetchItems = () => {
  return (dispatch) => {
    axios
      .get('http://localhost:3000/items')
      .then((response) => {
        dispatch(setItems(response.data))
      })
      .catch((error) => {
        console.error('Error fetching items:', error)
      })
  }
}
