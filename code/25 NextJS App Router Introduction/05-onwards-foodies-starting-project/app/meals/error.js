// Only show error page in the same file and nested pages

//must be a client component
'use client'
export default function Error({error}) {
    return (
        <main className="error">
            <h1>
                An error occurred!
            </h1>
            <p>
                Failed to fetch meal data, please try again later
            </p>
        </main>
    )
}