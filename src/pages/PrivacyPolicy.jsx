import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="container py-5">
            <h2 className="mb-4 text-uppercase">Privacy Policy</h2>

            <section className="mb-5">
                <h5 className="fw-semibold">A legal disclaimer</h5>
                <p className="text-muted">
                    The explanations and information provided on this page are only
                    general and high-level explanations and information on how to write
                    your own document of a Privacy Policy.
                </p>
                <p className="text-muted">
                    You should not rely on this page as legal advice or as
                    recommendations regarding what you should actually do, because we
                    cannot know in advance what are the specific privacy policies you
                    wish to establish between your business and your customers and
                    visitors.
                </p>
                <p className="text-muted">
                    We recommend that you seek legal advice to help you understand and
                    assist you in the creation of your own Privacy Policy.
                </p>
            </section>

            <section>
                <h5 className="fw-semibold">Privacy Policy – the basics</h5>

                <p className="text-muted">
                    A privacy policy is a statement that discloses some or all of the
                    ways a website collects, uses, discloses, processes, and manages
                    the data of its visitors and customers.
                </p>

                <p className="text-muted">
                    It usually also includes a statement regarding the website’s
                    commitment to protecting its visitors’ or customers’ privacy, and
                    an explanation about the different mechanisms the website is
                    implementing in order to protect privacy.
                </p>

                <p className="text-muted">
                    Different jurisdictions have different legal obligations of what
                    must be included in a Privacy Policy. You are responsible to make
                    sure you are following the relevant legislation to your activities
                    and location.
                </p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
