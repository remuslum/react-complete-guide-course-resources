import { Link } from "react-router-dom"

const EVENTS = [
    {id:"e1", title: "Event 1"},
    {id:"e2", title: "Event 2"},
    {id:"e3", title: "Event 3"} 
]

function EventsPage(){
    return (
        <ul>
            {EVENTS.map((e) => {
                return <li key={e.id}>
                    <p><Link to={`${e.id}`}>{e.title}</Link></p>
                </li>
            })}
        </ul>
    )
}

export default EventsPage