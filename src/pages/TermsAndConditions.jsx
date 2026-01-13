
import ShopNavBar from "../components/Shop/ShopNavBar";

const TermsAndConditions = () => {
    return (
        <>
            {/* Top Shop Navbar */}
            <ShopNavBar />

            {/* Content */}
            <div className="container my-5" style={{ maxWidth: "900px" }}>
                <h2 className="mb-4 text-uppercase">Terms & Conditions</h2>

                <h5 className="fw-bold mt-4">A legal disclaimer</h5>
                <p className="text-muted">
                    The explanations and information provided on this page are
                    only general and high-level explanations and information on
                    how to write your own document of Terms & Conditions. You
                    should not rely on this article as legal advice or as
                    recommendations regarding what you should actually do,
                    because we cannot know in advance what are the specific
                    terms you wish to establish between your business and your
                    customers and visitors. We recommend that you seek legal
                    advice to help you understand and to assist you in the
                    creation of your own Terms & Conditions.
                </p>

                <h5 className="fw-bold mt-4">
                    Terms & Conditions – the basics
                </h5>
                <p className="text-muted">
                    Having said that, Terms and Conditions (“T&C”) are a set of
                    legally binding terms defined by you, as the owner of this
                    website. The T&C set forth the legal boundaries governing
                    the activities of the website visitors or your customers
                    while they visit or engage with this website.
                </p>

                <p className="text-muted">
                    T&C should be defined according to the specific needs and
                    nature of each website. For example, a website offering
                    products to customers in e-commerce transactions requires
                    T&C that are different from a website only providing
                    information.
                </p>

                <p className="text-muted">
                    T&C provide you as the website owner the ability to protect
                    yourself from potential legal exposure, but this may differ
                    from jurisdiction to jurisdiction.
                </p>
            </div>
        </>
    );
};

export default TermsAndConditions;
