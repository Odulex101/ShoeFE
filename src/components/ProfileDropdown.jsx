import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BiLogIn, BiLogOut, BiUser } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";

const ProfileDropdown = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const email = localStorage.getItem("userEmail") || "Guest";

    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        navigate("/");
        window.location.reload();
    };

    return (
        <div className="position-relative">
            <button
                className="btn btn-light rounded-circle"
                onClick={() => open ? setOpen(false) : setOpen(true)}
            >
                <FaUserCircle size={22} />
            </button>

            {open && (
                <div
                    className="position-absolute end-0 mt-2 bg-white shadow rounded"
                    style={{ width: 240, zIndex: 8000 }}
                >
                    <div className="p-3 border-bottom">
                        <small className="text-muted" >{email}</small>
                    </div>

                    <div className="text-center">
                        <button
                            className="dropdown-item py-2"
                            onClick={() => navigate("/profile")}
                        >
                            <BiUser />   Profile
                        </button>

                        <button
                            className="dropdown-item py-2"
                            onClick={() => navigate("/settings")}
                        >
                            <CiSettings />  Settings
                        </button>

                        <button
                            className={`dropdown-item py-2
                                ${token ? 'text-danger' : 'text-success'}
                                `}
                            onClick={logout}
                        >
                            {
                                token ? <BiLogOut className="me-2" /> : <BiLogIn className="me-2" />
                            }
                            {
                                token ? 'Log Out' : 'Sign In'
                            }
                        </button>
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default ProfileDropdown;

