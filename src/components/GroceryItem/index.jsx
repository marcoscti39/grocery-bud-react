import React from 'react'
import {BiEdit} from 'react-icons/bi'
import {BsFillTrashFill} from 'react-icons/bs'

import './index.css'
export default function GroceryItem({groceryList, removeItem, editItem}) {
    return (
        <>
            {groceryList.map((item,index) =>{
                return (
                    <article key={index} className="grocery-item" >
                        <p className="item-name">{item}</p>
                        <div className="icons-wrapper">
                            <button className="item-edit-btn" onClick={() => editItem(item, index)} >
                                <BiEdit/>
                            </button>
                            <button className="item-remove-btn" onClick={() => removeItem(index)} >
                                <BsFillTrashFill/>
                            </button>
                        </div>
                    </article>
                )
            })}

        
        </>
        
    )
}
