const useStorage = () => {
    const getItem = (name) => JSON.parse(window.localStorage.getItem(name));
    const setItem = (name, data) => window.localStorage.setItem(name, JSON.stringify(data));
    // const removeItem = () => window.localStorage.removeItem(name);

    return [getItem, setItem];
};

export default useStorage;
