import { useState, useEffect } from 'react';

import Interface from "./Interface.jsx"

function App() {
  const [selectedApp, setSelectedApp] = useState(1)

  const apps = [
    {
      name: "Overview",
    },
    {
      name: "Autocomplete",
      description: "Image Generator",
      templateType: "text",
      url: "https://api.openai.com/v1/completions",
      promptSupport: null,
      request: `{"model": "text-davinci-002", "temperature": 1.0, "max_tokens": 48, "n": 3, "top_p": 1, "frequency_penalty": 0.75, "presence_penalty": 0}`
    },
    {
      name: "Image Generator",
      description: "Image Generator",
      templateType: "image",
      url: "https://api.openai.com/v1/images/generations",
      request: `{ "n": 3, "size": "256x256" }`
    },
    {
      name: "Sentiment Analyzer",
      templateType: "text",
      url: "https://api.openai.com/v1/completions",
      promptSupport: "\n The sentiment of the previous text: ",
      request: `{"model": "text-davinci-003", "temperature": 1.0, "max_tokens": 48, "n": 3, "top_p": 1, "frequency_penalty": 0.75, "presence_penalty": 0}`
    },
    {
      name: "Custom Prompt",
      templateType: "text",
      url: "https://api.openai.com/v1/completions",
      promptSupport: null,
      request: `{"model": "text-davinci-003", "temperature": 1.0, "max_tokens": 128, "n": 1, "top_p": 1, "frequency_penalty": 0.75, "presence_penalty": 0}`
    }
  ]

  return (
    <div className="">
      <header className="py-4 bg-gray-100">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className=" font-bold text-xl px-3">OpenAI - {apps[selectedApp].name}</h1>
          <div className="flex gap-x-2 gap-y-1 flex-wrap text-gray-500 mt-4 -ml-1">
            {apps.map((app, i) => (
              <div className={"text-md px-4 py-1 rounded-full cursor-pointer" + (selectedApp == i ? " bg-gray-800 text-white " : "")} key={i} onClick={e => setSelectedApp(i)}>{app.name}</div>
            ))}
          </div>
        </div>
      </header>
      <section className={"p-8 " + (selectedApp == 0 ? "  " : "  hidden ")}>
        <h2 className="text-2xl font-bold mb-8">A lightweight frontend for AI prompting</h2>
        <p className="text-lg mb-4">
          A simple interface to interact with an AI API, built flexible and configurable on purpose.
          Using <a className="text-blue-600" href="https://beta.openai.com/overview" target="_blank">OpenAI API</a>, React, Tailwind.
        </p>
          <p>Apps:</p>
          <div className={"grid grid-cols-2 gap-4  mt-4 -ml-1"}>
            {apps.filter(app => app.url).map((app, i) => (
              <div className={"text-md p-8 transition-all text-center duration-100 rounded-md bg-gray-200 text-gray-700  hover:bg-gray-800 hover:text-white  cursor-pointer" } key={i} onClick={e => setSelectedApp(i+1)}>
                {app.name}
              </div>
            ))}
          </div>
        <p className="text-lg mt-8">
          Built by Kish Parikh. View code on Github.
        </p>
      </section>
      {apps.filter(app => app.url).map((app, i) => (
        <div key={i} className={(selectedApp == i && selectedApp > 0 ? "" : " hidden ")}>
          <Interface promptSupport={app.promptSupport} requestData={app.request} model={app.model} templateType={app.templateType} url={app.url} numResponses={app.numResponses} />
        </div>
      ))}
    </div>
  );
}

export default App;
