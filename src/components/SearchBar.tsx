import { useRef } from 'react';

export function SearchBar() {
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className='w-[32.15rem] ml-12 flex content-center justify-center rounded-full'>
            <input
                type="text"
                ref={searchInputRef}
                className="border border-cinza-300 flex content-center justify-center rounded-19 h-[3.5rem] w-full bg-transparent px-6 text-lg placeholder:text-cinza-300 focus:shadow-none rounded-full focus:outline-none outline-none focus:border-transparent"
                placeholder="Pesquise postos de vacinação"
            />
        </div>
    );
}
