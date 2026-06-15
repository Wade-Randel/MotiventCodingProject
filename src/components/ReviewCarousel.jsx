import { useState, useEffect, useRef } from 'react';

export default function ReviewCarousel({ reviews }) {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);

    const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const changeReview = (newIndex) => {
        if (prefersReducedMotion) {
            setIndex((newIndex + reviews.length) % reviews.length);
            return;
        }

        setVisible(false);
        setTimeout(() => {
            setIndex((newIndex + reviews.length) % reviews.length);
            setVisible(true);
        }, 500); // needs to CSS transition duration
    };

    useEffect(() => {
        if (prefersReducedMotion || isPaused) return;

        intervalRef.current = setInterval(() => {
            changeReview(index + 1);
        }, 6000);

        return () => clearInterval(intervalRef.current);
    }, [index, isPaused, prefersReducedMotion]);

    const current = reviews[index];

    return (
        <div
            className="review-carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
        >
            <div className={`review-card ${visible ? "is-visible" : ""}`} aria-live="polite">
                <div className="review-stars" aria-hidden="true">
                    {"★".repeat(current.rating)}{"☆".repeat(5 - current.rating)}
                </div>
                <p className="review-comment">"{current.comment}"</p>
                <p className="review-author">{current.name} - {current.location}</p>
            </div>

            <div className="review-controls">
                <button className="review-arrow review-arrow-prev" onClick={() => changeReview(index - 1)} aria-label="Previous review">
                    <span className="chevron"></span>
                </button>
                <button className="review-arrow review-arrow-next" onClick={() => changeReview(index + 1)} aria-label="Next review">
                    <span className="chevron"></span>
                </button>
            </div>
        </div>
    );
}