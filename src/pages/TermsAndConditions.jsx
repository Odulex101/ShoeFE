import React from "react";

const TermsAndConditions = () => {
    return (
        <div className="container py-5">
            <h2 className="mb-4 text-uppercase">Terms & Conditions</h2>

            {/* Legal disclaimer */}
            <section className="mb-5">
                <h5 className="fw-semibold">A legal disclaimer</h5>
                <p className="text-muted">
                    The explanations and information provided on this page are only
                    general and high-level explanations and information on how to write
                    your own document of Terms & Conditions. You should not rely on this
                    article as legal advice or as recommendations regarding what you
                    should actually do, because we cannot know in advance what are the
                    specific terms you wish to establish between your business and your
                    customers and visitors.
                </p>
                <p className="text-muted">
                    We recommend that you seek legal advice to help you understand and
                    to assist you in the creation of your own Terms & Conditions.
                </p>
            </section>

            {/* Basics */}
            <section className="mb-5">
                <h5 className="fw-semibold">
                    Terms & Conditions – the basics
                </h5>

                <p className="text-muted">
                    Having said that, Terms and Conditions (“T&C”) are a set of legally
                    binding terms defined by you, as the owner of this website. The T&C
                    set forth the legal boundaries governing the activities of the
                    website visitors, or your customers, while they visit or engage
                    with this website.
                </p>

                <p className="text-muted">
                    The T&C are meant to establish the legal relationship between the
                    site visitors and you as the website owner.
                </p>

                <p className="text-muted">
                    T&C should be defined according to the specific needs and nature of
                    each website. For example, a website offering products to customers
                    in e-commerce transactions requires T&C that are different from the
                    T&C of a website only providing information.
                </p>

                <p className="text-muted">
                    T&C provide you as the website owner the ability to protect yourself
                    from potential legal exposure, but this may differ from jurisdiction
                    to jurisdiction.
                </p>
            </section>
        </div>
    );
};

export default TermsAndConditions;
