import { create } from 'zustand';

const useStore = create((set) => ({
    showSearchResults: false,
    setShowSearchResults: (showThem) => set(() => ({ showSearchResults: showThem })),
    searchValue: "",
    setSearchValue: (searchString) => set(() => ({ searchValue: searchString })),
}));

export default useStore;