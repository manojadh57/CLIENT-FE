import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import PostDetailPage from "./pages/PostDetailPage";
import MessagesPage from "./pages/MessagesPage";
import ThreadPage from "./pages/ThreadPage";
import BookmarksPage from "./pages/BookmarksPage";
import OnboardingPage from "./pages/OnboardingPage";
import RulesPage from "./pages/RulesPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />

      {/* Protected Routes with MainLayout */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/posts/:id"
          element={
            <MainLayout>
              <PostDetailPage />
            </MainLayout>
          }
        />
        <Route
          path="/messages"
          element={
            <MainLayout>
              <MessagesPage />
            </MainLayout>
          }
        />
        <Route
          path="/messages/:userId"
          element={
            <MainLayout>
              <ThreadPage />
            </MainLayout>
          }
        />
        <Route
          path="/bookmarks"
          element={
            <MainLayout>
              <BookmarksPage />
            </MainLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          }
        />

        <Route
          path="/rules"
          element={
            <MainLayout>
              <RulesPage />
            </MainLayout>
          }
        />
      </Route>

      <Route
        path="*"
        element={<div className="p-6 text-center">404 Not Found</div>}
      />
    </Routes>
  );
}
