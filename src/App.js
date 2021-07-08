import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { blueGrey } from '@material-ui/core/colors';
import Layout from './components/Layout';
import Update from './pages/Update'
import Profile from './pages/Profile';

const theme = createMuiTheme({
  palette:{
    primary:{
      light: blueGrey[400],
      main: blueGrey[900],
      dark: blueGrey[600]
    },
    secondary:red
  },
  typography:{
    fontFamily: "Quicksand",
    fontSize: 12,
    fontWeightLight:400,
    fontWeightRegular:500,
    fontWeightMedium:600,
    fontWeightBold:700,
  }
})

function App() {
  return (
    <ThemeProvider theme = { theme }>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Notes />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/update/:id">
              <Update />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
