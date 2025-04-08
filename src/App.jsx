import Todo from "./Todo.jsx"
import { ThemeProvider } from "./ThemeProvider.jsx"

const App = () => {
  return (
    <ThemeProvider>
      <Todo/>      
    </ThemeProvider>
  )
}

export default App
