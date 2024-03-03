import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ message: '', type: '' });

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setAlert({ message: 'Successfully signed in!', type: 'success' });
    } catch (err) {
      console.error(err);
      setAlert({ message: err.message, type: 'danger' }); // Assuming err.message contains the error message
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setAlert({ message: 'Successfully signed in with Google!', type: 'success' });
    } catch (err) {
      console.error(err);
      setAlert({ message: err.message, type: 'danger' });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setAlert({ message: 'Successfully signed out!', type: 'success' });
    } catch (err) {
      console.error(err);
      setAlert({ message: err.message, type: 'danger' });
    }
  };

  return (
    <div className="container p-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {alert.message && (
            <div className={`alert alert-${alert.type}`} role="alert">
              {alert.message}
            </div>
          )}
          <form>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email..."
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2">
              <button type="button" className="btn btn-primary" onClick={signIn}>
                <i className="fas fa-sign-in-alt"></i> Sign In
              </button>
              <button type="button" className="btn btn-danger" onClick={signInWithGoogle}>
                <i className="fab fa-google"></i> Sign In With Google
              </button>
              <button type="button" className="btn btn-secondary" onClick={logout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
