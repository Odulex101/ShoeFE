// src/pages/Shop.jsx
import DashboardHeader from "../components/DashboardHeader";
import ShopTopSearch from "../components/Shop/ShopTopSearch";
import BestSellers from "../components/Shop/BestSellers";

import { ReviewProvider } from "../context/ReviewContext";
import { BestSellerProvider, useBestSeller } from "../context/BestSellerContext";

const ShopBody = () => {
    const { showBestSellers } = useBestSeller();
    if (!showBestSellers) return null;
    return <BestSellers />;
};

const Shop = () => {
    return (
        <BestSellerProvider>
            <ReviewProvider>
                <DashboardHeader />
                <ShopTopSearch />
                {/* ShopNavBar removed, now only rendered via ShopLayout */}
                <ShopBody />
            </ReviewProvider>
        </BestSellerProvider>
    );
};

export default Shop;











