import { useState } from "react";

export default function FaqAccordion ({ faqs }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faq-list">
        {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
                <div key={index} className={`faq-item ${isOpen ? "is-open" : ""}`}>
                <button
                    className="faq-question"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                >
                    <span>{faq.question}</span>
                    <span className="faq-icon" aria-hidden="true">
                        {isOpen ? "−" : "+"}
                    </span>
                </button>
                <div
                    id={`faq-answer-${index}`}
                    className={`faq-answer ${isOpen ? "is-open" : ""}`}
                >
                    <p>{faq.answer}</p>
                </div>
            </div>
            );
        })}
        </div>
    );
}