import { useState, useEffect } from 'react';

function TextInput (props) {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(0)
  const [error, setError] = useState("")

  const handleInput = (e) => {
    setInput(e.target.value);
    props.setInput(e.target.value)
    props.setLoading(0);
  }

  const handleSubmit = (e) => {
  }

  return (
    <div className="">
      <div className=" flex flex-row">
        <label htmlFor="simple-search" className="sr-only">Enter prompt</label>
        <div className="relative w-full">
            <div className="absolute top-2.5 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input value={ input } onChange={ e => handleInput(e) } type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />

          <div className="w-full bg-gray-200 rounded-b-full overflow-hidden h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 transition-all duration-700" style={{ width: `${props.loading}%` }}></div>
          </div>
        </div>
        {
            ((props.loading == 0) || (props.loading == 100)) ?
            <>
            <button type="button"  onClick={ e => props.handleSubmit(e) } className="whitespace-nowrap ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-4 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Generate 
            </button> 
            </> 
            :
            <>
            <div className="whitespace-nowrap ml-2 text-white bg-gray-700 font-medium rounded-lg text-sm px-8 py-4 mr-2 mb-2">
              Loading...
            </div>
            </>
        }
      </div>
    </div>
  );
}

export default TextInput;
