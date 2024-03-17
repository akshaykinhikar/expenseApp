import { useState } from "react"

const useMutation = () => {
    const [state, setState] = useState({
        isLoading: false,
        error: ''
    });

    const fn = async ({ url, method = 'POST', data, action }) => {
        setState(prev => ({
            ...prev,
            isLoading: true,
        }));

        fetch(url, {
            method: method,
            body: data ? data : null,
            headers: {
                'x-user-id': 123
            }
        },
        )
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Something went wrong, please try after sometime");
                }
                setState({ isLoading: false, error: '' });
                let data = res.json();
                action(data);
            })
            .catch(error => {
                setState({ isLoading: false, error: error.message });
            })
    }

    return { mutate: fn, ...state }
}

export default useMutation;