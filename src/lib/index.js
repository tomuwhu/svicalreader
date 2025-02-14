import Ical from 'node-ical'
const data = await Ical.async.fromURL(
'https://calendar.google.com/calendar/ical/d2a4e81eb4f8e4665911a343e79113f1f25c476c23fd1cb7804c4fe28017babd%40group.calendar.google.com/public/basic.ics'
)

export const events = {events: Object.values(data).filter(v => v.type === 'VEVENT').map(v => ({
    start: new Date(v.start), 
    end: new Date(v.end), 
    text: v.summary, 
    location: v.location
}))}
