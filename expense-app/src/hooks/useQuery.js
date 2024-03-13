import { useEffect, useState } from "react";

const useQuery = url => {
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
                    console.log(data);
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
    }, [url]);
    return state;
}

export default useQuery;