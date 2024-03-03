import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home/Home";
import Auth, { action as authAction } from "./pages/Auth";
import Posts from "./pages/PostsPage/Posts";
import PostNew from "./components/Posts/PostNew";
import PostsLayout, { loader as postsLoader } from "./pages/PostsLayout";
import { action as manipulatePostAction } from "./components/Posts/PostForm";
import PageStatusProvder from "./store/PageStatusProvder";
import SearchLayout from "./pages/SearchLayout";
import { checkAuthLoader } from "./util/auth";
import PostEdit from "./components/Posts/PostEdit";
import PostDetail from "./pages/PostsPage/PostDetail";
import { action as logoutAction } from "./pages/Logout";
import Profile from "./pages/Profile/Profile";
import ProfileEdit from "./components/Profile/ProfileEdit";
import ProfileLayout from "./pages/ProfileLayout";
import { action as editProfileAction } from "./components/Profile/ProfileEditForm";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: (
      <PageStatusProvder>
        <RootLayout />
      </PageStatusProvder>
    ),
    errorElement: <ErrorPage />,
    loader: checkAuthLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "posts",
        id: "posts-root",
        element: <PostsLayout />,
        loader: postsLoader,
        children: [
          { index: true, element: <Posts /> },
          {
            path: ":postId",
            children: [
              { index: true, element: <PostDetail /> },
              { path: "edit", element: <PostEdit /> },
            ],
          },
          {
            path: "new",
            element: <PostNew />,
            action: manipulatePostAction,
          },
        ],
      },
      {
        path: "search",
        element: <SearchLayout />,
      },
      {
        path: "profile",
        element: <ProfileLayout />,
        children: [
          { index: true, element: <Profile /> },
          { path: "edit", element: <ProfileEdit />, action: editProfileAction },
        ],
      },
      { path: "auth", element: <Auth />, action: authAction },
      { path: "logout", action: logoutAction },
    ],
  },
]);

//mongodb+srv://bojugusumanthkumar:8Pq23QNui1S273h4@cluster0.c73kjxi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
function App() {
  return <RouterProvider router={router} />;
}

export default App;
