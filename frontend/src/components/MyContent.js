import React from 'react';
import { useSelector } from 'react-redux';

const MyComponent = () => {
    const { error } = useSelector((state) => state.auth);

    return (
        <div>
            {error && (
                <div>
                    {/* Ensure you're rendering a string */}
                    {typeof error === 'string' ? error : error.message || "An unknown error occurred."}
                </div>
            )}
            {/* Other component logic */}
        </div>
    );
};
