import { useState, useEffect } from 'react';

function TextInput (props) {
  const [input, setInput] = useState("")
  const [numResponsesInput, setNumResponsesInput] = useState(props.initialNumResponses)
  const [loading, setLoading] = useState(0)
  const [error, setError] = useState("")

  const handleInput = (e) => {
    setInput(e.target.value);
    props.setInput(e.target.value)
    props.setLoading(0);
  }

  useEffect (() => {
    handleNumResponseInput(props.initialNumResponses)
  }, [props.numResponses])

  const handleNumResponseInput = (value) => {
    setNumResponsesInput(value);
    props.handleNumResponsesInput(value)
    props.setLoading(0);
  }

  const handleSubmit = (e) => {
  }

  return (
    <div className="">
      <div className=" flex flex-row">
        <label htmlFor="simple-search" className="sr-only">Enter prompt</label>
        <div className="relative w-full flex ">
          <input value={ input } onChange={ e => handleInput(e) } type="text" id="simple-search" className=" flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
          <input value={ numResponsesInput } onChange={ e => handleNumResponseInput(e.target.value) } type="number" min="1" max="9" id="simple-search" className= " w-48 ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
          <div className="fixed bottom-0 left-0 right-0 w-full right-0 overflow-hidden h-3 dark:bg-gray-700">
            <div className="bg-blue-600 h-3 transition-all duration-700" style={{ width: `${props.loading}%` }}></div>
          </div>
        </div>
          <div className=''>
          {
              ((props.loading == 0) || (props.loading == 100)) ?
              <>
              <button type="button"  onClick={ e => props.handleSubmit(e) } className="whitespace-nowrap ml-2 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium text-sm rounded-lg px-8 py-5 mb-[0.1rem]">
                Generate 
              </button> 
              </> 
              :
              <>
              <div className="whitespace-nowrap ml-2 text-white bg-gray-700 font-medium rounded-lg text-sm px-8 py-5 ">
                {props.loading < 100 ? props.loading : 100}%
              </div>
              </>
          }
        </div>
      </div>
    </div>
  );
}

export default TextInput;
