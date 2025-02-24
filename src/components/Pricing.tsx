import { Check } from "lucide-react";

const Pricing = () => {
    const tiers = [
        {
            name: "Basic",
            description: "Create 1 event for free",
            price: "Free",
            features: ["Create 1 event", "Basic analytics", "Standard support"],
        },
        {
            name: "Premium",
            description: "Create additional events at a fixed price",
            price: "₹1500",
            popular: true,
            features: [
                "Unlimited event creation",
                "Advanced analytics",
                "Priority support",
                "Secure payments",
            ],
        },
        {
            name: "Enterprise",
            description: "For large-scale organizations",
            price: "Custom Pricing",
            features: [
                "Bulk event creation discounts",
                "Dedicated account manager",
                "API access",
                "Advanced security",
            ],
        },
    ];

    return (
        <section className="py-12 bg-[#1e1e1e] min-h-screen pt-28">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-300 tracking-tighter sm:text-4xl md:text-5xl">
                        EventHub Pricing
                    </h2>
                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl lg:text-base xl:text-xl">
                        Choose a plan that fits your event management needs.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 mt-16 md:grid-cols-3 md:gap-8">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative flex flex-col p-6 border rounded-lg bg-white shadow-sm ${tier.popular ? "border-primary shadow-lg scale-105 md:scale-110" : "border-gray-300"
                                }`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">
                                    Most Popular
                                </div>
                            )}
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold">{tier.name}</h3>
                                <p className="text-gray-500">{tier.description}</p>
                            </div>
                            <div className="mb-4 flex items-baseline gap-2">
                                <span className="text-3xl font-bold">{tier.price}</span>
                                {tier.name !== "Basic" && <span className="text-gray-500">/ event</span>}
                            </div>
                            <ul className="grid gap-2 text-sm mb-4">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-green-600" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`w-full py-2 px-4 rounded-md text-white ${tier.popular ? "bg-blue-600" : "bg-gray-600"
                                    }`}
                            >
                                {tier.name === "Enterprise" ? "Contact Us" : "Get Started"}
                            </button>
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center text-sm text-gray-500">
                    All plans include secure payments and 24/7 support.
                </div>
            </div>
        </section>
    );
};

export default Pricing;
