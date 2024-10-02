
import { useState } from 'react'
import './App.css'
import { People } from './components/People';


function App() {
  
  const [people, setPeople] = useState([
    {
      id: 1,
      name: "Juan Hernandez",
      role: "Developer",
      img: "https://bootdey.com/img/Content/avatar/avatar7.png"
    },
    {
      id: 2,
      name: "Pepito Perez",
      role: "Programer",
      img: "https://bootdey.com/img/Content/avatar/avatar2.png"
    },
    {
      id: 3,
      name: "Juanita Acosta",
      role: "Scrum Master",
      img: "https://bootdey.com/img/Content/avatar/avatar3.png"
    },
  ]);

  return (
    <div>
      <People
        people={people}
        setPeople={setPeople}
      />
    </div>
  )
}

export default App
