import React from 'react'

export const Tile = ({ value }) => {

    return (
        <div className="rounded-md border-solid border-4 text-4xl font-medium">
            {
               renderSwitch(value)
            }
        </div>
    )
}

function renderSwitch(value) {
    switch(value) {
        case 0:
            return <div className="tile-space px-6 py-9">{''}</div>;
        case 2:
            return <div className="tile-space bg-red-400"><span>{value}</span></div>;
        case 4:
            return <div className="tile-space bg-red-600"><span>{value}</span></div>;
        case 8:
            return <div className="tile-space bg-yellow-400"><span>{value}</span></div>;
        case 16:
            return <div className="tile-space bg-yellow-600"><span>{value}</span></div>;
        case 32:
            return <div className="tile-space bg-green-500"><span>{value}</span></div>;
        case 64:
            return <div className="tile-space bg-green-700"><span>{value}</span></div>;
        case 128:
            return <div className="tile-space bg-indigo-400"><span>{value}</span></div>;
        case 256:
            return <div className="tile-space bg-indigo-600"><span>{value}</span></div>;
        case 512:
            return <div className="tile-space bg-blue-800"><span>{value}</span></div>;
        case 1024:
            return <div className="tile-space text-3xl bg-purple-800"><span>{value}</span></div>;
        case 2048:
            return <div className="tile-space text-3xl bg-gray-100 text-black"><span>{value}</span></div>;
        default:
            return <div className="tile-space text-2xl px-6 py-9 bg-gradient-to-r from-green-400 to-blue-500">{value}</div>;
    }
};
