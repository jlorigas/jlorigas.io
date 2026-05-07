'use client';

import { useEffect, useState } from 'react';

interface TimeZone {
  city: string;
  timezone: string;
  abbreviation: string;
}

const timeZones: TimeZone[] = [
  { city: 'New York', timezone: 'America/New_York', abbreviation: 'EST/EDT' },
  { city: 'London', timezone: 'Europe/London', abbreviation: 'GMT/BST' },
  { city: 'Tokyo', timezone: 'Asia/Tokyo', abbreviation: 'JST' },
  { city: 'Sydney', timezone: 'Australia/Sydney', abbreviation: 'AEDT/AEST' },
  { city: 'Dubai', timezone: 'Asia/Dubai', abbreviation: 'GST' },
  { city: 'Los Angeles', timezone: 'America/Los_Angeles', abbreviation: 'PST/PDT' },
];

function DigitalClock() {
  const [times, setTimes] = useState<{ [key: string]: string }>({})
  const [localTime, setLocalTime] = useState('')

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: { [key: string]: string } = {}

      timeZones.forEach(({ timezone }) => {
        const time = new Date().toLocaleTimeString('en-US', {
          timeZone: timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
        newTimes[timezone] = time
      })

      setTimes(newTimes)

      const local = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      setLocalTime(local)
    }

    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-2 text-cyan-400">
          Global Digital Clock
        </h1>
        <p className="text-center text-gray-400 mb-12">
          View current time across different time zones worldwide
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {timeZones.map(({ city, timezone, abbreviation }) => (
            <div
              key={timezone}
              className="bg-gray-800 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20"
            >
              <h2 className="text-xl font-semibold text-cyan-400 mb-2">
                {city}
              </h2>
              <div className="font-mono text-4xl font-bold text-white mb-2">
                {times[timezone] || '--:--:--'}
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{timezone}</span>
                <span className="text-cyan-300 font-semibold">{abbreviation}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 border border-cyan-500/30 rounded-lg p-8 text-center">
          <p className="text-gray-400 mb-2">Your Local Time</p>
          <div className="font-mono text-6xl font-bold text-cyan-400">
            {localTime || '--:--:--'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DigitalClock
