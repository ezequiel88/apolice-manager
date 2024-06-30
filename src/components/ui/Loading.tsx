import React from 'react';

type LoadingProps = {
    size?: number
    fill?: string
}

export default function Loading({ size = 64, fill = "#1a1f22" }: LoadingProps) {
    return (
        <svg
            className="animate-spin absolute"
            width={size}
            height={size}
            fill={fill}
            viewBox="0 0 50 50"
        >
            <circle cx="25" cy="10" r="3" />
            <circle opacity=".3" cx="25" cy="40" r="3" />
            <circle opacity=".3" cx="32.5" cy="12" r="3" />
            <circle opacity=".3" cx="17.5" cy="38" r="3" />
            <circle opacity=".93" cx="17.5" cy="12" r="3" />
            <circle opacity=".3" cx="32.5" cy="38" r="3" />
            <circle opacity=".65" cx="10" cy="25" r="3" />
            <circle opacity=".3" cx="40" cy="25" r="3" />
            <circle opacity=".86" cx="12" cy="17.5" r="3" />
            <circle opacity=".3" cx="38" cy="32.5" r="3" />
            <circle opacity=".44" cx="12" cy="32.5" r="3" />
            <circle opacity=".3" cx="38" cy="17.5" r="3" />
        </svg>
    );
}
