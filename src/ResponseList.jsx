import { useState, useEffect } from 'react';

function ResponseList (props) {

    const templateType = props.templateType
    const isMatching = props.isMatching
    const responses = props.responses

    const responseComponent = (response) => {
        switch (templateType) {
            case 'text':
                return (
                    <p className=''>
                        {response.prompt} <mark className={isMatching ? 'bg-yellow-200' : 'bg-gray-200'}>{response.text}</mark>
                    </p>
                );
            case 'image':
                return (
                    <img className="bg-indigo-800" src={response.url} alt={response.prompt} />
                );
            case 'card':
                return (
                    <div className='flex flex-row border rounded-md overflow-hidden'>
                        <p className='p-4 bg-gray-100 flex-grow'>{response.prompt}</p>
                        <p className={`p-4 px-8 bg-${response.text.split(",")[1].trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")}-600 text-white`}>{response.text.trim().split(",")[0]}</p>
                    </div>
                )
            case 'table':
                return (
                    <div className='flex flex-col  border rounded-md overflow-hidden'>
                        <p className='bg-gray-200  p-4'>{response.prompt}</p>
                        <p className='p-4 text-lg'>{response.text}</p>
                    </div>
                )
            default:
                return (
                    <div className='bg-gray-100'>
                        <p className='p-4'>{response.prompt}</p>
                        <p className='p-4'>{response.text}</p>
                    </div>
                )
        }
    }

    const layouts = {
        "text": {
            listStyle: "space-y-1 text-lg flex flex-col gap-y-2 ",
        },
        "image": {
            listStyle: " space-y-1 text-lg grid grid-cols-3 gap-4  ",
        },
        "table": {
            listStyle: "space-y-1 text-lg flex flex-col gap-y-2 ",
        },
        "card": {
            listStyle: "space-y-1 text-lg flex flex-col gap-y-2 ",
        },
    }

    return (
        <div className="">
            <div className={ layouts[templateType].listStyle }>
                { responses.map((response, i) => (
                    <div key={i} className="">
                        { responseComponent(response) }
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ResponseList;
