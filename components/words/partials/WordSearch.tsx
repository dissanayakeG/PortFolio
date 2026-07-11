"use client";

type WordSearchProps = {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
};

export default function WordSearch({ searchTerm, setSearchTerm }: WordSearchProps) {
    return (
        <div className="w-full">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search word or meaning..."
                className="border-2 border-theme rounded-xl p-4 lg:p-5 w-full text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            />
        </div>
    );
}