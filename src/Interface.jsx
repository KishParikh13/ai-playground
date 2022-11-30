import { useState, useEffect } from 'react';
import TextInput from './TextInput.jsx'
import ResponseList from './ResponseList.jsx'

function Interface (props) {
    const [input, setInput] = useState("")
    const [numResponsesInput, setNumResponsesInput] = useState(1)
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
        xhr.setRequestHeader("Authorization", `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`);
        xhr.upload.addEventListener("progress", function (event) {
            if (event.lengthComputable) {
                let progress = (event.loaded / event.total * 100) | 5
                if (progress > 100) progress = 100
                setLoading(progress);
            }
        });

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                var open_ai_response = JSON.parse(xhr.response);
                console.log(open_ai_response)
                
                if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 400)) {
                    var newResponses;
                    if (templateType == "text" || templateType == "card" || templateType == "table") {
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

                        setTimeout(() => {  
                            setLoading(0)
                        }, 1000);
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
        console.log(numResponsesInput)
        data.n = parseInt(numResponsesInput)
        data = JSON.stringify(data)

        xhr.send(data);
    }

    return (
        <div className="">
            <p className='text-xl text-gray-700 mb-4'>{props.description}</p>
            <TextInput initialNumResponses={props.numRequestsDefaults} handleNumResponsesInput={n => setNumResponsesInput(n)} loading={loading} setLoading={value => setLoading(value)} setInput={value => setInput(value)} handleSubmit={e => generateResponses(input, responses)} />
            <p className="text-sm text-red-700">{error}</p>
            <div className={" mt-8 flex flex-col gap-y-8 " + (responses.length > 0 ? "" : "hidden")}>
                <ResponseList isMatching={true} templateType={templateType} responses={responses.filter(response => response.prompt == input)} />
                <ResponseList isMatching={false} templateType={templateType} responses={responses.filter(response => response.prompt != input)} />
            </div>
        </div>
    );
}

export default Interface;
