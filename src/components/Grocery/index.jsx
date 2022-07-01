import React,{useState, useEffect} from 'react'

import GroceryItem from "./../GroceryItem"

import './index.css'

export default function Grocery() {
    const getGroceries = JSON.parse(localStorage.getItem("groceryItems"))
    const [groceryList, setGroceryList] = useState(getGroceries)
    const [edit, setEdit] = useState(false)
    const [indexItemToedit, setIndexItemToEdit] = useState('')
    const [isAltered, setIsAltered] = useState(false)
    const [messageAltered, setMessageAltered] = useState("")
    const [notificationColor, setNotificationColor] = useState("")
    const [notificationBgColor, setNotificationBgColor] = useState("")

    const notificationStyle = {
        backgroundColor: notificationBgColor,
        width: "100%",
        textAlign: "center",
        color: notificationColor,
    }

    const saveGroceries = () =>{
        localStorage.setItem("groceryItems", JSON.stringify(groceryList))
    }
    saveGroceries()
    
    const handleGroceryAdd = (e) =>{
        e.preventDefault()

        const input = document.querySelector(".grocery-input")

        if(edit){
            groceryList.splice(indexItemToedit, 1, input.value)
            setGroceryList(groceryList)
            input.value = ""
            setEdit(false)
            notificateAlteration("item edited", "#93fa95", "green")

            return
        }
        notificateAlteration("item added", "#93fa95", "green")

        setGroceryList(prev => [...prev, input.value])
        
    }
    useEffect(() =>{
        const input = document.querySelector(".grocery-input")
        input.value  = ""

    }, [groceryList])

    const removeItem = (indexItem) =>{
        notificateAlteration("item removed", "#fa8c8c", "#b80202")

        const groceryFiltered = groceryList.filter((_, index) => index !== indexItem)
        setGroceryList(groceryFiltered)
    }

    const clearGroceryList = () =>{
        notificateAlteration("empty list","#fa8c8c", "#b80202")

        setGroceryList([])

    }
    const editItem = (item, index) =>{
        setEdit(true)
        const input = document.querySelector(".grocery-input")
        input.value = item
        setIndexItemToEdit(index)

    }

    const notificateAlteration = (alteration, bgColor, color) =>{
        setIsAltered(true)
        setMessageAltered(alteration)
        setNotificationBgColor(bgColor)
        setNotificationColor(color)
        setTimeout(() =>{
            setIsAltered(false)
        },2000)

    }
    

    
    return (
        <section className='grocery-container'>
            {isAltered && <p style={notificationStyle} >{messageAltered}</p>}
            <h1 className="title">grocery bud</h1>
            <form className="grocery-form" >
                <input className="grocery-input" type="text" />
                <button className="grocery-add-btn" onClick={handleGroceryAdd} >{edit ? "edit" : "submit"}</button>
            </form>
            <section className="grocery-items-container">
                {groceryList.length > 0 && <GroceryItem groceryList={groceryList} removeItem={removeItem} editItem={editItem} />}
            </section>
            <button className="grocery-clear-btn" onClick={clearGroceryList} >clear items</button>
        </section>
    )
}
