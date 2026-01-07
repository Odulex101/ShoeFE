import { FaSearch, FaUserCheck } from "react-icons/fa";
import { useSearch } from "../../context/SearchContext";

const ShopTopSearch = () => {
    const { setSearchTerm } = useSearch();
    const email = localStorage.getItem("userEmail");

    return (
        <div className="border-bottom py-2">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="input-group w-50">
                    <span className="input-group-text bg-white">
                        <FaSearch />
                    </span>
                    <input
                        className="form-control"
                        placeholder="Search products..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <strong>FREE SHIPPING WORLDWIDE</strong>
                <div className="d-flex gap-3 align-items-center">
                    <FaUserCheck />
                    {email ? <span className="fw-bold">{email}</span> : <span className="fw-bold">Guest</span>}
                </div>
            </div>
        </div>
    );
};

export default ShopTopSearch;
