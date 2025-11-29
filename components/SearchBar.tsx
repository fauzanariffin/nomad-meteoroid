"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
    onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
            setQuery("");
            setIsOpen(false);
        }
    };

    return (
        <div className="absolute top-4 right-4 z-50">
            <div
                className={`flex items-center transition-all duration-300 ease-in-out ${isOpen ? "w-64 bg-white/20 backdrop-blur-md" : "w-10 bg-transparent"
                    } rounded-full overflow-hidden`}
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                >
                    <Search size={24} />
                </button>
                {isOpen && (
                    <form onSubmit={handleSubmit} className="flex-1 mr-2">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search city..."
                            className="w-full bg-transparent border-none text-white placeholder-white/70 focus:ring-0 outline-none px-2"
                            autoFocus
                        />
                    </form>
                )}
            </div>
        </div>
    );
}
