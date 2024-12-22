import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useRef } from 'react';

export default function Visualizer() {
    const [audioUrl, setAudioUrl] = useState('');
    const [songName, setSongName] = useState('');
    const canvasref = useRef(null)

    //Fetching song data
    const getAudio = (event) => {
        const file = event.target.files[0];
        const name = file.name;


        if (file) {
            const url = URL.createObjectURL(file);
            setAudioUrl(url);
        }
        else {
            alert('Please provide on specific Format Data (i.e: mp3, wav)')
        }
        setSongName(name);

    };
    //Getting song src
    
    const visualizing = () => {
        console.log(`Visualizing Call`)

        const song = new Audio()
        const audioCtx = new AudioContext()

        const canvas = canvasref.current
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const context = canvas.getContext('2d')
        const analyser = audioCtx.createAnalyser()
        const audioSource = audioCtx.createMediaElementSource(song)
        audioSource.connect(analyser)
        analyser.connect(audioCtx.destination)
        analyser.fftSize = 64
        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        const barWidth = canvas.width / bufferLength
        let barHeigth;
        let x = 0
    }




    return (
        <>
            <div className="flex flex-col items-center bg-gradient-to-r from-teal-400 to-blue-600 min-h-screen">
                <div className="flex flex-col items-center bg-gray-300 rounded-xl shadow-lg w-full max-w-lg p-8 mt-10">
                    <h1 className="font-bold text-2xl mb-8">Upload Audio</h1>
                    <Upload className="text-teal-500 w-16 h-16 mb-6" />
                    <p className="mb-8 text-center mt-5 px-4">
                        Drag and drop your audio file here
                        <br />
                        or click to browse
                    </p>
                    <div className="relative w-fit">
                        <input
                            type="file"
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                            accept="audio/*"
                            onChange={getAudio}
                            id="audio-upload"
                        />
                        <label
                            htmlFor="audio-upload"
                            className="block px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 cursor-pointer"
                        >
                            Select File
                        </label>
                    </div>
                </div>

                {audioUrl && (
                    <div className="mt-8 w-full max-w-lg px-8">
                        <audio
                            src={audioUrl}
                            className="w-full rounded-full shadow-lg border-4 border-teal-300"
                            controls
                        />
                        <div className="mt-4 text-center">
                            <h2 className="text-xl font-semibold text-gray-800">Song Name</h2>
                            <p className="text-lg text-gray-600 font-mono">{songName}</p>
                        </div>
                    </div>
                )}
                <button
                onClick={visualizing}
                className='bg-teal-500 px-5 mt-5 py-3 rounded-xl text-white font-mono'>Convert To Audio Visualizer</button>
            </div>
            <canvas
            className='w-full h-full absolute '
                ref={canvasref}
            >

            </canvas>
        </>
    );
}
