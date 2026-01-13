import ShopNavBar from "../components/Shop/ShopNavBar";

const PrivacyPolicy = () => {
    return (
        <>
            {/* Shop Navbar */}
            <ShopNavBar />

            {/* Page Content */}
            <div className="container my-5" style={{ maxWidth: "900px" }}>
                <h2 className="mb-4 text-uppercase">Privacy Policy</h2>

                <h5 className="fw-bold mt-4">A legal disclaimer</h5>
                <p className="text-muted">
                    The explanations and information provided on this page are
                    only general and high-level explanations and information on
                    how to write your own document of a Privacy Policy. You
                    should not rely on this article as legal advice or as
                    recommendations regarding what you should actually do,
                    because we cannot know in advance what are the specific
                    privacy policies you wish to establish between your business
                    and your customers and visitors.
                </p>

                <p className="text-muted">
                    We recommend that you seek legal advice to help you
                    understand and to assist you in the creation of your own
                    Privacy Policy.
                </p>

                <h5 className="fw-bold mt-4">
                    Privacy Policy – the basics
                </h5>
                <p className="text-muted">
                    Having said that, a privacy policy is a statement that
                    discloses some or all of the ways a website collects, uses,
                    discloses, processes, and manages the data of its visitors
                    and customers.
                </p>

                <p className="text-muted">
                    Different jurisdictions have different legal obligations of
                    what must be included in a Privacy Policy. You are
                    responsible to make sure you are following the relevant
                    legislation according to your activities and location.
                </p>
            </div>
        </>
    );
};

export default PrivacyPolicy;
