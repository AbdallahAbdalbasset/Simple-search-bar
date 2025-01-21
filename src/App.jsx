import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {useRef} from 'react';

function TableCategoryRow({category}){
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}
function ProductRow({product}){
  var pr;
  if(product.stocked){
    pr = product.name
  } else{
    pr = <span style={{color:'red'}}> {product.name} </span>;
  }

  return (
    <tr >
      <td>{pr}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({products}){
  const rows = [];
  var prev = null;
  products.forEach((product) => {
    if(product.category !== prev){
      rows.push( <TableCategoryRow key = {product.category} category={product.category} /> );
    }

    rows.push(
      <ProductRow key = {product.name} product={product} />
    );

    prev = product.category;
  });

  return (
    <table>
      <thead >
        <tr>
          <th style = {{width: "10%"}} >Name</th>
          <th style = {{width: "10%"}} >Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );

}

function SearchBar({inputRef, checkBoxRef, onChange}) {

  return (
    <div className ="searchBar">
      <input onChange={onChange} ref = {inputRef} type="text" placeholder="Search..." />
      <div className = "checkBox">
        <input onClick={onChange} ref = {checkBoxRef} type = "checkbox" />
        <h4>  {"Only show items in stock"} </h4>
      </div>
    </div>
  );
}
function FilterableProductTable({products, inputRef, onChange, checkBoxRef}) {
  const [count, setCount] = useState(0)

  return (
    <>
    <SearchBar checkBoxRef = {checkBoxRef}  inputRef={inputRef} onChange={onChange}/>
    <ProductTable products={products} />
    </>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

function App(){
  const [products, setProducts] = useState(PRODUCTS);
  const inputRef = useRef(null);
  const checkBoxRef = useRef(null);

  function handleChange() {
    const value = inputRef.current.value;
    const copy = [];
    
    PRODUCTS.map(product => {
      if(product.name.toLowerCase().includes(value.toLowerCase()))
        copy.push(product);
    });
    if(!checkBoxRef.current.checked){
      setProducts(copy);
      return;
    }
    const copy2 = [];
    
    copy.map(product => {
      if(product.stocked)
        copy2.push(product);
    });
    setProducts(copy2);
  }
  console.log(products);

  return <FilterableProductTable  checkBoxRef = {checkBoxRef} onChange = {handleChange} inputRef = {inputRef} products = {products} />;
}

export default App;