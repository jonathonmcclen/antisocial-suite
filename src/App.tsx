import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import WelcomePage from "./pages/WelcomePage";
import "./App.css";
import { CustomProvider } from "rsuite";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/Auth";
import Signup from "./views/signup";
import Accounts from "./views/accounts";
import Account from "./views/account";
import Lists from "./views/lists";
import Tasks from "./views/tasks";
import Organization from "./views/organization";
import TasksCreate from "./views/tasksCreate";
import ListsCreate from "./views/listsCreate/listsCreate";
import ConfirmEmail from "./views/ConfirmEmail";
import AccountEdit from "./views/accountEdit";
import Control from "./views/control";
import ControlCreate from "./views/controlCreate";
import Task from "./views/task";
import Unfollow from "./views/Unfollow";
import Help from "./views/help";
import FutureFeature from "./views/futureFeature";

function App() {
  return (
    <CustomProvider theme="light">
      <BrowserRouter>
        <AuthProvider>
          <RootLayout>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <WelcomePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/confirm-email" element={<ConfirmEmail />} />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/accounts"
                element={
                  <ProtectedRoute>
                    <Accounts />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/accounts/edit/:id"
                element={
                  <ProtectedRoute>
                    <AccountEdit />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/control"
                element={
                  <ProtectedRoute>
                    <Control />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/control/new"
                element={
                  <ProtectedRoute>
                    <ControlCreate />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <Tasks />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/task/:id"
                element={
                  <ProtectedRoute>
                    <Task/>
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/tasks/new"
                element={
                  <ProtectedRoute>
                    <TasksCreate />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/tasks/edit/:id"
                element={
                  <ProtectedRoute>
                    <TasksCreate />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/org"
                element={
                  <ProtectedRoute>
                    <Organization />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="/lists/new"
                element={
                  <ProtectedRoute>
                    <ListsCreate />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/lists/edit/:id"
                element={
                  <ProtectedRoute>
                    <ListsCreate />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/Unfollow"
                element={
                  <ProtectedRoute>
                    <Unfollow />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/info"
                element={
                  <ProtectedRoute>
                    <Help />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/comingSoon"
                element={
                  <ProtectedRoute>
                    <FutureFeature />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/lists"
                element={
                  <ProtectedRoute>
                    <Lists />
                  </ProtectedRoute>
                }
              >
                {/* <Route index element={<BlogPostsPage />} />
                <Route path="create" element={<CreateEstimate />} /> */}
              </Route>
            </Routes>
          </RootLayout>
        </AuthProvider>
      </BrowserRouter>
    </CustomProvider>
  );
}

export default App;
