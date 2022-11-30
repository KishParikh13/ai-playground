import { useState, useEffect } from 'react';
import TextInput from './TextInput.jsx'

function Interface (props) {
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(0)
    const [error, setError] = useState("")
    const [responses, setResponses] = useState([])

    const templateType = props.templateType

    const generateResponses = (inputIn) => {

        if (inputIn.length < 5) return;

        setLoading(loading+5)

        var url = props.url
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer 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");
        xhr.upload.addEventListener("progress", function (event) {
            if (event.lengthComputable) {
                setLoading(event.loaded / event.total * 100 | 5);
            }
        });
        // xhr.setRequestHeader("Openai-Organization", "org-wQd5fygxtBFDibUJKGIct5F");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                var open_ai_response = JSON.parse(xhr.response);
                
                if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 400)) {
                    var newResponses;
                    if (templateType == "text") {
                        newResponses = open_ai_response.choices
                    } else {
                        newResponses = open_ai_response.data
                    }

                    if (newResponses) {
                        newResponses.forEach(response => {
                            response.prompt = inputIn
                        });
                        let allResponses = [...responses, ...newResponses]
                        setResponses(allResponses);

                        setLoading(100)
                        setTimeout(() => {  
                            setLoading(0)
                        }, 1500);
                    }
                } else {
                    setError("Error: " + open_ai_response.error.message) 
                    setLoading(0)
                    setInput("")
                }
            }
        };

        var data = JSON.parse(props.requestData)
        data.prompt = props.promptSupport ? input + props.promptSupport : input
        data = JSON.stringify(data)

        xhr.send(data);
    }

    return (
        <div className="">
            <section className="py-16">
                <div className="container mx-auto max-w-4xl px-4">
                    <p className='text-xl text-gray-700 mb-4'>{props.description}</p>
                    <TextInput loading={loading} setLoading={value => setLoading(value)} setInput={value => setInput(value)} handleSubmit={e => generateResponses(input, responses)} />
                    <p className="text-sm text-red-700">{error}</p>
                    <div className={" mt-8 flex flex-col gap-y-8" + (responses.length > 0 ? "" : "hidden")}>

                        {/* <h2 className="mb-2 font-semibold text-gray-500 dark:text-gray-400">Matching Responses ({ responses ? responses.filter(response => response.prompt == input).length : 0}):</h2> */}
                        { templateType == "text" ?
                            <div className="space-y-1 text-lg flex flex-col gap-y-2 ">
                            {
                                responses.filter(response => response.prompt == input).map((response, i) => (
                                    <div key={i} className=""><div key={i} className="">
                                        <p className=''>{response.prompt}<mark className='bg-yellow-200'>{response.text}</mark></p></div>
                                    </div>
                                ))
                            }
                            </div>
                            :
                            <div className={"space-y-1 text-lg grid grid-cols-3 gap-4 "}>
                            {
                                responses.filter(response => response.prompt == input).map((response, i) => (
                                    <div key={i} className="">
                                        <img className="bg-indigo-800" src={response.url} alt={response.prompt} />
                                    </div>
                                ))
                            }
                            </div>
                        }
                        {/* <h2 className="mt-6 mb-2 font-semibold text-gray-500 dark:text-gray-400">Past Reponses ({ responses ? responses.filter(response => response.prompt != input).length : 0}):</h2> */}
                        { templateType == "text" ?
                            <div className=" space-y-1 text-lg flex flex-col gap-y-2 ">
                            {
                                responses.filter(response => response.prompt !== input).map((response, i) => (
                                    <div key={i} className=""><div key={i} className="">
                                        <p><b>{response.prompt}</b> {response.text}</p></div>
                                    </div>
                                ))
                            }
                            </div>
                            :
                            <div className={"space-y-1 text-lg grid grid-cols-3 gap-4 "}>
                            {
                                responses.filter(response => response.prompt !== input).map((response, i) => (
                                    <div key={i} className="">
                                        <img src={response.url} alt={response.prompt} />
                                    </div>
                                ))
                            }
                            </div>
                        }
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Interface;
