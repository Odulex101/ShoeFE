// src/layouts/ShopLayout.jsx
import ShopNavBar from "../components/Shop/ShopNavBar";

const ShopLayout = ({ children }) => {
    return (
        <>
            {/* Render navbar once */}
            <ShopNavBar />
            {/* Render the shop page content */}
            <main>{children}</main>
        </>
    );
};

export default ShopLayout;
