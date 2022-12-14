import { useState, useEffect } from 'react';

import Interface from "./Interface.jsx"

function App() {
  const [selectedApp, setSelectedApp] = useState(sessionStorage.getItem("app") ?? -1)

  const apps = [
    {
      name: "Autocomplete",
      description: "Autocomplete text using OpenAI's GPT-3 API.",
      templateType: "text",
      url: "https://api.openai.com/v1/completions",
      promptSupport: null,
      numRequestsDefaults: 3,
      request: `{"model": "text-davinci-002", "temperature": 1.0, "max_tokens": 48, "n": 3, "top_p": 1, "frequency_penalty": 0.75, "presence_penalty": 0}`
    },
    {
      name: "Image Generator",
      description: "Generate images using OpenAI's GPT-3 API. Turn text into pictures with little effort.",
      templateType: "image",
      numRequestsDefaults: 3,
      url: "https://api.openai.com/v1/images/generations",
      request: `{ "n": 3, "size": "256x256" }`
    },
    {
      name: "Sentiment Analyzer",
      description: "Enter a phrase to have it mapped to an color.",
      templateType: "card",
      numRequestsDefaults: 1,
      url: "https://api.openai.com/v1/completions",
      promptSupport: "\n analyze the sentiment of the previous tweet, return one word to summarize the analysis, followed by a comma, and a relevant color of the rainbow, no periods.",
      request: `{"model": "text-davinci-003", "temperature": 1.0, "max_tokens": 48, "n": 3, "top_p": 1, "frequency_penalty": 0.75, "presence_penalty": 0}`
    },
    {
      name: "Custom Prompt",
      description: "Tell GPT-3 what you want it to do. Internet search a topic, write a story, or even write a program.",
      templateType: "table",
      numRequestsDefaults: 1,
      url: "https://api.openai.com/v1/completions",
      promptSupport: null,
      request: `{"model": "text-davinci-003", "temperature": 0.5, "max_tokens": 128, "n": 1, "top_p": 1, "frequency_penalty": 0.75, "presence_penalty": 0}`
    },
    {
      name: "Chatbot",
      description: "Have a conversation with an AI chatbot. It's like talking to a human, but better. (This is a work in progress.)",
      templateType: "chat",
      numRequestsDefaults: 1,
      url: "https://api.openai.com/v1/completions",
      promptSupport: "You are Alan Watts the philosopher. You are helping a 22 year old who lacks motivation and direction, but wants to find happiness. Respond to his messages kindly with a philosophical tangent to what he said in the previous message.",
      request: `{"model": "text-davinci-003", "temperature": 0.9, "max_tokens": 150, "n": 1, "top_p": 1, "frequency_penalty": 0, "presence_penalty": 0.6, "stop": [" Human:", " AI:"]}`
    }
  ]

  const selectApp = (index) => {
    sessionStorage.setItem("app", index);
    setSelectedApp(index)
  }


  useEffect(() => {
  })


  return (
    <div className="">
      <header className="py-4 bg-gray-100">
        <div className="container mx-auto max-w-6xl px-4">
          <h1 className=" font-bold text-xl px-3">{ "AI Playground" }</h1>
          <div className="flex gap-x-2 gap-y-1 flex-wrap text-gray-500 mt-4 -ml-1">
            <div className={"text-md px-4 py-1 rounded-full cursor-pointer" + (selectedApp == -1 ? " bg-gray-800 text-white " : "")} onClick={e => selectApp(-1)}>Overview</div>
            {apps.map((app, i) => (
              <div className={"text-md px-4 py-1 rounded-full cursor-pointer" + (selectedApp == i ? " bg-gray-800 text-white " : "")} key={i} onClick={e => selectApp(i)}>{app.name}</div>
            ))}
          </div>
        </div>
      </header>

      <section className={"py-8 " + (selectedApp == -1 ? "  " : "  hidden ")}>
        <div className='container mx-auto max-w-6xl p-8'>
          <h2 className="text-2xl font-bold mb-8">A lightweight frontend for AI prompting</h2>
          <p className="text-lg mb-4">
            A simple interface to interact with an AI API, built flexible and configurable on purpose.
            Using <a className="text-blue-600" href="https://beta.openai.com/overview" target="_blank">OpenAI API</a>, React, Tailwind.
          </p>
            <h3>Apps:</h3>
            <div className={"grid grid-cols-2 gap-4  mt-4 -ml-1"}>
              {apps.map((app, i) => (
                <div className={" p-8 transition-all duration-500 rounded-md bg-gray-200 text-gray-700  hover:bg-gray-600 hover:text-white  cursor-pointer" } key={i} onClick={e => selectApp(i)}>
                  <h4 className='font-bold text-lg'>{app.name}</h4>
                  <p>{app.description}</p>
                </div>
              ))}
            </div>
          <p className="text-lg mt-8">
            Built by Kish Parikh. View code on <a className="text-blue-600" href="https://github.com/KishParikh13/ai-playground" target="_blank">Github</a>.
          </p>
        </div>
      </section>

      <section className={"py-8 " + (selectedApp > -1 ? "  " : "  hidden ")}>
        <div className='container mx-auto max-w-6xl px-6'>
          {apps.map((app, i) => (
            <div key={i} className={((selectedApp == i && selectedApp != -1) ? "" : " hidden ")}>
              <Interface description={app.description} promptSupport={app.promptSupport} requestData={app.request} numRequestsDefaults={app.numRequestsDefaults} model={app.model} templateType={app.templateType} url={app.url} numResponses={app.numResponses} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
