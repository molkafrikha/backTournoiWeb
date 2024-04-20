import { Route, Routes } from "react-router-dom"
import { io } from "socket.io-client"
import Layout from "./Components/Layout"
//import SearchResults from "./Components/SearchResults/SearchResults"
import Conversations from "./features/Messages/Conversations/Conversations"
import Messages from "./features/Messages/Messages"
import NewTournament from "./features/Tournaments/NewTournament"
import TournamentsList from "./features/Tournaments/TournamentsList"
import UserProfile from "./features/Users/UserProfile"
import LoginPage from "./pages/LoginPage/LoginPage"
import NotFoundPage from "./pages/NotFoundPage"
import SignupPage from "./pages/SignupPage/SignupPage"
import RequireAuth from "./utils/RequireAuth"
import TeamList from "./features/Tournaments/TeamList"

import TournamentDetails from "./features/Tournaments/TournamentDetails"
import NewTeam from "./features/Tournaments/NewTeam"
import BracketPage from "./features/Tournaments/BracketPage"
import Calendar from "./features/Tournaments/Calendar"
import TournamentLayout from "./Components/TournamentLayout"

export const socket = io("http://localhost:5000")





function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<TournamentsList />} />
          <Route path="addNewTournament" element={<NewTournament />} />
          <Route path='addNewTeam' element={<NewTeam />}></Route>
          <Route path='teams' element={<TeamList />}></Route>
          <Route path="/tournaments/:id" element={<TournamentDetails />} />
          <Route path='bracket/:id' element={<BracketPage/>} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/messages" element={<Conversations />} />
          <Route path="/messages/:id" element={<Messages />} />
        </Route>
        <Route path='/tournament-profile' element={<TournamentLayout />}>
          <Route path=':id' element={<TournamentDetails />}></Route>
          <Route path=':id/bracket' element={<BracketPage/>} />
          <Route path=':id/calendar' element={<Calendar />}/>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>

  )
}

export default App
