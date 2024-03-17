import { useEffect, useState } from "react";

const useQuery = (url, count) => {
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        error: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            fetch(url, {
                method: 'GET',
                headers: {
                    'x-user-id': 123
                }
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Something went wrong, please try after sometime");
                    }
                    let data = res.json();
                    data.then(data => {
                        setState({ data, isLoading: false, error: '' });
                    })
                })
                .catch(error => {
                    console.log(error);
                    setState({ data: null, isLoading: false, error: error.message });
                })
        }
        fetchData();
    }, [url, count]);
    return state;
}

export default useQuery;